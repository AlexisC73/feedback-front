import { beforeEach, describe, test } from "vitest";
import { createFeedbackFixture, FeedbackFixture } from "./feedback.fixture";
import { StateBuilder, stateBuilder } from "@/store/state-builder";
import { feedbackBuilder } from "./feedback.builder";

describe("Upvote feedback usecase", () => {

  let feedbackFixture: FeedbackFixture
  let store: StateBuilder

  beforeEach(() => {
    store = stateBuilder()
    feedbackFixture = createFeedbackFixture(store)
  })

  test("Should upvote a feedback", async () => {
    const feedback = feedbackBuilder().withId("1").withUpvotes(3).withUpvoted(false)
    
    feedbackFixture.givenFeedbacksExists([feedback.build()])

    await feedbackFixture.upvoteFeedback({ feedbackId: "1", upvote: true})
    
    feedbackFixture.thenFeedbackShouldExists(feedback.withUpvoted(true).withUpvotes(4).build())
  })

  test("Should upvote a feedback when multiple exists", async () => {
    const feedback = feedbackBuilder().withId("6").withUpvotes(2).withUpvoted(true)
    const existingFeedbacks = [feedbackBuilder().withId("1").withUpvotes(3).build(),feedbackBuilder().withId("3").withUpvotes(8).build()]
    
    feedbackFixture.givenFeedbacksExists([...existingFeedbacks, feedback.build()])

    await feedbackFixture.upvoteFeedback({ feedbackId: "6", upvote: false})
    
    feedbackFixture.thenFeedbacksStateShouldBe({loading: false, data: [...existingFeedbacks, feedback.withUpvoted(false).withUpvotes(1).build()]})
  })
})