import { stateBuilder } from "@/store/state-builder";
import { beforeEach, describe, test } from "vitest";
import { CommentFixture, createCommentFixture } from "./comment-fixture";
import { createFeedbackFixture, FeedbackFixture } from "@/store/feedbacks/__tests__/feedback.fixture";
import { feedbackBuilder } from "@/store/feedbacks/__tests__/feedback.builder";
import { AccountFixture, createAccountFixture } from "@/store/account/__tests__/account.fixture";
import { Role } from "@/store/account/models/account";
import { commentBuilder } from "./comment-builder";

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
    const newComment = commentBuilder().withId("45").withFeedbackId("1").withSender({name: "test@test.fr", avatar: "https://example.com/avatar.png"}).build()

    commentFixture.givenNoCommentsExist()
    feedbackFixture.givenFeedbacksExists([existingFeedback])
    commentFixture.givenNextId(newComment.id)
    accountFixture.givenIsAuthenticatedAs({id: "99", email: "test@test.fr", role: Role.USER, avatar: "https://example.com/avatar.png"})

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