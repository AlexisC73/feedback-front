import { LoginForm } from "@/components/form/login-form/LoginForm";
import { useAppDispatch } from "@/store/store-hooks";
import { loginThunk } from "../../usecases/login.usecase";
import { useState } from "react";
import { UsecaseResultType } from "@/store/@shared/models/resultType";

export function LoginComponent () {
  const [fieldsErrors, setFieldsErrors] = useState<{[key: string]: string[]}>({})
  const dispatch = useAppDispatch()
  const performLogin = async ({email, password}: {email: string, password: string}) => {
    setFieldsErrors({})
    dispatch(loginThunk({email, password})).then((res) => {
      if(res.payload?.type === UsecaseResultType.FIELD_ERROR) {
        const errors: {[key: string]: string[]} = {}
        res.payload?.data?.forEach((errorField) => {
          errors[errorField.field] = errorField.errors
        })
        setFieldsErrors(errors)
      } else if(res.payload?.type === UsecaseResultType.CREDENTIAL_ERROR) {
        console.log("Invalid credentials, or account does not exist") // TODO add error message to the UI. ex: toast ?
      }
    })
  }
  return (
    <LoginForm fieldsErrors={fieldsErrors} loginFn={performLogin} />
  )
}