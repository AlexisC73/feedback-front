import { AppStore } from "@/store/store"
import { FeedbackState } from "../feedback.reducer"
import { expect } from "vitest"
import { getFeedbacksThunk } from "../usecases/get-feedbacks.usecase"
import { InMemoryFeedbackRepository } from "../infra/in-memory-feedback.repository"
import { DomainFeedback } from "../models/feedback"

export const createFeedbackFixture = (store: AppStore, { feedbackRepository }: {feedbackRepository: InMemoryFeedbackRepository}) => {
  return {
    givenNoFeedbacksExists() {
      feedbackRepository.feedbacks = []
    },
    givenFeedbacksExists(feedbacks: DomainFeedback[]) {
      feedbackRepository.feedbacks = feedbacks
    },
    async whenGetFeedbacks() {
      await store.dispatch(getFeedbacksThunk())
    },
    thenFeedbacksStateShouldBe(feedbackState: FeedbackState) {
      expect(store.getState().feedback).toEqual(feedbackState)
    }
  }
}

export type FeedbackFixture = ReturnType<typeof createFeedbackFixture>