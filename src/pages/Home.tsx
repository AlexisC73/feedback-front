import { Layout } from "../Layout/layout";
import { EmptyFeedback } from "../components/EmptyFeedback/EmptyFeedback";
import { Suggestions } from "../components/Suggestions/Suggestions";

export function HomePage () {
  return (
    <Layout>
      <div className="md:px-10 lg:px-0">
        <Suggestions />
      </div>
      <div className="px-6 py-8 md:px-10 md:py-6 lg:px-0">
        <EmptyFeedback />
      </div>
    </Layout>
  )
}
