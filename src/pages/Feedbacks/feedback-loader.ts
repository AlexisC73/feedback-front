import { getCurrentAuthThunk } from "@/store/auth/usecases/get-current-auth.usecase";
import { getFeedbacksThunk } from "@/store/feedbacks/usecases/get-feedbacks.usecase";
import { AppStore } from "@/store/store";
import { LoaderFunction } from "react-router-dom";

export const createFeedbackLoader = ({store}: {store: AppStore}): LoaderFunction => () => {
  store.dispatch(getFeedbacksThunk())
  store.dispatch(getCurrentAuthThunk())
  return null
}