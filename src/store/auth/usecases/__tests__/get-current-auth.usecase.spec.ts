import { AccountFixture, createAccountFixture } from "@/store/account/__tests__/account.fixture";
import { Role } from "@/store/account/models/account";
import { stateBuilder } from "@/store/state-builder";
import { beforeEach, describe, test } from "vitest";

describe("Get Current Auth", () => {

  let accountFixture: AccountFixture

  beforeEach(() => {
    const store = stateBuilder()
    accountFixture = createAccountFixture(store)
  })

  test("should get the current auth", async () => {
    const authAccount = {
      id: "1",
      avatar: "https://example.com/avatar.png",
      email: "test@test.fr",
      role: Role.USER
    }
    accountFixture.givenIsApiAuthAs(authAccount)

    await accountFixture.whenRetrievingCurrentAuth()

    accountFixture.thenAuthStateShouldBe({
      account: authAccount,
      loading: false
    })
  })
})