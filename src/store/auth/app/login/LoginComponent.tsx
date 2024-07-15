import { LoginForm } from "@/components/form/login-form/LoginForm";
import { useAppDispatch } from "@/store/store-hooks";
import { loginThunk } from "../../usecases/login.usecase";
import { useContext, useState } from "react";
import { UsecaseResultType } from "@/store/@shared/models/resultType";
import { notifyUsecaseError } from "@/helpers/handleUsecaseError";
import { ToastCtx } from "@/Context/ToastCtx/ToastCtx";

export function LoginComponent () {
  const [fieldsErrors, setFieldsErrors] = useState<{[key: string]: string[]}>({})
  const {addToast} = useContext(ToastCtx)
  const dispatch = useAppDispatch()
  const performLogin = async ({email, password}: {email: string, password: string}) => {
    setFieldsErrors({})
    await dispatch(loginThunk({email, password})).then((res) => {
      if(res.payload?.type === UsecaseResultType.FIELD_ERROR) {
        const errors: {[key: string]: string[]} = {}
        res.payload?.data?.forEach((errorField) => {
          errors[errorField.field] = errorField.errors
        })
        setFieldsErrors(errors)
      } else if(res.payload?.type === UsecaseResultType.SUCCESS) {
        return
      } else {
        notifyUsecaseError(addToast, res.payload)
      }
    })
  }
  return (
    <LoginForm fieldsErrors={fieldsErrors} loginFn={performLogin} />
  )
}