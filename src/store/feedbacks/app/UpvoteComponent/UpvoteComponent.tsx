import { UpvoteCount } from "@/components/ui/UpvoteCount/UpvoteCount"
import { useAppDispatch, useAppSelector } from "@/store/store-hooks"
import { selectFeedback } from "../../feedback.reducer"
import { upvoteFeedbackThunk } from "../../usecases/upvote-feedback.usecase"
import { useContext, useState } from "react"
import { UsecaseResultType } from "@/store/@shared/models/resultType"
import { notifyUsecaseError } from "@/helpers/handleUsecaseError"
import { ToastCtx } from "@/Context/ToastCtx/ToastCtx"

interface UpvoteComponentProps {
  feedbackId: string
}

export function UpvoteComponent({feedbackId}: UpvoteComponentProps) {
  const dispatch = useAppDispatch()
  const feedback = useAppSelector(selectFeedback(feedbackId))
  const {addToast} = useContext(ToastCtx)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  if(!feedback) {
    return null
  }

  const handleUpvote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsProcessing(true)
    dispatch(upvoteFeedbackThunk({feedbackId, upvote: !feedback.upvoted})).then(res => {
      if(res.payload?.type === UsecaseResultType.SUCCESS) {
        return
      } else {
        notifyUsecaseError(addToast, res.payload)
      }
    }).finally(() => setIsProcessing(false))
  }

  return (
    <button disabled={isProcessing} type="button" onClick={handleUpvote}>
      <UpvoteCount count={feedback.upvotes} upvoted={feedback.upvoted} />
    </button>
    
  )
}