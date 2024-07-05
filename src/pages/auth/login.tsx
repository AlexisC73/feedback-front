import Layout from "@/Layout";
import { LoginComponent } from "@/store/auth/app/login/LoginComponent";
import { selectAuth } from "@/store/auth/auth-reducer";
import { useAppSelector } from "@/store/store-hooks";
import { Navigate, useLocation } from "react-router-dom";

export function LoginPage() {
  const auth = useAppSelector(selectAuth)
  const params = new URLSearchParams(useLocation().search)
  const returnPath = params.get("path") || "/"

  if(auth.account !== null) {
    return <Navigate to={returnPath} />
  }

  return (
    <Layout.emptyLayout>
      <div className="px-6 py-8.5 flex w-full flex-col gap-y-13.75 items-start md:max-w-135 md:mx-auto md:px-0 md:my-auto">
        <LoginComponent />
      </div>
    </Layout.emptyLayout>
  )
}