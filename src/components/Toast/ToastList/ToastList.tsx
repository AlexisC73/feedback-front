import { ToastCtx } from "@/Context/ToastCtx/ToastCtx";
import { ToastItem } from "../ToastItem/ToastItem";
import { useContext } from "react";

export function ToastList() {
  const {toasts, deleteToast} = useContext(ToastCtx)

  return (
    <ul className="toast-list absolute right-10 top-4 flex flex-col gap-y-4">
      {toasts.map(toast => (
        <ToastItem closeToast={() => deleteToast(toast.id)} key={toast.id} toast={toast} />
      ))}
    </ul>
  )
}