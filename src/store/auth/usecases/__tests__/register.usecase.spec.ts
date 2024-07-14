import {describe, test, beforeEach} from 'vitest'
import { RegisterUsecaseParams } from '../register.usecase'
import { AccountFixture, createAccountFixture } from '@/store/account/__tests__/account.fixture'
import { stateBuilder } from '@/store/state-builder'
import { Role } from '@/store/account/models/account'
import { UsecaseResultType } from '@/store/@shared/models/resultType'

describe("Register Usecase", () => {
  let accountFixture: AccountFixture

  beforeEach(() => {
    accountFixture = createAccountFixture(stateBuilder())
  })

  test("should return an error if email is empty", async () => {
    const registerPayload: RegisterUsecaseParams = {email: "", password: "password", confirmationPassword: "password", displayName: "display name", username: "username"}
    accountFixture.givenNoAccountExists()

    await accountFixture.whenAccountRegister(registerPayload)

    accountFixture.thenResultTypeShouldBe(UsecaseResultType.FIELD_ERROR)
    accountFixture.thenAccountShouldNotExist(registerPayload.email)
  })

  test("should return an error if password is empty", async () => {
    const registerPayload: RegisterUsecaseParams = {email: "test@test.fr", password: "", confirmationPassword: "", displayName: "display name", username: "username"}
    accountFixture.givenNoAccountExists()

    await accountFixture.whenAccountRegister(registerPayload)

    accountFixture.thenResultTypeShouldBe(UsecaseResultType.FIELD_ERROR)
    accountFixture.thenAccountShouldNotExist(registerPayload.email)
  })

  test("should add user to the repository", async () => {
    const registerPayload: RegisterUsecaseParams = {email: "test@test.fr", password: "password", confirmationPassword: "password", displayName: "display name", username: "username"}
    accountFixture.givenNoAccountExists()

    await accountFixture.whenAccountRegister(registerPayload)

    accountFixture.thenResultTypeShouldBe(UsecaseResultType.SUCCESS)
    accountFixture.thenAccountShouldExist({email: registerPayload.email, role: Role.USER, displayName: registerPayload.displayName, username: registerPayload.username})
  })

  test("should user register, account role should be user", async () => {
    const registerPayload: RegisterUsecaseParams = {email: "test@test.fr", password: "password", confirmationPassword: "password", displayName: "display name", username: "username"}
    accountFixture.givenNoAccountExists()

    await accountFixture.whenAccountRegister(registerPayload)

    accountFixture.thenResultTypeShouldBe(UsecaseResultType.SUCCESS)
    accountFixture.thenAccountShouldExist({email: registerPayload.email, role: Role.USER, displayName: registerPayload.displayName, username: registerPayload.username})
  })
})
