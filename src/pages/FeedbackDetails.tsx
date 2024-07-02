import { useParams } from "react-router-dom";
import { GoBackButton } from "../components/BoBackButton/GoBackButton";
import { Button } from "../components/Button/button";
import { FeedbackCard } from "../components/FeedbackCard/FeedbackCard";
import { feedbacks } from "../feedback";
import Layout from "../Layout";


export function FeedbackDetailsPage () {
  const params = useParams<{id: string}>()
  const feedback = feedbacks[Number(params.id)]

  return (
    <Layout.emptyLayout>
      <div className="flex flex-col gap-y-6 p-6">
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
    </Layout.emptyLayout>
  )
}
