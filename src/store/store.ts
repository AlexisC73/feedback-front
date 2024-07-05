import { Action, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import { AccountRepository } from "./account/models/account-repository";
import { FeedbackRepository } from "./feedbacks/models/feedback.repository";
import { InMemoryAccountRepository } from "./account/infra/in-memory-account.repository";
import { InMemoryFeedbackRepository } from "./feedbacks/infra/in-memory-feedback.repository";

export interface Dependencies {
  accountRepository: AccountRepository
  feedbackRepository: FeedbackRepository
}

export const createStore = (dependencies: Dependencies) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      thunk: {
        extraArgument: dependencies
      }
    })
  })
  return store
}

export const createTestStore = ({
  accountRepository = new InMemoryAccountRepository(),
  feedbackRepository = new InMemoryFeedbackRepository()
}: Partial<Dependencies> = {}) => {
  const store = createStore({accountRepository, feedbackRepository})
  return store
}

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, Dependencies, Action>