import { Feedback } from "../models/feedback";
import { FeedbackRepository } from "../models/feedback.repository";
import { AddFeedbackPayload } from "../usecases/payload/add-feedback.payload";

export class InMemoryFeedbackRepository implements FeedbackRepository {
  feedbacks: Feedback[] = []

  async getFeedbacks(): Promise<Feedback[]> {
    return this.feedbacks.map(f => ({id: f.id, category: f.category, description: f.description, status: f.status, title: f.title, owner: f.owner, upvotes: f.upvotes, comments: f.comments }))
  }
  
  async addFeedback(params: { feedback: AddFeedbackPayload["data"]; }): Promise<void> {
    this.feedbacks.push({
      id: params.feedback.id,
      category: params.feedback.category,
      description: params.feedback.description,
      status: params.feedback.status,
      title: params.feedback.title,
      owner: params.feedback.owner,
      comments: 0,
      upvotes: 0
    })
  }
}