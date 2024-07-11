import { ApiCredentialError, ApiFieldError, ApiNotFoundError, ApiSuccessResult, ApiUnknownError } from "@/store/@shared/models/resultType";
import { Feedback, FeedbackCategory, FeedbackStatus } from "./feedback";

export abstract class FeedbackRepository {
  abstract getFeedbacks(): Promise<GetFeedbacksApiResult>
  abstract addFeedback(params: AddFeedbackParams): Promise<AddFeedbackApiResult>
  abstract editFeedback(params: EditFeedbackParams): Promise<EditFeedbackApiResult>
  abstract upvote(params: UpvoteFeedbackParams): Promise<UpvoteApiResult>
  abstract deleteFeedback(params: {feedbackId: string}): Promise<DeleteFeedbackApiResult>
}

export type AddFeedbackParams = {title: string, description: string, category: FeedbackCategory, id: string}
export type EditFeedbackParams = {title: string, description: string, category: FeedbackCategory, id: string, status: FeedbackStatus}
export type UpvoteFeedbackParams = {feedbackId: string, upvote: boolean}

export type GetFeedbacksApiResult = ApiUnknownError | ApiCredentialError | ApiSuccessResult<Feedback[]>
export type AddFeedbackApiResult = ApiFieldError | ApiUnknownError | ApiCredentialError | ApiSuccessResult<void>
export type EditFeedbackApiResult = ApiFieldError | ApiUnknownError | ApiCredentialError | ApiSuccessResult<void> | ApiNotFoundError
export type UpvoteApiResult = ApiUnknownError | ApiCredentialError | ApiSuccessResult<void> | ApiNotFoundError
export type DeleteFeedbackApiResult = ApiSuccessResult<void> | ApiNotFoundError | ApiCredentialError | ApiUnknownError