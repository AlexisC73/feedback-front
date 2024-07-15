import { Account } from './account'
import { ApiErrors, ApiSuccessResult } from '@/store/@shared/models/resultType'

export abstract class AccountRepository {
  abstract create(params: {email: string, password: string, displayName: string, username: string}): Promise<RegisterApiResult>
  abstract login(params: {email: string, password: string}): Promise<LoginApiResult>
  abstract getMe(): Promise<GetMeApiResult>
}


export type LoginApiResult = ApiSuccessResult<Account> | ApiErrors
export type RegisterApiResult = ApiSuccessResult<undefined> | ApiErrors
export type GetMeApiResult = ApiSuccessResult<Account> | ApiErrors
