import { getCurrentAuthThunk } from "@/store/auth/usecases/get-current-auth.usecase"
import { AppStore } from "@/store/store"
import { LoaderFunction } from "react-router-dom"

export const createAuthLoader = ({store}: {store: AppStore}): LoaderFunction => async () => {
  await store.dispatch(getCurrentAuthThunk())
  return null
}