import { RoadmapStatusCircle } from "@/components/Roadmap/RoadmapStatusCircle/RoadmapStatusCircle"
import { FeedbackStatus } from "@/store/feedbacks/models/feedback"

export function RoadmapStatusItem({status, amount}: {status: FeedbackStatus, amount: number}) {

  return <li className="flex items-center w-full gap-x-4 text-#647196">
    <RoadmapStatusCircle status={status} />
    <p className="flex-1 line-height-5.75">{status}</p>
    <span className="font-bold">{amount}</span>
  </li>
}