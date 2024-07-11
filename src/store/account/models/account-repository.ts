import { Account } from './account'
import { ApiCredentialError, ApiFieldError, ApiSuccessResult, ApiUnknownError } from '@/store/@shared/models/resultType'

export abstract class AccountRepository {
  abstract create(params: {email: string, password: string}): Promise<RegisterApiResult>
  abstract login(params: {email: string, password: string}): Promise<LoginApiResult>
}


export type LoginApiResult = ApiFieldError | ApiSuccessResult<Account> | ApiUnknownError | ApiCredentialError
export type RegisterApiResult = ApiFieldError | ApiSuccessResult<undefined> | ApiUnknownError | ApiCredentialError
