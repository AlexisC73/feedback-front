import { FieldError } from "@/store/errors/fields-error";
import { createAppAsyncThunk } from "../../create-app-thunk";
import { LoginPayload } from "./payload/login.payload";
import { Account } from "@/store/account/models/account";
import { ApiResultType, UsecaseResult, UsecaseResultType } from "@/store/@shared/models/resultType";
import { exhaustiveGuard } from "@/store/@shared/utiles/exhaustive-guard";

export const loginThunk = createAppAsyncThunk.withTypes<{rejectValue: LoginThunkResult}>()("auth/login", async (params: LoginUsecaseParams, { rejectWithValue, extra: { accountRepository } }) => {
  const loginPayload = new LoginPayload({email: params.email, password: params.password})

  if (!loginPayload.validate()) {
    const result: LoginThunkResult = {type: UsecaseResultType.FIELD_ERROR, data: loginPayload.errors}
    return rejectWithValue(result)
  }
  
  try {
    const result = await accountRepository.login({email: params.email, password: params.password})
    if(result.type === ApiResultType.SUCCESS) {
      const successResult: LoginThunkSuccess = {type: UsecaseResultType.SUCCESS, data: result.data}
      return successResult
    } else {
      switch(result.type) {
        case ApiResultType.UNKNOWN_ERROR:
          return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR})
        case ApiResultType.FIELD_ERROR:
          return rejectWithValue({type: UsecaseResultType.FIELD_ERROR, data: result.data})
        case ApiResultType.CREDENTIAL_ERROR:
          return rejectWithValue({type: UsecaseResultType.CREDENTIAL_ERROR})
        default:
          exhaustiveGuard(result)
      }
    }
  } catch(e) {
    return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR} as LoginThunkUnknownError)
  }
})

export type LoginThunkResult = LoginThunkSuccess | LoginThunkFieldError | LoginThunkUnknownError | LoginThunkCredentialError

export type LoginThunkFieldError = UsecaseResult<UsecaseResultType.FIELD_ERROR, FieldError[]>
export type LoginThunkSuccess = UsecaseResult<UsecaseResultType.SUCCESS, Account>
export type LoginThunkUnknownError = UsecaseResult<UsecaseResultType.UNKNOWN_ERROR, undefined>
export type LoginThunkCredentialError = UsecaseResult<UsecaseResultType.CREDENTIAL_ERROR, undefined>

export interface LoginUsecaseParams {
  email: string,
  password: string
}