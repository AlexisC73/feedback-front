import { Link, useParams } from "react-router-dom";
import { GoBackButton } from "../components/BoBackButton/GoBackButton";
import { Button } from "../components/Button/button";
import { FeedbackCard } from "../components/FeedbackCard/FeedbackCard";
import { feedbacks } from "../feedback";
import Layout from "../Layout";
import { PostCommentForm } from "../components/form/post-comment-form/PostCommentForm";
import { CommentList } from "../components/CommentList/CommentList";
import { Comment } from "../components/Comment/Comment";


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
        <FeedbackCard {...feedback} />
        <CommentList>
          <Comment />
        </CommentList>
        <PostCommentForm />
      </div>
    </Layout.emptyLayout>
  )
}
