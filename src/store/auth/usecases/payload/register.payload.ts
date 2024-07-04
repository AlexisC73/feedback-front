import { FieldError } from "@/store/errors/fields-error";
import { EmailVO } from "@/store/value-objects/email";
import { PasswordVO } from "@/store/value-objects/password";

export class RegisterPayload {
  #email: EmailVO
  #password: PasswordVO
  #confirmationPassword: string
  #errors: FieldError[] = []

  constructor({email, password, confirmationPassword}: {email: string, password: string, confirmationPassword: string}) {
    this.#email = new EmailVO(email)
    this.#password = new PasswordVO(password)
    this.#confirmationPassword = confirmationPassword
  }

  validate(): boolean {
    if(!this.#email.validate()) {
      this.#errors.push({field: "email", errors: this.#email.errors})
    }
    if(!this.#password.validate()) {
      this.#errors.push({field: "password", errors: this.#password.errors})
    }
    if(this.#password.value !== this.#confirmationPassword) {
      this.#errors.push({field: "confirmationPassword", errors: ["Passwords don't match"]})
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