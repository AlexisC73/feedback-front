import { createAppAsyncThunk } from "../../create-app-thunk";
import { LoginPayload } from "./payload/login.payload";
import { Account } from "@/store/account/models/account";
import { ApiResultType, UsecaseErrors, UsecaseFieldError, UsecaseResultType, UsecaseSuccess } from "@/store/@shared/models/resultType";
import { handleUsecaseErrors } from "@/helpers/handleUsecaseError";
import { t } from "i18next";

export const loginThunk = createAppAsyncThunk.withTypes<{rejectValue: UsecaseErrors}>()("auth/login", async (params: LoginUsecaseParams, { rejectWithValue, extra: { accountRepository } }) => {
  const loginPayload = new LoginPayload({email: params.email, password: params.password})

  if (!loginPayload.validate()) {
    const result: UsecaseFieldError = {type: UsecaseResultType.FIELD_ERROR, data: loginPayload.errors}
    return rejectWithValue(result)
  }
  
  try {
    const result = await accountRepository.login({email: params.email, password: params.password})
    if(result.type === ApiResultType.SUCCESS) {
      return {type: UsecaseResultType.SUCCESS, data: result.data} as UsecaseSuccess<Account>
    } else {
      return rejectWithValue(handleUsecaseErrors(result, {
        UNAUTHORIZED: t("errors.login.unauthorized"),
      }))
    }
  } catch(e) {
    return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR, data: undefined} as UsecaseErrors)
  }
})

export interface LoginUsecaseParams {
  email: string,
  password: string
}