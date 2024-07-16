import { Link, Navigate, useParams } from "react-router-dom";
import { GoBackButton } from "@/components/ui/BoBackButton/GoBackButton";
import { Button } from "@/components/ui/Button/button";
import Layout from "@/Layout";
import { FeedbackCardComponent } from "@/store/feedbacks/app/FeedbackCard/FeedbackCard";
import { PostCommentComponent } from "@/store/comments/app/PostCommentComponent/PostCommentComponent";
import { CommentsListStore } from "@/store/comments/app/CommentsList/CommentsList";
import { useAppSelector } from "@/store/store-hooks";
import { selectFeedback } from "@/store/feedbacks/feedback.reducer";
import { selectAuth } from "@/store/auth/auth-reducer";

export function FeedbackDetailsPage () {
  const params = useParams<{id: string}>()
  const feedback = useAppSelector(selectFeedback(params.id!))
  const auth = useAppSelector(selectAuth)

  const canEdit = feedback?.owner === auth.account?.id

  if(!params.id || !feedback) {
    return <Navigate to="/feedbacks" />
  }

  return (
    <Layout.emptyLayout>
      <div className="flex flex-col gap-y-6 p-6 md:px-10 xl:max-w-182.5 xl:px-0 xl:mx-auto w-full">
        <div className="flex justify-between h-15 items-center">
          <Link to="/"><GoBackButton /></Link>
          {canEdit && <button>
            <Link to={`/feedbacks/edit/${params.id}`}>
              <Button type="secondary">Edit Feedback</Button>
            </Link>
          </button>}
        </div>
        <FeedbackCardComponent feedbackId={params.id} />
        <CommentsListStore feedbackId={params.id} />
        <PostCommentComponent feedbackId={params.id} />
      </div>
    </Layout.emptyLayout>
  )
}
