import { registerThunk, RegisterUsecaseParams } from "@/store/auth/usecases/register.usecase"
import { InMemoryAccountRepository } from "../infra/in-memory-account.repository"
import { expect } from "vitest"
import { AppStore } from "@/store/store"
import { EmailVO } from "@/store/value-objects/email"
import { AuthState } from "@/store/auth/auth-reducer"
import { loginThunk, LoginUsecaseParams } from "@/store/auth/usecases/login.usecase"
import { DomainAccount } from "../models/account"

export const createAccountFixture = (store: AppStore, { accountRepository }: { accountRepository: InMemoryAccountRepository }) => {

  let resultType: string | undefined

  return {
    givenNoAccountExists() {
      accountRepository.accounts = []
    },
    givenAccountExists(accounts: DomainAccount[]) {
      accountRepository.accounts = accounts
    },
    async whenAccountRegister(registerPayload: RegisterUsecaseParams) {
        const result = await store.dispatch(registerThunk(registerPayload))
        resultType = result.payload?.type
    },
    async whenUserLogin(loginParam: LoginUsecaseParams) {
      await store.dispatch(loginThunk(loginParam))
    },
    thenResultTypeShouldBe(expectedType: string) {
      expect(resultType).toBe(expectedType)
    },
    thenAccountShouldExist(email: EmailVO) {
      const repoAccount = accountRepository.accounts.find(a => a.email === email.value)
      expect(repoAccount?.email).toBe(email.value)
    },
    thenAccountShouldNotExist(email: EmailVO) {
      const repoAccount = accountRepository.accounts.find(a => a.email === email.value)
      expect(repoAccount).toBeUndefined()
    },
    thenAuthStateShouldBe(expectedAuthState: AuthState) {
      expect(store.getState().auth).toMatchObject(expectedAuthState)
    }
  }
}

export type AccountFixture = ReturnType<typeof createAccountFixture>