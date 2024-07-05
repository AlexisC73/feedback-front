import { createReducer } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { Feedback, FeedbackStatus } from "./models/feedback"
import { getFeedbacksThunk, GetFeedbacksThunkResultType } from "./usecases/get-feedbacks.usecase"
import { addFeedbackThunk, AddFeedbackThunkResultType } from "./usecases/add-feedback.usecase"

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
    if(action.payload.type === GetFeedbacksThunkResultType.SUCCESS) {
      state.data = action.payload.data
    }
    state.loading = false
  }).addCase(getFeedbacksThunk.rejected, state => {
    state.loading = false
  }).addCase(addFeedbackThunk.fulfilled, (state, action) => {
    if(action.payload.type === AddFeedbackThunkResultType.SUCCESS) {
      state.data = [...state.data, action.payload.feedback]
    }
    state.loading = false
  }).addCase(addFeedbackThunk.rejected, (state) => {
    state.loading = false
  })
})

export const selectSuggestionFeedbacks = (state: RootState) => state.feedback.data.filter(f => f.status === FeedbackStatus.SUGGESTION)
export const selectFeedbacks = (state: RootState) => state.feedback
export const selectFeedback = (id: string) => (state: RootState) => state.feedback.data.find(f => f.id === id)