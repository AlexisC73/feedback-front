import { FieldError } from "@/store/errors/fields-error"
import { Feedback, FeedbackCategory, FeedbackStatus } from "../../models/feedback"
import { FeedbackCategoryVO } from "@/store/value-objects/FeedbackCategory"

export class AddFeedbackPayload {
  title: string
  category: FeedbackCategoryVO
  description: string
  id: string
  status = FeedbackStatus.SUGGESTION
  owner: string
  errors: FieldError[] = []
  
  constructor({title, category, description, id, owner}: {title: string, category: FeedbackCategory, description: string, id: string, owner: string}) {
    this.title = title
    this.category = new FeedbackCategoryVO(category)
    this.description = description
    this.id = id
    this.owner = owner
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

  get data(): Omit<Feedback, "upvotes" | "comments" | "upvoted"> {
    return {
      title: this.title,
      id: this.id,
      category: this.category.value,
      description: this.description,
      status: this.status,
      owner: this.owner,
    }
  }
}