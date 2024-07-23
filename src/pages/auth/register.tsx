import { GoBackButton } from "@/components/ui/BoBackButton/GoBackButton";
import Layout from "@/Layout";
import { RegisterComponent } from "@/store/auth/app/register/RegisterComponent";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function RegisterPage() {
  const {t} = useTranslation()
  return (
    <>
      <Helmet>
        <title>{t("pages.register_title")}</title>
      </Helmet>
      <Layout.emptyLayout>
        <div className="px-6 py-8.5 flex w-full flex-col gap-y-13.75 items-start md:max-w-135 md:mx-auto md:px-0 md:my-auto">
          <Link to={"/"}><GoBackButton /></Link>
          <RegisterComponent />
        </div>
      </Layout.emptyLayout>
    </>
  )
}