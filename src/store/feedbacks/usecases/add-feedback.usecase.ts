import { createAppAsyncThunk } from "@/store/create-app-thunk";
import { AddFeedbackPayload } from "./payload/add-feedback.payload";
import { Feedback, FeedbackCategory, FeedbackStatus } from "../models/feedback";
import { FieldError } from "@/store/errors/fields-error";


export const addFeedbackThunk = createAppAsyncThunk.withTypes<{rejectValue: AddFeedbackThunkResult}>()("feedbacks/addFeedback", async (params: AddFeedbackUsecaseParams, { getState, rejectWithValue, extra: { feedbackRepository, idProvider } }) => {
  const authId = getState().auth.account?.id

  if(!authId) {
    return rejectWithValue({type: AddFeedbackThunkResultType.CREDENTIAL_ERROR} as AddFeedbackThunkResult)
  }
  
  const addFeedbackPayload: AddFeedbackPayload = new AddFeedbackPayload({
    id: idProvider.generateId(),
    category: params.category,
    description: params.description,
    title: params.title,
    owner: authId
  })

  if(!addFeedbackPayload.validate()) {
    return rejectWithValue({type: AddFeedbackThunkResultType.FIELDS_ERROR, errors: addFeedbackPayload.errors} as AddFeedbackThunkResult)
  }

  try {
    await feedbackRepository.addFeedback({feedback: addFeedbackPayload.data})
    return {type: AddFeedbackThunkResultType.SUCCESS, feedback: {
      category: addFeedbackPayload.data.category,
      comments: 0,
      description: addFeedbackPayload.data.description,
      id: addFeedbackPayload.data.id,
      owner: addFeedbackPayload.data.owner,
      status: FeedbackStatus.SUGGESTION,
      title: addFeedbackPayload.data.title,
      upvotes: 0
    }} as AddFeedbackThunkResult
  } catch(e) {
    return rejectWithValue({type: AddFeedbackThunkResultType.UNKNONW_ERROR} as AddFeedbackThunkResult)
  }
})

export type AddFeedbackThunkResult = {
  type: AddFeedbackThunkResultType.SUCCESS,
  feedback: Feedback
} | {
  type: AddFeedbackThunkResultType.UNKNONW_ERROR
} | {
  type: AddFeedbackThunkResultType.CREDENTIAL_ERROR
} | {
  type: AddFeedbackThunkResultType.FIELDS_ERROR,
  errors: FieldError[]
}

export enum AddFeedbackThunkResultType {
  SUCCESS = "SUCCESS",
  UNKNONW_ERROR = "UNKNOWN_ERROR",
  CREDENTIAL_ERROR = "CREDENTIAL_ERROR",
  FIELDS_ERROR = "FIELDS_ERROR"
}

export interface AddFeedbackUsecaseParams {
  title: string,
  category: FeedbackCategory,
  description: string
}