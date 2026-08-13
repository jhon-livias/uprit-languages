#!/usr/bin/env bash
# Configura el vhost Apache de idiomas.uprit.edu.pe y publica el build.
set -euo pipefail

APP_DIR="/var/www/idiomas-uprit"
DOMAIN="idiomas.uprit.edu.pe"
TARBALL="/tmp/idiomas-dist.tar.gz"
EMAIL="admin@uprit.edu.pe"

if [[ ! -f "$TARBALL" ]]; then
  echo "Error: no está $TARBALL" >&2
  exit 1
fi

echo "==> Publicando archivos en ${APP_DIR}"
sudo mkdir -p "$APP_DIR"
sudo find "$APP_DIR" -mindepth 1 -delete
sudo tar -xzf "$TARBALL" -C "$APP_DIR"
sudo chown -R www-data:www-data "$APP_DIR"
sudo find "$APP_DIR" -type d -exec chmod 755 {} \;
sudo find "$APP_DIR" -type f -exec chmod 644 {} \;

echo "==> Virtual host Apache"
if [[ ! -f /etc/apache2/sites-available/idiomas.conf ]]; then
  sudo tee /etc/apache2/sites-available/idiomas.conf > /dev/null <<'APACHE'
<VirtualHost *:80>
    ServerName idiomas.uprit.edu.pe
    ServerAdmin soporte@uprit.edu.pe
    DocumentRoot /var/www/idiomas-uprit

    <Directory /var/www/idiomas-uprit>
        Options FollowSymLinks
        AllowOverride None
        Require all granted

        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    <FilesMatch "\.(?:js|css|woff2|svg|png|jpe?g|webp|ico)$">
        Header set Cache-Control "public, max-age=31536000, immutable"
    </FilesMatch>
    <FilesMatch "index\.html">
        Header set Cache-Control "no-cache"
    </FilesMatch>

    ErrorLog ${APACHE_LOG_DIR}/idiomas-error.log
    CustomLog ${APACHE_LOG_DIR}/idiomas-access.log combined
</VirtualHost>
APACHE

  sudo a2enmod rewrite headers expires
  sudo a2ensite idiomas.conf
else
  echo "  idiomas.conf ya existe; no se sobrescribe"
fi

sudo apache2ctl configtest
sudo systemctl reload apache2

if [[ ! -d /etc/letsencrypt/live/${DOMAIN} ]]; then
  echo "==> Certificado SSL"
  sudo certbot --apache \
    --non-interactive \
    --agree-tos \
    --redirect \
    --email "$EMAIL" \
    -d "$DOMAIN"
else
  echo "==> Certificado SSL ya presente"
fi

sudo apache2ctl configtest
sudo systemctl reload apache2

echo ""
echo "Deploy listo."
echo "  Dir:  ${APP_DIR}"
echo "  URL:  https://${DOMAIN}/"
ls -la "$APP_DIR" | head
