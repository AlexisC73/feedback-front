import { createAppAsyncThunk } from "@/store/create-app-thunk";
import { UpvotePayload } from "./payload/upvote.payload";
import { ApiResultType, UsecaseErrors, UsecaseFieldError, UsecaseNotFoundError, UsecaseResultType } from "@/store/@shared/models/resultType";
import { exhaustiveGuard } from "@/store/@shared/utiles/exhaustive-guard";

export const upvoteFeedbackThunk = createAppAsyncThunk.withTypes<{rejectValue: UsecaseErrors | UsecaseFieldError | UsecaseNotFoundError}>()("feedbacks/upvote", async (param: UpvoteUsecaseParams, {rejectWithValue, extra: {feedbackRepository}}) => {
  const upvotePayload = new UpvotePayload({ feedbackId: param.feedbackId, upvote: param.upvote });

  if(!upvotePayload.validate()) {
    return rejectWithValue({type: UsecaseResultType.FIELD_ERROR, data: upvotePayload.errors})
  }

  try {
    const result = await feedbackRepository.upvote({feedbackId: param.feedbackId, upvote: param.upvote})
    switch(result.type) {
      case ApiResultType.SUCCESS:
        return {type: UsecaseResultType.SUCCESS, data: upvotePayload.data}
      case ApiResultType.NOT_FOUND:
        return rejectWithValue({type: UsecaseResultType.NOT_FOUND, data: result.data})
      case ApiResultType.CREDENTIAL_ERROR:
        return rejectWithValue({type: UsecaseResultType.CREDENTIAL_ERROR, data: undefined})
      case ApiResultType.UNKNOWN_ERROR:
        return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR, data: undefined})
      case ApiResultType.FORBIDDEN:
        return rejectWithValue({type: UsecaseResultType.FORBIDDEN, data: result.data})
      default:
        return exhaustiveGuard(result)
    }
  } catch(err) {
    return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR, data: undefined})
  }
})

export type UpvoteUsecaseParams = { feedbackId: string, upvote: boolean }
