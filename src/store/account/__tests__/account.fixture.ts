import { registerThunk, RegisterUsecaseParams } from "@/store/auth/usecases/register.usecase"
import { InMemoryAccountRepository } from "../infra/in-memory-account.repository"
import { expect } from "vitest"
import { AppStore } from "@/store/store"
import { EmailVO } from "@/store/value-objects/email"

export const createAccountFixture = (store: AppStore, { accountRepository }: { accountRepository: InMemoryAccountRepository }) => {

  let resultType: string | undefined

  return {
    givenNoAccountExists() {
      accountRepository.accounts = []
    },
    async whenAccountRegister(registerPayload: RegisterUsecaseParams) {
        const result = await store.dispatch(registerThunk(registerPayload))
        resultType = result.payload?.type
    },
    thenResultTypeShouldBe(expectedType: string) {
      expect(resultType).toBe(expectedType)
    },
    thenAccountShouldExist(email: EmailVO) {
      const repoAccount = accountRepository.accounts.find(a => a.email === email.value)
      expect(repoAccount?.email).toBe(email.value)
    }
  }
}

export type AccountFixture = ReturnType<typeof createAccountFixture>