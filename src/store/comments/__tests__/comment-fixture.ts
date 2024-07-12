import { StateBuilder } from "@/store/state-builder";
import { CommentState } from "../comment-reducer";
import { expect } from "vitest";
import { Comment } from "../models/comment";
import { postCommentThunk, PostCommentUsecaseParams } from "../usecases/post-comment.usecase";
import { UsecaseResultType } from "@/store/@shared/models/resultType";
import { getCommentsForFeedbackThunk, GetFeedbackCommentParams } from "../usecases/get-comments.usecase";

export const createCommentFixture = (store: StateBuilder) => {
  let resultType: UsecaseResultType | undefined

  return {
    givenNoCommentsExist() {
      store.getCommentRepository().comments = []
    },
    givenExistingComments(comments: Comment[]) {
      store.getCommentRepository().comments = comments
    },
    givenCommentStateIs(comments: CommentState){
      store.setStore({...store.getStore().getState(), comments})
    },
    givenNextId(id: string) {
      store.getIdProvider().id =id
    },
    async postComment(params: PostCommentUsecaseParams) {
      const result = await store.getStore().dispatch(postCommentThunk(params))
      if(result.payload?.type) {
        resultType = result.payload.type
      }
    },
    async getCommentsForFeedback(params: GetFeedbackCommentParams) {
      const result = await store.getStore().dispatch(getCommentsForFeedbackThunk(params))
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