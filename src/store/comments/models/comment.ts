export interface Comment {
  id: string
  sender: {
    id: string
    username: string
    displayName: string
    avatar: string | null
  }
  content: string
  feedbackId: string
  replyTo: {
    id: string
    mainCommentId: string,
    user: {
      id: string,
      username: string,
      displayName: string,
      avatar: string | null
    }
  } | null
}