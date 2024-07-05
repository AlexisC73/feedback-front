import {describe, test, beforeEach} from 'vitest'
import { AccountFixture, createAccountFixture } from '@/store/account/__tests__/account.fixture'
import { domainAccountBuilder } from '@/store/account/__tests__/account.builder'
import { stateBuilder } from '@/store/state-builder'

describe("Register Usecase", () => {
  let accountFixture: AccountFixture

  beforeEach(() => {
    accountFixture = createAccountFixture(stateBuilder())
  })

  test("should logged user account", async () => {
    const account = domainAccountBuilder().withEmail("test@test.fr").withPassword("password").withId("1")
    accountFixture.givenAccountExists([account.build()])

    await accountFixture.whenUserLogin({email: "test@test.fr", password: "password"})

    accountFixture.thenAuthStateShouldBe({
      account: {
        email: "test@test.fr",
        id: "1"
      },
      loading: false
    })
  })
})
