import { injectable } from "inversify";
import { IdProvider } from "../models/idProvider";

@injectable()
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