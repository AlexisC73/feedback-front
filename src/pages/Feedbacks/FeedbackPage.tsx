import Layout from "@/Layout";
import { FeedbackList } from "@/components/FeedbackList/FeedbackList";
import { Suggestions } from "@/components/Suggestions/Suggestions";
import { createSuggestionsListViewmodel } from "@/store/feedbacks/app/SuggestionsList/SuggestionsList.viewmodel";
import { useAppSelector } from "@/store/store-hooks";

export function FeedbackPage () {
  const { feedbackListElement, suggestionCount } = useAppSelector(createSuggestionsListViewmodel())

  return (
    <Layout.withHeader>
      <div className="md:px-10 lg:px-0">
        <Suggestions suggestionCount={suggestionCount} />
      </div>
      <div className="px-6 py-8 md:px-10 md:py-6 lg:px-0">
        <FeedbackList feedbacks={feedbackListElement} />
      </div>
    </Layout.withHeader>
  )
}
