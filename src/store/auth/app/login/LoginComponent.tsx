import { LoginForm } from "@/components/form/login-form/LoginForm";
import { useAppDispatch } from "@/store/store-hooks";
import { loginThunk, LoginThunkResultType } from "../../usecases/login.usecase";
import { useState } from "react";

export function LoginComponent () {
  const [fieldsError, setFieldsError] = useState<{[key: string]: string}>({})
  const dispatch = useAppDispatch()
  const performLogin = async ({email, password}: {email: string, password: string}) => {
    setFieldsError({})
    dispatch(loginThunk({email, password})).then((res) => {
      if(res.meta.requestStatus === "fulfilled") {
        console.log(res.payload)
      } else {
        if(res.payload?.type === LoginThunkResultType.FIELD_ERROR) {
          const errors: {[key: string]: string} = {}
          res.payload.errors.forEach((errorField) => {
            errors[errorField.field] = errorField.errors[0]
          })
          setFieldsError(errors)
        }
      }
    })
  }
  return (
    <LoginForm fieldsError={fieldsError} loginFn={performLogin} />
  )
}