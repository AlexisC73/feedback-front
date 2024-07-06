import { createAppAsyncThunk } from "@/store/create-app-thunk";
import { AddFeedbackPayload } from "./payload/add-feedback.payload";
import { Feedback, FeedbackCategory, FeedbackStatus } from "../models/feedback";
import { ApiResultType, UsecaseCredentialError, UsecaseFieldError, UsecaseResultType, UsecaseUnknownError } from "@/store/@shared/models/resultType";
import { exhaustiveGuard } from "@/store/@shared/utiles/exhaustive-guard";


export const addFeedbackThunk = createAppAsyncThunk.withTypes<{rejectValue: AddFeedbackThunkResult}>()("feedbacks/addFeedback", async (params: AddFeedbackUsecaseParams, { getState, rejectWithValue, extra: { feedbackRepository, idProvider } }) => {
  const authId = getState().auth.account?.id

  if(!authId) {
    return ({type: UsecaseResultType.CREDENTIAL_ERROR} as AddFeedbackThunkResult)
  }
  
  const addFeedbackPayload: AddFeedbackPayload = new AddFeedbackPayload({
    id: idProvider.generateId(),
    category: params.category,
    description: params.description,
    title: params.title,
    owner: authId
  })

  if(!addFeedbackPayload.validate()) {
    return rejectWithValue({type: UsecaseResultType.FIELD_ERROR, data: addFeedbackPayload.errors})
  }

  try {
    const result = await feedbackRepository.addFeedback({feedback: addFeedbackPayload.data})
    const addedFeedback: Feedback = {
      category: addFeedbackPayload.data.category,
      comments: 0,
      description: addFeedbackPayload.data.description,
      id: addFeedbackPayload.data.id,
      owner: addFeedbackPayload.data.owner,
      status: FeedbackStatus.SUGGESTION,
      title: addFeedbackPayload.data.title,
      upvotes: 0,
      upvoted: false
    }
    switch(result.type) {
      case ApiResultType.SUCCESS:
        return {type: UsecaseResultType.SUCCESS, data: addedFeedback}
      case ApiResultType.CREDENTIAL_ERROR:
        return rejectWithValue({type: UsecaseResultType.CREDENTIAL_ERROR, data: result.data})
      case ApiResultType.UNKNOWN_ERROR:
        return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR, data: result.data})
      case ApiResultType.FIELD_ERROR:
        return rejectWithValue({type: UsecaseResultType.FIELD_ERROR, data: result.data})
      default:
        return exhaustiveGuard(result)
    }
  } catch(e) {
    console.log(e)
    return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR, data: undefined})
  }
})

export type AddFeedbackThunkResult = UsecaseFieldError | UsecaseCredentialError | UsecaseUnknownError

export interface AddFeedbackUsecaseParams {
  title: string,
  category: FeedbackCategory,
  description: string
}