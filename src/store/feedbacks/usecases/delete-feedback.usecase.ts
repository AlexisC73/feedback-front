import { ApiResultType, UsecaseCredentialError, UsecaseErrors, UsecaseResultType } from "@/store/@shared/models/resultType";
import { exhaustiveGuard } from "@/store/@shared/utiles/exhaustive-guard";
import { createAppAsyncThunk } from "@/store/create-app-thunk";

export const deleteFeedbackThunk = createAppAsyncThunk.withTypes<{rejectValue: UsecaseErrors}>()("feedbacks/delete", async ({ feedbackId }: DeleteFeedbackUsecaseParams, { rejectWithValue, getState, extra: { feedbackRepository } }) => {
  const account = getState().auth.account

  if(!account) {
    return rejectWithValue({
      type: UsecaseResultType.CREDENTIAL_ERROR,
      data: undefined
    } as UsecaseCredentialError)
  }

  try {
    const result = await feedbackRepository.deleteFeedback({feedbackId})
    switch(result.type) {
      case ApiResultType.SUCCESS:
        return {type: UsecaseResultType.SUCCESS, data: { feedbackId }}
      case ApiResultType.CREDENTIAL_ERROR:
        return rejectWithValue({
          type: UsecaseResultType.CREDENTIAL_ERROR,
          data: undefined
        })
      case ApiResultType.UNKNOWN_ERROR:
        return rejectWithValue({
          type: UsecaseResultType.UNKNOWN_ERROR,
          data: undefined
        })
      case ApiResultType.FORBIDDEN:
        return rejectWithValue({
          type: UsecaseResultType.FORBIDDEN,
          data: "You are not allowed to delete this feedback"
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

export type DeleteFeedbackUsecaseParams = {
    feedbackId: string;
}