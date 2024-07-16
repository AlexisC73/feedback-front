import { CommentCount } from "@/components/ui/CommentCount/CommentCount";
import { Tag } from "@/components/ui/Tag/Tag";
import { UpvoteComponent } from "@/store/feedbacks/app/UpvoteComponent/UpvoteComponent";
import { FeedbackCategory } from "@/store/feedbacks/models/feedback";
import { useTranslation } from "react-i18next";

export interface FeedbackCardProps {
  id: string
  title: string
  category: FeedbackCategory
  description: string
  upvotes: number
  comments: number
  upvoted: boolean
}

export function FeedbackCard ({title, category, description, comments, id}: FeedbackCardProps) {
  const {t} = useTranslation()
  return (
    <div className="flex flex-col md:flex-row w-full p-6 bg-white rounded-2.5 gap-y-2 md:items-center md:gap-x-10">
      <div className="hidden md:flex">
        <UpvoteComponent feedbackId={id} />
      </div>
      <div className="flex flex-col gap-y-2 md:gay-y-1 w-full">
        <h2 className="line-height-4.75 md:line-height-6.5 text-3.25 md:text-4.5 -tracking-0.18px font-bold text-#3A4374 break-all">{title}</h2>
        <p className="line-height-4.75 md:line-height-5.75 text-3.25 md:text-4 text-#647196 break-all">{description}</p>
        <div className="flex justify-start mt-0.25 md:mt-2">
          <Tag title={t(`categories.${category}`)} active={false} />
        </div>
      </div>
      <div className="hidden md:flex"><CommentCount count={comments} /></div>
      <div className="flex justify-between items-center mt-2 md:hidden">
        <UpvoteComponent feedbackId={id} />
        <CommentCount count={comments} />
      </div>
    </div>
  )
}