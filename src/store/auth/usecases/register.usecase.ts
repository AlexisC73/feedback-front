import { FieldError } from "@/store/errors/fields-error";
import { createAppAsyncThunk } from "../../create-app-thunk";
import { RegisterPayload } from "./payload/register.payload";

export const registerThunk = createAppAsyncThunk.withTypes<{rejectValue: RegisterThunkResult}>()("auth/register", async (params: RegisterUsecaseParams, { rejectWithValue, extra: { accountRepository } }) => {
  const registerPayload = new RegisterPayload({email: params.email, password: params.password})

  if (!registerPayload.validate()) {
    const result: RegisterThunkResult = {type: RegisterThunkResultType.FIELD_ERROR, errors: registerPayload.errors}
    return rejectWithValue(result)
  }
  try {
    await accountRepository.create({email: params.email, password: params.password})
    return {type: RegisterThunkResultType.SUCCESS, errors: []} as RegisterThunkResult
  } catch(e) {
    return {type: RegisterThunkResultType.UNKNOWN_ERROR, errors: []} as RegisterThunkResult
  }
})

export enum RegisterThunkResultType {
  SUCCESS = "SUCCESS",
  FIELD_ERROR = "FIELD_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

type RegisterThunkResult = {
  type: RegisterThunkResultType.FIELD_ERROR,
  errors: FieldError[]
} | {
  type: RegisterThunkResultType.SUCCESS
} | {
  type: RegisterThunkResultType.UNKNOWN_ERROR
}

export interface RegisterUsecaseParams {
  email: string,
  password: string
}