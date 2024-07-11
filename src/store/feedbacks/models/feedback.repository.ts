import { ApiCredentialError, ApiFieldError, ApiNotFoundError, ApiSuccessResult, ApiUnknownError } from "@/store/@shared/models/resultType";
import { AddFeedbackPayload } from "../usecases/payload/add-feedback.payload";
import { EditFeedbackPayload } from "../usecases/payload/edit-feedback.payload";
import { Feedback } from "./feedback";
import { UpvotePayload } from "../usecases/payload/upvote.payload";

export abstract class FeedbackRepository {
  abstract getFeedbacks(): Promise<GetFeedbacksApiResult>
  abstract addFeedback(params: {feedback: AddFeedbackPayload["data"]}): Promise<AddFeedbackApiResult>
  abstract editFeedback(params: {feedback: EditFeedbackPayload["data"]}): Promise<EditFeedbackApiResult>
  abstract upvote(params: UpvotePayload["data"]): Promise<UpvoteApiResult>
  abstract deleteFeedback(params: {feedbackId: string}): Promise<DeleteFeedbackApiResult>
}

export type GetFeedbacksApiResult = ApiUnknownError | ApiCredentialError | ApiSuccessResult<Feedback[]>
export type AddFeedbackApiResult = ApiFieldError | ApiUnknownError | ApiCredentialError | ApiSuccessResult<void>
export type EditFeedbackApiResult = ApiFieldError | ApiUnknownError | ApiCredentialError | ApiSuccessResult<void> | ApiNotFoundError
export type UpvoteApiResult = ApiUnknownError | ApiCredentialError | ApiSuccessResult<void> | ApiNotFoundError
export type DeleteFeedbackApiResult = ApiSuccessResult<void> | ApiNotFoundError | ApiCredentialError | ApiUnknownError