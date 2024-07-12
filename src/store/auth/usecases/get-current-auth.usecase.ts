import { ApiResultType, UsecaseCredentialError, UsecaseResultType, UsecaseUnknownError } from "@/store/@shared/models/resultType";
import { exhaustiveGuard } from "@/store/@shared/utiles/exhaustive-guard";
import { createAppAsyncThunk } from "@/store/create-app-thunk";

export const getCurrentAuthThunk = createAppAsyncThunk.withTypes<{rejectValue: GetCurrentAuthReject}>()("auth/getCurrentAuth", async (_, {extra: { accountRepository }, rejectWithValue}) => {
  try {
    const result = await accountRepository.getMe()
    switch(result.type) {
      case ApiResultType.SUCCESS:
        return {
          type: UsecaseResultType.SUCCESS,
          data: result.data
        }
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
      default:
        exhaustiveGuard(result)
    }
  } catch (e) {
    return rejectWithValue({
      type: UsecaseResultType.UNKNOWN_ERROR,
      data: undefined
    })
  }
})

export type GetCurrentAuthReject = UsecaseUnknownError | UsecaseCredentialError