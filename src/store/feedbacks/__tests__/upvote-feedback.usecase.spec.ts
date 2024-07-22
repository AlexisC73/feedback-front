import { beforeEach, describe, test } from "vitest";
import { createFeedbackFixture, FeedbackFixture } from "./feedback.fixture";
import { StateBuilder, stateBuilder } from "@/store/state-builder";
import { feedbackBuilder } from "./feedback.builder";
import { UsecaseResultType } from "@/store/@shared/models/resultType";
import { AccountFixture, createAccountFixture } from "@/store/account/__tests__/account.fixture";
import { authAccountBuilder } from "@/store/account/__tests__/authAccountBuilder";

describe("Upvote feedback usecase", () => {

  let feedbackFixture: FeedbackFixture
  let accountFixture: AccountFixture
  let store: StateBuilder

  beforeEach(() => {
    store = stateBuilder()
    feedbackFixture = createFeedbackFixture(store)
    accountFixture = createAccountFixture(store)
  })

  test("Should upvote a feedback", async () => {
    const feedback = feedbackBuilder().withId("1").withUpvotes(3).withUpvoted(false)

    accountFixture.givenIsAuthenticatedAs(authAccountBuilder().build())
    feedbackFixture.givenFeedbacksExists([feedback.build()])
    

    await feedbackFixture.upvoteFeedback({ feedbackId: "1", upvote: true})
    
    feedbackFixture.thenFeedbackShouldExists(feedback.withUpvoted(true).withUpvotes(4).build())
  })

  test("Should upvote a feedback when multiple exists", async () => {
    const feedback = feedbackBuilder().withId("6").withUpvotes(2).withUpvoted(true)
    const existingFeedbacks = [feedbackBuilder().withId("1").withUpvotes(3).build(),feedbackBuilder().withId("3").withUpvotes(8).build()]
    
    feedbackFixture.givenFeedbacksExists([...existingFeedbacks, feedback.build()])
    accountFixture.givenIsAuthenticatedAs(authAccountBuilder().build())

    await feedbackFixture.upvoteFeedback({ feedbackId: "6", upvote: false})
    
    feedbackFixture.thenFeedbacksStateShouldBe({loading: false, data: [...existingFeedbacks, feedback.withUpvoted(false).withUpvotes(1).build()]})
  })

  test("Should return not found if feedback does not exists", async () => {    
    feedbackFixture.givenNoFeedbacksExists()
    accountFixture.givenIsAuthenticatedAs(authAccountBuilder().build())

    await feedbackFixture.upvoteFeedback({ feedbackId: "6", upvote: false})
    
    feedbackFixture.thenFeedbackResultTypeShouldBe(UsecaseResultType.NOT_FOUND)
  })
})