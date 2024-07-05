import { Link } from "react-router-dom";
import { FormGroup } from "../form-group/FormGroup";
import { InputHeader } from "../input-header/InputHeader";
import { Input } from "../input/Input";
import { Button } from "@/components/Button/button";

interface RegisterFormProps {
  registerFn: (props: {email: string, password: string, confirmationPassword: string}) => Promise<void>
  fieldsErrors: {[key: string]: string[]}
}

export function RegisterForm ({registerFn, fieldsErrors}: RegisterFormProps) {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const email = formData.get("email")?.toString() ?? ""
    const password = formData.get("password")?.toString() ?? ""
    const confirmationPassword = formData.get("confirmation-password")?.toString() ?? ""
    registerFn({ email, password, confirmationPassword})
  }
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 pt-11 w-full rounded-2.5 flex flex-col gap-y-4 relative">
      <div className="bg-custom-radial h-10 w-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white absolute -top-5 md:-top-7 text-5 md:text-6 font-bold">+</div>
      <p className="text-4.5 font-bold text-#3A4374 line-height-6.5 mb-6">Create your account</p>
      <FormGroup>
        <InputHeader htmlFor="email" label="Mail address" />
        <Input name="email" errors={fieldsErrors.email} />
      </FormGroup>
      <FormGroup>
        <InputHeader htmlFor="password" label="Password" />
        <Input name="password" type="password" errors={fieldsErrors.password} />
      </FormGroup>
      <FormGroup>
        <InputHeader htmlFor="confirmation-password" label="Verification password" description="Re-type your password" />
        <Input name="confirmation-password" type="password" errors={fieldsErrors.confirmationPassword} />
      </FormGroup>
      <div className="mt-10 flex flex-col gap-y-4 md:flex-row md:justify-end md:gap-x-4">
        <button type="submit" className="w-full md:order-last">
          <Button fullWidth>Register Account</Button>
        </button>
      </div>
      <p className="mt-4">Vous avez déjà un compte ? <Link className="text-#AD1FEA underline" to={"/auth/login"}>Connectez vous ici</Link></p>
    </form>
  )
}