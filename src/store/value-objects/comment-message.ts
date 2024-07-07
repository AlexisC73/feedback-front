import { ValueObject } from "./value-object";

const COMMENT_MESSAGE_MAX_LENGTH = 250

export class CommentMessageVO extends ValueObject {
  #value: string

  constructor(value: string) {
    super()
    this.#value = value.trim()
  }

  clone(): ValueObject {
    return new CommentMessageVO(this.#value)
  }

  equals(vo: CommentMessageVO): boolean {
    return this.#value === vo.value
  }

  validate(): boolean {
    if(this.#value.length <= 0) {
      this.setErrors(["Cannot be empty"])
    }
    if(this.#value.length > COMMENT_MESSAGE_MAX_LENGTH) {
      this.setErrors([`Cannot be longer than ${COMMENT_MESSAGE_MAX_LENGTH} characters`])
    }
    return this.errors.length === 0
  }

  get value(): string {
    return this.#value
  }
}