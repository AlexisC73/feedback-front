import { FeedbackState } from "../feedback.reducer"
import { expect } from "vitest"
import { getFeedbacksThunk } from "../usecases/get-feedbacks.usecase"
import { addFeedbackThunk, AddFeedbackUsecaseParams } from "../usecases/add-feedback.usecase"
import { StateBuilder } from "@/store/state-builder"
import { Feedback } from "../models/feedback"
import { editFeedbackThunk, EditFeedbackUsecaseParams } from "../usecases/edit-feedback.usecase"

export const createFeedbackFixture = (stateBuilder: StateBuilder) => {
  return {
    givenNoFeedbacksExists() {
      stateBuilder.getFeedbackRepository().feedbacks = []
    },
    givenNextGeneratedId(id: string) {
      stateBuilder.getIdProvider().id = id
    },
    givenFeedbacksExists(feedbacks: Feedback[]) {
      stateBuilder.setStore({...stateBuilder.getStore().getState(), feedback: {data: [...feedbacks], loading: false}})
      stateBuilder.getFeedbackRepository().feedbacks = [...feedbacks]
    },
    async whenGetFeedbacks() {
      await stateBuilder.getStore().dispatch(getFeedbacksThunk())
    },
    async whenAddFeedback(feedback: AddFeedbackUsecaseParams) {
      await stateBuilder.getStore().dispatch(addFeedbackThunk(feedback))
    },
    async whenEditFeedback(feedback: EditFeedbackUsecaseParams) {
      await stateBuilder.getStore().dispatch(editFeedbackThunk(feedback))
    },
    thenFeedbacksStateShouldBe(feedbackState: FeedbackState) {
      expect(stateBuilder.getStore().getState().feedback).toMatchObject(feedbackState)
    },
    thenFeedbackShouldExists(feedback: Feedback) {
      const fundFeedback = stateBuilder.getFeedbackRepository().feedbacks.find(f => f.id === feedback.id)
      expect(fundFeedback).toMatchObject(feedback)
    }
  }
}

export type FeedbackFixture = ReturnType<typeof createFeedbackFixture>