import { handleUsecaseErrors } from "@/helpers/handleUsecaseError";
import { ApiResultType, UsecaseErrors, UsecaseResultType, UsecaseSuccess } from "@/store/@shared/models/resultType";
import { createAppAsyncThunk } from "@/store/create-app-thunk";

export const deleteFeedbackThunk = createAppAsyncThunk.withTypes<{rejectValue: UsecaseErrors}>()("feedbacks/delete", async ({ feedbackId }: DeleteFeedbackUsecaseParams, { rejectWithValue, getState, extra: { feedbackRepository } }) => {
  const account = getState().auth.account

  if(!account) {
    return rejectWithValue({
      type: UsecaseResultType.CREDENTIAL_ERROR,
      data: undefined
    })
  }

  try {
    const result = await feedbackRepository.deleteFeedback({feedbackId})
    if(result.type === ApiResultType.SUCCESS) {
      return {type: UsecaseResultType.SUCCESS, data: { feedbackId }} as UsecaseSuccess<{feedbackId: string}>
    }
    return rejectWithValue(handleUsecaseErrors(result, {}))
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