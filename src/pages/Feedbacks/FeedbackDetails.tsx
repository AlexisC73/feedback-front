import { Link, Navigate, useParams } from "react-router-dom";
import { GoBackButton } from "@/components/ui/BoBackButton/GoBackButton";
import { Button } from "@/components/ui/Button/button";
import Layout from "@/Layout";
import { FeedbackCardComponent } from "@/store/feedbacks/app/FeedbackCard/FeedbackCard";
import { PostCommentComponent } from "@/store/comments/app/PostCommentComponent/PostCommentComponent";
import { CommentsListStore } from "@/store/comments/app/CommentsList/CommentsList";


export function FeedbackDetailsPage () {
  const params = useParams<{id: string}>()

  if(!params.id) {
    return <Navigate to="/feedbacks" />
  }

  return (
    <Layout.emptyLayout>
      <div className="flex flex-col gap-y-6 p-6 md:px-10 lg:max-w-182.5 lg:px-0 lg:mx-auto w-full">
        <div className="flex justify-between">
          <Link to="/"><GoBackButton /></Link>
          <button>
            <Link to={`/feedbacks/edit/${params.id}`}>
              <Button type="secondary">Edit Feedback</Button>
            </Link>
          </button>
        </div>
        <FeedbackCardComponent feedbackId={params.id} />
        <CommentsListStore feedbackId={params.id} />
        <PostCommentComponent feedbackId={params.id} />
      </div>
    </Layout.emptyLayout>
  )
}
