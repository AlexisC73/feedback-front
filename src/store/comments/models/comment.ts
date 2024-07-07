export interface Comment {
  id: string
  sender: {
    name: string
    avatar: string
  }
  content: string
  feedbackId: string
  replyTo?: {
    userId: string,
    mainCommentId: string
  }
}