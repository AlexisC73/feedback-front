import { createReducer } from "@reduxjs/toolkit"
import { Account } from "../account/models/account"
import { registerThunk } from "./usecases/register.usecase"

export interface AuthState {
  account: Account | null
  loading: boolean
}

const initialState: AuthState = {
  account: null,
  loading: false
}

export const authReducer = createReducer(initialState, (builder) => {
  builder.addCase(registerThunk.fulfilled, (state) => {
    state.loading = false
  }).addCase(registerThunk.pending, (state) => {
    state.loading = true
  }).addCase(registerThunk.rejected, (state) => {
    state.loading = false
  })
})