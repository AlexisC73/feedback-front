import { IdProvider } from "../models/idProvider";

export class StubIdProvider implements IdProvider {
  id!: string
  primaryId: number = 1

  generateId() {
    if(!this.id) {
      return (this.primaryId++).toString()
    }
    return this.id
  }
}