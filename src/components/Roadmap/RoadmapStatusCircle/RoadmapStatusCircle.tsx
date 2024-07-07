import { FeedbackStatus } from "@/store/feedbacks/models/feedback"

export function RoadmapStatusCircle ({status}: {status: FeedbackStatus}) {
  const color: {[key in FeedbackStatus]: string} = {
    Planned: "bg-#F49F85",
    "In-Progress": "bg-#AD1FEA",
    Live: "bg-#62BCFA",
    Suggestion: "bg-#647196",
  }
  return <div className={"h-2 w-2 rounded-full " + color[status]}></div>
}
