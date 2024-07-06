import { UpvoteCount } from "@/components/UpvoteCount/UpvoteCount"
import { useAppDispatch, useAppSelector } from "@/store/store-hooks"
import { selectFeedback } from "../../feedback.reducer"
import { upvoteFeedbackThunk } from "../../usecases/upvote-feedback.usecase"

interface UpvoteComponentProps {
  feedbackId: string
}

export function UpvoteComponent({feedbackId}: UpvoteComponentProps) {
  const dispatch = useAppDispatch()
  const feedback = useAppSelector(selectFeedback(feedbackId))

  if(!feedback) {
    return null
  }

  const handleUpvote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(upvoteFeedbackThunk({feedbackId, upvote: !feedback.upvoted}))
  }

  return (
    <button type="button" onClick={handleUpvote}>
      <UpvoteCount count={feedback.upvotes} upvoted={feedback.upvoted} />
    </button>
    
  )
}