import { getCurrentAuthThunk } from "@/store/auth/usecases/get-current-auth.usecase";
import { getFeedbacksThunk } from "@/store/feedbacks/usecases/get-feedbacks.usecase";
import { AppStore } from "@/store/store";
import { LoaderFunction } from "react-router-dom";

export const createRoadmapLoader = ({store}: {store: AppStore}): LoaderFunction => async () => {
  await store.dispatch(getCurrentAuthThunk())
  await store.dispatch(getFeedbacksThunk())
  return null
}