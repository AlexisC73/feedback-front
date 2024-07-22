import { createReducer } from "@reduxjs/toolkit"
import { Account } from "../account/models/account"
import { loginThunk } from "./usecases/login.usecase"
import { RootState } from "../store"
import { UsecaseResultType } from "../@shared/models/resultType"
import { getCurrentAuthThunk } from "./usecases/get-current-auth.usecase"
import { logoutThunk } from "./usecases/logout.usecase"

export interface AuthState {
  account: Account | null
  loading: boolean
}

const initialState: AuthState = {
  account: null,
  loading: false
}

export const authReducer = createReducer(initialState, (builder) => {
  builder.addCase(loginThunk.fulfilled, (state, action) => {
    if(action.payload?.type === UsecaseResultType.SUCCESS) {
      if(action.payload.data) {
        state.account = action.payload.data
      }
    }
  }).addCase(getCurrentAuthThunk.fulfilled, (state, action) => {
    if(action.payload?.type === UsecaseResultType.SUCCESS) {
      if(action.payload.data) {
        state.account = action.payload.data
      }
    }
    state.loading = false
  }).addCase(getCurrentAuthThunk.pending, (state) => {
    state.loading = true
  }).addCase(getCurrentAuthThunk.rejected, (state) => {
    state.loading = false
  }).addCase(logoutThunk.fulfilled, (state) => {
    state.account = null
  })
})

export const selectAuth = (state: RootState) => state.auth
