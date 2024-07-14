import { createAppAsyncThunk } from "../../create-app-thunk";
import { LoginPayload } from "./payload/login.payload";
import { Account } from "@/store/account/models/account";
import { ApiResultType, UsecaseCredentialError, UsecaseErrors, UsecaseFieldError, UsecaseForbiddenError, UsecaseResultType, UsecaseSuccess, UsecaseUnknownError } from "@/store/@shared/models/resultType";
import { exhaustiveGuard } from "@/store/@shared/utiles/exhaustive-guard";

export const loginThunk = createAppAsyncThunk.withTypes<{rejectValue: UsecaseErrors | UsecaseFieldError}>()("auth/login", async (params: LoginUsecaseParams, { rejectWithValue, extra: { accountRepository } }) => {
  const loginPayload = new LoginPayload({email: params.email, password: params.password})

  if (!loginPayload.validate()) {
    const result: UsecaseFieldError = {type: UsecaseResultType.FIELD_ERROR, data: loginPayload.errors}
    return rejectWithValue(result)
  }
  
  try {
    const result = await accountRepository.login({email: params.email, password: params.password})
    if(result.type === ApiResultType.SUCCESS) {
      const successResult: UsecaseSuccess<Account> = {type: UsecaseResultType.SUCCESS, data: result.data}
      return successResult
    } else {
      switch(result.type) {
        case ApiResultType.UNKNOWN_ERROR:
          return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR, data: undefined} as UsecaseUnknownError)
        case ApiResultType.FIELD_ERROR:
          return rejectWithValue({type: UsecaseResultType.FIELD_ERROR, data: result.data} as UsecaseFieldError)
        case ApiResultType.CREDENTIAL_ERROR:
          return rejectWithValue({type: UsecaseResultType.CREDENTIAL_ERROR, data: result.data} as UsecaseCredentialError)
        case ApiResultType.FORBIDDEN:
          return rejectWithValue({type: UsecaseResultType.FORBIDDEN, data: "You are not allowed to Login"} as UsecaseForbiddenError)
        default:
          exhaustiveGuard(result)
      }
    }
  } catch(e) {
    return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR, data: undefined} as UsecaseUnknownError)
  }
})

export interface LoginUsecaseParams {
  email: string,
  password: string
}