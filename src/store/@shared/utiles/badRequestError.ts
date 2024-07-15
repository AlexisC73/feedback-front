import { FieldError } from "@/store/errors/fields-error"
import { ApiErrors, ApiResultType } from "../models/resultType"

export function handleBadRequestErrors (object: unknown): ApiErrors {
  if(!object || typeof object !== "object") return {type: ApiResultType.UNKNOWN_ERROR, data: undefined}
  if("message" in object) {
    if(object.message === "Invalid user credentials") {
      return {type: ApiResultType.CREDENTIAL_ERROR, data: undefined}
    }
    if(object.message === "Invalid fields") {
      if("errors" in object) {
        return {type: ApiResultType.FIELD_ERROR, data: object.errors as FieldError[]}
      }
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