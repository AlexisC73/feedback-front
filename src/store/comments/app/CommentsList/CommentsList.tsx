import { CommentList } from "@/components/Comment/CommentList/CommentList";
import { useAppSelector } from "@/store/store-hooks";
import { createCommentListViewmodel } from "./comment-list.viewmodel";
import { CommentItem } from "@/components/Comment/CommentItem/CommentItem";

export function CommentsListStore ({feedbackId}: {feedbackId: string}) {
  const comments = useAppSelector(createCommentListViewmodel(feedbackId))
  return (
    <CommentList>
      {comments.map((comment) => <CommentItem key={comment.id} {...comment} />)}
    </CommentList>
  )
}