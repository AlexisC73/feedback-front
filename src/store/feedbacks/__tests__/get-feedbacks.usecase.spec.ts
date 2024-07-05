import { beforeEach, describe, test } from "vitest";
import { createFeedbackFixture, FeedbackFixture } from "./feedback.fixture";
import { createTestStore } from "@/store/store";
import { InMemoryFeedbackRepository } from "../infra/in-memory-feedback.repository";
import { domainFeedbackBuilder } from "./domainFeedback.builder";
import { feedbackBuilder } from "./feedback.builder";

describe("Get Feedbacks Usecase", () => {
  let feedbackFixture: FeedbackFixture

  beforeEach(() => {
    const feedbackRepository = new InMemoryFeedbackRepository()
    const store = createTestStore({feedbackRepository})
    feedbackFixture = createFeedbackFixture(store, { feedbackRepository })
  })
  test("should return a list of feedbacks", async () => {
    feedbackFixture.givenNoFeedbacksExists()

    await feedbackFixture.whenGetFeedbacks()

    feedbackFixture.thenFeedbacksStateShouldBe({data: [], loading: false})
  })

  test(" should return a list of feedbacks", async () => {
    const domainFeedback = domainFeedbackBuilder().build()
    const feedback = feedbackBuilder().fromDomain(domainFeedback).build()
    
    feedbackFixture.givenFeedbacksExists([domainFeedback])

    await feedbackFixture.whenGetFeedbacks()

    feedbackFixture.thenFeedbacksStateShouldBe({data: [feedback], loading: false})
  })
})