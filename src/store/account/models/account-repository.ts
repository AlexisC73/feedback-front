import { InvalidRequestError } from '@/store/errors/errors'
import * as E from 'fp-ts/Either'
import { DomainAccount } from './account'

export interface AccountRepository {
  create(params: {email: string, password: string}): Promise<E.Either<InvalidRequestError, void>>
  login(params: {email: string, password: string}): Promise<E.Either<InvalidRequestError, Omit<DomainAccount, "password">>>
}