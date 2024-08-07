import { FeedbackCard, FeedbackCardProps } from "@/components/Feedback/FeedbackCard/FeedbackCard"
import { Link } from "react-router-dom"

interface FeedbackListProps {
  feedbacks: FeedbackCardProps[]
}

export function FeedbackList ({feedbacks}: FeedbackListProps) {
  return (
    <ul className="flex flex-col gap-y-4">
      {feedbacks.map((feedback) => (<Link to={`/feedbacks/${feedback.id}`} key={feedback.id}><FeedbackCard {...feedback} /></Link>))}
    </ul>
  )
}