import { createReducer } from "@reduxjs/toolkit"
import { postCommentThunk } from "./usecases/post-comment.usecase"
import { UsecaseResultType } from "../@shared/models/resultType"
import { Comment } from "./models/comment"

export interface CommentState {
  comments: Comment[]
  loading: boolean
}

const initialState: CommentState = {
  comments: [],
  loading: false
}

export const commentsReducer = createReducer(initialState, (builder) => {
  builder.addCase(postCommentThunk.fulfilled, (state, action) => {
    if(action.payload.type === UsecaseResultType.SUCCESS) {
      state.comments.push(action.payload.data)
    }
  })
})
