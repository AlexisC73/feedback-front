import { Link, useSearchParams } from "react-router-dom";
import { GoBackButton } from "@/components/ui/BoBackButton/GoBackButton";
import Layout from "@/Layout";
import { AddSuggestionForm } from "@/store/feedbacks/app/AddSuggestionForm/AddSuggestionForm";

export function AddFeedbackPage () {
  const searchParams = useSearchParams()[0]
  const backRoute = searchParams.get('back') ?? ""

  return (
    <Layout.emptyLayout>
      <div className="px-6 py-8.5 w-full flex flex-col gap-y-13.75 items-start md:max-w-135 md:mx-auto md:px-0 md:my-auto">
        <div>
          <Link to={`/${backRoute}`} ><GoBackButton /></Link>
        </div>
        <AddSuggestionForm />
      </div>
    </Layout.emptyLayout>
  )
}
