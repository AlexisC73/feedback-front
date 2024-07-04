import { FieldError } from "@/store/errors/fields-error";
import { EmailVO } from "@/store/value-objects/email";
import { PasswordVO } from "@/store/value-objects/password";

export class LoginPayload {
  #email: EmailVO
  #password: PasswordVO
  #errors: FieldError[] = []

  constructor({email, password}: {email: string, password: string}) {
    this.#email = new EmailVO(email)
    this.#password = new PasswordVO(password)
  }

  validate(): boolean {
    if(this.#email.isEmpty()) {
      this.#errors.push({field: "email", errors: ["Email is required"]})
    }
    if(this.#password.isEmpty()) {
      this.#errors.push({field: "password", errors: ["Password is required"]})
    }
    return this.#errors.length === 0
  }

  get email(): string {
    return this.#email.value
  }

  get password(): string {
    return this.#password.value
  }

  get errors(): FieldError[] {
    return this.#errors
  }
}