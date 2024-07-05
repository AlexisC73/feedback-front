import {describe, test, beforeEach} from 'vitest'
import { RegisterThunkResultType, RegisterUsecaseParams } from '../register.usecase'
import { AccountFixture, createAccountFixture } from '@/store/account/__tests__/account.fixture'
import { EmailVO } from '@/store/value-objects/email'
import { stateBuilder } from '@/store/state-builder'

describe("Register Usecase", () => {
  let accountFixture: AccountFixture

  beforeEach(() => {
    accountFixture = createAccountFixture(stateBuilder())
  })

  test("should return an error if email is invalid", async () => {
    const registerPayload: RegisterUsecaseParams = {email: "invalid-email", password: "password", confirmationPassword: "password"}
    accountFixture.givenNoAccountExists()

    await accountFixture.whenAccountRegister(registerPayload)

    accountFixture.thenResultTypeShouldBe(RegisterThunkResultType.FIELD_ERROR)
    accountFixture.thenAccountShouldNotExist(new EmailVO(registerPayload.email))
  })

  test("should return an error if password is invalid", async () => {
    const registerPayload: RegisterUsecaseParams = {email: "test@test.fr", password: "short", confirmationPassword: "short"}
    accountFixture.givenNoAccountExists()

    await accountFixture.whenAccountRegister(registerPayload)

    accountFixture.thenResultTypeShouldBe(RegisterThunkResultType.FIELD_ERROR)
    accountFixture.thenAccountShouldNotExist(new EmailVO(registerPayload.email))
  })

  test("should add user to the repository", async () => {
    const registerPayload: RegisterUsecaseParams = {email: "test@test.fr", password: "password", confirmationPassword: "password"}
    accountFixture.givenNoAccountExists()

    await accountFixture.whenAccountRegister(registerPayload)

    accountFixture.thenResultTypeShouldBe(RegisterThunkResultType.SUCCESS)
    accountFixture.thenAccountShouldExist(new EmailVO(registerPayload.email))
  })
})
