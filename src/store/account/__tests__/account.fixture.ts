import { registerThunk, RegisterUsecaseParams } from "@/store/auth/usecases/register.usecase"
import { expect } from "vitest"
import { EmailVO } from "@/store/value-objects/email"
import { AuthState } from "@/store/auth/auth-reducer"
import { loginThunk, LoginUsecaseParams } from "@/store/auth/usecases/login.usecase"
import { AccountWithPassword, Role } from "../models/account"
import { StateBuilder } from "@/store/state-builder"

export const createAccountFixture = ( stateBuilder: StateBuilder) => {

  let resultType: string | undefined

  return {
    givenNoAccountExists() {
      stateBuilder.getAccountRepository().accounts = []
    },
    givenIsAuthenticatedAs(authAccount: AuthState["account"]) {
      stateBuilder.setStore({...stateBuilder.getStore().getState(), auth: {account: authAccount, loading: false}})
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