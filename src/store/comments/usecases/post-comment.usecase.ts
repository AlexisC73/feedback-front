import { createAppAsyncThunk } from "@/store/create-app-thunk";
import { PostCommentPayload } from "./payload/post-usecase.payload";
import { Comment } from "../models/comment";
import { ApiResultType, UsecaseCredentialError, UsecaseFieldError, UsecaseResultType, UsecaseSuccess, UsecaseUnknownError } from "@/store/@shared/models/resultType";
import { exhaustiveGuard } from "@/store/@shared/utiles/exhaustive-guard";
import { PostCommentParams } from "../models/comment.repository";

export const postCommentThunk = createAppAsyncThunk.withTypes<{rejectValue: PostCommentRejectResult}>()("comments/postComment", async (params: PostCommentUsecaseParams, {getState, extra: { commentRepository, idProvider }, rejectWithValue}) => {
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

    switch(result.type) {
      case ApiResultType.SUCCESS:
        return {type: UsecaseResultType.SUCCESS, data: addedComment} as UsecaseSuccess<Comment>
      case ApiResultType.FIELD_ERROR:
        return rejectWithValue({type: UsecaseResultType.FIELD_ERROR, data: result.data})
      case ApiResultType.CREDENTIAL_ERROR:
        return rejectWithValue({type: UsecaseResultType.CREDENTIAL_ERROR, data: undefined})
      case ApiResultType.UNKNOWN_ERROR:
        return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR, data: undefined})
      default:
        return exhaustiveGuard(result)
    }
  } catch(e) {
    return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR, data: undefined})
  }
})

export type PostCommentRejectResult = UsecaseCredentialError | UsecaseUnknownError | UsecaseFieldError

export type PostCommentUsecaseParams = {
  feedbackId: string
  content: string
}
