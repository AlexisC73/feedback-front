import { createAppAsyncThunk } from "@/store/create-app-thunk";
import { Feedback } from "../models/feedback";

export const getFeedbacksThunk = createAppAsyncThunk("feedbacks/getFeedbacks", async (_, {extra: { feedbackRepository }, rejectWithValue}) => {
  try {
    const feedbacks = await feedbackRepository.getFeedbacks()
    const result: GetFeedbacksThunkResult = {type: GetFeedbacksThunkResultType.SUCCESS, data: feedbacks}
    return result
  } catch(e) {
    return rejectWithValue({type: GetFeedbacksThunkResultType.UNKNONW_ERROR} as GetFeedbacksThunkResult)
  }
})

export enum GetFeedbacksThunkResultType {
  SUCCESS = "SUCCESS",
  UNKNONW_ERROR = "UNKNOWN_ERROR"
}

export type GetFeedbacksThunkResult = {
  type: GetFeedbacksThunkResultType.SUCCESS
  data: Feedback[]
} | {
  type: GetFeedbacksThunkResultType.UNKNONW_ERROR
}