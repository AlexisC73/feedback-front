import { ToastList } from "@/components/Toast/ToastList/ToastList"
import { createContext, PropsWithChildren, useCallback, useState } from "react"

export interface Toast {
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  id: string,
  autoClose?: boolean
}

interface ToastCtxType {
  toasts: Toast[]
  addToast: (toast: {message: string, autoClose?: boolean, type?: Toast["type"]}) => void
  deleteToast: (id: string) => void
}

export const ToastCtx = createContext<ToastCtxType>({
  toasts: [],
  addToast: () => {},
  deleteToast: () => {}
})

export const ToastContextProvider = ({children}: PropsWithChildren) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: {message: string, autoClose?: boolean, type?: Toast["type"]}) => {
    setToasts([...toasts, {id: new Date().getTime().toString(), autoClose: toast.autoClose ?? true, message: toast.message, type: toast.type ?? "info"}])
  }

  const deleteToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const toastContext: ToastCtxType = {
    toasts,
    addToast,
    deleteToast
  }

  return (
    <ToastCtx.Provider value={toastContext}>
      <ToastList />
      {children}
    </ToastCtx.Provider>
  )
}