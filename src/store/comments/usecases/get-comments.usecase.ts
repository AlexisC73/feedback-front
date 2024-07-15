import { ApiResultType, UsecaseErrors, UsecaseResultType, UsecaseSuccess } from "@/store/@shared/models/resultType";
import { createAppAsyncThunk } from "@/store/create-app-thunk";
import { Comment } from "../models/comment";
import { handleUsecaseErrors } from "@/helpers/handleUsecaseError";

export const getCommentsForFeedbackThunk = createAppAsyncThunk.withTypes<{ rejectValue: UsecaseErrors}>()("comments/getAll", async ({feedbackId}: GetFeedbackCommentParams, { rejectWithValue, extra: { commentRepository } }) => {

  const result = await commentRepository.getForFeedback({feedbackId})
  if(result.type === ApiResultType.SUCCESS) {
    return {type: UsecaseResultType.SUCCESS, data: result.data} as UsecaseSuccess<Comment[]>
  }
  return rejectWithValue(handleUsecaseErrors(result, {}))
})

export type GetFeedbackCommentParams = {
  feedbackId: string
}
