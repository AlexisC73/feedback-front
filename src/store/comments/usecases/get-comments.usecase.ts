import { ApiResultType, UsecaseCredentialError, UsecaseResultType, UsecaseSuccess } from "@/store/@shared/models/resultType";
import { createAppAsyncThunk } from "@/store/create-app-thunk";
import { Comment } from "../models/comment";
import { exhaustiveGuard } from "@/store/@shared/utiles/exhaustive-guard";

export const getCommentsForFeedbackThunk = createAppAsyncThunk.withTypes<{ rejectValue: GetThunkRejectType}>()("comments/getAll", async ({feedbackId}: GetFeedbackCommentParams, { getState, rejectWithValue, extra: { commentRepository } }) => {

  const account = getState().auth.account

  if(!account) {
    return rejectWithValue({
      type: UsecaseResultType.CREDENTIAL_ERROR,
      data: undefined
    })
  }

  const result = await commentRepository.getForFeedback({feedbackId})
  switch(result.type) {
    case ApiResultType.SUCCESS:
      return {
        type: UsecaseResultType.SUCCESS,
        data: result.data
      } as UsecaseSuccess<Comment[]>
    case ApiResultType.CREDENTIAL_ERROR:
      return {
        type: UsecaseResultType.CREDENTIAL_ERROR,
        data: undefined
      }
    default:
      exhaustiveGuard(result)
  }
})

export type GetThunkRejectType = UsecaseCredentialError
export type GetFeedbackCommentParams = {
  feedbackId: string
}
