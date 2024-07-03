import { InvalidRequestError } from '@/store/errors/errors'
import * as E from 'fp-ts/Either'

export interface AccountRepository {
  create(params: {email: string, password: string}): Promise<E.Either<InvalidRequestError, void>>
}