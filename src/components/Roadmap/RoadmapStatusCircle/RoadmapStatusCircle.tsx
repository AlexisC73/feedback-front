import { FeedbackStatus } from "@/store/feedbacks/models/feedback"

export function RoadmapStatusCircle ({status}: {status: FeedbackStatus}) {
  const color: {[key in FeedbackStatus]: string} = {
    planned: "bg-#F49F85",
    "in-progress": "bg-#AD1FEA",
    live: "bg-#62BCFA",
    suggestion: "bg-#647196",
  }
  return <div className={"h-2 w-2 rounded-full " + color[status]}></div>
}
