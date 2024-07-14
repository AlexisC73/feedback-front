import { FieldError } from "@/store/errors/fields-error"
import { ApiCredentialError, ApiErrors, ApiFieldError, ApiResultType, ApiUnknownError } from "../models/resultType"

export function getBadRequestApiError (object: unknown): ApiFieldError | ApiUnknownError | ApiCredentialError {
  if(!object || typeof object !== "object") return {type: ApiResultType.UNKNOWN_ERROR, data: undefined}
  if("message" in object) {
    if(object.message === "Invalid fields") {
      if("errors" in object) {
        return {type: ApiResultType.FIELD_ERROR, data: object.errors as FieldError[]}
      }
    }
    if(object.message === "Invalid user credentials") {
      return {type: ApiResultType.CREDENTIAL_ERROR, data: "Email or password are invalid."}
    }
  }
  return {type: ApiResultType.UNKNOWN_ERROR, data: undefined}
}

export function handleApiError (status: number, object: unknown): ApiErrors {
  if(!object || typeof object !== "object") {
    return {type: ApiResultType.UNKNOWN_ERROR, data: undefined}
  }
  switch(status) {
    case 400:
      return getBadRequestApiError(object)
    case 403 : {
      if("message" in object && typeof object.message === "string") {
        return {type: ApiResultType.FORBIDDEN, data: object.message}
      }
    } break
    default:
      return {type: ApiResultType.UNKNOWN_ERROR, data: undefined}
  }
  return {type: ApiResultType.UNKNOWN_ERROR, data: undefined}
}