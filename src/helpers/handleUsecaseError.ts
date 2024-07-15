import { Toast } from "@/Context/ToastCtx/ToastCtx";
import { ApiErrors, ApiResultType, UsecaseErrors, UsecaseResultType } from "@/store/@shared/models/resultType";
import { exhaustiveGuard } from "@/store/@shared/utiles/exhaustive-guard";

export function notifyUsecaseError(addToast: (toast: {message: string, autoClose?: boolean, type?: Toast["type"]}) => void, result?: UsecaseErrors) {
  if(result?.type === UsecaseResultType.FIELD_ERROR) {
    return
  }
  addToast({message: result?.data ?? "An error occurred, please try again later", type: "error"})
}

export function handleUsecaseErrors(errors: ApiErrors, errorsMessage: {
  [key in Exclude<UsecaseResultType, UsecaseResultType.SUCCESS | UsecaseResultType.FIELD_ERROR | UsecaseResultType.BAD_REQUEST>]?: string
}): UsecaseErrors {
  switch(errors.type) {
    case ApiResultType.BAD_REQUEST:
      return {type: UsecaseResultType.BAD_REQUEST, data: errors.data}
    case ApiResultType.UNKNOWN_ERROR:
      return {type: UsecaseResultType.UNKNOWN_ERROR, data: errorsMessage[UsecaseResultType.UNKNOWN_ERROR]}
    case ApiResultType.FIELD_ERROR:
      return {type: UsecaseResultType.FIELD_ERROR, data: errors.data}
    case ApiResultType.NOT_FOUND:
      return {type: UsecaseResultType.NOT_FOUND, data: errorsMessage[UsecaseResultType.NOT_FOUND]}
    case ApiResultType.FORBIDDEN:
      return {type: UsecaseResultType.FORBIDDEN, data: errorsMessage[UsecaseResultType.FORBIDDEN]}
    case ApiResultType.UNAUTHORIZED:
      return {type: UsecaseResultType.UNAUTHORIZED, data: errorsMessage[UsecaseResultType.UNAUTHORIZED]}
    default:
      exhaustiveGuard(errors)
  }
  return {type: UsecaseResultType.UNKNOWN_ERROR, data: "An error occurred, please try again later"}
}