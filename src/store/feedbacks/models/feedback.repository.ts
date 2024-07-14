import { ApiErrors, ApiFieldError, ApiNotFoundError, ApiSuccessResult } from "@/store/@shared/models/resultType";
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

export type GetFeedbacksApiResult = ApiSuccessResult<Feedback[]> | ApiErrors
export type AddFeedbackApiResult = ApiSuccessResult<void> | ApiErrors | ApiFieldError
export type EditFeedbackApiResult = ApiSuccessResult<void> | ApiNotFoundError | ApiFieldError | ApiErrors
export type UpvoteApiResult = ApiSuccessResult<void> | ApiNotFoundError | ApiErrors
export type DeleteFeedbackApiResult = ApiSuccessResult<void> | ApiErrors