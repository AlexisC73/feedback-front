import { RegisterForm } from "@/components/form/register-form/RegisterForm";
import { useAppDispatch } from "@/store/store-hooks";
import { registerThunk, RegisterThunkResultType } from "../../usecases/register.usecase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export function RegisterComponent () {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const performRegister = async ({email, password, confirmationPassword}: {email: string, password: string, confirmationPassword: string}) => {
    setErrors({})
    dispatch(registerThunk({email, password, confirmationPassword})).then(res => {
      if(res.meta.requestStatus === "fulfilled") {
        if(res.payload?.type === RegisterThunkResultType.SUCCESS) {
          navigate("/auth/login") // TODO: show a success message as a toast ?
        }
      } else {
        if(res.payload?.type === RegisterThunkResultType.FIELD_ERROR) {
          const errors: {[key: string]: string} = {}
          console.log(res.payload.errors)
          res.payload.errors.forEach(fieldError => errors[fieldError.field] = fieldError.errors[0])
          setErrors(errors)
         }
      }
    })
  }

  return (
    <RegisterForm registerFn={performRegister} fieldsError={errors} />
  )
}