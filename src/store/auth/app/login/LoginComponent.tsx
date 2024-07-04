import { LoginForm } from "@/components/form/login-form/LoginForm";
import { useAppDispatch } from "@/store/store-hooks";
import { loginThunk } from "../../usecases/login.usecase";

export function LoginComponent () {
  const dispatch = useAppDispatch()
  const performLogin = async ({email, password}: {email: string, password: string}) => {
    dispatch(loginThunk({email, password}))
  }
  return (
    <LoginForm loginFn={performLogin} />
  )
}