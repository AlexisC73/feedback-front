import { createAppAsyncThunk } from "@/store/create-app-thunk";
import { ApiResultType, UsecaseErrors, UsecaseResultType, UsecaseSuccess } from "@/store/@shared/models/resultType";
import { Feedback } from "../models/feedback";
import { handleUsecaseErrors } from "@/helpers/handleUsecaseError";

export const getFeedbacksThunk = createAppAsyncThunk.withTypes<{rejectValue: UsecaseErrors}>()("feedbacks/getFeedbacks", async (_, {extra: { feedbackRepository }, rejectWithValue}) => {
  try {
    const result = await feedbackRepository.getFeedbacks()
    if(result.type === ApiResultType.SUCCESS) {
      return {type: UsecaseResultType.SUCCESS, data: result.data} as UsecaseSuccess<Feedback[]>
    }
    return rejectWithValue(handleUsecaseErrors(result, {}))
  } catch(e) {
    return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR, data: undefined})
  }
})
