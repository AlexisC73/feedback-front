import { Link } from "react-router-dom";
import { GoBackButton } from "../components/BoBackButton/GoBackButton";
import Layout from "../Layout";

export function AddFeedbackPage () {
  return (
    <Layout.emptyLayout>
      <div className="px-6 py-8 flex">
        <Link to="/" ><GoBackButton /></Link>
      </div>
    </Layout.emptyLayout>
  )
}
