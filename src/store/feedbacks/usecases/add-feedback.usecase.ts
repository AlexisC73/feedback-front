import { createAppAsyncThunk } from "@/store/create-app-thunk";
import { AddFeedbackPayload } from "./payload/add-feedback.payload";
import { Feedback, FeedbackCategory, FeedbackStatus } from "../models/feedback";
import { ApiResultType, UsecaseErrors, UsecaseResultType, UsecaseSuccess } from "@/store/@shared/models/resultType";
import { handleUsecaseErrors } from "@/helpers/handleUsecaseError";


export const addFeedbackThunk = createAppAsyncThunk.withTypes<{rejectValue: UsecaseErrors}>()("feedbacks/addFeedback", async (params: AddFeedbackUsecaseParams, { getState, rejectWithValue, extra: { feedbackRepository, idProvider } }) => {
  const auth = getState().auth.account

  if(!auth) {
    return rejectWithValue({type: UsecaseResultType.FORBIDDEN, data: "You are not connected"})
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

    if(result.type === ApiResultType.SUCCESS) {
      return {type: UsecaseResultType.SUCCESS, data: addedFeedback} as UsecaseSuccess<Feedback>
    } else {
      return rejectWithValue(handleUsecaseErrors(result, {
        UNAUTHORIZED: "You are not authorized to add feedback.",
      }))
    }
  } catch(e) {
    return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR, data: undefined})
  }
})

export interface AddFeedbackUsecaseParams {
  title: string,
  category: FeedbackCategory,
  description: string
}