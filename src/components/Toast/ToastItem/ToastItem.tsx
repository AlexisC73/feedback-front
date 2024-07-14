import { ToastCloseIcon, ToastErrorIcon, ToastSuccessIcon, ToastWarningIcon } from "@/assets/icons";
import { Toast } from "@/Context/ToastCtx/ToastCtx";
import { ReactElement } from "react";

export function ToastItem ({toast, closeToast}: {toast: Toast, closeToast: () => void}) {

  const style: {[key in Toast["type"]]: {class: string, icon: ReactElement, srOnly: string}} = {
    success: {
      class: "text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200",
      icon: <ToastSuccessIcon />,
      srOnly: "check-icon"
    },
    error: {
      class: "text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200",
      icon: <ToastErrorIcon />,
      srOnly: "error-icon"
    },
    warning: {
      class: "text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200",
      icon: <ToastWarningIcon />,
      srOnly: "warning-icon"
    },
    info: {
      class: "text-blue-500 bg-blue-100 dark:bg-blue-800 dark:text-blue-200",
      icon: <ToastWarningIcon />,
      srOnly: "info-icon"
    },
  }

  return (
    <div id={`toast-${toast.type}`} className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
      <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${style[toast.type].class}`}>
          {style[toast.type].icon}
          <span className="sr-only">{style[toast.type].srOnly}</span>
      </div>
      <div className="ms-3 text-sm font-normal pr-2">{toast.message}</div>
      <button onClick={closeToast} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
          <span className="sr-only">Close</span>
          <ToastCloseIcon />
      </button>
  </div>
  )
}