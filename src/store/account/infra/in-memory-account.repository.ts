import { CredentialError, InvalidRequestError } from "@/store/errors/errors";
import { Account, AccountWithPassword, Role } from "../models/account";
import { AccountRepository } from "../models/account-repository";
import * as E from "fp-ts/Either"

export class InMemoryAccountRepository implements AccountRepository {
  accounts: AccountWithPassword[] = []

  async create(params: { email: string; password: string; }) {
    const alreadyExists = this.accounts.find(a => a.email === params.email)
    if(alreadyExists) {
      return E.left(new InvalidRequestError("Account already exists"))
    }
    this.save({id: new Date().getTime().toString(), email: params.email, password: params.password, role: Role.USER})
    return E.right(undefined)
  }

  async login(params: { email: string; password: string; }): Promise<E.Either<CredentialError, Account>> {
    const account = this.accounts.find(a => a.email === params.email && a.password === params.password)
    if(!account) {
      return E.left(new CredentialError("Invalid email or password"))
    }
    return E.right({
      email: account.email,
      id: account.id,
      role: account.role
    })
  }

  private save(account: AccountWithPassword) {
    this.accounts.push(account)
  }
}