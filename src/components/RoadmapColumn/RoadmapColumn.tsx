import { RoadmapColumnList } from "./RoadmapColumnList/RoadmapColumnList";
import { RoadmapCard } from "./RoadmapCard/RoadmapCard";
import { RoadmapColumnTitle } from "./RoadmapColumnTitle/RoadmapColumnTitle";
import { Feedback, FeedbackStatus } from "@/store/feedbacks/models/feedback";
import { useTranslation } from "react-i18next";

interface RoadmapColumnProps {
  status: FeedbackStatus
  feedbacks: Feedback[]
  description: string
}

export function RoadmapColumn ({ status, feedbacks, description }: RoadmapColumnProps) {
  const {t} = useTranslation()
  const displayedFeedbacks = feedbacks.filter(f => f.status === status)

  return (
    <div id="feedbacks-list" className="p-6 md:p-0 flex flex-col gap-y-6 w-full">
      <RoadmapColumnTitle title={t(`status.${status}`)} amount={displayedFeedbacks.length} description={description} />
      <RoadmapColumnList>
        {displayedFeedbacks.map(f => (<RoadmapCard key={f.id} feedback={f} />))}
      </RoadmapColumnList>
    </div>
  )
}