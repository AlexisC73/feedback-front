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
    const account = accountBuilder().withEmail("test@test.fr").withAvatar(null).withRole(Role.ADMIN).withId("1").buildWithPassword("password")
    accountFixture.givenAccountExists([account])

    await accountFixture.whenUserLogin({email: "test@test.fr", password: "password"})

    accountFixture.thenAuthStateShouldBe({
      account: {
        email: account.email,
        id: account.id,
        role: account.role,
        avatar: account.avatar,
        displayName: account.displayName,
        username: account.username
      },
      loading: false
    })
  })
})
