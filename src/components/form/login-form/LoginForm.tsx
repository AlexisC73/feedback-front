import { Button } from "@/components/Button/button";
import { FormGroup } from "../form-group/FormGroup";
import { InputHeader } from "../input-header/InputHeader";
import { Input } from "../input/Input";
import { Link } from "react-router-dom";

export interface LoginFormProps {
  loginFn: (props: {email: string, password: string}) => Promise<void>
}

export function LoginForm ({ loginFn }: LoginFormProps) {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const email = formData.get("email")?.toString() ?? ""
    const password = formData.get("password")?.toString() ?? ""
    loginFn({ email, password})
  }
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 pt-11 w-full rounded-2.5 flex flex-col gap-y-6 relative">
          <div className="bg-custom-radial h-10 w-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white absolute -top-5 md:-top-7 text-5 md:text-6 font-bold">+</div>
          <p className="text-4.5 font-bold text-#3A4374 line-height-6.5 mb-6">Sign In</p>
          <FormGroup>
            <InputHeader htmlFor="email" label="Mail address" />
            <Input name="email" />
          </FormGroup>
          <FormGroup>
            <InputHeader htmlFor="password" label="Password" />
            <Input name="password" />
          </FormGroup>
          <div className="mt-10 flex flex-col gap-y-4 md:flex-row md:justify-end md:gap-x-4">
            <button type="submit" className="w-full md:order-last">
              <Button fullWidth>Sign In</Button>
            </button>
          </div>
          <p>Vous n'avez pas de compte ? <Link className="text-#AD1FEA underline" to={"/auth/register"}>Créez votre compte ici</Link></p>
        </form>
  )
}