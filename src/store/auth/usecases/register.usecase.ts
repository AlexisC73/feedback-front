import { exhaustiveGuard } from "@/store/@shared/utiles/exhaustive-guard";
import { createAppAsyncThunk } from "../../create-app-thunk";
import { RegisterPayload } from "./payload/register.payload";
import { ApiResultType, UsecaseResult, UsecaseResultType } from "@/store/@shared/models/resultType";
import { FieldError } from "@/store/errors/fields-error";

export const registerThunk = createAppAsyncThunk.withTypes<{rejectValue: RegisterThunkResult}>()("auth/register", async (params: RegisterUsecaseParams, { rejectWithValue, extra: { accountRepository } }) => {
  const registerPayload = new RegisterPayload({email: params.email, password: params.password, confirmationPassword: params.confirmationPassword})

  if (!registerPayload.validate()) {
    const result: RegisterThunkResult = {type: UsecaseResultType.FIELD_ERROR, data: registerPayload.errors} as RegisterThunkFieldError
    return rejectWithValue(result)
  }
  try {
    const result = await accountRepository.create({email: params.email, password: params.password})
    switch(result.type) {
      case ApiResultType.SUCCESS:
        return {type: UsecaseResultType.SUCCESS, data: undefined} as RegisterThunkSuccess
      case ApiResultType.CREDENTIAL_ERROR:
        return {type: UsecaseResultType.CREDENTIAL_ERROR, data: result.data} as RegisterCredentialError
      case ApiResultType.UNKNOWN_ERROR:
        return {type: UsecaseResultType.UNKNOWN_ERROR} as RegisterThunkUnknownError
      case ApiResultType.FIELD_ERROR:
        return {type: UsecaseResultType.FIELD_ERROR, data: result.data} as RegisterThunkFieldError
      default:
        exhaustiveGuard(result)
    }
  } catch(e) {
    return {type: UsecaseResultType.UNKNOWN_ERROR} as RegisterThunkUnknownError
  }
})

type RegisterThunkResult = RegisterThunkSuccess | RegisterThunkUnknownError | RegisterCredentialError | RegisterThunkFieldError

type RegisterThunkSuccess = UsecaseResult<UsecaseResultType.SUCCESS, undefined>
type RegisterThunkUnknownError = UsecaseResult<UsecaseResultType.UNKNOWN_ERROR, undefined>
type RegisterThunkFieldError = UsecaseResult<UsecaseResultType.FIELD_ERROR, FieldError[]>
type RegisterCredentialError = UsecaseResult<UsecaseResultType.CREDENTIAL_ERROR, string | undefined>


export interface RegisterUsecaseParams {
  email: string,
  password: string,
  confirmationPassword: string
}