import { createAppAsyncThunk } from "@/store/create-app-thunk";
import { FeedbackCategory, FeedbackStatus } from "../models/feedback";
import { EditFeedbackPayload } from "./payload/edit-feedback.payload";
import { ApiResultType, UsecaseCredentialError, UsecaseFieldError, UsecaseNotFoundError, UsecaseResultType, UsecaseUnknownError } from "@/store/@shared/models/resultType";
import { exhaustiveGuard } from "@/store/@shared/utiles/exhaustive-guard";

export const editFeedbackThunk = createAppAsyncThunk.withTypes<{rejectValue: EditFeedbackThunkResult}>()("feedbacks/editFeedback", async (feedback: EditFeedbackUsecaseParams, {getState, rejectWithValue, extra: {feedbackRepository}}) => {
  const editFeedbackPayload = new EditFeedbackPayload({
    id: feedback.id,
    title: feedback.title,
    category: feedback.category,
    description: feedback.description,
    status: feedback.status
  })

  const feedbackToUpdate = getState().feedback.data.find(f => f.id === feedback.id)

  if(!editFeedbackPayload.validate()) {
    return rejectWithValue({type: UsecaseResultType.FIELD_ERROR, data: editFeedbackPayload.errors})
  }

  if(editFeedbackPayload.data.title === feedbackToUpdate?.title && editFeedbackPayload.data.category === feedbackToUpdate?.category && editFeedbackPayload.data.description === feedbackToUpdate?.description && editFeedbackPayload.data.status === feedbackToUpdate?.status) {
    return {type: UsecaseResultType.SUCCESS, data: editFeedbackPayload.data}
  }

  try {
    const result = await feedbackRepository.editFeedback({ feedback: editFeedbackPayload.data })
    switch(result.type) {
      case ApiResultType.SUCCESS:
        return {type: UsecaseResultType.SUCCESS, data: editFeedbackPayload.data} 
      case ApiResultType.CREDENTIAL_ERROR:
        return rejectWithValue({type: UsecaseResultType.CREDENTIAL_ERROR, data: result.data})
      case ApiResultType.UNKNOWN_ERROR:
        return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR, data: result.data})
      case ApiResultType.FIELD_ERROR:
        return rejectWithValue({type: UsecaseResultType.FIELD_ERROR, data: result.data})
      case ApiResultType.NOT_FOUND:
        return rejectWithValue({type: UsecaseResultType.NOT_FOUND, data: undefined})
      default:
        return exhaustiveGuard(result)
    }
  } catch(e) {
    return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR, data: undefined})
  }
})

export type EditFeedbackThunkResult = UsecaseUnknownError | UsecaseNotFoundError | UsecaseCredentialError | UsecaseFieldError

export interface EditFeedbackUsecaseParams {
  id: string,
  title: string,
  category: FeedbackCategory,
  description: string,
  status: FeedbackStatus
}