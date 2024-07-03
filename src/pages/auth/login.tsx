import { Button } from "@/components/Button/button";
import { FormGroup } from "@/components/form/form-group/FormGroup";
import { InputHeader } from "@/components/form/input-header/InputHeader";
import { Input } from "@/components/form/input/Input";
import Layout from "@/Layout";
import { Link } from "react-router-dom";

export function LoginPage() {
  return (
    <Layout.emptyLayout>
      <div className="px-6 py-8.5 flex w-full flex-col gap-y-13.75 items-start md:max-w-135 md:mx-auto md:px-0 md:my-auto">
        <form className="bg-white p-6 pt-11 w-full rounded-2.5 flex flex-col gap-y-6 relative">
          <div className="bg-custom-radial h-10 w-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white absolute -top-5 md:-top-7 text-5 md:text-6 font-bold">+</div>
          <p className="text-4.5 font-bold text-#3A4374 line-height-6.5 mb-6">Sign In</p>
          <FormGroup>
            <InputHeader htmlFor="email" label="Mail address" />
            <Input />
          </FormGroup>
          <FormGroup>
            <InputHeader htmlFor="password" label="Password" />
            <Input />
          </FormGroup>
          <div className="mt-10 flex flex-col gap-y-4 md:flex-row md:justify-end md:gap-x-4">
            <div className="w-full md:order-last">
              <Button fullWidth>Sign In</Button>
            </div>
          </div>
          <p>Vous n'avez pas de compte ? <Link className="text-#AD1FEA underline" to={"/auth/register"}>Créez votre compte ici</Link></p>
        </form>
      </div>
    </Layout.emptyLayout>
  )
}