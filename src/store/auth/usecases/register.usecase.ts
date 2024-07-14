import { exhaustiveGuard } from "@/store/@shared/utiles/exhaustive-guard";
import { createAppAsyncThunk } from "../../create-app-thunk";
import { RegisterPayload } from "./payload/register.payload";
import { ApiResultType, UsecaseCredentialError, UsecaseFieldError, UsecaseForbiddenError, UsecaseResultType, UsecaseSuccess, UsecaseUnknownError } from "@/store/@shared/models/resultType";

export const registerThunk = createAppAsyncThunk.withTypes<{rejectValue: RegisterThunkResult}>()("auth/register", async (params: RegisterUsecaseParams, { rejectWithValue, extra: { accountRepository } }) => {
  const registerPayload = new RegisterPayload({email: params.email, password: params.password, confirmationPassword: params.confirmationPassword, displayName: params.displayName, username: params.username})

  if (!registerPayload.validate()) {
    const result: RegisterThunkResult = {type: UsecaseResultType.FIELD_ERROR, data: registerPayload.errors} as UsecaseFieldError
    return rejectWithValue(result)
  }
  try {
    const result = await accountRepository.create({email: registerPayload.email, password: registerPayload.password, displayName: registerPayload.displayName, username: registerPayload.username})
    switch(result.type) {
      case ApiResultType.SUCCESS:
        return {type: UsecaseResultType.SUCCESS, data: undefined} as UsecaseSuccess<undefined>
      case ApiResultType.FORBIDDEN:
        return {type: UsecaseResultType.FORBIDDEN, data: result.data} as UsecaseForbiddenError
      case ApiResultType.UNKNOWN_ERROR:
        return {type: UsecaseResultType.UNKNOWN_ERROR} as UsecaseUnknownError
      case ApiResultType.FIELD_ERROR:
        return {type: UsecaseResultType.FIELD_ERROR, data: result.data} as UsecaseFieldError
      case ApiResultType.CREDENTIAL_ERROR:
        return {type: UsecaseResultType.CREDENTIAL_ERROR, data: undefined} as UsecaseCredentialError
      default:
        exhaustiveGuard(result)
    }
  } catch(e) {
    return {type: UsecaseResultType.UNKNOWN_ERROR} as UsecaseUnknownError
  }
})

type RegisterThunkResult = UsecaseSuccess<undefined> | UsecaseUnknownError | UsecaseForbiddenError | UsecaseFieldError


export interface RegisterUsecaseParams {
  email: string,
  password: string,
  confirmationPassword: string,
  displayName: string
  username: string
}