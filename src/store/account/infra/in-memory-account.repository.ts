import { InvalidRequestError } from "@/store/errors/errors";
import { AccountWithPassword, Role } from "../models/account";
import { AccountRepository, LoginApiResult } from "../models/account-repository";
import * as E from "fp-ts/Either"
import { ApiResultType } from "@/store/@shared/models/resultType";

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

  async login(params: { email: string; password: string; }): Promise<LoginApiResult> {
    const account = this.accounts.find(a => a.email === params.email && a.password === params.password)
    if(!account) {
      return {type: ApiResultType.CREDENTIAL_ERROR}
    }
    return {
      type: ApiResultType.SUCCESS,
      data: {
        email: account.email,
        id: account.id,
        role: account.role
      }}
  }

  private save(account: AccountWithPassword) {
    this.accounts.push(account)
  }
}