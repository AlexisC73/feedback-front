import { ToastCtx } from "@/Context/ToastCtx/ToastCtx";
import { ToastItem } from "../ToastItem/ToastItem";
import { useContext } from "react";

export function ToastList() {
  const {toasts, deleteToast} = useContext(ToastCtx)

  return (
    <ul className="toast-list w-full items-end px-5 fixed top-4 flex flex-col gap-y-4 z-50">
      {toasts.map(toast => (
        <ToastItem closeToast={deleteToast} key={toast.id} toast={toast} />
      ))}
    </ul>
  )
}