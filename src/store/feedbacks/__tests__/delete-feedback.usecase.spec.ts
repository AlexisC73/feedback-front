import { beforeEach, describe, test } from "vitest";
import { createFeedbackFixture, FeedbackFixture } from "./feedback.fixture";
import { feedbackBuilder } from "./feedback.builder";
import { stateBuilder } from "@/store/state-builder";
import { AccountFixture, createAccountFixture } from "@/store/account/__tests__/account.fixture";
import { Role } from "@/store/account/models/account";
import { commentBuilder } from "@/store/comments/__tests__/comment-builder";
import { CommentFixture, createCommentFixture } from "@/store/comments/__tests__/comment-fixture";

describe("Delete Feedbacks Usecase", () => {
  let feedbackFixture: FeedbackFixture
  let accountFixture: AccountFixture
  let commentFixture: CommentFixture

  beforeEach(() => {
    const store = stateBuilder()
    feedbackFixture = createFeedbackFixture(store)
    accountFixture = createAccountFixture(store)
    commentFixture = createCommentFixture(store)
  })

  test("should delete the feedbacks without comment", async () => {
    const feedback = feedbackBuilder().withId("f-id").withOwner("1").build()
    
    feedbackFixture.givenFeedbacksExists([feedback])
    accountFixture.givenIsAuthenticatedAs({id: "1", email: "test@test.fr", avatar: "https://test.fr/avatar.png", role: Role.USER})

    await feedbackFixture.whenDeleteFeedback({
      feedbackId: feedback.id
    })

    feedbackFixture.thenFeedbacksStateShouldBe({data: [], loading: false})
    feedbackFixture.thenFeedbackShouldNotExists(feedback)
  })

  test("should delete the feedbacks and associated comments", async () => {
    const feedback = feedbackBuilder().withId("f-id").withOwner("1").build()
    const existingComments = [commentBuilder().withId("c-1").withFeedbackId(feedback.id).build(), commentBuilder().withId("c-2").withFeedbackId(feedback.id).build()]
    
    feedbackFixture.givenFeedbacksExists([feedback])
    commentFixture.givenCommentStateIs({comments: existingComments, loading: false})
    
    accountFixture.givenIsAuthenticatedAs({id: "1", email: "test@test.fr", avatar: "https://test.fr/avatar.png", role: Role.USER})

    await feedbackFixture.whenDeleteFeedback({
      feedbackId: feedback.id
    })

    feedbackFixture.thenFeedbacksStateShouldBe({data: [], loading: false})
    commentFixture.thenCommentStateShouldBe({comments: [], loading: false})
  })

  test("should delete the feedbacks and associated comments", async () => {
    const feedback = feedbackBuilder().withId("f-id").withOwner("1").build()
    const otherComment = commentBuilder().withId("c-3").withFeedbackId("other-feedback").build()
    const feedbackComments = [commentBuilder().withId("c-1").withFeedbackId(feedback.id).build(), commentBuilder().withId("c-2").withFeedbackId(feedback.id).build()]
    
    feedbackFixture.givenFeedbacksExists([feedback])
    commentFixture.givenCommentStateIs({comments: [...feedbackComments, otherComment], loading: false})
    
    accountFixture.givenIsAuthenticatedAs({id: "1", email: "test@test.fr", avatar: "https://test.fr/avatar.png", role: Role.USER})

    await feedbackFixture.whenDeleteFeedback({
      feedbackId: feedback.id
    })

    feedbackFixture.thenFeedbacksStateShouldBe({data: [], loading: false})
    commentFixture.thenCommentStateShouldBe({comments: [otherComment], loading: false})
  })
})