import { createAppAsyncThunk } from "@/store/create-app-thunk";
import { exhaustiveGuard } from "@/store/@shared/utiles/exhaustive-guard";
import { ApiResultType, UsecaseCredentialError, UsecaseResultType, UsecaseUnknownError } from "@/store/@shared/models/resultType";

export const getFeedbacksThunk = createAppAsyncThunk.withTypes<{rejectValue: GetFeedbacksThunkResult}>()("feedbacks/getFeedbacks", async (_, {extra: { feedbackRepository }, rejectWithValue}) => {
  try {
    const feedbacks = await feedbackRepository.getFeedbacks()
    switch(feedbacks.type) {
      case ApiResultType.SUCCESS:
        return {type: UsecaseResultType.SUCCESS, data: feedbacks.data}
      case ApiResultType.CREDENTIAL_ERROR:
        return rejectWithValue({type: UsecaseResultType.CREDENTIAL_ERROR, data: feedbacks.data} )
      case ApiResultType.UNKNOWN_ERROR:
        return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR, data: feedbacks.data})
      default:
        exhaustiveGuard(feedbacks)
    }
  } catch(e) {
    return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR, data: undefined})
  }
})

type GetFeedbacksThunkResult = UsecaseCredentialError | UsecaseUnknownError
