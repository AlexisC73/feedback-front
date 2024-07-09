export interface Comment {
  id: string
  sender: {
    name: string
    avatar: string | null
  }
  content: string
  feedbackId: string
  replyTo?: {
    username: string,
    mainCommentId: string
  }
}