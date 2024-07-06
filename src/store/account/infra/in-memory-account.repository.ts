import { AccountWithPassword, Role } from "../models/account";
import { AccountRepository, LoginApiResult, RegisterApiResult } from "../models/account-repository";
import { ApiResultType } from "@/store/@shared/models/resultType";

export class InMemoryAccountRepository implements AccountRepository {
  accounts: AccountWithPassword[] = []

  async create(params: { email: string; password: string; }): Promise<RegisterApiResult> {
    const alreadyExists = this.accounts.find(a => a.email === params.email)
    if(alreadyExists) {
      return {type: ApiResultType.CREDENTIAL_ERROR, data: "Email already exists"}
    }
    this.save({id: new Date().getTime().toString(), email: params.email, password: params.password, role: Role.USER})
    return {type: ApiResultType.SUCCESS}
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
        role: account.role
      }}
  }

  private save(account: AccountWithPassword) {
    this.accounts.push(account)
  }
}