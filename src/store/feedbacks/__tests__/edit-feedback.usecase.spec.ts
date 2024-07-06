import { beforeEach, describe, test } from "vitest";
import { createFeedbackFixture, FeedbackFixture } from "./feedback.fixture";
import { stateBuilder } from "@/store/state-builder";
import { feedbackBuilder } from "./feedback.builder";
import { FeedbackCategory } from "../models/feedback";

describe("Edit Feedback Usecase", () => {
  let feedbackFixture: FeedbackFixture

  beforeEach(() => {
    const store = stateBuilder()
    feedbackFixture = createFeedbackFixture(store)
  })

  test("should edit a feedback in multiple feedback exists", async () => {
    const feedback = feedbackBuilder()
    const toEditFeedback = feedback.withId('1').withCategory(FeedbackCategory.ENHANCEMENT).withTitle("Default Title")
    const existedFeedbacks = [feedback.withId('2').build(), toEditFeedback.build()]
    const editedFeedback = toEditFeedback.withTitle("New Title").build()

    feedbackFixture.givenFeedbacksExists(existedFeedbacks)

    await feedbackFixture.whenEditFeedback({
      id: toEditFeedback.build().id,
      title: "New Title",
      category: toEditFeedback.build().category,
      status: toEditFeedback.build().status,
      description: toEditFeedback.build().description,
    })

    const expectedFeedbacks = [...existedFeedbacks.filter(f => f.id !== toEditFeedback.build().id), editedFeedback]

    feedbackFixture.thenFeedbacksStateShouldBe({data: expectedFeedbacks, loading: false})
  })
})