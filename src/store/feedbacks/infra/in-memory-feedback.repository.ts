import { DomainFeedback, Feedback } from "../models/feedback";
import { FeedbackRepository } from "../models/feedback.repository";

export class InMemoryFeedbackRepository implements FeedbackRepository {
  feedbacks: DomainFeedback[] = []

  async getFeedbacks(): Promise<Feedback[]> {
    return this.feedbacks.map(f => ({id: f.id, category: f.category, description: f.description, status: f.status, title: f.title}))
  }
}