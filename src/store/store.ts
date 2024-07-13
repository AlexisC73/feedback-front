import { Action, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import { AccountRepository } from "./account/models/account-repository";
import { Container } from "inversify";
import { FeedbackRepository } from "./feedbacks/models/feedback.repository";
import { CommentRepository } from "./comments/models/comment.repository";
import { IdProvider } from "./@shared/models/idProvider";
import { Dependencies } from "@/injection/container";

export const createStore = (container: Container, preloadedState?: Partial<RootState>) => {

  const dependencies: Dependencies = {
    accountRepository: container.get(AccountRepository),
    feedbackRepository: container.get(FeedbackRepository),
    commentRepository: container.get(CommentRepository),
    idProvider: container.get(IdProvider)
  }

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