import { ApiResultType } from "@/store/@shared/models/resultType";
import { CommentRepository, GetFeedbackCommentResponse, PostCommentParams, PostCommentResponse } from "../models/comment.repository";
import { GetFeedbackCommentParams } from "../usecases/get-comments.usecase";
import { injectable } from "inversify";
import { Comment } from "../models/comment";
import { api } from "@/config/api";

@injectable()
export class CommentApiRepository implements CommentRepository {
  postComment = async (params: PostCommentParams): Promise<PostCommentResponse> => {
    const request = await fetch(`${api.endpoint}/api/comments/feedback/${params.feedbackId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: params.content,
        id: params.id
      }),
      credentials: "include"
    })

    if(request.ok) {
      return {
        type: ApiResultType.SUCCESS,
        data: undefined
      }
    }

    return {
      type: ApiResultType.UNKNOWN_ERROR,
      data: undefined
    }
  }

  getForFeedback = async (params: GetFeedbackCommentParams): Promise<GetFeedbackCommentResponse> => {
    try {
      const request = await fetch(`${api.endpoint}/api/comments/feedback/${params.feedbackId}`, {
        method: "GET",
        credentials: "include"
      })

      if(request.ok) {
        const data = await request.json() as Omit<Comment, "replyTo">[]
        return {
          type: ApiResultType.SUCCESS,
          data: data.map(c => ({
            id: c.id,
            content: c.content,
            feedbackId: c.feedbackId,
            sender: c.sender,
            replyTo: null
          }))
        }
      }

      return {
        type: ApiResultType.UNKNOWN_ERROR,
        data: undefined
      }
    } catch(e) {
      return {
        type: ApiResultType.UNKNOWN_ERROR,
        data: undefined
      }
    }
  }
}