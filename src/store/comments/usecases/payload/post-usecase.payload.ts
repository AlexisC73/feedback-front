import { FieldError } from "@/store/errors/fields-error"
import { CommentMessageVO } from "@/store/value-objects/comment-message"

export class PostCommentPayload {
  id: string
  feedbackId: string
  commentMessage: CommentMessageVO
  replyTo?: {
    userId: string,
    mainCommentId: string
  }
  errors: FieldError[] = []

  constructor(params: {id: string, feedbackId: string, content: string, replyTo?: { userId: string, mainCommentId: string }}) {
    this.id = params.id
    this.feedbackId = params.feedbackId
    this.commentMessage = new CommentMessageVO(params.content)
    this.replyTo = params.replyTo
    Object.freeze(this)
  }

  validate(): boolean {
    if(this.feedbackId.length <= 0) {
      this.errors.push({field: "feedbackId", errors: ["Cannot be empty"]})
    }
    if(!this.commentMessage.validate()) {
      this.errors.push({field: "content", errors: this.commentMessage.errors})
    }
    if(this.replyTo && this.replyTo.userId.length <= 0 && this.replyTo.mainCommentId.length <= 0) {
      this.errors.push({field: "replyTo", errors: ["ReplyTo must have userId and commentId"]})
    }
    return this.errors.length === 0
  }

  get data() {
    return {
      id: this.id,
      feedbackId: this.feedbackId,
      content: this.commentMessage.value,
      replyTo: this.replyTo
    }
  }
}