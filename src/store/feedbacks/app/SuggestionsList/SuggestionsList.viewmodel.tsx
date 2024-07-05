import { RootState } from "@/store/store"
import { selectSuggestionFeedbacks } from "../../feedback.reducer"
import { FeedbackCardProps } from "@/components/FeedbackCard/FeedbackCard"

export const createSuggestionsListViewmodel = () => (state: RootState) => {
  const suggestionFeedbacks = selectSuggestionFeedbacks(state)

  const feedbackListElement: FeedbackCardProps[] = suggestionFeedbacks.map(f => ({
      title: f.title,
      description: f.description,
      id: f.id,
      comments: f.comments,
      upvotes: f.upvotes,
      category: f.category
  }))

  return {
    feedbackListElement,
    suggestionCount: suggestionFeedbacks.length
  }
}