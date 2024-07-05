import Layout from "@/Layout";
import { SuggestionFeedbackList } from "@/store/feedbacks/app/SuggestionsList/SuggestionListComponent";

export function FeedbackPage () {

  return (
    <Layout.withHeader>
        <SuggestionFeedbackList />
    </Layout.withHeader>
  )
}
