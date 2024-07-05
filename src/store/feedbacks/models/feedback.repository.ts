import { AddFeedbackPayload } from "../usecases/payload/add-feedback.payload";
import { Feedback } from "./feedback";

export interface FeedbackRepository {
  getFeedbacks(): Promise<Feedback[]>
  addFeedback(params: {feedback: AddFeedbackPayload["data"]}): Promise<void>
}