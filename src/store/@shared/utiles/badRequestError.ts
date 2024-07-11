import { FieldError } from "@/store/errors/fields-error"
import { ApiCredentialError, ApiFieldError, ApiResultType, ApiUnknownError } from "../models/resultType"

export function getBadRequestApiError (object: unknown): ApiFieldError | ApiUnknownError | ApiCredentialError {
  if(!object || typeof object !== "object") return {type: ApiResultType.UNKNOWN_ERROR, data: undefined}
  if("message" in object) {
    if(object.message === "Invalid fields") {
      if("errors" in object) {
        return {type: ApiResultType.FIELD_ERROR, data: object.errors as FieldError[]}
      }
    }
    if(object.message === "Invalid user credentials") {
      return {type: ApiResultType.CREDENTIAL_ERROR, data: undefined}
    }
  }
  return {type: ApiResultType.UNKNOWN_ERROR, data: undefined}
}