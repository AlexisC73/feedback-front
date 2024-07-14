import { ToastCloseIcon, ToastErrorIcon, ToastSuccessIcon, ToastWarningIcon } from "@/assets/icons";
import { Toast } from "@/Context/ToastCtx/ToastCtx";
import { ReactElement, useEffect } from "react";

export function ToastItem ({toast, closeToast}: {toast: Toast, closeToast: (id: string) => void}) {

  useEffect(() => {
    if(!toast.autoClose) return
    const timer = setTimeout(() => {
      closeToast(toast.id)
    }, 2000)

    return () => clearTimeout(timer)
  }, [toast, closeToast])

  const style: {[key in Toast["type"]]: {class: string, icon: ReactElement, srOnly: string, slideColor: string}} = {
    success: {
      class: "text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200",
      icon: <ToastSuccessIcon />,
      srOnly: "check-icon",
      slideColor: "bg-green-300"
    },
    error: {
      class: "text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200",
      icon: <ToastErrorIcon />,
      srOnly: "error-icon",
      slideColor: "bg-red-300"
    },
    warning: {
      class: "text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200",
      icon: <ToastWarningIcon />,
      srOnly: "warning-icon",
      slideColor: "bg-orange-300"
    },
    info: {
      class: "text-blue-500 bg-blue-100 dark:bg-blue-800 dark:text-blue-200",
      icon: <ToastWarningIcon />,
      srOnly: "info-icon",
      slideColor: "bg-blue-300"
    },
  }

  return (
    <div id={`toast-${toast.type}`} className="relative overflow-hidden flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
      <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${style[toast.type].class}`}>
        {style[toast.type].icon}
        <span className="sr-only">{style[toast.type].srOnly}</span>
      </div>
      <div className="ms-3 text-sm font-normal pr-2">{toast.message}</div>
      <button onClick={() =>closeToast(toast.id)} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
          <span className="sr-only">Close</span>
          <ToastCloseIcon />
      </button>
      <div className="left-0 right-0 h-0.75 absolute bottom-0 overflow-hidden">
        <div className={`w-full h-full rounded-lg ${style[toast.type].slideColor} ${toast.autoClose ? "toast-close-anim" : "hidden"}`}></div>
      </div>
    </div>
  )
}