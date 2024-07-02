import Layout from "../Layout";
import { FeedbackList } from "../components/FeedbackList/FeedbackList";
import { Suggestions } from "../components/Suggestions/Suggestions";

export function HomePage () {
  return (
    <Layout.withHeader>
      <div className="md:px-10 lg:px-0">
        <Suggestions />
      </div>
      <div className="px-6 py-8 md:px-10 md:py-6 lg:px-0">
        <FeedbackList />
      </div>
    </Layout.withHeader>
  )
}
