import { beforeEach, describe, test } from "vitest";
import { CommentFixture, createCommentFixture } from "./comment-fixture";
import { createFeedbackFixture, FeedbackFixture } from "@/store/feedbacks/__tests__/feedback.fixture";
import { AccountFixture, createAccountFixture } from "@/store/account/__tests__/account.fixture";
import { stateBuilder } from "@/store/state-builder";
import { Role } from "@/store/account/models/account";
import { commentBuilder } from "./comment-builder";
import { feedbackBuilder } from "@/store/feedbacks/__tests__/feedback.builder";

describe("Get comments usecase", () => {
  let commentFixture: CommentFixture
  let feedbackFixture: FeedbackFixture
  let accountFixture: AccountFixture

  beforeEach(() => {
    const store = stateBuilder()
    commentFixture = createCommentFixture(store)
    feedbackFixture = createFeedbackFixture(store)
    accountFixture = createAccountFixture(store)
  })


  test("should return empty array if no comments", async () => {
    const existingFeedbacks = [feedbackBuilder().withId("fb-id").build()]
    const existingComments = [commentBuilder().withId("comment-id").build()]
    accountFixture.givenIsAuthenticatedAs({
      id: "1",
      avatar: "https://example.com/avatar.jpg",
      email: "test@test.fr",
      role: Role.USER
    })
    feedbackFixture.givenFeedbacksExists(existingFeedbacks)
    commentFixture.givenExistingComments(existingComments)

    await commentFixture.getCommentsForFeedback({feedbackId: existingFeedbacks[0].id })

    commentFixture.thenCommentStateShouldBe({
      comments: [],
      loading: false
    })
  })

  test('should return comments when exists', async () => {
    const commentedFeedback = feedbackBuilder().withId("fb-id").build()
    const otherFeedbacks = [feedbackBuilder().withId("fb-id-2").build()]
    const existingComments = [commentBuilder().withId("1").withFeedbackId(commentedFeedback.id).build(), commentBuilder().withId("2").withFeedbackId(commentedFeedback.id).withContent("It's a testing content").build()]

    accountFixture.givenIsAuthenticatedAs({
      id: "1",
      avatar: "https://example.com/avatar.jpg",
      email: "test@test.fr",
      role: Role.USER
    })
    feedbackFixture.givenFeedbacksExists([...otherFeedbacks, commentedFeedback])
    commentFixture.givenExistingComments(existingComments)
    commentFixture.givenCommentStateIs({
      comments: [],
      loading: false
    })

    await commentFixture.getCommentsForFeedback({
      feedbackId: commentedFeedback.id
    })

    commentFixture.thenCommentStateShouldBe({
      comments: existingComments,
      loading: false
    })
  })

  test('should return comments when exists and add to state with already existing comments in state', async () => {
    const firstFeedback = feedbackBuilder().withId("fb-id").build()
    const secondFeedback = feedbackBuilder().withId("fb-id-2").build()
    const firstComments = [commentBuilder().withId("com-1").withFeedbackId(firstFeedback.id).build()]
    const secondComments = [commentBuilder().withId("com-2").withFeedbackId(secondFeedback.id).build()]

    accountFixture.givenIsAuthenticatedAs({
      id: "1",
      avatar: "https://example.com/avatar.jpg",
      email: "test@test.fr",
      role: Role.USER
    })
    feedbackFixture.givenFeedbacksExists([firstFeedback, secondFeedback])
    commentFixture.givenExistingComments([...firstComments, ...secondComments])
    commentFixture.givenCommentStateIs({
      comments: firstComments,
      loading: false
    })

    await commentFixture.getCommentsForFeedback({
      feedbackId: secondFeedback.id
    })

    commentFixture.thenCommentStateShouldBe({
      comments: [...firstComments, ...secondComments],
      loading: false
    })
  })
})