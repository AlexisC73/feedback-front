import { RoadmapStatusCircle } from "@/components/Roadmap/RoadmapStatusCircle/RoadmapStatusCircle";
import { CommentCount } from "@/components/ui/CommentCount/CommentCount";
import { Tag } from "@/components/ui/Tag/Tag";
import { UpvoteComponent } from "@/store/feedbacks/app/UpvoteComponent/UpvoteComponent";
import { Feedback, FeedbackStatus } from "@/store/feedbacks/models/feedback";
import { Link } from "react-router-dom";

interface RoadmapCardProps {
  feedback: Feedback
}

export function RoadmapCard ({feedback}: RoadmapCardProps) {
  const cardTopColor: {[key in FeedbackStatus]: string} = {
    "In-Progress": "bg-#AD1FEA",
    Planned: "bg-#F49F85",
    Live: "bg-#62BCFA",
    Suggestion: "bg-#F2994A"
  }
  return (
    <div className="w-full bg-white rounded-2.5">
      <div className={`h-1.5 rounded-t-1.25 ${cardTopColor[feedback.status]}`}></div>
      <div className="flex flex-col gap-y-4 p-6 md:px-5">
        <div className="flex items-center gap-x-2 text-3.25 xl:text-4 text-#647196"><RoadmapStatusCircle status={feedback.status} /> {feedback.status}</div>
        <div className="flex flex-col gap-y-2 md:gap-y-6">
          <div className="flex flex-col gap-y-2.25">
            <Link to={`/feedbacks/${feedback.id}?back=roadmap`} className="text-3.25 -tracking-0.18px text-#3A4374 font-bold xl:text-4.5 hover:text-#4661E6">{feedback.title}</Link>
            <p className="text-#647196 text-3.25 xl:text-4">{feedback.description}</p>
          </div>
          <div className="flex justify-start">
            <Tag title={feedback.category} />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <UpvoteComponent feedbackId={feedback.id} />
          <CommentCount count={feedback.comments} />
        </div>
      </div>
    </div>
  )
}