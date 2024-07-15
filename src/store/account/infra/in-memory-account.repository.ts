import { injectable } from "inversify";
import { Account, AccountWithPassword, Role } from "../models/account";
import { AccountRepository, GetMeApiResult, LoginApiResult, RegisterApiResult } from "../models/account-repository";
import { ApiResultType } from "@/store/@shared/models/resultType";

@injectable()
export class InMemoryAccountRepository implements AccountRepository {
  accounts: AccountWithPassword[] = []
  loggedAccount: Account | undefined

  async create(params: { email: string; password: string; displayName: string, username: string }): Promise<RegisterApiResult> {
    const alreadyExists = this.accounts.find(a => a.email === params.email)
    if(alreadyExists) {
      return {type: ApiResultType.CREDENTIAL_ERROR, data: undefined}
    }
    this.save({id: new Date().getTime().toString(), email: params.email, password: params.password, role: Role.USER, avatar: "https://example.com/avatar.png", displayName: params.displayName, username: params.username})
    return {type: ApiResultType.SUCCESS, data: undefined}
  }

  async login(params: { email: string; password: string; }): Promise<LoginApiResult> {
    const account = this.accounts.find(a => a.email === params.email && a.password === params.password)
    if(!account) {
      return {type: ApiResultType.CREDENTIAL_ERROR, data: undefined}
    }

    this.loggedAccount = {email: account.email, id: account.id, role: account.role, avatar: account.avatar, displayName: account.displayName, username: account.username}
    
    return {
      type: ApiResultType.SUCCESS,
      data: {
        email: account.email,
        id: account.id,
        role: account.role,
        avatar: account.avatar,
        displayName: account.displayName,
        username: account.username
      }}
  }

  async getMe(): Promise<GetMeApiResult> {
    return {
      type: ApiResultType.SUCCESS,
      data: this.loggedAccount!
    }
  }

  private save(account: AccountWithPassword) {
    this.accounts.push(account)
  }
}