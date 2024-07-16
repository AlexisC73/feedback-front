import { FeedbackCategory } from "@/store/feedbacks/models/feedback"
import { Tag } from "../ui/Tag/Tag"
import { TagType } from "@/Context/TagFilter/TagFilterType"

export function TagFilter ({ activeFilter, setActiveFilter }: {activeFilter: TagType, setActiveFilter: (filter: TagType) => void}) {
  return (
    <ul id="filter" className="flex flex-wrap pt-6 pl-6 pr-4.5 pb-9 bg-white rounded-2.5 md:w-55.75 h-44.5 xl:w-63.75 xl:h-41.5 gap-y-3.5 gap-x-2">
      <li className="cursor-pointer" onClick={() => setActiveFilter("all")}><Tag title={"all"} active={activeFilter === "all"} /></li>
      {Object.values(FeedbackCategory).map(c => (
        <li className="cursor-pointer" onClick={() => setActiveFilter(c)}><Tag title={c} active={activeFilter === c} /></li>
      ))}
    </ul>
  )
}