import clsx from "clsx"
import { CertificateIcon, ModesIcon, PuzzleIcon, SpeechBubblesIcon } from "./icons"
import type { WhyStudyIconName, WhyStudyItem } from "./items"

type WhyStudyCardProps = {
  item: WhyStudyItem
  width: number
  paintId: string
}

const borderToneClass: Record<WhyStudyItem["tone"], string> = {
  success: "border-success",
  info: "border-info",
  heading: "border-program-heading",
  secondary: "border-secondary",
}

const iconByName: Record<WhyStudyIconName, typeof SpeechBubblesIcon> = {
  speech: SpeechBubblesIcon,
  certificate: CertificateIcon,
  puzzle: PuzzleIcon,
  modes: ModesIcon,
}

export const WhyStudyCard = ({ item, width, paintId }: WhyStudyCardProps) => {
  const Icon = iconByName[item.icon]

  return (
    <article className="relative h-full shrink-0 px-2 pt-2 sm:px-3 md:px-4" style={{ width }}>
      <div className="relative h-full pt-8 sm:pt-9">
        <div className="absolute top-0 left-5 z-10 flex h-14 w-16 items-center justify-center bg-white sm:left-7 sm:h-[4.35rem] sm:w-[4.85rem]">
          <Icon className="size-12 sm:size-[3.6rem]" paintId={paintId} />
        </div>
        <div
          className={clsx(
            "flex h-full flex-col overflow-hidden rounded-[1.15rem] border-2 bg-white px-4 pt-12 pb-5 sm:rounded-[1.35rem] sm:px-6 sm:pt-16 sm:pb-7 md:px-7",
            borderToneClass[item.tone],
          )}
        >
          <h3 className="font-heading text-[1.05rem] leading-tight font-bold text-heading sm:text-[1.15rem] md:text-[1.3rem]">
            {item.title}
          </h3>
          <p className="mt-2 text-[0.85rem] leading-relaxed text-heading sm:mt-3 sm:text-[0.92rem] md:text-[0.98rem]">{item.description}</p>
        </div>
      </div>
    </article>
  )
}
