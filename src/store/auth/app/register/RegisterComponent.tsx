import { RegisterForm } from "@/components/form/register-form/RegisterForm";
import { useAppDispatch } from "@/store/store-hooks";
import { registerThunk } from "../../usecases/register.usecase";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsecaseResultType } from "@/store/@shared/models/resultType";
import { ToastCtx } from "@/Context/ToastCtx/ToastCtx";
import { handleUsecaseError } from "@/helpers/handleUsecaseError";

export function RegisterComponent () {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {addToast} = useContext(ToastCtx)

  const [errors, setErrors] = useState<{[key: string]: string[]}>({})

  const performRegister = async ({email, password, confirmationPassword, displayName, username}: {email: string, password: string, confirmationPassword: string, displayName: string, username: string}) => {
    setErrors({})
    dispatch(registerThunk({email, password, confirmationPassword, displayName, username})).then(res => {
      if(res.payload?.type === UsecaseResultType.SUCCESS) {
        addToast({message: "Account created successfully", type: "success", id: new Date().getTime().toString()})
        navigate("/auth/login")
      } else if(res.payload?.type === UsecaseResultType.FIELD_ERROR) {
        const errors: {[key: string]: string[]} = {}
        res.payload.data.forEach(fieldError => errors[fieldError.field] = fieldError.errors)
        setErrors(errors)
      } else {
        handleUsecaseError(addToast, res.payload)
      }
    })
  }

  return (
    <RegisterForm registerFn={performRegister} fieldsErrors={errors} />
  )
}