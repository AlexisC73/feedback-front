import { ToastList } from "@/components/Toast/ToastList/ToastList"
import { createContext, PropsWithChildren, useState } from "react"

export interface Toast {
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  id: string
}

interface ToastCtxType {
  toasts: Toast[]
  addToast: (toast: Toast) => void
  deleteToast: (id: string) => void
}

export const ToastCtx = createContext<ToastCtxType>({
  toasts: [],
  addToast: () => {},
  deleteToast: () => {}
})

export const ToastContextProvider = ({children}: PropsWithChildren) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Toast) => {
    setToasts([...toasts, toast])
  }

  const deleteToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

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