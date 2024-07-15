import { FieldError } from "@/store/errors/fields-error"
import { ApiBadRequestError, ApiErrors, ApiFieldError, ApiResult, ApiResultType } from "../models/resultType"

export function handleBadRequestErrors (object: unknown): ApiBadRequestError | ApiFieldError | ApiResult<ApiResultType.UNKNOWN_ERROR, undefined> {
  if(!object || typeof object !== "object") return {type: ApiResultType.UNKNOWN_ERROR, data: undefined}
  if("errors" in object && Array.isArray(object.errors) && object.errors.length > 0) {
    const errors = object.errors[0]
    if(typeof errors === "object" && "message" in errors && typeof errors.message === "string" && errors.message !== null ) {
      if(errors.message === "Invalid fields") {
        if("data" in errors) {
          return {type: ApiResultType.FIELD_ERROR, data: errors.data as FieldError[]}
        }
      }
      return {type: ApiResultType.BAD_REQUEST, data: errors.message}
    }
  }
  return {type: ApiResultType.UNKNOWN_ERROR, data: undefined}
}

export function handleApiError (status: number): ApiErrors {
  switch(status) {
    case 401 :
      return {type: ApiResultType.UNAUTHORIZED, data: undefined}
    case 404:
      return {type: ApiResultType.NOT_FOUND, data: undefined}
    default:
      return {type: ApiResultType.UNKNOWN_ERROR, data: undefined}
  }
}