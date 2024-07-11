import { Action, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import { AccountRepository } from "./account/models/account-repository";
import { Container } from "inversify";
import { FeedbackRepository } from "./feedbacks/models/feedback.repository";
import { CommentRepository } from "./comments/models/comment.repository";
import { IdProvider } from "./@shared/models/idProvider";

export interface Dependencies {
  feedbackRepository: FeedbackRepository
  accountRepository: AccountRepository
  commentRepository: CommentRepository
  idProvider: IdProvider
}

export const createStore = (container: Container, preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      thunk: {
        extraArgument: {
          feedbackRepository: container.get(FeedbackRepository),
          accountRepository: container.get(AccountRepository),
          commentRepository: container.get(CommentRepository),
          idProvider: container.get(IdProvider)
        }
      }
    }),
    preloadedState
  })
  return store
}

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, Dependencies, Action>