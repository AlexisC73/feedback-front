import { beforeEach, describe, test } from "vitest";
import { createFeedbackFixture, FeedbackFixture } from "./feedback.fixture";
import { feedbackBuilder } from "./feedback.builder";
import { StateBuilder, stateBuilder } from "@/store/state-builder";
import { AccountFixture, createAccountFixture } from "@/store/account/__tests__/account.fixture";
import { FeedbackStatus } from "../models/feedback";
import { authAccountBuilder } from "@/store/account/__tests__/authAccountBuilder";

describe("Add Feedback Usecase", () => {
  let feedbackFixture: FeedbackFixture
  let accountFixture: AccountFixture

  beforeEach(() => {
    const store: StateBuilder = stateBuilder()
    feedbackFixture = createFeedbackFixture(store)
    accountFixture = createAccountFixture(store)
  })

  test("Should add a feedback with suggestion status", async () => {
    const defaultFeedback = feedbackBuilder().withId("12")
    const authAccount = authAccountBuilder().withId("2").build()
    const newFeedback = defaultFeedback.build()
    const expectedFeedback = defaultFeedback.withStatus(FeedbackStatus.SUGGESTION).withOwner("2").build()

    feedbackFixture.givenNoFeedbacksExists()
    feedbackFixture.givenNextGeneratedId(newFeedback.id)
    accountFixture.givenIsAuthenticatedAs(authAccount)

    await feedbackFixture.whenAddFeedback({
      category: newFeedback.category,
      description: newFeedback.description,
      title: newFeedback.title
    })

    feedbackFixture.thenFeedbacksStateShouldBe({
      data: [expectedFeedback],
      loading: false
    })
    feedbackFixture.thenFeedbackShouldExists(expectedFeedback)
  })

  test("Given some Feedbacks already exists", async () => {
    const defaultFeedback = feedbackBuilder().withId("4")
    const authAccount = authAccountBuilder().withId("2").build()
    const newFeedback = defaultFeedback.build()
    const expectedNewFeedback = defaultFeedback.withStatus(FeedbackStatus.SUGGESTION).withOwner("2").build()
    const existingFeedback = [feedbackBuilder().withId("2").build(), feedbackBuilder().withId("3").build()]

    feedbackFixture.givenFeedbacksExists(existingFeedback)
    feedbackFixture.givenNextGeneratedId(newFeedback.id)
    accountFixture.givenIsAuthenticatedAs(authAccount)

    await feedbackFixture.whenAddFeedback({
      category: newFeedback.category,
      description: newFeedback.description,
      title: newFeedback.title
    })

    feedbackFixture.thenFeedbacksStateShouldBe({
      data: [...existingFeedback, expectedNewFeedback],
      loading: false
    })
    feedbackFixture.thenFeedbackShouldExists(expectedNewFeedback)
  })

  test("When adding new feedback, should have 0 upvotes and comments", async () => {
    const feedback = feedbackBuilder().build()
    const authAccount = authAccountBuilder().withId("1").build()

    feedbackFixture.givenNoFeedbacksExists()
    feedbackFixture.givenNextGeneratedId(feedback.id)
    accountFixture.givenIsAuthenticatedAs(authAccount)

    await feedbackFixture.whenAddFeedback({
      category: feedback.category,
      description: feedback.description,
      title: feedback.title
    })

    feedbackFixture.thenFeedbackShouldExists(feedbackBuilder().withStatus(FeedbackStatus.SUGGESTION).withUpvotes(0).withComments(0).build())
  })
})