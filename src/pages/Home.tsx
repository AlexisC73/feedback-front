import { Layout } from "../Layout/layout";
import { Suggestions } from "../components/Suggestions/Suggestions";

export function HomePage () {
  return (
    <Layout>
      <div className="md:px-10 lg:px-0">
        <Suggestions />
      </div>
      
    </Layout>
  )
}
