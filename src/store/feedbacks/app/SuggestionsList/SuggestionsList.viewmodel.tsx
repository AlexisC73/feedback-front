import { selectSuggestionFeedbacks } from "../../feedback.reducer"
import { FeedbackCardProps } from "@/components/FeedbackCard/FeedbackCard"
import { createSelector } from "@reduxjs/toolkit"
import { Feedback } from "../../models/feedback"

export const createSuggestionsListViewmodel = createSelector([selectSuggestionFeedbacks], (feedbacks) => {
    const feedbackListElement: FeedbackCardProps[] = mapFeedbackToFeedbackCardProps(feedbacks)
    return {
      feedbackListElement,
      suggestionCount: feedbacks.length
    }
  })

const mapFeedbackToFeedbackCardProps = (feedbacks: Feedback[]): FeedbackCardProps[] => {
  return feedbacks.map(f => ({
    title: f.title,
    description: f.description,
    id: f.id,
    comments: f.comments,
    upvotes: f.upvotes,
    category: f.category,
    upvoted: f.upvoted
  }))
}