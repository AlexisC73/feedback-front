import { ApiCredentialError, ApiFieldError, ApiNotFoundError, ApiSuccessResult, ApiUnknownError } from "@/store/@shared/models/resultType";
import { AddFeedbackPayload } from "../usecases/payload/add-feedback.payload";
import { EditFeedbackPayload } from "../usecases/payload/edit-feedback.payload";
import { Feedback } from "./feedback";
import { UpvotePayload } from "../usecases/payload/upvote.payload";

export interface FeedbackRepository {
  getFeedbacks(): Promise<GetFeedbacksApiResult>
  addFeedback(params: {feedback: AddFeedbackPayload["data"]}): Promise<AddFeedbackApiResult>
  editFeedback(params: {feedback: EditFeedbackPayload["data"]}): Promise<EditFeedbackApiResult>
  upvote(params: UpvotePayload["data"]): Promise<UpvoteApiResult>
  deleteFeedback(params: {feedbackId: string}): Promise<DeleteFeedbackApiResult>
}

export type GetFeedbacksApiResult = ApiUnknownError | ApiCredentialError | ApiSuccessResult<Feedback[]>
export type AddFeedbackApiResult = ApiFieldError | ApiUnknownError | ApiCredentialError | ApiSuccessResult<void>
export type EditFeedbackApiResult = ApiFieldError | ApiUnknownError | ApiCredentialError | ApiSuccessResult<void> | ApiNotFoundError
export type UpvoteApiResult = ApiUnknownError | ApiCredentialError | ApiSuccessResult<void> | ApiNotFoundError
export type DeleteFeedbackApiResult = ApiSuccessResult<void> | ApiNotFoundError | ApiCredentialError