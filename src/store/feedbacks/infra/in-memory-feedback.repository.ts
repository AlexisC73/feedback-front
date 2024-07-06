import { ApiResultType } from "@/store/@shared/models/resultType";
import { Feedback } from "../models/feedback";
import { AddFeedbackApiResult, EditFeedbackApiResult, FeedbackRepository, GetFeedbacksApiResult, UpvoteApiResult } from "../models/feedback.repository";
import { AddFeedbackPayload } from "../usecases/payload/add-feedback.payload";
import { EditFeedbackPayload } from "../usecases/payload/edit-feedback.payload";
import { UpvotePayload } from "../usecases/payload/upvote.payload";

export class InMemoryFeedbackRepository implements FeedbackRepository {
  feedbacks: Feedback[] = []

  async getFeedbacks(): Promise<GetFeedbacksApiResult> {
    return {type: ApiResultType.SUCCESS, data: this.feedbacks}
  }
  
  async addFeedback(params: { feedback: AddFeedbackPayload["data"]; }): Promise<AddFeedbackApiResult> {
    const newFeedback = {
      id: params.feedback.id,
      category: params.feedback.category,
      description: params.feedback.description,
      status: params.feedback.status,
      title: params.feedback.title,
      owner: params.feedback.owner,
      comments: 0,
      upvotes: 0,
      upvoted: false
    }

    this.feedbacks = [...this.feedbacks, newFeedback]
    return {type: ApiResultType.SUCCESS, data: undefined}
  }

  async editFeedback(params: { feedback: EditFeedbackPayload["data"]; }): Promise<EditFeedbackApiResult> {
    const { feedback: editFeedbackPayload} = params
    const feedback = this.feedbacks.find(f => f.id === editFeedbackPayload.id)
    if(!feedback) {
      return {type: ApiResultType.NOT_FOUND, data: undefined}
    }
    const editedFeedback: Feedback = {...feedback, ...editFeedbackPayload}
    this.feedbacks = this.feedbacks.map(f => f.id === editedFeedback.id ? editedFeedback : f)

    return {type: ApiResultType.SUCCESS, data: undefined}
  }

  async upvote(params: UpvotePayload["data"]): Promise<UpvoteApiResult> {
    const feedbackIndex = this.feedbacks.findIndex(f => f.id === params.feedbackId)
    if(feedbackIndex === -1) {
      return {type: ApiResultType.NOT_FOUND, data: undefined}
    }
    this.feedbacks = this.feedbacks.map(f => f.id === params.feedbackId ? {...f, upvoted: params.upvote, upvotes: f.upvotes + (params.upvote ? 1 : -1)} : f)
    return {type: ApiResultType.SUCCESS, data: undefined}
  }
}