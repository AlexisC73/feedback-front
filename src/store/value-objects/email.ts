import { ValueObject } from "./value-object"

export class EmailVO extends ValueObject {
  #email: string

  constructor(email: string) {
    super()
    this.#email = email.trim()
  }

  equals(email: EmailVO): boolean {
    return this.#email === email.value
  }

  clone(): ValueObject {
    return new EmailVO(this.#email)
  }

  validate(): boolean {
    const errors = []
    if(this.isEmpty()) {
      errors.push("Email is required")
      this.setErrors(errors)
      return false
    }
    return this.errors.length === 0
  }

  get value(): string {
    return this.#email
  }

  isEmpty(): boolean {
    return this.#email.length <= 0
  }
}