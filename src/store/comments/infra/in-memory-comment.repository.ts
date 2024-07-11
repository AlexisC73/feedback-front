import { ApiResultType } from "@/store/@shared/models/resultType";
import { CommentRepository, GetFeedbackCommentResponse, PostCommentResponse } from "../models/comment.repository";
import { Comment } from "../models/comment";
import { GetFeedbackCommentParams } from "../usecases/get-comments.usecase";
import { injectable } from "inversify";

@injectable()
export class InMemoryCommentRepository implements CommentRepository {
  comments: Comment[] = []

  async postComment (newComment: Comment): Promise<PostCommentResponse> {
    const existingComment = this.comments.findIndex(comment => comment.id === newComment.id)
    if(existingComment !== -1) {
      throw new Error("Id already exists")
    }
    this.comments = [...this.comments, newComment]

    return {
      type: ApiResultType.SUCCESS,
      data: undefined
    }
  }

  async getForFeedback ({ feedbackId }: GetFeedbackCommentParams): Promise<GetFeedbackCommentResponse> {
    return {
      type: ApiResultType.SUCCESS,
      data: this.comments.filter(comment => comment.feedbackId === feedbackId)
    }
  }
}