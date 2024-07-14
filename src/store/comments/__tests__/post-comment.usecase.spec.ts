import { stateBuilder } from "@/store/state-builder";
import { beforeEach, describe, test } from "vitest";
import { CommentFixture, createCommentFixture } from "./comment-fixture";
import { createFeedbackFixture, FeedbackFixture } from "@/store/feedbacks/__tests__/feedback.fixture";
import { feedbackBuilder } from "@/store/feedbacks/__tests__/feedback.builder";
import { AccountFixture, createAccountFixture } from "@/store/account/__tests__/account.fixture";
import { commentBuilder } from "./comment-builder";
import { authAccountBuilder } from "@/store/account/__tests__/authAccountBuilder";

describe("Post comment usecase", () => {
  let commentFixture: CommentFixture
  let feedbackFixture: FeedbackFixture
  let accountFixture: AccountFixture

  beforeEach(() => {
    const store = stateBuilder()
    commentFixture = createCommentFixture(store)
    feedbackFixture = createFeedbackFixture(store)
    accountFixture = createAccountFixture(store)
  })

  test("should post a comment", async () => {
    const existingFeedback = feedbackBuilder().withId("1").build()
    const authAccount = authAccountBuilder().withId("2").withEmail("user@email.fr").build()
    const newComment = commentBuilder().withId("45").withSender({
      avatar: authAccount.avatar,
      displayName: authAccount.displayName,
      id: authAccount.id,
      username: authAccount.username
    }).withFeedbackId("1").withSender({
      avatar: authAccount.avatar,
      displayName: authAccount.displayName,
      id: authAccount.id,
      username: authAccount.username
    }).build()

    commentFixture.givenNoCommentsExist()
    feedbackFixture.givenFeedbacksExists([existingFeedback])
    commentFixture.givenNextId(newComment.id)
    accountFixture.givenIsAuthenticatedAs(authAccount)

    await commentFixture.postComment({
      feedbackId: newComment.feedbackId,
      content: newComment.content,
    })

    commentFixture.thenCommentShouldExist(newComment)
    commentFixture.thenCommentStateShouldBe({
      comments: [newComment],
      loading: false
    })
  })
})