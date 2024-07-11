import { ApiResultType } from "@/store/@shared/models/resultType";
import { AddFeedbackApiResult, DeleteFeedbackApiResult, EditFeedbackApiResult, FeedbackRepository, GetFeedbacksApiResult, UpvoteApiResult } from "../models/feedback.repository";
import { AddFeedbackPayload } from "../usecases/payload/add-feedback.payload";
import { EditFeedbackPayload } from "../usecases/payload/edit-feedback.payload";
import { UpvotePayload } from "../usecases/payload/upvote.payload";
import { Feedback } from "../models/feedback";

export class FeedbackApiRepository implements FeedbackRepository {
  async getFeedbacks(): Promise<GetFeedbacksApiResult> {
    const request = await fetch("http://localhost:3333/api/feedbacks")
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
  
  async addFeedback(params: { feedback: AddFeedbackPayload["data"]; }): Promise<AddFeedbackApiResult> {
    const request = await fetch("http://localhost:3333/api/feedbacks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params.feedback)
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
    const request = await fetch("http://localhost:3333/api/feedbacks/" + params.feedbackId, {
      method: "DELETE"
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

  async editFeedback(params: { feedback: EditFeedbackPayload["data"]; }): Promise<EditFeedbackApiResult> {
    const request = await fetch("http://localhost:3333/api/feedbacks/" + params.feedback.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params.feedback)
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
    const request = await fetch("http://localhost:3333/api/feedbacks/" + params.feedbackId + "/upvote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({upvote: params.upvote})
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