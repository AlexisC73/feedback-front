import { useParams } from "react-router-dom";
import { GoBackButton } from "../components/BoBackButton/GoBackButton";
import { Button } from "../components/Button/button";
import { FeedbackCard } from "../components/FeedbackCard/FeedbackCard";
import { feedbacks } from "../feedback";

export function FeedbackDetailsPage () {
  const params = useParams<{id: string}>()
  const feedback = feedbacks[Number(params.id)]

  return (
    <div className="bg-#F7F8FD min-h-screen flex flex-col p-6 gap-y-6">
      <div className="flex justify-between">
        <GoBackButton />
        <button>
          <Button type="secondary">
            Edit Feedback
          </Button>
        </button>
      </div>
      <FeedbackCard {...feedback} />
    </div>
  )
}
