import { Link, Navigate, useParams } from "react-router-dom";
import { GoBackButton } from "@/components/ui/BoBackButton/GoBackButton";
import Layout from "@/Layout";
import { EditFeedbackFormComponent } from "@/store/feedbacks/app/EditFeedbackForm/EditFeedbackForm";
import { useAppSelector } from "@/store/store-hooks";
import { selectAuth } from "@/store/auth/auth-reducer";
import { selectFeedback } from "@/store/feedbacks/feedback.reducer";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export function UpdateFeedbackPage () {
  const params = useParams<{id: string}>()
  const feedback = useAppSelector(selectFeedback(params.id!))
  const auth = useAppSelector(selectAuth)
  const {t} = useTranslation()

  const canEdit = feedback?.owner === auth.account?.id

  if(!feedback || !auth.account || !canEdit) {
    return <Navigate to={`/`} />
  }

  return (
    <>
      <Helmet>
        <title>{t("pages.edit_title")}</title>
      </Helmet>
      <Layout.emptyLayout>
        <div className="px-6 py-8.5 w-full flex flex-col gap-y-13.75 items-start md:max-w-135 md:mx-auto md:px-0 md:py-14">
          <div>
            <Link to={`/feedbacks/${params.id}`} ><GoBackButton /></Link>
          </div>
          <EditFeedbackFormComponent />
        </div>
      </Layout.emptyLayout>
    </>
  )
}
