import 'reflect-metadata'
import { StubIdProvider } from "./@shared/infra/stub-id-provider"
import { InMemoryAccountRepository } from "./account/infra/in-memory-account.repository"
import { InMemoryCommentRepository } from "./comments/infra/in-memory-comment.repository"
import { InMemoryFeedbackRepository } from "./feedbacks/infra/in-memory-feedback.repository"
import { AppStore, createStore, RootState } from "./store"
import { createContainer } from '@/injection/container'
import { AccountRepository } from './account/models/account-repository'
import { FeedbackRepository } from './feedbacks/models/feedback.repository'
import { CommentRepository } from './comments/models/comment.repository'
import { IdProvider } from './@shared/models/idProvider'

export const stateBuilder = () => {
  const testContainer = createContainer({
    AccountRepository: InMemoryAccountRepository,
    CommentRepository: InMemoryCommentRepository,
    FeedbackRepository: InMemoryFeedbackRepository,
    IdProvider: StubIdProvider
  })
  
  let store: AppStore = createStore(testContainer)

  const setStore = (newState: RootState) => {
    store = createStore(testContainer, newState)
  }

  return {
    getStore() {
      return store
    },
    setStore,
    getAccountRepository() {
      return testContainer.get(AccountRepository) as InMemoryAccountRepository
    },
    getFeedbackRepository(): InMemoryFeedbackRepository {
      return testContainer.get(FeedbackRepository) as InMemoryFeedbackRepository
    },
    getIdProvider() {
      return testContainer.get(IdProvider) as StubIdProvider
    },
    getCommentRepository() {
      return testContainer.get(CommentRepository) as InMemoryCommentRepository
    }
  }
}

export type StateBuilder = ReturnType<typeof stateBuilder>