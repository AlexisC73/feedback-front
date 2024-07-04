import { ReactNode } from "react";
import { getAuthSelector } from "@/store/auth/auth-reducer"; 
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/store/store-hooks";

export function RequireAuth({page}: {page: ReactNode}) {
  const auth = useAppSelector(getAuthSelector)
  const location = useLocation()
  const returnPath = location.pathname !== "/" ? "?path=" + location.pathname : ""

  return !auth.account ? <Navigate to={`/auth/login${returnPath}`} /> : page
}