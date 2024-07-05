import { beforeEach, describe, test } from "vitest";
import { createFeedbackFixture, FeedbackFixture } from "./feedback.fixture";
import { feedbackBuilder } from "./feedback.builder";
import { stateBuilder } from "@/store/state-builder";

describe("Get Feedbacks Usecase", () => {
  let feedbackFixture: FeedbackFixture

  beforeEach(() => {
    feedbackFixture = createFeedbackFixture(stateBuilder())
  })

  test("should return a list of feedbacks", async () => {
    feedbackFixture.givenNoFeedbacksExists()

    await feedbackFixture.whenGetFeedbacks()

    feedbackFixture.thenFeedbacksStateShouldBe({data: [], loading: false})
  })

  test(" should return a list of feedbacks", async () => {
    const domainFeedback = feedbackBuilder().build()
    const feedback = feedbackBuilder().build()
    
    feedbackFixture.givenFeedbacksExists([domainFeedback])

    await feedbackFixture.whenGetFeedbacks()

    feedbackFixture.thenFeedbacksStateShouldBe({data: [feedback], loading: false})
  })
})