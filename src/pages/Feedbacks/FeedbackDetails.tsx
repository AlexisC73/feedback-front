import { Link, useParams } from "react-router-dom";
import { GoBackButton } from "@/components/ui/BoBackButton/GoBackButton";
import { Button } from "@/components/ui/Button/button";
import { comment } from "@/feedback";
import Layout from "@/Layout";
import { PostCommentForm } from "@/components/form/post-comment-form/PostCommentForm";
import { CommentList } from "@/components/Comment/CommentList/CommentList";
import { CommentItem } from "@/components/Comment/CommentItem/CommentItem";
import { FeedbackCardComponent } from "@/store/feedbacks/app/FeedbackCard/FeedbackCard";


export function FeedbackDetailsPage () {
  const params = useParams<{id: string}>()

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
        <FeedbackCardComponent feedbackId={params.id!} />
        <CommentList>
            <CommentItem {...comment} />
        </CommentList>
        <PostCommentForm />
      </div>
    </Layout.emptyLayout>
  )
}
