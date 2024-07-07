import { Comment } from "../models/comment"

export const commentBuilder = ({
  id = "1",
  content = "this is a comment",
  feedbackId = "1",
  replyTo = undefined,
  sender = {
    name: "moi",
    avatar: "https://example.com/avatar.png"
  }
}: Partial<Comment> = {}) => {
  const props: Comment = {id, content, feedbackId, replyTo, sender}

  return {
    withId: (id: string) => commentBuilder({...props, id}),
    withContent: (content: string) => commentBuilder({...props, content}),
    withFeedbackId: (feedbackId: string) => commentBuilder({...props, feedbackId}),
    withReplyTo: (replyTo: {username: string, mainCommentId: string}) => commentBuilder({...props, replyTo}),
    withSender: (sender: Comment["sender"]) => commentBuilder({...props, sender}),
    build: (): Comment => props
  }
}