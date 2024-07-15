import { createAppAsyncThunk } from "@/store/create-app-thunk";
import { UpvotePayload } from "./payload/upvote.payload";
import { ApiResultType, UsecaseErrors, UsecaseResultType, UsecaseSuccess } from "@/store/@shared/models/resultType";
import { handleUsecaseErrors } from "@/helpers/handleUsecaseError";

export const upvoteFeedbackThunk = createAppAsyncThunk.withTypes<{rejectValue: UsecaseErrors}>()("feedbacks/upvote", async (param: UpvoteUsecaseParams, {rejectWithValue, extra: {feedbackRepository}}) => {
  const upvotePayload = new UpvotePayload({ feedbackId: param.feedbackId, upvote: param.upvote });

  if(!upvotePayload.validate()) {
    return rejectWithValue({type: UsecaseResultType.FIELD_ERROR, data: upvotePayload.errors})
  }

  try {
    const result = await feedbackRepository.upvote({feedbackId: param.feedbackId, upvote: param.upvote})
    if(result.type === ApiResultType.SUCCESS){
      return {type: UsecaseResultType.SUCCESS, data: upvotePayload.data} as UsecaseSuccess<UpvotePayload["data"]>
    }
    return rejectWithValue(handleUsecaseErrors(result, {}))
  } catch(err) {
    return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR, data: undefined})
  }
})

export type UpvoteUsecaseParams = { feedbackId: string, upvote: boolean }
