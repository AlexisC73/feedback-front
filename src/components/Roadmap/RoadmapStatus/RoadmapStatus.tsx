import { RoadmapStatusCircle } from "@/components/Roadmap/RoadmapStatusCircle/RoadmapStatusCircle"
import { FeedbackStatus } from "@/store/feedbacks/models/feedback"
import { useTranslation } from "react-i18next"

export function RoadmapStatusItem({status, amount}: {status: FeedbackStatus, amount: number}) {
  const {t} = useTranslation()

  return <li className="flex items-center w-full gap-x-4 text-#647196">
    <RoadmapStatusCircle status={status} />
    <p className="flex-1 line-height-5.75">{t(`status.${status}`)}</p>
    <span className="font-bold">{amount}</span>
  </li>
}