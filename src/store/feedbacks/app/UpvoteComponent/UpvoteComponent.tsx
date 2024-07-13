import { UpvoteCount } from "@/components/ui/UpvoteCount/UpvoteCount"
import { useAppDispatch, useAppSelector } from "@/store/store-hooks"
import { selectFeedback } from "../../feedback.reducer"
import { upvoteFeedbackThunk } from "../../usecases/upvote-feedback.usecase"
import { useState } from "react"

interface UpvoteComponentProps {
  feedbackId: string
}

export function UpvoteComponent({feedbackId}: UpvoteComponentProps) {
  const dispatch = useAppDispatch()
  const feedback = useAppSelector(selectFeedback(feedbackId))
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  if(!feedback) {
    return null
  }

  const handleUpvote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsProcessing(true)
    dispatch(upvoteFeedbackThunk({feedbackId, upvote: !feedback.upvoted})).finally(() => setIsProcessing(false))
  }

  return (
    <button disabled={isProcessing} type="button" onClick={handleUpvote}>
      <UpvoteCount count={feedback.upvotes} upvoted={feedback.upvoted} />
    </button>
    
  )
}