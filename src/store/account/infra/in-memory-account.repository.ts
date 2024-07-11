import { injectable } from "inversify";
import { AccountWithPassword, Role } from "../models/account";
import { AccountRepository, LoginApiResult, RegisterApiResult } from "../models/account-repository";
import { ApiResultType } from "@/store/@shared/models/resultType";

@injectable()
export class InMemoryAccountRepository implements AccountRepository {
  accounts: AccountWithPassword[] = []

  async create(params: { email: string; password: string; }): Promise<RegisterApiResult> {
    const alreadyExists = this.accounts.find(a => a.email === params.email)
    if(alreadyExists) {
      return {type: ApiResultType.CREDENTIAL_ERROR, data: "Email already exists"}
    }
    this.save({id: new Date().getTime().toString(), email: params.email, password: params.password, role: Role.USER, avatar: "https://example.com/avatar.png"})
    return {type: ApiResultType.SUCCESS, data: undefined}
  }

  async login(params: { email: string; password: string; }): Promise<LoginApiResult> {
    const account = this.accounts.find(a => a.email === params.email && a.password === params.password)
    if(!account) {
      return {type: ApiResultType.CREDENTIAL_ERROR, data: "Invalid email or password"}
    }
    return {
      type: ApiResultType.SUCCESS,
      data: {
        email: account.email,
        id: account.id,
        role: account.role,
        avatar: account.avatar
      }}
  }

  private save(account: AccountWithPassword) {
    this.accounts.push(account)
  }
}