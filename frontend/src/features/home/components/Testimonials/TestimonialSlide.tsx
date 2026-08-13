import { PlayIcon } from "./icons"
import type { Testimonial } from "./items"

type TestimonialSlideProps = {
  testimonial: Testimonial
  width: number
  isActive: boolean
  isPlaying: boolean
  onPlay: () => void
}

export const TestimonialSlide = ({
  testimonial,
  width,
  isActive,
  isPlaying,
  onPlay,
}: TestimonialSlideProps) => {
  return (
    <article className="relative h-full shrink-0 px-1.5 md:px-2.5" style={{ width }}>
      <div className="relative h-full overflow-hidden rounded-xl">
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
            <img
              src={testimonial.thumbnail}
              alt={isActive ? testimonial.thumbnailAlt : ""}
              draggable={false}
              className="size-full object-cover object-center"
            />
            {isActive && (
              <button
                type="button"
                onClick={onPlay}
                disabled={!testimonial.youtubeId}
                aria-label={`Reproducir testimonio de ${testimonial.name}`}
                className="absolute bottom-4 left-1/2 grid size-12 -translate-x-1/2 place-items-center rounded-full bg-black/60 text-white transition-opacity duration-200 hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta disabled:cursor-default sm:bottom-5 sm:size-14"
              >
                <PlayIcon className="ml-0.5 size-6" />
              </button>
            )}
          </>
        )}
      </div>
    </article>
  )
}
