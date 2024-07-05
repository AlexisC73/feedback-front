import { FeedbackCardProps } from "@/components/FeedbackCard/FeedbackCard"
import { Feedback } from "../../models/feedback"

export const createFeedbackCardViewModel = ({feedbackId, feedbacks}: {
  feedbackId: string,
  feedbacks: Feedback[]
}): FeedbackCardViewModelResult => {
  const feedback = feedbacks.find(f => f.id === feedbackId)
  if(!feedback) return {
    type: FeedbackCardViewModelReturnType.NOT_EXIST
  }
  return {
    type: FeedbackCardViewModelReturnType.SUCCESS,
    data: {
      category: feedback.category,
      description: feedback.description,
      id: feedback.id,
      title: feedback.title,
      upvotes: 3,
      status: feedback.status,
      comments: 8
    } as FeedbackCardProps
  }
}

export enum FeedbackCardViewModelReturnType {
  SUCCESS = "SUCCESS",
  NOT_EXIST = "NOT_EXIST"
}
export type FeedbackCardViewModelResult = {
  type: FeedbackCardViewModelReturnType
  data: FeedbackCardProps
} | {
  type: FeedbackCardViewModelReturnType.NOT_EXIST
}