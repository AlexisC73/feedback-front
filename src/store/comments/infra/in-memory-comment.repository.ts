import { ApiResultType } from "@/store/@shared/models/resultType";
import { CommentRepository, GetFeedbackCommentResponse, PostCommentParams, PostCommentResponse } from "../models/comment.repository";
import { Comment } from "../models/comment";
import { GetFeedbackCommentParams } from "../usecases/get-comments.usecase";
import { inject, injectable } from "inversify";
import { AccountRepository } from "@/store/account/models/account-repository";
import { InMemoryAccountRepository } from "@/store/account/infra/in-memory-account.repository";

@injectable()
export class InMemoryCommentRepository implements CommentRepository {
  comments: Comment[] = []

  constructor(@inject(AccountRepository) private readonly accountRepository: InMemoryAccountRepository) {}

  async postComment (params: PostCommentParams): Promise<PostCommentResponse> {
    const account = this.accountRepository.loggedAccount!
    
    const newComment: Comment = {
      id: params.id,
      content: params.content,
      feedbackId: params.feedbackId,
      replyTo: null,
      sender: {
        avatar: account.avatar,
        displayName: account.displayName,
        id: account.id,
        username: account.username
      }
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