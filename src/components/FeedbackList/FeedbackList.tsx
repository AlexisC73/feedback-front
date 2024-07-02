import { FeedbackCard } from "../FeedbackCard/FeedbackCard"
import { feedbacks } from "../../feedback"

export function FeedbackList () {
  return (
    <ul className="px-6 py-8 md:px-0 flex flex-col gap-y-4">
        {feedbacks.map((feedback) => (<li><FeedbackCard {...feedback} /></li>))}
      </ul>
  )
}