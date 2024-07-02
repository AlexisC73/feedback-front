import { FeedbackCard } from "../FeedbackCard/FeedbackCard"
import { feedbacks } from "../../feedback"
import { Link } from "react-router-dom"

export function FeedbackList () {
  return (
    <ul className="px-6 py-8 md:px-0 flex flex-col gap-y-4">
        {feedbacks.map((feedback) => (<Link to={`/feedbacks/${feedback.id}`} key={feedback.title}><FeedbackCard {...feedback} /></Link>))}
      </ul>
  )
}