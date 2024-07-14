import { Comment } from "../models/comment"

export const commentBuilder = ({
  id = "1",
  content = "this is a comment",
  feedbackId = "1",
  replyTo = null,
  sender = {
    avatar: null,
    username: "user1",
    id: "1",
    displayName: "User-1"
  }
}: Partial<Comment> = {}) => {
  const props: Comment = {id, content, feedbackId, replyTo, sender}

  return {
    withId: (id: string) => commentBuilder({...props, id}),
    withContent: (content: string) => commentBuilder({...props, content}),
    withFeedbackId: (feedbackId: string) => commentBuilder({...props, feedbackId}),
    withSender: (sender: Comment["sender"]) => commentBuilder({...props, sender}),
    build: (): Comment => props
  }
}