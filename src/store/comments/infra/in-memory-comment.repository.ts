import { ApiResultType } from "@/store/@shared/models/resultType";
import { CommentRepository, PostCommentResponse } from "../models/comment.repository";
import { Comment } from "../models/comment";

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
}