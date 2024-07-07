import { StubIdProvider } from "./@shared/infra/stub-id-provider"
import { InMemoryAccountRepository } from "./account/infra/in-memory-account.repository"
import { InMemoryCommentRepository } from "./comments/infra/in-memory-comment.repository"
import { InMemoryFeedbackRepository } from "./feedbacks/infra/in-memory-feedback.repository"
import { AppStore, createStore, Dependencies, RootState } from "./store"

export const stateBuilder = () => {
  const accountRepository = new InMemoryAccountRepository()
  const feedbackRepository = new InMemoryFeedbackRepository()
  const idProvider = new StubIdProvider()
  const commentRepository = new InMemoryCommentRepository()
  const dependencies: Dependencies = {accountRepository, feedbackRepository, idProvider, commentRepository}
  
  let store: AppStore = createStore(dependencies)

  const setStore = (newState: RootState) => {
    store = createStore(dependencies, newState)
  }

  return {
    getStore() {
      return store
    },
    setStore,
    getAccountRepository() {
      return accountRepository
    },
    getFeedbackRepository() {
      return feedbackRepository
    },
    getIdProvider() {
      return idProvider
    },
    getCommentRepository() {
      return commentRepository
    }
  }
}

export type StateBuilder = ReturnType<typeof stateBuilder>