import { createSelector } from "@reduxjs/toolkit"
import { selectCommentsForFeedback } from "../../comment-reducer"
import { CommentItemProps } from "@/components/Comment/CommentItem/CommentItem"
import { Comment } from "../../models/comment"

export const createCommentListViewmodel = (feedbackId: string) => createSelector([selectCommentsForFeedback(feedbackId)], (comments) => mapCommentsToCommentItemProps(comments))

const mapCommentsToCommentItemProps = createSelector([(comments: Comment[]) => comments], (comments) => comments.map((c): CommentItemProps & {id: string}  => ({
  id: c.id,
  comment: c.content,
  fullName: c.sender.displayName,
  imageUrl: c.sender.avatar,
  username: c.sender.username
})))