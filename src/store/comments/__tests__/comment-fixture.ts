import { StateBuilder } from "@/store/state-builder";
import { PostCommentPayload } from "../usecases/payload/post-usecase.payload";
import { CommentState } from "../comment-reducer";
import { expect } from "vitest";
import { Comment } from "../models/comment";
import { postCommentThunk } from "../usecases/post-comment.usecase";
import { UsecaseResultType } from "@/store/@shared/models/resultType";

export const createCommentFixture = (store: StateBuilder) => {
  let resultType: UsecaseResultType | undefined

  return {
    givenNoCommentsExist() {
    },
    async postComment(params: PostCommentPayload["data"]) {
      const result = await store.getStore().dispatch(postCommentThunk(params))
      if(result.payload?.type) {
        resultType = result.payload.type
      }
    },
    thenCommentShouldExist(comment: Comment) {
      const repoComment = store.getCommentRepository().comments.find(c => c.id === comment.id)
      expect(repoComment).toEqual(comment)
    },
    thenCommentStateShouldBe(expectedState: CommentState) {
      expect(store.getStore().getState().comments).toEqual(expectedState)
    },
    thenResultTypeShouldBe(expectedType: UsecaseResultType) {
      expect(resultType).toEqual(expectedType)
    }
  }
}

export type CommentFixture = ReturnType<typeof createCommentFixture>