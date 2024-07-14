import { getCurrentAuthThunk } from "@/store/auth/usecases/get-current-auth.usecase";
import { getCommentsForFeedbackThunk } from "@/store/comments/usecases/get-comments.usecase";
import { AppStore } from "@/store/store";
import { LoaderFunction } from "react-router-dom";

export const createFeedbackDetailLoader = ({store}: {store: AppStore}): LoaderFunction => async ({params}) => {
  const feedbackId = params.id
  if(feedbackId) {
    if(!store.getState().auth.account) {
      await store.dispatch(getCurrentAuthThunk())
    }
    store.dispatch(getCommentsForFeedbackThunk({feedbackId}))
  }
  return null
}
