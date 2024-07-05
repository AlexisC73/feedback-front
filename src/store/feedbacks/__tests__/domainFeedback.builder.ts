import { DomainFeedback, FeedbackCategory, FeedbackStatus } from "../models/feedback";

export const domainFeedbackBuilder = ({
  category = FeedbackCategory.BUG,
  description = "a description",
  id = "1",
  status = FeedbackStatus.LIVE,
  title = "title",
  owner = "1"
}: Partial<DomainFeedback> = {}) => {
    const props: DomainFeedback = {category, description, id, status, title, owner}
    return {
      withCategory: (category: FeedbackCategory) => domainFeedbackBuilder({...props, category}),
      withOwner: (owner: string) => domainFeedbackBuilder({...props, owner}),
      withDescription: (description: string) => domainFeedbackBuilder({...props, description}),
      withId: (id: string) => domainFeedbackBuilder({...props, id}),
      withStatus: (status: FeedbackStatus) => domainFeedbackBuilder({...props, status}),
      withTitle: (title: string) => domainFeedbackBuilder({...props, title}),
      build: () => props
    }
}