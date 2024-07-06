import { FieldError } from "@/store/errors/fields-error"
import { FeedbackCategoryVO } from "@/store/value-objects/FeedbackCategory"
import { FeedbackStatusVO } from "@/store/value-objects/FeedbackStatus"

export class EditFeedbackPayload {
  id: string
  title: string
  category: FeedbackCategoryVO
  description: string
  status: FeedbackStatusVO
  errors: FieldError[] = []

  constructor(params: EditFeedbackPayload["data"]) {
    this.id = params.id
    this.title = params.title
    this.category = new FeedbackCategoryVO(params.category)
    this.description = params.description
    this.status = new FeedbackStatusVO(params.status)
    Object.freeze(this)
  }

  validate() {
    if(!this.id ||this.id.trim().length <= 0) {
      this.errors.push({field: "id", errors: ["Id is required"]})
    }
    if(!this.title || this.title.trim().length <= 0) {
      this.errors.push({field: "title", errors: ["Title is required"]})
    }
    if(!this.category.validate()) {
      this.errors.push({field: "category", errors: this.category.errors})
    }
    if(!this.description || this.description.trim().length <= 0) {
      this.errors.push({field: "description", errors: ["Description is required"]})
    }
    if(!this.status.validate()){
      this.errors.push({field: "status", errors: this.status.errors})
    }
    return this.errors.length <= 0
  }

  get data () {
    return {
      id: this.id,
      title: this.title,
      category: this.category.value,
      description: this.description,
      status: this.status.value
    }
  }
}