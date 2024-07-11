import { IdProvider } from "@/store/@shared/models/idProvider";
import { AccountRepository } from "@/store/account/models/account-repository";
import { CommentRepository } from "@/store/comments/models/comment.repository";
import { FeedbackRepository } from "@/store/feedbacks/models/feedback.repository";
import { Container } from "inversify";

type Classes = {
  AccountRepository: new () => AccountRepository
  FeedbackRepository: new () => FeedbackRepository
  CommentRepository: new () => CommentRepository
  IdProvider: new () => IdProvider
}

export function createContainer(repo: Classes) {
  const container = new Container({
    defaultScope: 'Singleton'
  })
  
  container.bind(AccountRepository).to(repo.AccountRepository).inSingletonScope()
  container.bind(FeedbackRepository).to(repo.FeedbackRepository).inSingletonScope()
  container.bind(CommentRepository).to(repo.CommentRepository).inSingletonScope()
  container.bind(IdProvider).to(repo.IdProvider).inSingletonScope()

  return container
}