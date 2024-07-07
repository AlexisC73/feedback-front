import { ApiCredentialError, ApiFieldError, ApiSuccessResult } from "@/store/@shared/models/resultType";
import { Comment } from "./comment";

export interface CommentRepository {
  postComment: (comment: Comment) => Promise<PostCommentResponse>
}

export type PostCommentResponse = ApiFieldError | ApiSuccessResult<undefined> | ApiCredentialError