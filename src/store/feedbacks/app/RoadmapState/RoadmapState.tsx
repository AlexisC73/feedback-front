import { RoadmapStatusList } from "@/components/Roadmap/RoadmapStatusList/RoadmapStatusList";
import { useAppSelector } from "@/store/store-hooks";
import { selectFeedbacks } from "../../feedback.reducer";
import { FeedbackStatus } from "../../models/feedback";

export function RoadmapState () {
  const {data: feedbacks} = useAppSelector(selectFeedbacks)
  const amountByStatus = feedbacks.reduce((acc, feedback) => {
    acc[feedback.status] = acc[feedback.status] + 1 || 1
    return acc
  }, {} as {[key in FeedbackStatus]: number})

  return (
    <RoadmapStatusList amountByStatus={amountByStatus} />
  )
}