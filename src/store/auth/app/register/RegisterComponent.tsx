import { RegisterForm } from "@/components/form/register-form/RegisterForm";
import { useAppDispatch } from "@/store/store-hooks";
import { registerThunk } from "../../usecases/register.usecase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsecaseResultType } from "@/store/@shared/models/resultType";
export function RegisterComponent () {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [errors, setErrors] = useState<{[key: string]: string[]}>({})

  const performRegister = async ({email, password, confirmationPassword}: {email: string, password: string, confirmationPassword: string}) => {
    setErrors({})
    dispatch(registerThunk({email, password, confirmationPassword})).then(res => {
      if(res.payload?.type === UsecaseResultType.SUCCESS) {
        navigate("/auth/login") // TODO: show a success message as a toast ?
      } 
      if(res.payload?.type === UsecaseResultType.FIELD_ERROR) {
        const errors: {[key: string]: string[]} = {}
        res.payload.data.forEach(fieldError => errors[fieldError.field] = fieldError.errors)
        setErrors(errors)
        }
    })
  }

  return (
    <RegisterForm registerFn={performRegister} fieldsErrors={errors} />
  )
}