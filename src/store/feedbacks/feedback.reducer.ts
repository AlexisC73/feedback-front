import { createReducer, createSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { Feedback, FeedbackStatus } from "./models/feedback"
import { getFeedbacksThunk } from "./usecases/get-feedbacks.usecase"
import { addFeedbackThunk } from "./usecases/add-feedback.usecase"
import { editFeedbackThunk } from "./usecases/edit-feedback.usecase"
import { UsecaseResultType } from "../@shared/models/resultType"
import { upvoteFeedbackThunk } from "./usecases/upvote-feedback.usecase"
import { deleteFeedbackThunk } from "./usecases/delete-feedback.usecase"
import { postCommentThunk } from "../comments/usecases/post-comment.usecase"

export interface FeedbackState {
  data: Feedback[]
  loading: boolean
}

const initialState: FeedbackState = {
  data: [],
  loading: false
}

export const feedbackReducer = createReducer(initialState, builder => {
  builder.addCase(getFeedbacksThunk.pending, state => {
    state.loading = true
  }).addCase(getFeedbacksThunk.fulfilled, (state, action) => {
    if(action.payload?.type === UsecaseResultType.SUCCESS) {
      state.data = action.payload.data
    }
    state.loading = false
  }).addCase(getFeedbacksThunk.rejected, state => {
    state.loading = false
  }).addCase(addFeedbackThunk.fulfilled, (state, action) => {
    if(action.payload.type === UsecaseResultType.SUCCESS) {
      state.data = [...state.data, action.payload.data]
    }
    state.loading = false
  }).addCase(addFeedbackThunk.rejected, (state) => {
    state.loading = false
  }).addCase(editFeedbackThunk.pending, state => {
    state.loading = true
  }).addCase(editFeedbackThunk.fulfilled, (state, action) => {
    if(action.payload?.type === UsecaseResultType.SUCCESS) {
      const editedFeedback = action.payload.data
      state.data = state.data.map(f => f.id === editedFeedback.id ? {...f, ...editedFeedback} : f)
    }
    state.loading = false
  }).addCase(editFeedbackThunk.rejected, (state) => {
    state.loading = false
  }).addCase(upvoteFeedbackThunk.fulfilled, (state, action) => {
    if(action.payload?.type === UsecaseResultType.SUCCESS) {
      const upvotedFeedback = action.payload.data
      state.data = state.data.map(f => f.id === upvotedFeedback.feedbackId ? {...f, upvoted: upvotedFeedback.upvote, upvotes: f.upvotes + (upvotedFeedback.upvote ? 1 : -1)} : f)
    }
  }).addCase(deleteFeedbackThunk.fulfilled, (state, action) => {
    if(action.payload?.type === UsecaseResultType.SUCCESS) {
      const deletedFeedback = action.payload.data
      state.data = state.data.filter(f => f.id !== deletedFeedback.feedbackId)
    }
  }).addCase(postCommentThunk.fulfilled, (state, action) => {
    if(action.payload.type === UsecaseResultType.SUCCESS) {
      state.data = state.data.map(f => f.id === action.payload.data.feedbackId ? {...f, comments: f.comments + 1} : f)
    }
  })
})

export const selectFeedbacks = (state: RootState) => state.feedback
export const selectFeedback = (id: string) => createSelector([selectFeedbacks], (feedbacks) => feedbacks.data.find(f => f.id === id))
export const selectSuggestionFeedbacks = createSelector([selectFeedbacks], (feedbacks) => feedbacks.data.filter(f => f.status === FeedbackStatus.SUGGESTION))