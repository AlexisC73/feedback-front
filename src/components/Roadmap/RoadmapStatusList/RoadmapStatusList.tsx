import { Link } from "react-router-dom";
import { RoadmapStatusItem } from "@/components/Roadmap/RoadmapStatus/RoadmapStatus";
import { FeedbackStatus } from "@/store/feedbacks/models/feedback";

type RoadmapStatusListProps = {
  amountByStatus?: {[key in FeedbackStatus]: number}
}

export function RoadmapStatusList ({ amountByStatus }: RoadmapStatusListProps) {
  return (
    <div className="p-6 bg-white rounded-2.5 flex flex-col gap-y-6 md:w-55.75 h-44.5 lg:w-63.75">
      <div className="flex justify-between items-center">
        <p className="line-height-6.5 text-4.5 text-#3A4374 font-bold -tracking-0.25px">Roadmap</p>
        <Link to="/roadmap" className="text-3.25 text-#4661E6 underline font-semibold">View</Link>
      </div>
      <ul>
        <RoadmapStatusItem status={FeedbackStatus.PLANNED} amount={amountByStatus?.Planned ?? 0} />
        <RoadmapStatusItem status={FeedbackStatus.IN_PROGRESS} amount={amountByStatus?.In_Progress ?? 0} />
        <RoadmapStatusItem status={FeedbackStatus.LIVE} amount={amountByStatus?.Live ?? 0} />
      </ul>
    </div>
  )
}