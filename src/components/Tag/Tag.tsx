import { FeedbackCategory } from "@/store/feedbacks/models/feedback"

export type TagTitle = FeedbackCategory | "All"

export function Tag ({title, active, hoverable}: {title: TagTitle, active: boolean, hoverable?: boolean}) {
  const filtersStyle: {[key in TagTitle]: string} = {
    All: "px-4",
    UI: "pl-4 pr-4.75",
    UX: "pl-4 pr-3.5",
    Enhancement: "px-4",
    Bug: "px-4",
    Feature: "pl-4 pr-4.25",
  }

  const activeStyle = "bg-#4661E6 text-white"
  const unactiveStyle = "bg-#F2F4FF text-#4661E6"

  return (
    <p className={`h-7.5 flex items-center rounded-2.5 font-semibold text-3.25 line-height-4.75 ${hoverable ? "hover:bg-#CFD7FF cursor-pointer" : ""} ${filtersStyle[title]} ${active ? activeStyle : unactiveStyle}`}>{title}</p>
  )
}