import { Action, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import { AccountRepository } from "./account/models/account-repository";
import { FeedbackRepository } from "./feedbacks/models/feedback.repository";
import { IdProvider } from "./@shared/models/idProvider";
import { CommentRepository } from "./comments/models/comment.repository";

export interface Dependencies {
  accountRepository: AccountRepository
  feedbackRepository: FeedbackRepository
  idProvider: IdProvider,
  commentRepository: CommentRepository
}

export const createStore = (dependencies: Dependencies, preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      thunk: {
        extraArgument: dependencies
      }
    }),
    preloadedState
  })
  return store
}

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, Dependencies, Action>