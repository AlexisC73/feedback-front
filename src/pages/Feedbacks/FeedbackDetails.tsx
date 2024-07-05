import { Link, useParams } from "react-router-dom";
import { GoBackButton } from "@/components/BoBackButton/GoBackButton";
import { Button } from "@/components/Button/button";
import { comments, feedbacks } from "@/feedback";
import Layout from "@/Layout";
import { PostCommentForm } from "@/components/form/post-comment-form/PostCommentForm";
import { CommentList } from "@/components/CommentList/CommentList";
import { Comment } from "@/components/Comment/Comment";
import { Separator } from "@/components/Separator/Separator";
import { FeedbackCardComponent } from "@/store/feedbacks/app/FeedbackCard/FeedbackCard";


export function FeedbackDetailsPage () {
  const params = useParams<{id: string}>()
  const feedback = feedbacks.find(f => f.id === params.id)

  if(!feedback) return (<div>Not found</div>)

  return (
    <Layout.emptyLayout>
      <div className="flex flex-col gap-y-6 p-6 md:px-10 lg:max-w-182.5 lg:px-0 lg:mx-auto">
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
          {comments.map((comment, index) => (<>
            {index > 0 && <Separator />}
            <Comment {...comment} />
          </>))}
        </CommentList>
        <PostCommentForm />
      </div>
    </Layout.emptyLayout>
  )
}
