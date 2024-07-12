import { registerThunk, RegisterUsecaseParams } from "@/store/auth/usecases/register.usecase"
import { expect } from "vitest"
import { EmailVO } from "@/store/value-objects/email"
import { AuthState } from "@/store/auth/auth-reducer"
import { loginThunk, LoginUsecaseParams } from "@/store/auth/usecases/login.usecase"
import { Account, AccountWithPassword, Role } from "../models/account"
import { StateBuilder } from "@/store/state-builder"
import { getCurrentAuthThunk } from "@/store/auth/usecases/get-current-auth.usecase"

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
    thenResultTypeShouldBe(expectedType: string) {
      expect(resultType).toBe(expectedType)
    },
    thenAccountShouldExist( { email, role }: { email: EmailVO, role: Role } ) {
      const repoAccount = stateBuilder.getAccountRepository().accounts.find(a => a.email === email.value)
      expect(repoAccount?.email).toBe(email.value)
      expect(repoAccount?.role).toBe(role)
    },
    thenAccountShouldNotExist(email: EmailVO) {
      const repoAccount = stateBuilder.getAccountRepository().accounts.find(a => a.email === email.value)
      expect(repoAccount).toBeUndefined()
    },
    thenAuthStateShouldBe(expectedAuthState: AuthState) {
      expect(stateBuilder.getStore().getState().auth).toMatchObject(expectedAuthState)
    }
  }
}

export type AccountFixture = ReturnType<typeof createAccountFixture>