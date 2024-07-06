import { Account } from './account'
import { ApiResult, ApiResultType } from '@/store/@shared/models/resultType'
import { FieldError } from '@/store/errors/fields-error'

export interface AccountRepository {
  create(params: {email: string, password: string}): Promise<RegisterApiResult>
  login(params: {email: string, password: string}): Promise<LoginApiResult>
}

export type LoginApiResult = ApiFieldError | ApiLoginSuccess | ApiUnknownError | ApiCredentialError
export type RegisterApiResult = ApiFieldError | ApiRegisterSuccess | ApiUnknownError | ApiCredentialError


type ApiFieldError = ApiResult<ApiResultType.FIELD_ERROR, FieldError[]>
type ApiUnknownError = ApiResult<ApiResultType.UNKNOWN_ERROR, undefined>
type ApiCredentialError = ApiResult<ApiResultType.CREDENTIAL_ERROR, string>

type ApiLoginSuccess = ApiResult<ApiResultType.SUCCESS, Account>
type ApiRegisterSuccess = ApiResult<ApiResultType.SUCCESS, undefined>