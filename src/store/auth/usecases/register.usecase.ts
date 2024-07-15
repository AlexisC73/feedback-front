import { createAppAsyncThunk } from "../../create-app-thunk";
import { RegisterPayload } from "./payload/register.payload";
import { ApiResultType, UsecaseErrors, UsecaseFieldError, UsecaseResultType, UsecaseSuccess } from "@/store/@shared/models/resultType";
import { handleUsecaseErrors } from "@/helpers/handleUsecaseError";

export const registerThunk = createAppAsyncThunk.withTypes<{rejectValue: UsecaseErrors | UsecaseFieldError}>()("auth/register", async (params: RegisterUsecaseParams, { rejectWithValue, extra: { accountRepository } }) => {
  const registerPayload = new RegisterPayload({email: params.email, password: params.password, confirmationPassword: params.confirmationPassword, displayName: params.displayName, username: params.username})

  if (!registerPayload.validate()) {
    const result: UsecaseFieldError = {type: UsecaseResultType.FIELD_ERROR, data: registerPayload.errors} as UsecaseFieldError
    return rejectWithValue(result)
  }
  try {
    const result = await accountRepository.create({email: registerPayload.email, password: registerPayload.password, displayName: registerPayload.displayName, username: registerPayload.username})
    if(result.type === ApiResultType.SUCCESS) {
      return {type: UsecaseResultType.SUCCESS, data: undefined} as UsecaseSuccess<undefined>
    } else {
      return rejectWithValue(handleUsecaseErrors(result, {}))
    }
  } catch(e) {
    return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR, data: undefined})
  }
})

export interface RegisterUsecaseParams {
  email: string,
  password: string,
  confirmationPassword: string,
  displayName: string
  username: string
}