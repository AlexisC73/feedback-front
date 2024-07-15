import { Toast } from "@/Context/ToastCtx/ToastCtx";
import { ApiErrors, ApiResultType, UsecaseErrors, UsecaseResultType } from "@/store/@shared/models/resultType";
import { exhaustiveGuard } from "@/store/@shared/utiles/exhaustive-guard";

export function handleUsecaseError(addToast: (toast: Toast) => void, result?: UsecaseErrors) {
  if(result?.type === UsecaseResultType.UNKNOWN_ERROR) {
    addToast({message: result.data ?? "An error occurred, please try again later", type: "error", id: new Date().getTime().toString(), autoClose: true})
  }
  if(result?.type === UsecaseResultType.CREDENTIAL_ERROR) {
    addToast({message: result.data ?? "Should not happend, please try again later or contact support.", type: "error", id: new Date().getTime().toString(), autoClose: true})
  }
  if(result?.type === UsecaseResultType.FORBIDDEN) {
    addToast({message: result.data ?? "Should not happend, please try again later or contact support.", type: "error", id: new Date().getTime().toString(), autoClose: true})
  }
  if(result?.type === UsecaseResultType.UNAUTHORIZED) {
    addToast({message: result.data ?? "Should not happend, please try again later or contact support.", type: "error", id: new Date().getTime().toString(), autoClose: true})
  }
}

export function handleUsecaseErrors(errors: ApiErrors, errorsMessage: {
  [key in UsecaseResultType]?: string
}): UsecaseErrors {
  switch(errors.type) {
    case ApiResultType.CREDENTIAL_ERROR:
      return {type: UsecaseResultType.CREDENTIAL_ERROR, data: errorsMessage[UsecaseResultType.CREDENTIAL_ERROR]}
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