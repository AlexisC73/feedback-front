import { createAppAsyncThunk } from "../../create-app-thunk";
import { ApiResultType, UsecaseErrors, UsecaseResultType, UsecaseSuccess } from "@/store/@shared/models/resultType";
import { handleUsecaseErrors } from "@/helpers/handleUsecaseError";
import { t } from "i18next";

export const logoutThunk = createAppAsyncThunk.withTypes<{rejectValue: UsecaseErrors}>()("auth/logout", async (_, { rejectWithValue, extra: { accountRepository } }) => {
  
  try {
    const result = await accountRepository.logout()
    if(result.type === ApiResultType.SUCCESS) {
      return {type: UsecaseResultType.SUCCESS, data: undefined} as UsecaseSuccess<undefined>
    } else {
      return rejectWithValue(handleUsecaseErrors(result, {
        UNAUTHORIZED: t("errors.login.unauthorized"),
      }))
    }
  } catch(e) {
    return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR, data: undefined} as UsecaseErrors)
  }
})