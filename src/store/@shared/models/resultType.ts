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