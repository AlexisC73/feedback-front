import { FieldError } from "@/store/errors/fields-error"

export type UsecaseResult<T, P> =  {
  type: T,
  data: P
}

export enum UsecaseResultType {
  SUCCESS = "SUCCESS",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  FIELD_ERROR = "FIELD_ERROR",
  CREDENTIAL_ERROR = "CREDENTIAL_ERROR"
}

export type ApiResult<T, P> =  {
  type: T,
  data: P
}

export enum ApiResultType {
  SUCCESS = "SUCCESS",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  FIELD_ERROR = "FIELD_ERROR",
  CREDENTIAL_ERROR = "CREDENTIAL_ERROR"
}

export type ApiFieldError = ApiResult<ApiResultType.FIELD_ERROR, FieldError[]>
export type ApiUnknownError = ApiResult<ApiResultType.UNKNOWN_ERROR, undefined>
export type ApiSuccessResult<T> = ApiResult<ApiResultType.SUCCESS, T>
export type ApiCredentialError = ApiResult<ApiResultType.CREDENTIAL_ERROR, string | undefined>