import { PostCommentForm } from "@/components/form/post-comment-form/PostCommentForm";
import { useAppDispatch } from "@/store/store-hooks";
import { postCommentThunk } from "../../usecases/post-comment.usecase";
import { PostCommentPayload } from "../../usecases/payload/post-usecase.payload";
import { UsecaseResultType } from "@/store/@shared/models/resultType";
import { useContext, useState } from "react";
import { notifyUsecaseError } from "@/helpers/handleUsecaseError";
import { ToastCtx } from "@/Context/ToastCtx/ToastCtx";

interface PostCommentComponentProps {
  feedbackId: string
}

export function PostCommentComponent ({ feedbackId }: PostCommentComponentProps) {
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({})
  const {addToast} = useContext(ToastCtx)
  const dispatch = useAppDispatch()

  const handlePostComment = async (params: PostCommentPayload["data"]) => {
    setErrors({})
    await dispatch(postCommentThunk(params)).then((res) => {
      if(res.payload?.type === UsecaseResultType.SUCCESS) {
        return
      } else if(res.payload?.type === UsecaseResultType.FIELD_ERROR) {
        const errors: {[key: string]: string[]} = {}
        if(Array.isArray(res.payload.data)) {
          res.payload.data.forEach((errorField) => {
            errors[errorField.field] = errorField.errors
          })
        }
        setErrors(errors)
      } else {
        notifyUsecaseError(addToast, res.payload)
      }
    })
    
  }

  return (
    <PostCommentForm onSubmit={handlePostComment} errors={errors} feedbackId={feedbackId} />
  )
}