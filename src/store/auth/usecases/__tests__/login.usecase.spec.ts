import {describe, test, beforeEach} from 'vitest'
import { AccountFixture, createAccountFixture } from '@/store/account/__tests__/account.fixture'
import { accountBuilder } from '@/store/account/__tests__/account.builder'
import { stateBuilder } from '@/store/state-builder'
import { Role } from '@/store/account/models/account'

describe("Register Usecase", () => {
  let accountFixture: AccountFixture

  beforeEach(() => {
    accountFixture = createAccountFixture(stateBuilder())
  })

  test("should logged user account", async () => {
    const account = accountBuilder().withEmail("test@test.fr").withRole(Role.ADMIN).withId("1")
    accountFixture.givenAccountExists([account.buildWithPassword("password")])

    await accountFixture.whenUserLogin({email: "test@test.fr", password: "password"})

    accountFixture.thenAuthStateShouldBe({
      account: {
        email: "test@test.fr",
        id: "1",
        role: Role.ADMIN,
        avatar: "https://example.com/avatar.png"
      },
      loading: false
    })
  })
})
