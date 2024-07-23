import { GoBackButton } from "@/components/ui/BoBackButton/GoBackButton";
import Layout from "@/Layout";
import { LoginComponent } from "@/store/auth/app/login/LoginComponent";
import { selectAuth } from "@/store/auth/auth-reducer";
import { useAppSelector } from "@/store/store-hooks";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet'
import { useTranslation } from "react-i18next";

export function LoginPage() {
  const auth = useAppSelector(selectAuth)
  const params = new URLSearchParams(useLocation().search)
  const {t} = useTranslation()
  const returnPath = params.get("path") || "/"

  if(auth.account !== null) {
    return <Navigate to={returnPath} />
  }

  return (
    <>
      <Helmet>
        <title>{t('pages.login_title')}</title>
      </Helmet>
      <Layout.emptyLayout>
        <div className="px-6 py-8.5 flex w-full flex-col gap-y-13.75 items-start md:max-w-135 md:mx-auto md:px-0 md:my-auto">
          <Link to={"/"}><GoBackButton /></Link>
          <LoginComponent />
        </div>
      </Layout.emptyLayout>
    </>
  )
}