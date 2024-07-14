import { ApiResultType } from "@/store/@shared/models/resultType";
import { AddFeedbackApiResult, AddFeedbackParams, DeleteFeedbackApiResult, EditFeedbackApiResult, EditFeedbackParams, FeedbackRepository, GetFeedbacksApiResult, UpvoteApiResult } from "../models/feedback.repository";
import { UpvotePayload } from "../usecases/payload/upvote.payload";
import { Feedback } from "../models/feedback";
import { injectable } from "inversify";
import { api } from "@/config/api";
import { handleApiError, handleApiFieldError } from "@/store/@shared/utiles/badRequestError";

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
      return handleApiError(request.status, await request.json())
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
      const result = await request.json()
      if (request.status === 400) {
        const hasFieldErrors = handleApiFieldError(result)
        if(hasFieldErrors.type === ApiResultType.FIELD_ERROR) {
          return hasFieldErrors
        }
      }
      return handleApiError(request.status, result)
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
      return handleApiError(request.status, await request.json())
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
        const result = await request.json()
        const hasFieldErrors = handleApiFieldError(result)
        if(hasFieldErrors.type === ApiResultType.FIELD_ERROR) {
          return hasFieldErrors
        }
        return handleApiError(request.status, result)
      } else if (request.status === 404) {
        const result = await request.json()
        return {
          type: ApiResultType.NOT_FOUND,
          data: "message" in result ? result.message : "Not found feedback"
        }
      }
      return handleApiError(request.status, await request.json())
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
      return handleApiError(request.status, await request.json())
    }
  }
}