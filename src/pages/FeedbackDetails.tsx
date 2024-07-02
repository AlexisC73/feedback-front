import { Link, useParams } from "react-router-dom";
import { GoBackButton } from "../components/BoBackButton/GoBackButton";
import { Button } from "../components/Button/button";
import { FeedbackCard } from "../components/FeedbackCard/FeedbackCard";
import { feedbacks } from "../feedback";
import Layout from "../Layout";


export function FeedbackDetailsPage () {
  const params = useParams<{id: string}>()
  const feedback = feedbacks.find(f => f.id === params.id)

  if(!feedback) return (<div>Not found</div>)

  return (
    <Layout.emptyLayout>
      <div className="flex flex-col gap-y-6 p-6">
        <div className="flex justify-between">
          <Link to="/"><GoBackButton /></Link>
          <button>
            <Link to={`/feedbacks/edit/${params.id}`}>
              <Button type="secondary">Edit Feedback</Button>
            </Link>
          </button>
        </div>
        <FeedbackCard {...feedback} />
      </div>
    </Layout.emptyLayout>
  )
}
