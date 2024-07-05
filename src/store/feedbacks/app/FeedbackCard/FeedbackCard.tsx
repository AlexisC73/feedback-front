import { useAppSelector } from "@/store/store-hooks";
import { createFeedbackCardViewModel, FeedbackCardViewModelReturnType } from "./FeedbackCard.viewmodel";
import { FeedbackCard } from "@/components/FeedbackCard/FeedbackCard";
import { selectFeedbacks } from "../../feedback.reducer";

export function FeedbackCardComponent ({feedbackId}: {feedbackId: string}) {
  const {data: feedbacks} = useAppSelector(selectFeedbacks)
  const feedback = createFeedbackCardViewModel({feedbacks, feedbackId})

  const CardElement: React.FC = () => {
    switch(feedback.type) {
      case FeedbackCardViewModelReturnType.SUCCESS:
        return <FeedbackCard {...feedback.data} />
      case FeedbackCardViewModelReturnType.NOT_EXIST:
        return <p>Not found</p>
      default:
        return <p>Not found</p>
    }
  }
  
  return (
    <CardElement />
  )
}