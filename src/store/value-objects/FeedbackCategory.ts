import { FeedbackCategory } from "../feedbacks/models/feedback";
import { ValueObject } from "./value-object";

export class FeedbackCategoryVO extends ValueObject {
  #category: FeedbackCategory
  #acceptedCategories: string[] = []

  constructor(category: FeedbackCategory) {
    super()
    this.#acceptedCategories = Object.values(FeedbackCategory)
    this.#category = category
  }

  equals(vo: FeedbackCategoryVO): boolean {
    return vo.value === this.#category
  }

  clone(): ValueObject {
    throw new Error("Method not implemented.");
  }

  validate(): boolean {
    if(!this.#category) {
      this.setErrors(["Category is required"])
    }
    if(!this.#acceptedCategories.includes(this.#category)) {
      console.log(this.#acceptedCategories)
      console.log(this.#category)
      this.setErrors(["Invalid category"])
    }
    return this.errors.length === 0
  }

  get value(): FeedbackCategory {
    return this.#category
  }

}