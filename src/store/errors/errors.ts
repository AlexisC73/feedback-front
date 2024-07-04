export class InvalidRequestError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = "InvalidRequestError"
  }
}

export class CredentialError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = "CredentialError"
  }
}