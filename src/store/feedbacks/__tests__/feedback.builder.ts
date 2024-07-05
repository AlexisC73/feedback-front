import { Feedback, FeedbackCategory, FeedbackStatus } from "../models/feedback";

export const feedbackBuilder = ({
  category = FeedbackCategory.BUG,
  description = "a description",
  id = "1",
  status = FeedbackStatus.LIVE,
  title = "title",
  owner = "1",
  comments = 0,
  upvotes = 0
  }: Partial<Feedback> = {}) => {
    const props: Feedback = {category, description, id, status, title, owner, upvotes, comments}
    return {
      withCategory: (category: FeedbackCategory) => feedbackBuilder({...props, category}),
      withDescription: (description: string) => feedbackBuilder({...props, description}),
      withId: (id: string) => feedbackBuilder({...props, id}),
      withStatus: (status: FeedbackStatus) => feedbackBuilder({...props, status}),
      withTitle: (title: string) => feedbackBuilder({...props, title}),
      withOwner: (owner: string) => feedbackBuilder({...props, owner}),
      withComments: (comments: number) => feedbackBuilder({...props, comments}),
      withUpvotes: (upvotes: number) => feedbackBuilder({...props, upvotes}),
      build: () => props
    }
}