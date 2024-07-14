import { getCommentsForFeedbackThunk } from "@/store/comments/usecases/get-comments.usecase";
import { AppStore } from "@/store/store";
import { LoaderFunction } from "react-router-dom";

export const createFeedbackDetailLoader = ({store}: {store: AppStore}): LoaderFunction => async ({params}) => {
  const feedbackId = params.id
  if(feedbackId) {
    store.dispatch(getCommentsForFeedbackThunk({feedbackId}))
  }
  return null
}
