import { IdProvider } from "../models/idProvider";

export class StubIdProvider implements IdProvider {
  id!: string

  generateId() {
    if(!this.id) {
      this.id = new Date().toISOString()
    }
    return this.id
  }
}