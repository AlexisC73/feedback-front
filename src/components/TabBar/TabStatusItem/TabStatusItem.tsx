import { Feedback, FeedbackStatus } from "@/store/feedbacks/models/feedback"
import { TabItem } from "../TabItem/TabItem"

interface TabStatusItemProps {
  currentStatus: FeedbackStatus
  status: FeedbackStatus
  feedbacks: Feedback[]
  setStatus: (status: FeedbackStatus) => void
}

export const TabStatusItem = ({currentStatus, status, feedbacks, setStatus}: TabStatusItemProps) => {
  const handleUpdateStatus = () => {
    if(currentStatus === status) return
    setStatus(status)
  }
  const count = feedbacks.filter(f => f.status === status).length
  return (
    <TabItem active={currentStatus === status} onClick={handleUpdateStatus}>{status} ({count})</TabItem>
  )
}