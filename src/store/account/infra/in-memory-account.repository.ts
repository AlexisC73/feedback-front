import { InvalidRequestError } from "@/store/errors/errors";
import { DomainAccount } from "../models/account";
import { AccountRepository } from "../models/account-repository";
import * as E from "fp-ts/Either"

export class InMemoryAccountRepository implements AccountRepository {
  accounts: DomainAccount[] = []

  async create(params: { email: string; password: string; }) {
    const alreadyExists = this.accounts.find(a => a.email === params.email)
    if(alreadyExists) {
      return E.left(new InvalidRequestError("Account already exists"))
    }
    this.save({id: new Date().getTime().toString(), email: params.email, password: params.password})
    return E.right(undefined)
  }

  private save(account: DomainAccount) {
    this.accounts.push(account)
  }
}