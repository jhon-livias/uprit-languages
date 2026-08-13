import clsx from "clsx"
import type { ScheduleField } from "./fields"

type ScheduleSelectProps = {
  field: ScheduleField
}

const ChevronDownIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export const ScheduleSelect = ({ field }: ScheduleSelectProps) => {
  const { id, name, label, tone, options } = field

  return (
    <div className="relative min-w-0 flex-1">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        name={name}
        required
        defaultValue=""
        className={clsx(
          "h-12 w-full cursor-pointer appearance-none truncate rounded-sm border-0 px-4 pr-10 font-heading text-[0.72rem] font-semibold tracking-[0.08em] text-heading uppercase",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta",
          tone === "solid" ? "bg-white" : "bg-white/40",
        )}
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-heading" />
    </div>
  )
}
