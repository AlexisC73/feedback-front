import { ApiResultType } from "@/store/@shared/models/resultType";
import { AddFeedbackApiResult, AddFeedbackParams, DeleteFeedbackApiResult, EditFeedbackApiResult, EditFeedbackParams, FeedbackRepository, GetFeedbacksApiResult, UpvoteApiResult } from "../models/feedback.repository";
import { UpvotePayload } from "../usecases/payload/upvote.payload";
import { Feedback } from "../models/feedback";
import { injectable } from "inversify";
import { api } from "@/config/api";

@injectable()
export class FeedbackApiRepository implements FeedbackRepository {
  async getFeedbacks(): Promise<GetFeedbacksApiResult> {
    const request = await fetch(`${api.endpoint}/api/feedbacks/`, {
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
      return {
        type: ApiResultType.UNKNOWN_ERROR,
        data: undefined
      }
    }
  }
  
  async addFeedback(params: AddFeedbackParams): Promise<AddFeedbackApiResult> {
    const request = await fetch(`${api.endpoint}/api/feedbacks/`, {
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
      return {
        type: ApiResultType.UNKNOWN_ERROR,
        data: undefined
      }
    }
  }
  
  async deleteFeedback(params: { feedbackId: string; }): Promise<DeleteFeedbackApiResult> {
    const request = await fetch(`${api.endpoint}/api/feedbacks/` + params.feedbackId, {
      method: "DELETE",
      credentials: "include"
    })

    if(request.ok) {
      return {
        type: ApiResultType.SUCCESS,
        data: undefined
      }
    } else {
      return {
        type: ApiResultType.UNKNOWN_ERROR,
        data: undefined
      }
    }
  }

  async editFeedback({id, title, description, category, status}: EditFeedbackParams): Promise<EditFeedbackApiResult> {
    const request = await fetch(`${api.endpoint}/api/feedbacks/` + id, {
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
      return {
        type: ApiResultType.UNKNOWN_ERROR,
        data: undefined
      }
    }
  }

  async upvote(params: UpvotePayload["data"]): Promise<UpvoteApiResult> {
    const request = await fetch(`${api.endpoint}/api/upvotes/feedback/` + params.feedbackId, {
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
      return {
        type: ApiResultType.UNKNOWN_ERROR,
        data: undefined
      }
    }
  }
}