import { Action, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import { AccountRepository } from "./account/models/account-repository";

export interface Dependencies {
  accountRepository: AccountRepository
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

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, Dependencies, Action>