import { beforeEach, describe, test } from "vitest";
import { createFeedbackFixture, FeedbackFixture } from "./feedback.fixture";
import { feedbackBuilder } from "./feedback.builder";
import { StateBuilder, stateBuilder } from "@/store/state-builder";
import { AccountFixture, createAccountFixture } from "@/store/account/__tests__/account.fixture";
import { FeedbackStatus } from "../models/feedback";

describe("Add Feedback Usecase", () => {
  let feedbackFixture: FeedbackFixture
  let accountFixture: AccountFixture

  beforeEach(() => {
    const store: StateBuilder = stateBuilder()
    feedbackFixture = createFeedbackFixture(store)
    accountFixture = createAccountFixture(store)
  })

  test("Should add a feedback with suggestion status", async () => {
    const feedback = feedbackBuilder().withStatus(FeedbackStatus.SUGGESTION).build()

    feedbackFixture.givenNoFeedbacksExists()
    feedbackFixture.givenNextGeneratedId(feedback.id)
    accountFixture.givenIsAuthenticatedAs({
      email: "test@email.fr",
      id: feedback.owner
    })

    await feedbackFixture.whenAddFeedback({
      category: feedback.category,
      description: feedback.description,
      title: feedback.title
    })

    feedbackFixture.thenFeedbacksStateShouldBe({
      data: [feedback],
      loading: false
    })
    feedbackFixture.thenFeedbackShouldExists(feedback)
  })

  test("Given some Feedbacks already exists", async () => {
    const feedback = feedbackBuilder().withId('4').withStatus(FeedbackStatus.SUGGESTION).build()
    const existingFeedback = [feedbackBuilder().withId("2").build(), feedbackBuilder().withId("3").build()]

    feedbackFixture.givenFeedbacksExists(existingFeedback)
    feedbackFixture.givenNextGeneratedId(feedback.id)
    accountFixture.givenIsAuthenticatedAs({
      email: "test@email.fr",
      id: feedback.owner
    })

    await feedbackFixture.whenAddFeedback({
      category: feedback.category,
      description: feedback.description,
      title: feedback.title
    })

    feedbackFixture.thenFeedbacksStateShouldBe({
      data: [...existingFeedback, feedback],
      loading: false
    })
    feedbackFixture.thenFeedbackShouldExists(feedback)
  })
})