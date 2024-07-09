import { createAppAsyncThunk } from "@/store/create-app-thunk";
import { PostCommentPayload } from "./payload/post-usecase.payload";
import { Comment } from "../models/comment";
import { ApiResultType, UsecaseCredentialError, UsecaseFieldError, UsecaseResultType, UsecaseUnknownError } from "@/store/@shared/models/resultType";
import { exhaustiveGuard } from "@/store/@shared/utiles/exhaustive-guard";

export const postCommentThunk = createAppAsyncThunk.withTypes<{rejectValue: PostCommentRejectResult}>()("comments/postComment", async (params: PostCommentPayload["data"], {getState, extra: { commentRepository }, rejectWithValue}) => {
  const { account } = getState().auth
  if(!account) {
    return rejectWithValue({
      type: UsecaseResultType.CREDENTIAL_ERROR,
      data: "User is not logged in"
    })
  }

  const payload = new PostCommentPayload(params)

  if(!payload.validate()) {
    return rejectWithValue({
      type: UsecaseResultType.FIELD_ERROR,
      data: payload.errors
    })
  }

  const newComment: Comment = {
    id: params.id,
    content: params.content,
    feedbackId: params.feedbackId,
    replyTo: params.replyTo,
    sender: {
      name: account.email,
      avatar: null
    }
  }

  try {
    const result = await commentRepository.postComment(newComment)

    switch(result.type) {
      case ApiResultType.SUCCESS:
        return {type: UsecaseResultType.SUCCESS, data: newComment}
      case ApiResultType.FIELD_ERROR:
        return rejectWithValue({type: UsecaseResultType.FIELD_ERROR, data: result.data})
      case ApiResultType.CREDENTIAL_ERROR:
        return rejectWithValue({type: UsecaseResultType.CREDENTIAL_ERROR, data: result.data})
      default:
        return exhaustiveGuard(result)
    }
  } catch(e) {
    return rejectWithValue({type: UsecaseResultType.UNKNOWN_ERROR, data: undefined})
  }
})

export type PostCommentRejectResult = UsecaseCredentialError | UsecaseUnknownError | UsecaseFieldError
