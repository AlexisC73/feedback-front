import { registerThunk, RegisterUsecaseParams } from "@/store/auth/usecases/register.usecase"
import { expect } from "vitest"
import { AuthState } from "@/store/auth/auth-reducer"
import { loginThunk, LoginUsecaseParams } from "@/store/auth/usecases/login.usecase"
import { Account, AccountWithPassword, Role } from "../models/account"
import { StateBuilder } from "@/store/state-builder"
import { getCurrentAuthThunk } from "@/store/auth/usecases/get-current-auth.usecase"
import { logoutThunk } from "@/store/auth/usecases/logout.usecase"

export const createAccountFixture = ( stateBuilder: StateBuilder) => {

  let resultType: string | undefined

  return {
    givenNoAccountExists() {
      stateBuilder.getAccountRepository().accounts = []
    },
    givenIsAuthenticatedAs(authAccount: Account) {
      this.givenIsApiAuthAs(authAccount)
      this.givenIsStateAuthAs(authAccount)
    },
    givenIsStateAuthAs(account: Account) {
      stateBuilder.setStore({...stateBuilder.getStore().getState(), auth: {account, loading: false}})
    },
    givenIsApiAuthAs(authAccount: Account) {
      stateBuilder.getAccountRepository().loggedAccount = authAccount
    },
    givenAccountExists(accounts: AccountWithPassword[]) {
      stateBuilder.getAccountRepository().accounts = accounts
    },
    async whenAccountRegister(registerPayload: RegisterUsecaseParams) {
        const result = await stateBuilder.getStore().dispatch(registerThunk(registerPayload))
        resultType = result.payload?.type
    },
    async whenUserLogin(loginParam: LoginUsecaseParams) {
      await stateBuilder.getStore().dispatch(loginThunk(loginParam))
    },
    async whenRetrievingCurrentAuth() {
      const result = await stateBuilder.getStore().dispatch(getCurrentAuthThunk())
      resultType = result.payload?.type
    },
    async whenUserLogout() {
      const result = await stateBuilder.getStore().dispatch(logoutThunk())
      resultType = result.payload?.type
    },
    thenResultTypeShouldBe(expectedType: string) {
      expect(resultType).toBe(expectedType)
    },
    thenAccountShouldExist( { email, role, displayName, username }: { email: string, role: Role, displayName: string, username: string } ) {
      const repoAccount = stateBuilder.getAccountRepository().accounts.find(a => a.email === email)
      expect(repoAccount).toMatchObject({
        id: expect.any(String),
        email,
        role,
        displayName,
        username
      })
    },
    thenAccountShouldNotExist(email: string) {
      const repoAccount = stateBuilder.getAccountRepository().accounts.find(a => a.email === email)
      expect(repoAccount).toBeUndefined()
    },
    thenAuthStateShouldBe(expectedAuthState: AuthState) {
      expect(stateBuilder.getStore().getState().auth).toMatchObject(expectedAuthState)
    }
  }
}

export type AccountFixture = ReturnType<typeof createAccountFixture>