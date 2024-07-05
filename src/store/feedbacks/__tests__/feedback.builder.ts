import { DomainFeedback, Feedback, FeedbackCategory, FeedbackStatus } from "../models/feedback";

export const feedbackBuilder = ({
  category = FeedbackCategory.BUG,
  description = "a description",
  id = "1",
  status = FeedbackStatus.LIVE,
  title = "title"}: Partial<Feedback> = {}) => {
    const props: Feedback = {category, description, id, status, title}
    return {
      withCategory: (category: FeedbackCategory) => feedbackBuilder({...props, category}),
      withDescription: (description: string) => feedbackBuilder({...props, description}),
      withId: (id: string) => feedbackBuilder({...props, id}),
      withStatus: (status: FeedbackStatus) => feedbackBuilder({...props, status}),
      withTitle: (title: string) => feedbackBuilder({...props, title}),
      fromDomain: (domainFeedback: DomainFeedback) => feedbackBuilder({
        category: domainFeedback.category,
        description: domainFeedback.description,
        id: domainFeedback.id,
        status: domainFeedback.status,
        title: domainFeedback.title
      }),
      build: () => props
    }
}