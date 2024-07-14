import "reflect-metadata"
import { ApiResultType } from "@/store/@shared/models/resultType";
import { Feedback, FeedbackStatus } from "../models/feedback";
import { AddFeedbackApiResult, AddFeedbackParams, DeleteFeedbackApiResult, EditFeedbackApiResult, EditFeedbackParams, FeedbackRepository, GetFeedbacksApiResult, UpvoteApiResult, UpvoteFeedbackParams } from "../models/feedback.repository";
import { inject, injectable } from "inversify";
import { AccountRepository } from "@/store/account/models/account-repository";
import { InMemoryAccountRepository } from "@/store/account/infra/in-memory-account.repository";

@injectable()
export class InMemoryFeedbackRepository implements FeedbackRepository {
  feedbacks: Feedback[] = []

  constructor(@inject(AccountRepository) private readonly accountRepository: InMemoryAccountRepository) {}

  async getFeedbacks(): Promise<GetFeedbacksApiResult> {
    return {type: ApiResultType.SUCCESS, data: this.feedbacks}
  }
  
  async addFeedback(params: AddFeedbackParams): Promise<AddFeedbackApiResult> {
    const newFeedback = {
      id: params.id,
      category: params.category,
      description: params.description,
      status: FeedbackStatus.SUGGESTION,
      title: params.title,
      owner: this.accountRepository.loggedAccount!.id,
      comments: 0,
      upvotes: 0,
      upvoted: false
    }

    this.feedbacks = [...this.feedbacks, newFeedback]
    return {type: ApiResultType.SUCCESS, data: undefined}
  }

  async editFeedback({id, category, description, status, title}: EditFeedbackParams): Promise<EditFeedbackApiResult> {
    const feedback = this.feedbacks.find(f => f.id === id)
    if(!feedback) {
      return {type: ApiResultType.NOT_FOUND, data: "The feedback was not found"}
    }
    const editedFeedback: Feedback = {...feedback, category, description, status, title}
    this.feedbacks = this.feedbacks.map(f => f.id === editedFeedback.id ? editedFeedback : f)

    return {type: ApiResultType.SUCCESS, data: undefined}
  }

  async upvote({feedbackId, upvote}: UpvoteFeedbackParams): Promise<UpvoteApiResult> {
    const feedbackIndex = this.feedbacks.findIndex(f => f.id === feedbackId)
    if(feedbackIndex === -1) {
      return {type: ApiResultType.NOT_FOUND, data: "The feedback was not found"}
    }
    this.feedbacks = this.feedbacks.map(f => f.id === feedbackId ? {...f, upvoted: upvote, upvotes: f.upvotes + (upvote ? 1 : -1)} : f)
    return {type: ApiResultType.SUCCESS, data: undefined}
  }

  async deleteFeedback(params: { feedbackId: string; }): Promise<DeleteFeedbackApiResult> {
    const feedbackIndex = this.feedbacks.findIndex(f => f.id === params.feedbackId)
    if(feedbackIndex === -1) {
      return {type: ApiResultType.SUCCESS, data: undefined}
    }
    this.feedbacks = this.feedbacks.filter(f => f.id !== params.feedbackId)
    return {type: ApiResultType.SUCCESS, data: undefined}
  }
}