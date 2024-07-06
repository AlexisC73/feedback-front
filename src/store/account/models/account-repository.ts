import { InvalidRequestError } from '@/store/errors/errors'
import * as E from 'fp-ts/Either'
import { Account } from './account'
import { ApiResult, ApiResultType } from '@/store/@shared/models/resultType'
import { FieldError } from '@/store/errors/fields-error'

export interface AccountRepository {
  create(params: {email: string, password: string}): Promise<E.Either<InvalidRequestError, void>>
  login(params: {email: string, password: string}): Promise<LoginApiResult>
}

export type LoginApiResult = ApiFieldError | ApiLoginSuccess | ApiUnknownError | ApiCredentialError

type ApiFieldError = ApiResult<ApiResultType.FIELD_ERROR, FieldError[]>
type ApiUnknownError = ApiResult<ApiResultType.UNKNOWN_ERROR, undefined>
type ApiCredentialError = ApiResult<ApiResultType.CREDENTIAL_ERROR, undefined>

type ApiLoginSuccess = ApiResult<ApiResultType.SUCCESS, Account>