import { Toast } from "@/Context/ToastCtx/ToastCtx";
import { UsecaseErrors, UsecaseResultType } from "@/store/@shared/models/resultType";

export function handleUsecaseError(addToast: (toast: Toast) => void, result?: UsecaseErrors) {
  if(result?.type === UsecaseResultType.UNKNOWN_ERROR) {
    addToast({message: "An error occurred, please try again later", type: "error", id: new Date().getTime().toString()})
  }
  if(result?.type === UsecaseResultType.CREDENTIAL_ERROR) {
    addToast({message: "Email or password invalid", type: "error", id: new Date().getTime().toString()})
  }
  if(result?.type === UsecaseResultType.FORBIDDEN) {
    addToast({message: result.data ?? "You are not allowed to do this.", type: "error", id: new Date().getTime().toString()})
  }
  if(result?.type === UsecaseResultType.NOT_FOUND) {
    addToast({message: result.data, type: "error", id: new Date().getTime().toString()})
  }
}