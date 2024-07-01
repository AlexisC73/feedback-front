import { CommentCount } from "../CommentCount/CommentCount";
import { Tag } from "../Tag/Tag";
import { UpvoteCount } from "../UpvoteCount/UpvoteCount";

export function FeedbackCard ({title, category, description, upvotes, comments}: {title: string, category: "ui" | "ux" | "enhancement" | "feature" | "bug", description: string, upvotes: number, comments: number}) {
  return (
    <div className="flex flex-col w-full p-6 bg-white rounded-2.5 gap-y-2">
      <h2 className="line-height-4.75 text-3.25 -tracking-0.18px font-bold text-#3A4374">{title}</h2>
      <p className="line-height-4.75 text-3.25 text-#647196">{description}</p>
      <div className="flex justify-start mt-0.25">
        <Tag title={category} active={false} />
      </div>
      <div className="flex justify-between items-center mt-2">
        <UpvoteCount count={upvotes} />
        <CommentCount count={comments} />
      </div>
    </div>
  )
}