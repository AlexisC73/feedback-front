import { ApiCredentialError, ApiFieldError, ApiSuccessResult } from "@/store/@shared/models/resultType";
import { Comment } from "./comment";
import { GetFeedbackCommentParams } from "../usecases/get-comments.usecase";

export abstract class CommentRepository {
  abstract postComment: (comment: Comment) => Promise<PostCommentResponse>
  abstract getForFeedback: (params: GetFeedbackCommentParams) => Promise<GetFeedbackCommentResponse>
}

export type PostCommentResponse = ApiFieldError | ApiSuccessResult<undefined> | ApiCredentialError
export type GetFeedbackCommentResponse = ApiSuccessResult<Comment[]> | ApiCredentialError