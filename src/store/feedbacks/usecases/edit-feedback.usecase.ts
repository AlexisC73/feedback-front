import { createAppAsyncThunk } from "@/store/create-app-thunk";
import { FeedbackCategory, FeedbackStatus } from "../models/feedback";
import { EditFeedbackPayload } from "./payload/edit-feedback.payload";
import { ApiResultType, UsecaseErrors, UsecaseResultType, UsecaseSuccess } from "@/store/@shared/models/resultType";
import { handleUsecaseErrors } from "@/helpers/handleUsecaseError";

export const editFeedbackThunk = createAppAsyncThunk.withTypes<{rejectValue: UsecaseErrors}>()("feedbacks/editFeedback", async (feedback: EditFeedbackUsecaseParams, {getState, rejectWithValue, extra: {feedbackRepository}}) => {
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
    return {type: UsecaseResultType.SUCCESS, data: editFeedbackPayload.data} as UsecaseSuccess<EditFeedbackPayload["data"]>
  }

  try {
    const result = await feedbackRepository.editFeedback({ category: editFeedbackPayload.category.value, description: editFeedbackPayload.description, id: editFeedbackPayload.id, title: editFeedbackPayload.title, status: editFeedbackPayload.status.value})
    if(result.type === ApiResultType.SUCCESS) {
      return {type: UsecaseResultType.SUCCESS, data: editFeedbackPayload.data} as UsecaseSuccess<EditFeedbackPayload["data"]>
    }
    return rejectWithValue(handleUsecaseErrors(result, {
      UNAUTHORIZED: "You are not authorized to edit this feedback",
      NOT_FOUND: "Feedback not found"
    }))
  } catch(e) {
    return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR, data: undefined})
  }
})

export interface EditFeedbackUsecaseParams {
  id: string,
  title: string,
  category: FeedbackCategory,
  description: string,
  status: FeedbackStatus
}