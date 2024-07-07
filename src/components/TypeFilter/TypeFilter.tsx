import { FeedbackCategory } from "@/store/feedbacks/models/feedback"
import { Tag, TagTitle } from "../ui/Tag/Tag"

export function TypeFilter ({ activeFilter, setActiveFilter }: {activeFilter: TagTitle, setActiveFilter: (filter: TagTitle) => void}) {
  return (
    <ul id="filter" className="flex flex-wrap pt-6 pl-6 pr-4.5 pb-9 bg-white rounded-2.5 md:w-55.75 h-44.5 lg:w-63.75 lg:h-41.5 gap-y-3.5">
      <li onClick={() => setActiveFilter("All")} className="mr-2 cursor-pointer"><Tag title={"All"} active={activeFilter === "All"} /></li>
      <li onClick={() => setActiveFilter(FeedbackCategory.UI)} className="mr-2 cursor-pointer"><Tag title={FeedbackCategory.UI} active={activeFilter === FeedbackCategory.UI} /></li>
      <li onClick={() => setActiveFilter(FeedbackCategory.UX)} className="cursor-pointer"><Tag title={FeedbackCategory.UX} active={activeFilter === FeedbackCategory.UX} /></li>
      <li onClick={() => setActiveFilter(FeedbackCategory.ENHANCEMENT)} className="mr-3.5 cursor-pointer"><Tag title={FeedbackCategory.ENHANCEMENT} active={activeFilter === FeedbackCategory.ENHANCEMENT} /></li>
      <li onClick={() => setActiveFilter(FeedbackCategory.BUG)} className="cursor-pointer"><Tag title={FeedbackCategory.BUG} active={activeFilter === FeedbackCategory.BUG} /></li>
      <li onClick={() => setActiveFilter(FeedbackCategory.FEATURE)} className="cursor-pointer"><Tag title={FeedbackCategory.FEATURE} active={activeFilter === FeedbackCategory.FEATURE} /></li>
    </ul>
  )
}