import Layout from "@/Layout";
import { RegisterComponent } from "@/store/auth/app/register/RegisterComponent";

export function RegisterPage() {
  return (
    <Layout.emptyLayout>
      <div className="px-6 py-8.5 flex w-full flex-col gap-y-13.75 items-start md:max-w-135 md:mx-auto md:px-0 md:my-auto">
        <RegisterComponent />
      </div>
    </Layout.emptyLayout>
  )
}