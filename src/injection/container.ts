import { RealIdProvider } from "@/store/@shared/infra/real-id-provider";
import { StubIdProvider } from "@/store/@shared/infra/stub-id-provider";
import { IdProvider } from "@/store/@shared/models/idProvider";
import { AccountApiRepository } from "@/store/account/infra/account-api.repository";
import { InMemoryAccountRepository } from "@/store/account/infra/in-memory-account.repository";
import { AccountRepository } from "@/store/account/models/account-repository";
import { CommentApiRepository } from "@/store/comments/infra/comment-api.repository";
import { InMemoryCommentRepository } from "@/store/comments/infra/in-memory-comment.repository";
import { CommentRepository } from "@/store/comments/models/comment.repository";
import { FeedbackApiRepository } from "@/store/feedbacks/infra/feedback-api.repository";
import { InMemoryFeedbackRepository } from "@/store/feedbacks/infra/in-memory-feedback.repository";
import { FeedbackRepository } from "@/store/feedbacks/models/feedback.repository";
import { Container } from "inversify";

export interface Dependencies {
  feedbackRepository: FeedbackRepository
  accountRepository: AccountRepository
  commentRepository: CommentRepository
  idProvider: IdProvider
}

export function createContainer() {
  const container = new Container({
    defaultScope: 'Singleton'
  })
  
  container.bind(AccountRepository).to(AccountApiRepository).inSingletonScope()
  container.bind(FeedbackRepository).to(FeedbackApiRepository).inSingletonScope()
  container.bind(CommentRepository).to(CommentApiRepository).inSingletonScope()
  container.bind(IdProvider).to(RealIdProvider).inSingletonScope()

  return container
}

export function createTestContainer() {
  const container = new Container({
    defaultScope: 'Singleton'
  })
  
  container.bind(AccountRepository).to(InMemoryAccountRepository).inSingletonScope()
  container.bind(FeedbackRepository).to(InMemoryFeedbackRepository).inSingletonScope()
  container.bind(CommentRepository).to(InMemoryCommentRepository).inSingletonScope()
  container.bind(IdProvider).to(StubIdProvider).inSingletonScope()

  return container
}