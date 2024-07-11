import { FieldError } from "@/store/errors/fields-error"
import { Feedback, FeedbackCategory, FeedbackStatus } from "../../models/feedback"
import { FeedbackCategoryVO } from "@/store/value-objects/FeedbackCategory"

export class AddFeedbackPayload {
  title: string
  category: FeedbackCategoryVO
  description: string
  id: string
  status = FeedbackStatus.SUGGESTION
  errors: FieldError[] = []
  
  constructor({title, category, description, id}: {title: string, category: FeedbackCategory, description: string, id: string}) {
    this.title = title
    this.category = new FeedbackCategoryVO(category)
    this.description = description
    this.id = id
    Object.freeze(this)
  }

  validate(): boolean {
    if(this.title.length === 0) {
      this.errors.push({field: "title", errors: ["Title is required"]})
    }
    if(this.description.length === 0) {
      this.errors.push({field: "description", errors: ["Description is required"]})
    }
    if(!this.category.validate()) {
      this.errors.push({field: "category", errors: this.category.errors})
    }
    return this.errors.length === 0
  }

  get data(): Omit<Feedback, "upvotes" | "comments" | "upvoted" | "owner"> {
    return {
      title: this.title,
      id: this.id,
      category: this.category.value,
      description: this.description,
      status: this.status,
    }
  }
}