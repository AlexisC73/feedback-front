import { FieldError } from "@/store/errors/fields-error"

export type UsecaseResult<T, P> =  {
  type: T,
  data: P
}

export enum UsecaseResultType {
  SUCCESS = "SUCCESS",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  FIELD_ERROR = "FIELD_ERROR",
  BAD_REQUEST = "BAD_REQUEST",
  NOT_FOUND = "NOT_FOUND",
  FORBIDDEN = "FORBIDDEN",
  UNAUTHORIZED = "UNAUTHORIZED"
}

export type UsecaseFieldError = UsecaseResult<UsecaseResultType.FIELD_ERROR, FieldError[]>
export type UsecaseSuccess<T> = UsecaseResult<UsecaseResultType.SUCCESS, T>
export type UsecaseBadRequestResult = UsecaseResult<UsecaseResultType.BAD_REQUEST, string | undefined>
export type UsecaseErrors = UsecaseResult<Exclude<UsecaseResultType, UsecaseResultType.FIELD_ERROR | UsecaseResultType.SUCCESS | UsecaseResultType.BAD_REQUEST>, string | undefined> | UsecaseFieldError | UsecaseBadRequestResult

export type ApiResult<T, P> =  {
  type: T,
  data: P
}

export enum ApiResultType {
  SUCCESS = "SUCCESS",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  FIELD_ERROR = "FIELD_ERROR",
  BAD_REQUEST = "BAD_REQUEST",
  NOT_FOUND = "NOT_FOUND",
  FORBIDDEN = "FORBIDDEN",
  UNAUTHORIZED = "UNAUTHORIZED"
}

export type ApiSuccessResult<T> = ApiResult<ApiResultType.SUCCESS, T>
export type ApiFieldError = ApiResult<ApiResultType.FIELD_ERROR, FieldError[]>
export type ApiBadRequestError = ApiResult<ApiResultType.BAD_REQUEST, string | undefined>
export type ApiErrors = ApiResult<Exclude<ApiResultType, ApiResultType.FIELD_ERROR | ApiResultType.SUCCESS | ApiResultType.BAD_REQUEST>, undefined> | ApiFieldError | ApiBadRequestError