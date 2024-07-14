import { createAppAsyncThunk } from "@/store/create-app-thunk";
import { AddFeedbackPayload } from "./payload/add-feedback.payload";
import { Feedback, FeedbackCategory, FeedbackStatus } from "../models/feedback";
import { ApiResultType, UsecaseCredentialError, UsecaseErrors, UsecaseFieldError, UsecaseForbiddenError, UsecaseResultType, UsecaseSuccess, UsecaseUnknownError } from "@/store/@shared/models/resultType";
import { exhaustiveGuard } from "@/store/@shared/utiles/exhaustive-guard";


export const addFeedbackThunk = createAppAsyncThunk.withTypes<{rejectValue: UsecaseErrors | UsecaseFieldError}>()("feedbacks/addFeedback", async (params: AddFeedbackUsecaseParams, { getState, rejectWithValue, extra: { feedbackRepository, idProvider } }) => {
  const auth = getState().auth.account

  if(!auth) {
    return rejectWithValue({type: UsecaseResultType.FORBIDDEN, data: "You are not connected"} as UsecaseForbiddenError)
  }

  const addFeedbackPayload: AddFeedbackPayload = new AddFeedbackPayload({
    id: idProvider.generateId(),
    category: params.category,
    description: params.description,
    title: params.title,
  })

  if(!addFeedbackPayload.validate()) {
    return rejectWithValue({type: UsecaseResultType.FIELD_ERROR, data: addFeedbackPayload.errors})
  }

  try {
    const result = await feedbackRepository.addFeedback({category: addFeedbackPayload.category.value, id: addFeedbackPayload.id,description: addFeedbackPayload.description, title: addFeedbackPayload.title})
    const addedFeedback: Feedback = {
      category: addFeedbackPayload.data.category,
      comments: 0,
      description: addFeedbackPayload.data.description,
      id: addFeedbackPayload.id,
      owner: auth.id,
      status: FeedbackStatus.SUGGESTION,
      title: addFeedbackPayload.data.title,
      upvotes: 0,
      upvoted: false
    }
    switch(result.type) {
      case ApiResultType.SUCCESS:
        return {type: UsecaseResultType.SUCCESS, data: addedFeedback} as UsecaseSuccess<Feedback>
      case ApiResultType.CREDENTIAL_ERROR:
        return rejectWithValue({type: UsecaseResultType.CREDENTIAL_ERROR, data: undefined} as UsecaseCredentialError)
      case ApiResultType.UNKNOWN_ERROR:
        return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR, data: result.data} as UsecaseUnknownError)
      case ApiResultType.FIELD_ERROR:
        return rejectWithValue({type: UsecaseResultType.FIELD_ERROR, data: result.data} as UsecaseFieldError)
      case ApiResultType.FORBIDDEN:
        return rejectWithValue({type: UsecaseResultType.FORBIDDEN, data: result.data} as UsecaseForbiddenError)
      default:
        return exhaustiveGuard(result)
    }
  } catch(e) {
    return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR, data: undefined} as UsecaseUnknownError)
  }
})

export interface AddFeedbackUsecaseParams {
  title: string,
  category: FeedbackCategory,
  description: string
}