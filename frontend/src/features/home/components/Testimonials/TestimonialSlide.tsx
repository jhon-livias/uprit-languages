import clsx from "clsx"
import { PlayIcon } from "./icons"
import type { Testimonial } from "./items"

type TestimonialSlideProps = {
  testimonial: Testimonial
  variant: "peek-left" | "active" | "peek-right"
  isPlaying: boolean
  onPlay: () => void
  onSelect: () => void
}

export const TestimonialSlide = ({
  testimonial,
  variant,
  isPlaying,
  onPlay,
  onSelect,
}: TestimonialSlideProps) => {
  const isActive = variant === "active"
  const objectPosition = variant === "peek-left" ? "object-right" : variant === "peek-right" ? "object-left" : "object-center"

  return (
    <article
      className={clsx(
        "relative h-full overflow-hidden rounded-xl",
        !isActive && "cursor-pointer",
      )}
    >
      {isActive && isPlaying && testimonial.youtubeId ? (
        <iframe
          title={`Testimonio de ${testimonial.name}`}
          src={`https://www.youtube.com/embed/${testimonial.youtubeId}?autoplay=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="size-full border-0"
        />
      ) : (
        <>
          {isActive ? (
            <img
              src={testimonial.thumbnail}
              alt={testimonial.thumbnailAlt}
              className={clsx("size-full object-cover", objectPosition)}
            />
          ) : (
            <button type="button" onClick={onSelect} className="size-full cursor-pointer">
              <img
                src={testimonial.thumbnail}
                alt=""
                className={clsx("size-full object-cover", objectPosition)}
              />
              <span className="sr-only">Ver testimonio de {testimonial.name}</span>
            </button>
          )}

          {isActive && (
            <button
              type="button"
              onClick={onPlay}
              disabled={!testimonial.youtubeId}
              aria-label={`Reproducir testimonio de ${testimonial.name}`}
              className="absolute bottom-5 left-1/2 grid size-14 -translate-x-1/2 place-items-center rounded-full bg-black/60 text-white transition-opacity duration-200 hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta disabled:cursor-default"
            >
              <PlayIcon className="ml-0.5 size-6" />
            </button>
          )}
        </>
      )}
    </article>
  )
}
