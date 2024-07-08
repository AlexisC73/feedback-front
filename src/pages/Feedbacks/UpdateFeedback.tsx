import { Link, Navigate, useParams } from "react-router-dom";
import { GoBackButton } from "@/components/ui/BoBackButton/GoBackButton";
import Layout from "@/Layout";
import { EditFeedbackFormComponent } from "@/store/feedbacks/app/EditFeedbackForm/EditFeedbackForm";

export function UpdateFeedbackPage () {
  const params = useParams<{id: string}>()
  
  if(!params.id) {
    return <Navigate to="/feedbacks" />
  }

  return (
    <Layout.emptyLayout>
      <div className="px-6 py-8.5 w-full flex flex-col gap-y-13.75 items-start md:max-w-135 md:mx-auto md:px-0 md:py-14">
        <div>
          <Link to={`/feedbacks/${params.id}`} ><GoBackButton /></Link>
        </div>
        <EditFeedbackFormComponent />
      </div>
    </Layout.emptyLayout>
  )
}
