import { getFeedbacksThunk } from "@/store/feedbacks/usecases/get-feedbacks.usecase";
import { AppStore } from "@/store/store";
import { LoaderFunction } from "react-router-dom";

export const createFeedbackLoader = ({store}: {store: AppStore}): LoaderFunction => () => {
  store.dispatch(getFeedbacksThunk())
  return null
}