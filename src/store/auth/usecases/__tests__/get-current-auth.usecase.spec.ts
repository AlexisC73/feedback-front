import { AccountFixture, createAccountFixture } from "@/store/account/__tests__/account.fixture";
import { authAccountBuilder } from "@/store/account/__tests__/authAccountBuilder";
import { stateBuilder } from "@/store/state-builder";
import { beforeEach, describe, test } from "vitest";

describe("Get Current Auth", () => {

  let accountFixture: AccountFixture

  beforeEach(() => {
    const store = stateBuilder()
    accountFixture = createAccountFixture(store)
  })

  test("should get the current auth", async () => {
    const authAccount = authAccountBuilder().withUsername("it's me").build()
    accountFixture.givenIsApiAuthAs(authAccount)

    await accountFixture.whenRetrievingCurrentAuth()

    accountFixture.thenAuthStateShouldBe({
      account: authAccount,
      loading: false
    })
  })
})