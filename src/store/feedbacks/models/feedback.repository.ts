import { AddFeedbackPayload } from "../usecases/payload/add-feedback.payload";
import { EditFeedbackPayload } from "../usecases/payload/edit-feedback.payload";
import { Feedback } from "./feedback";

export interface FeedbackRepository {
  getFeedbacks(): Promise<Feedback[]>
  addFeedback(params: {feedback: AddFeedbackPayload["data"]}): Promise<void>
  editFeedback(params: {feedback: EditFeedbackPayload["data"]}): Promise<void>
}