import { createReducer, createSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { Feedback, FeedbackStatus } from "./models/feedback"
import { getFeedbacksThunk } from "./usecases/get-feedbacks.usecase"
import { addFeedbackThunk } from "./usecases/add-feedback.usecase"
import { editFeedbackThunk } from "./usecases/edit-feedback.usecase"
import { UsecaseResultType } from "../@shared/models/resultType"

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
  })
})

export const selectFeedbacks = (state: RootState) => state.feedback
export const selectFeedback = (id: string) => createSelector([selectFeedbacks], (feedbacks) => feedbacks.data.find(f => f.id === id))
export const selectSuggestionFeedbacks = createSelector([selectFeedbacks], (feedbacks) => feedbacks.data.filter(f => f.status === FeedbackStatus.SUGGESTION))