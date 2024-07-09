import { ValueObject } from "./value-object"

export class PasswordVO extends ValueObject {
  #password: string

  constructor(password: string) {
    super()
    this.#password = password.trim()
  }

  equals(password: PasswordVO): boolean {
    return this.#password === password.value
  }

  clone(): ValueObject {
    return new PasswordVO(this.#password)
  }

  validate(): boolean {
    const errors = []
    if(this.isEmpty()) {
      errors.push("Password can't be empty")
    }
    this.setErrors(errors)
    return errors.length === 0
  }

  get value(): string {
    return this.#password
  }

  isEmpty(): boolean {
    return this.#password.length <= 0
  }
}