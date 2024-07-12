import { ApiCredentialError, ApiFieldError, ApiSuccessResult, ApiUnknownError } from "@/store/@shared/models/resultType";
import { Comment } from "./comment";
import { GetFeedbackCommentParams } from "../usecases/get-comments.usecase";

export abstract class CommentRepository {
  abstract postComment: (comment: PostCommentParams) => Promise<PostCommentResponse>
  abstract getForFeedback: (params: GetFeedbackCommentParams) => Promise<GetFeedbackCommentResponse>
}

export type PostCommentParams = {
  id: string,
  content: string,
  feedbackId: string
}

export type PostCommentResponse = ApiFieldError | ApiSuccessResult<undefined> | ApiCredentialError | ApiUnknownError
export type GetFeedbackCommentResponse = ApiSuccessResult<Comment[]> | ApiCredentialError | ApiUnknownError