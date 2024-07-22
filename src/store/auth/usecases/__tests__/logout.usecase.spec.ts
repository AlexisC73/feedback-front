import {describe, test, beforeEach} from 'vitest'
import { AccountFixture, createAccountFixture } from '@/store/account/__tests__/account.fixture'
import { stateBuilder } from '@/store/state-builder'
import { authAccountBuilder } from '@/store/account/__tests__/authAccountBuilder'

describe("Register Usecase", () => {
  let accountFixture: AccountFixture

  beforeEach(() => {
    accountFixture = createAccountFixture(stateBuilder())
  })

  test("should logged user account", async () => {
    accountFixture.givenIsAuthenticatedAs(authAccountBuilder().withId("1").withEmail("test@test.fr").build())

    await accountFixture.whenUserLogout()

    accountFixture.thenAuthStateShouldBe({
      account: null,
      loading: false
    })
  })
})
