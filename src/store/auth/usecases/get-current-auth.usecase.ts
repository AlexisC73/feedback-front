import { handleUsecaseErrors } from "@/helpers/handleUsecaseError";
import { ApiResultType, UsecaseErrors, UsecaseResultType, UsecaseSuccess } from "@/store/@shared/models/resultType";
import { Account } from "@/store/account/models/account";
import { createAppAsyncThunk } from "@/store/create-app-thunk";

export const getCurrentAuthThunk = createAppAsyncThunk.withTypes<{rejectValue: UsecaseErrors}>()("auth/getCurrentAuth", async (_, {extra: { accountRepository }, rejectWithValue}) => {
  try {
    const result = await accountRepository.getMe()
    if(result.type === ApiResultType.SUCCESS) {
      return {type: UsecaseResultType.SUCCESS, data: result.data} as UsecaseSuccess<Account>
    } else {
      return rejectWithValue(handleUsecaseErrors(result, {}))
    }
  } catch (e) {
    return rejectWithValue({
      type: UsecaseResultType.UNKNOWN_ERROR,
      data: undefined
    })
  }
})
