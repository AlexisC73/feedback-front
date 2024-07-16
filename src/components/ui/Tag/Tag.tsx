import { TagType } from "@/Context/TagFilter/TagFilterType"

export function Tag ({title, active = false, hoverable}: {title: TagType, active?: boolean, hoverable?: boolean}) {
  const activeStyle = "bg-#4661E6 text-white"
  const unactiveStyle = "bg-#F2F4FF text-#4661E6"

  return (
    <p className={`h-7.5 flex items-center rounded-2.5 font-semibold px-4 text-3.25 line-height-4.75 ${hoverable ? "hover:bg-#CFD7FF cursor-pointer" : ""} ${active ? activeStyle : unactiveStyle}`}>{title}</p>
  )
}