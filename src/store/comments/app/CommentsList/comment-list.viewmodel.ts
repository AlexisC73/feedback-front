import { createSelector } from "@reduxjs/toolkit"
import { selectCommentsForFeedback } from "../../comment-reducer"
import { CommentItemProps } from "@/components/Comment/CommentItem/CommentItem"
import { Comment } from "../../models/comment"

export const createCommentListViewmodel = (feedbackId: string) => createSelector([selectCommentsForFeedback(feedbackId)], (comments) => {
  return mapCommentsToCommentItemProps(comments)
})

function mapCommentsToCommentItemProps (comments: Comment[]): Array<CommentItemProps & {id: string}> {
  return comments.map((c) => ({
    id: c.id,
    comment: c.content,
    fullName: c.sender.name,
    imageUrl: c.sender.avatar,
    username: c.sender.name
  }))
}