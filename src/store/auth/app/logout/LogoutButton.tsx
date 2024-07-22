import { LogoutIcon } from "@/assets/icons";
import { Button } from "@/components/ui/Button/button";
import { useAppDispatch } from "@/store/store-hooks";
import { useTranslation } from "react-i18next";
import { logoutThunk } from "../../usecases/logout.usecase";
import { UsecaseResultType } from "@/store/@shared/models/resultType";
import { notifyUsecaseError } from "@/helpers/handleUsecaseError";
import { useContext } from "react";
import { ToastCtx } from "@/Context/ToastCtx/ToastCtx";

export function LogoutButton() {
  const {t} = useTranslation()
  const dispatch = useAppDispatch()
  const {addToast} = useContext(ToastCtx)

  const handleLogout = () => {
    dispatch(logoutThunk()).then((res) => {
      if(res.payload?.type === UsecaseResultType.SUCCESS) {
        return
      } else {
        notifyUsecaseError(addToast, res.payload)
      }
    })
  }

  return (
    <button onClick={handleLogout}><Button type="tertiary"><LogoutIcon className="text-5" /> {t("logout_label")}</Button></button>
  )
}