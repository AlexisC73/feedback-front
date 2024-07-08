import { ApiResultType, UsecaseCredentialError, UsecaseNotFoundError, UsecaseResultType, UsecaseUnknownError } from "@/store/@shared/models/resultType";
import { exhaustiveGuard } from "@/store/@shared/utiles/exhaustive-guard";
import { createAppAsyncThunk } from "@/store/create-app-thunk";

export const deleteFeedbackThunk = createAppAsyncThunk.withTypes<{rejectValue: DeleteFeedbackRejectResult}>()("feedbacks/delete", async ({ feedbackId }: DeleteFeedbackUsecaseParams, { rejectWithValue, getState, extra: { feedbackRepository } }) => {
  const account = getState().auth.account

  if(!account) {
    return rejectWithValue({
      type: UsecaseResultType.CREDENTIAL_ERROR,
      data: undefined
    })
  }

  try {
    const result = await feedbackRepository.deleteFeedback({feedbackId})
    switch(result.type) {
      case ApiResultType.SUCCESS:
        return {type: UsecaseResultType.SUCCESS, data: { feedbackId }}
      case ApiResultType.NOT_FOUND:
        return rejectWithValue({
          type: UsecaseResultType.NOT_FOUND,
          data: undefined
        })
      case ApiResultType.CREDENTIAL_ERROR:
        return rejectWithValue({
          type: UsecaseResultType.CREDENTIAL_ERROR,
          data: undefined
        })
      default:
        exhaustiveGuard(result)
    }
  } catch(e) {
    return rejectWithValue({
      type: UsecaseResultType.UNKNOWN_ERROR,
      data: undefined
    })
  }
})

export type DeleteFeedbackRejectResult = UsecaseCredentialError | UsecaseUnknownError | UsecaseNotFoundError

export type DeleteFeedbackUsecaseParams = {
    feedbackId: string;
}