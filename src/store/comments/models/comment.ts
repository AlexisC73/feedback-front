export interface Comment {
  id: string
  sender: {
    name: string
    avatar: string
  }
  content: string
  feedbackId: string
  replyTo?: {
    username: string,
    mainCommentId: string
  }
}