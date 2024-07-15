import { ApiResultType } from "@/store/@shared/models/resultType";
import { AddFeedbackApiResult, AddFeedbackParams, DeleteFeedbackApiResult, EditFeedbackApiResult, EditFeedbackParams, FeedbackRepository, GetFeedbacksApiResult, UpvoteApiResult } from "../models/feedback.repository";
import { UpvotePayload } from "../usecases/payload/upvote.payload";
import { Feedback } from "../models/feedback";
import { injectable } from "inversify";
import { api } from "@/config/api";
import { handleApiError, handleBadRequestErrors } from "@/store/@shared/utiles/badRequestError";

@injectable()
export class FeedbackApiRepository implements FeedbackRepository {
  async getFeedbacks(): Promise<GetFeedbacksApiResult> {
    const request = await fetch(`${api.endpoint}/feedbacks/`, {
      method: "GET",
      credentials: "include"
    })
    const data = await request.json()
    if(request.ok) {
      return {
        type: ApiResultType.SUCCESS,
        data: data as Feedback[]
      }
    } else {
      return handleApiError(request.status)
    }
  }
  
  async addFeedback(params: AddFeedbackParams): Promise<AddFeedbackApiResult> {
    const request = await fetch(`${api.endpoint}/feedbacks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params),
      credentials: "include"
    })

    if(request.ok) {
      return {
        type: ApiResultType.SUCCESS,
        data: undefined
      }
    } else {
      if (request.status === 400) {
        const result = await request.json()
        return handleBadRequestErrors(result)
      }
      return handleApiError(request.status)
    }
  }
  
  async deleteFeedback(params: { feedbackId: string; }): Promise<DeleteFeedbackApiResult> {
    const request = await fetch(`${api.endpoint}/feedbacks/` + params.feedbackId, {
      method: "DELETE",
      credentials: "include"
    })

    if(request.ok) {
      return {
        type: ApiResultType.SUCCESS,
        data: undefined
      }
    } else {
      return handleApiError(request.status)
    }
  }

  async editFeedback({id, title, description, category, status}: EditFeedbackParams): Promise<EditFeedbackApiResult> {
    const request = await fetch(`${api.endpoint}/feedbacks/` + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({title, description, category, status}),
      credentials: "include"
    })
    if(request.ok) {
      return {
        type: ApiResultType.SUCCESS,
        data: undefined
      }
    } else {     
      if(request.status === 400) {
        return handleBadRequestErrors(await request.json())
      } else if (request.status === 404) {
        return {
          type: ApiResultType.NOT_FOUND,
          data: undefined
        }
      }
      return handleApiError(request.status)
    }
  }

  async upvote(params: UpvotePayload["data"]): Promise<UpvoteApiResult> {
    const request = await fetch(`${api.endpoint}/upvotes/feedback/` + params.feedbackId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({upvote: params.upvote}),
      credentials: "include"
    })

    if(request.ok) {
      return {
        type: ApiResultType.SUCCESS,
        data: undefined
      }
    } else {
      if(request.status === 404) {
        const result = await request.json()
        return {
          type: ApiResultType.NOT_FOUND,
          data: "message" in result ? result.message : "Not found"
        }
      }
      return handleApiError(request.status)
    }
  }
}