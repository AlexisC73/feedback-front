import { createReducer } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { Feedback } from "./models/feedback"
import { getFeedbacksThunk, GetFeedbacksThunkResultType } from "./usecases/get-feedbacks.usecase"

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
  })
})

export const getAuthSelector = (state: RootState) => state.auth