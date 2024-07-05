import { FeedbackList } from "@/components/FeedbackList/FeedbackList";
import { useAppSelector } from "@/store/store-hooks";
import { createSuggestionsListViewmodel } from "./SuggestionsList.viewmodel";
import { Suggestions } from "@/components/Suggestions/Suggestions";

export function SuggestionFeedbackList () {
  const { feedbackListElement, suggestionCount } = useAppSelector(createSuggestionsListViewmodel())
  return (
    <>
      <div className="md:px-10 lg:px-0">
        <Suggestions suggestionCount={suggestionCount} />
      </div>
      <div className="px-6 py-8 md:px-10 md:py-6 lg:px-0">
        <FeedbackList feedbacks={feedbackListElement} />
      </div>
    </>
  )
}