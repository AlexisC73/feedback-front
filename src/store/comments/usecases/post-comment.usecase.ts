import { createAppAsyncThunk } from "@/store/create-app-thunk";
import { PostCommentPayload } from "./payload/post-usecase.payload";
import { Comment } from "../models/comment";
import { ApiResultType, UsecaseErrors, UsecaseResultType, UsecaseSuccess } from "@/store/@shared/models/resultType";
import { PostCommentParams } from "../models/comment.repository";
import { handleUsecaseErrors } from "@/helpers/handleUsecaseError";

export const postCommentThunk = createAppAsyncThunk.withTypes<{rejectValue: UsecaseErrors}>()("comments/postComment", async (params: PostCommentUsecaseParams, {getState, extra: { commentRepository, idProvider }, rejectWithValue}) => {
  const { account } = getState().auth
  if(!account) {
    return rejectWithValue({
      type: UsecaseResultType.CREDENTIAL_ERROR,
      data: undefined
    })
  }

  const payload = new PostCommentPayload({
    id: idProvider.generateId(),
    feedbackId: params.feedbackId,
    content: params.content
  })

  if(!payload.validate()) {
    return rejectWithValue({
      type: UsecaseResultType.FIELD_ERROR,
      data: payload.errors
    })
  }

  try {
    const postCommentParams: PostCommentParams = {
      id: payload.id,
      content: payload.commentMessage.value,
      feedbackId: payload.feedbackId,
      replyTo: null
    }

    const result = await commentRepository.postComment(postCommentParams)
    const addedComment: Comment = {
      id: payload.id,
      content: payload.commentMessage.value,
      feedbackId: payload.feedbackId,
      sender: {
        avatar: account.avatar,
        displayName: account.displayName,
        id: account.id,
        username: account.username
      },
      replyTo: null
    }

    if(result.type === ApiResultType.SUCCESS) {
      return {type: UsecaseResultType.SUCCESS, data: addedComment} as UsecaseSuccess<Comment>
    }
    return rejectWithValue(handleUsecaseErrors(result, {}))
  } catch(e) {
    return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR, data: undefined})
  }
})

export type PostCommentUsecaseParams = {
  feedbackId: string
  content: string
}
