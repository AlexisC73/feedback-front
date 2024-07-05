import { Feedback } from "./feedback";

export interface FeedbackRepository {
  getFeedbacks(): Promise<Feedback[]>
}