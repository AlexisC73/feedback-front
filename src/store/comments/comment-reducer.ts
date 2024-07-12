import { createReducer, createSelector } from "@reduxjs/toolkit"
import { postCommentThunk } from "./usecases/post-comment.usecase"
import { UsecaseResultType } from "../@shared/models/resultType"
import { Comment } from "./models/comment"
import { getCommentsForFeedbackThunk } from "./usecases/get-comments.usecase"
import { RootState } from "../store"
import { deleteFeedbackThunk } from "../feedbacks/usecases/delete-feedback.usecase"

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
  }).addCase(getCommentsForFeedbackThunk.fulfilled, (state, action) => {
    if(action.payload?.type === UsecaseResultType.SUCCESS) {
      const idsInState = state.comments.map(c => c.id)
      if(!action.payload?.data) {
        return
      }
      const [alreadyIn, notAlreadyIn] = action.payload.data.reduce((result: [Comment[], Comment[]], element) => {
        if(idsInState.includes(element.id)) {
          result[0].push(element)
        } else {
          result[1].push(element)
        }
        return result
      }, [[], []])
      state.comments = state.comments.map(c => alreadyIn.find(a => a.id === c.id) || c).concat(notAlreadyIn)
    }
  }).addCase(deleteFeedbackThunk.fulfilled, (state, action) => {
    if(action.payload?.type === UsecaseResultType.SUCCESS) {
      const deletedFeedback = action.payload.data
      state.comments = state.comments.filter(c => c.feedbackId !== deletedFeedback.feedbackId)
    }
  })
})

export const selectComments = (state: RootState) => state.comments
export const selectCommentsForFeedback = (feedbackId: string) => createSelector([selectComments], (comments) => comments.comments.filter(c => c.feedbackId === feedbackId))