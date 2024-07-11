import { FeedbackState } from "../feedback.reducer"
import { expect } from "vitest"
import { getFeedbacksThunk } from "../usecases/get-feedbacks.usecase"
import { addFeedbackThunk, AddFeedbackUsecaseParams } from "../usecases/add-feedback.usecase"
import { StateBuilder } from "@/store/state-builder"
import { Feedback } from "../models/feedback"
import { editFeedbackThunk, EditFeedbackUsecaseParams } from "../usecases/edit-feedback.usecase"
import { upvoteFeedbackThunk, UpvoteUsecaseParams } from "../usecases/upvote-feedback.usecase"
import { UsecaseResultType } from "@/store/@shared/models/resultType"
import { deleteFeedbackThunk, DeleteFeedbackUsecaseParams } from "../usecases/delete-feedback.usecase"

export const createFeedbackFixture = (stateBuilder: StateBuilder) => {
  let resultType: UsecaseResultType | undefined
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
      const result = await stateBuilder.getStore().dispatch(getFeedbacksThunk())
      if(result.payload?.type) {
        resultType = result.payload.type
      }
    },
    async whenAddFeedback(feedback: AddFeedbackUsecaseParams) {
      const result = await stateBuilder.getStore().dispatch(addFeedbackThunk(feedback))
      if(result.payload?.type) {
        resultType = result.payload.type
      }
    },
    async whenEditFeedback(feedback: EditFeedbackUsecaseParams) {
      const result = await stateBuilder.getStore().dispatch(editFeedbackThunk(feedback))
      if(result.payload?.type) {
        resultType = result.payload.type
      }
    },
    async upvoteFeedback(feedback: UpvoteUsecaseParams) {
      const result = await stateBuilder.getStore().dispatch(upvoteFeedbackThunk(feedback))
      if(result.payload?.type) {
        resultType = result.payload.type
      }
    },
    async whenDeleteFeedback(params: DeleteFeedbackUsecaseParams) {
      const result = await stateBuilder.getStore().dispatch(deleteFeedbackThunk(params))
      if(result.payload?.type) {
        resultType = result.payload.type
      }
    },
    thenFeedbacksStateShouldBe(feedbackState: FeedbackState) {
      expect(stateBuilder.getStore().getState().feedback).toMatchObject(feedbackState)
    },
    thenFeedbackShouldExists(feedback: Feedback) {
      const fundFeedback = stateBuilder.getFeedbackRepository().feedbacks.find(f => f.id === feedback.id)
      expect(fundFeedback).toMatchObject(feedback)
    },
    thenFeedbackResultTypeShouldBe(expectedResultType: UsecaseResultType) {
      expect(resultType).toBe(expectedResultType)
    },
    thenFeedbackShouldNotExists(feedback: Feedback) {
      const fundFeedback = stateBuilder.getFeedbackRepository().feedbacks.find(f => f.id === feedback.id)
      expect(fundFeedback).toBeUndefined()
    }
  }
}

export type FeedbackFixture = ReturnType<typeof createFeedbackFixture>