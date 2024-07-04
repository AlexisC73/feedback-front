import { FieldError } from "@/store/errors/fields-error";
import { createAppAsyncThunk } from "../../create-app-thunk";
import { LoginPayload } from "./payload/login.payload";
import { DomainAccount } from "@/store/account/models/account";
import { CredentialError } from "@/store/errors/errors";

export const loginThunk = createAppAsyncThunk.withTypes<{rejectValue: LoginThunkResult}>()("auth/login", async (params: LoginUsecaseParams, { rejectWithValue, extra: { accountRepository } }) => {
  const loginPayload = new LoginPayload({email: params.email, password: params.password})

  if (!loginPayload.validate()) {
    const result: LoginThunkResult = {type: LoginThunkResultType.FIELD_ERROR, errors: loginPayload.errors}
    return rejectWithValue(result)
  }
  try {
    const account = await accountRepository.login({email: params.email, password: params.password})
    if(account._tag === "Left") {
      if(account.left instanceof CredentialError) {
        return rejectWithValue({type: LoginThunkResultType.CREDENTIAL_ERROR} as LoginThunkResult)
      }
      return rejectWithValue({type: LoginThunkResultType.UNKNOWN_ERROR} as LoginThunkResult)
    }
    return {type: LoginThunkResultType.SUCCESS, data: account.right} as LoginThunkResult
  } catch(e) {
    return rejectWithValue({type: LoginThunkResultType.UNKNOWN_ERROR} as LoginThunkResult)
  }
})

export enum LoginThunkResultType {
  SUCCESS = "SUCCESS",
  FIELD_ERROR = "FIELD_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  CREDENTIAL_ERROR = "CREDENTIAL_ERROR"
}

type LoginThunkResult = {
  type: LoginThunkResultType.FIELD_ERROR,
  errors: FieldError[]
} | {
  type: LoginThunkResultType.SUCCESS,
  data: DomainAccount
} | {
  type: LoginThunkResultType.UNKNOWN_ERROR
} | {
  type: LoginThunkResultType.CREDENTIAL_ERROR
}

export interface LoginUsecaseParams {
  email: string,
  password: string
}