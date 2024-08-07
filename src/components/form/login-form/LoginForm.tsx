import { Button } from "@/components/ui/Button/button";
import { FormGroup } from "../form-group/FormGroup";
import { InputHeader } from "../input-header/InputHeader";
import { Input } from "../input/Input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface LoginFormProps {
  loginFn: (props: {email: string, password: string}) => Promise<void>
  fieldsErrors: {[key: string]: string[]}
}

export function LoginForm ({ loginFn, fieldsErrors }: LoginFormProps) {
  const {t} = useTranslation()

  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsProcessing(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    const email = formData.get("email")?.toString() ?? ""
    const password = formData.get("password")?.toString() ?? ""
    loginFn({ email, password}).finally(() => setIsProcessing(false))
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 pt-11 w-full rounded-2.5 flex flex-col gap-y-6 relative">
          <div className="bg-custom-radial h-10 w-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white absolute -top-5 md:-top-7 text-5 md:text-6 font-bold">+</div>
          <p className="text-4.5 font-bold text-#3A4374 line-height-6.5 mb-6">{t("login_form.title")}</p>
          <FormGroup>
            <InputHeader htmlFor="email" label={t("login_form.email_label")} />
            <Input name="email" errors={fieldsErrors.email} />
          </FormGroup>
          <FormGroup>
            <InputHeader htmlFor="password" label={t("login_form.password_label")} />
            <Input name="password" type="password" errors={fieldsErrors.password} />
          </FormGroup>
          <div className="mt-10 flex flex-col gap-y-4 md:flex-row md:justify-end md:gap-x-4">
            <button disabled={isProcessing} type="submit" className="w-full md:order-last disabled:bg-opacity-50">
              <Button isLoading={isProcessing} fullWidth>{t("login_form.signin_button")}</Button>
            </button>
          </div>
          <p>{t("login_form.no_account")} <Link className="text-#AD1FEA underline" to={"/auth/register"}>{t("login_form.signup_link")}</Link></p>
        </form>
  )
}