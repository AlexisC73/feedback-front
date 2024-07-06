import { FieldError } from "@/store/errors/fields-error"

export type UsecaseResult<T, P> =  {
  type: T,
  data: P
}

export enum UsecaseResultType {
  SUCCESS = "SUCCESS",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  FIELD_ERROR = "FIELD_ERROR",
  CREDENTIAL_ERROR = "CREDENTIAL_ERROR",
  NOT_FOUND = "NOT_FOUND"
}

export type UsecaseFieldError = UsecaseResult<UsecaseResultType.FIELD_ERROR, FieldError[]>
export type UsecaseUnknownError = UsecaseResult<UsecaseResultType.UNKNOWN_ERROR, undefined>
export type UsecaseSuccess<T> = UsecaseResult<UsecaseResultType.SUCCESS, T>
export type UsecaseCredentialError = UsecaseResult<UsecaseResultType.CREDENTIAL_ERROR, string | undefined>
export type UsecaseNotFoundError = UsecaseResult<UsecaseResultType.NOT_FOUND, undefined>

export type ApiResult<T, P> =  {
  type: T,
  data: P
}

export enum ApiResultType {
  SUCCESS = "SUCCESS",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  FIELD_ERROR = "FIELD_ERROR",
  CREDENTIAL_ERROR = "CREDENTIAL_ERROR",
  NOT_FOUND = "NOT_FOUND"
}

export type ApiFieldError = ApiResult<ApiResultType.FIELD_ERROR, FieldError[]>
export type ApiUnknownError = ApiResult<ApiResultType.UNKNOWN_ERROR, undefined>
export type ApiSuccessResult<T> = ApiResult<ApiResultType.SUCCESS, T>
export type ApiCredentialError = ApiResult<ApiResultType.CREDENTIAL_ERROR, string | undefined>
export type ApiNotFoundError = ApiResult<ApiResultType.NOT_FOUND, undefined>