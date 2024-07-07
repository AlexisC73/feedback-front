import { FieldError } from "@/store/errors/fields-error"
import { CommentMessageVO } from "@/store/value-objects/comment-message"

export class PostCommentPayload {
  id: string
  feedbackId: string
  commentMessage: CommentMessageVO
  replyTo?: string
  errors: FieldError[] = []

  constructor(params: {id: string, feedbackId: string, content: string, replyTo?: string}) {
    this.id = params.id
    this.feedbackId = params.feedbackId
    this.commentMessage = new CommentMessageVO(params.content)
    this.replyTo = params.replyTo
    Object.freeze(this)
  }

  validate(): boolean {
    if(this.feedbackId.length <= 0) {
      this.errors = [...this.errors, {field: "feedbackId", errors: ["Cannot be empty"]}]
    }
    if(!this.commentMessage.validate()) {
      this.errors = [...this.errors, {field: "content", errors: this.commentMessage.errors}]
    }
    if(this.replyTo && this.replyTo.length <= 0) {
      this.errors = [...this.errors, {field: "replyTo", errors: ["Cannot be empty"]}]
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