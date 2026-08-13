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
    <article className="relative h-full shrink-0 px-3 pt-2 md:px-4" style={{ width }}>
      <div className="relative h-full pt-9">
        <div className="absolute top-0 left-7 z-10 flex h-[4.35rem] w-[4.85rem] items-center justify-center bg-white">
          <Icon className="size-[3.6rem]" paintId={paintId} />
        </div>
        <div
          className={clsx(
            "flex h-full flex-col rounded-[1.35rem] border-2 bg-white px-6 pt-16 pb-7 md:px-7",
            borderToneClass[item.tone],
          )}
        >
          <h3 className="font-heading text-[1.15rem] leading-tight font-bold text-heading md:text-[1.3rem]">
            {item.title}
          </h3>
          <p className="mt-3 text-[0.92rem] leading-relaxed text-heading md:text-[0.98rem]">{item.description}</p>
        </div>
      </div>
    </article>
  )
}
