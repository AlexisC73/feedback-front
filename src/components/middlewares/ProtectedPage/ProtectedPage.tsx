import { ReactNode } from "react";
import { selectAuth } from "@/store/auth/auth-reducer"; 
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/store/store-hooks";

export function RequireAuth({page}: {page: ReactNode}) {
  const auth = useAppSelector(selectAuth)
  const location = useLocation()
  const returnPath = location.pathname !== "/" ? "?path=" + location.pathname : ""

  return !auth.account ? <Navigate to={`/auth/login${returnPath}`} /> : page
}