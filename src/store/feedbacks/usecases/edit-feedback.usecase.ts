import { createAppAsyncThunk } from "@/store/create-app-thunk";
import { FieldError } from "@/store/errors/fields-error";
import { FeedbackCategory, FeedbackStatus } from "../models/feedback";
import { EditFeedbackPayload } from "./payload/edit-feedback.payload";

export const editFeedbackThunk = createAppAsyncThunk.withTypes<{rejectValue: EditFeedbackThunkResult}>()("feedbacks/editFeedback", async (feedback: EditFeedbackUsecaseParams, {rejectWithValue, extra: {feedbackRepository}}) => {
  const editFeedbackPayload = new EditFeedbackPayload({
    id: feedback.id,
    title: feedback.title,
    category: feedback.category,
    description: feedback.description,
    status: feedback.status
  })

  if(!editFeedbackPayload.validate()) {
    const result: EditFeedbackThunkResult = {type: EditFeedbackThunkResultType.FIELDS_ERROR, errors: editFeedbackPayload.errors}
    return rejectWithValue(result)
  }

  try {
    await feedbackRepository.editFeedback({ feedback: editFeedbackPayload.data })
    const result: EditFeedbackThunkResult = {type: EditFeedbackThunkResultType.SUCCESS, editedFeedback: editFeedbackPayload.data}
    return result
  } catch(e) {
    return rejectWithValue({type: EditFeedbackThunkResultType.UNKNONW_ERROR})
  }
})

export type EditFeedbackThunkResult = {
  type: EditFeedbackThunkResultType.SUCCESS,
  editedFeedback: EditFeedbackPayload["data"]
} | {
  type: EditFeedbackThunkResultType.UNKNONW_ERROR
} | {
  type: EditFeedbackThunkResultType.CREDENTIAL_ERROR
} | {
  type: EditFeedbackThunkResultType.FIELDS_ERROR,
  errors: FieldError[]
}

export enum EditFeedbackThunkResultType {
  SUCCESS = "SUCCESS",
  UNKNONW_ERROR = "UNKNOWN_ERROR",
  CREDENTIAL_ERROR = "CREDENTIAL_ERROR",
  FIELDS_ERROR = "FIELDS_ERROR"
}

export interface EditFeedbackUsecaseParams {
  id: string,
  title: string,
  category: FeedbackCategory,
  description: string,
  status: FeedbackStatus
}