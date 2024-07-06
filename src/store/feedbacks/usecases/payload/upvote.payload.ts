import { FieldError } from "@/store/errors/fields-error";

export class UpvotePayload {
  feedbackId: string;
  upvote: boolean;
  errors: FieldError[] = []

  constructor({ feedbackId, upvote }: { feedbackId: string, upvote: boolean }) {
    this.feedbackId = feedbackId;
    this.upvote = upvote;
    Object.freeze(this)
  }

  validate(): boolean {
    if(this.feedbackId.length === 0) {
      this.errors.push({ field: "feedbackId", errors: ["FeedbackId is required"] })
    }
    if(this.upvote === undefined) {
      this.errors.push({ field: "upvote", errors: ["Upvote can't be blank"] })
    }
    return this.errors.length <= 0
  }

  get data() {
    return {
      feedbackId: this.feedbackId,
      upvote: this.upvote
    }
  }
}