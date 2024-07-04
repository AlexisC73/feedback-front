import { RegisterForm } from "@/components/form/register-form/RegisterForm";
import { useAppDispatch } from "@/store/store-hooks";
import { registerThunk, RegisterThunkResultType } from "../../usecases/register.usecase";
import { unwrapResult } from "@reduxjs/toolkit";

export function RegisterComponent () {
  const dispatch = useAppDispatch()

  const performRegister = async ({email, password}: {email: string, password: string}) => {
    dispatch(registerThunk({email, password})).then(unwrapResult).then(res => {
      if(res.type === RegisterThunkResultType.SUCCESS) {
        alert("User registered with email " + email)
      }
    })
  }

  return (
    <RegisterForm registerFn={performRegister} />
  )
}