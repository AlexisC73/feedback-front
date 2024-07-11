import { injectable } from "inversify";
import { IdProvider } from "../models/idProvider";
import {v4 as uuid} from "uuid"

@injectable()
export class RealIdProvider implements IdProvider {
  generateId(): string {
    return uuid()
  }
}