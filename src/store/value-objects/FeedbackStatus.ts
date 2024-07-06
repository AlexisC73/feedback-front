import { FeedbackStatus } from "../feedbacks/models/feedback";
import { ValueObject } from "./value-object";

export class FeedbackStatusVO extends ValueObject {
  #status: FeedbackStatus
  #acceptedStatus: string[] = []

  constructor(status: FeedbackStatus) {
    super()
    this.#acceptedStatus = Object.values(FeedbackStatus)
    this.#status = status
  }

  equals(vo: FeedbackStatusVO): boolean {
    return vo.value === this.#status
  }

  clone(): ValueObject {
    throw new Error("Method not implemented.");
  }

  validate(): boolean {
    if(!this.#status) {
      this.setErrors(["Status is required"])
    }
    if(!this.#acceptedStatus.includes(this.#status)) {
      this.setErrors(["Invalid status"])
    }
    return this.errors.length === 0
  }

  get value(): FeedbackStatus {
    return this.#status
  }
}