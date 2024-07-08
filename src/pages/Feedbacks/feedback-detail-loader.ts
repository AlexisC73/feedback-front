import { getCommentsForFeedbackThunk } from "@/store/comments/usecases/get-comments.usecase";
import { AppStore } from "@/store/store";
import { LoaderFunction } from "react-router-dom";

export const createFeedbackDetailLoader = ({store, feedbackId}: {store: AppStore, feedbackId: string | undefined}): LoaderFunction => () => {
  if(feedbackId) {
    store.dispatch(getCommentsForFeedbackThunk({feedbackId}))
  }
  return null
}