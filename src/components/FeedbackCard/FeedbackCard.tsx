import { CommentCount } from "../CommentCount/CommentCount";
import { Tag } from "../Tag/Tag";
import { UpvoteCount } from "../UpvoteCount/UpvoteCount";

export function FeedbackCard ({title, category, description, upvotes, comments}: {title: string, category: "ui" | "ux" | "enhancement" | "feature" | "bug", description: string, upvotes: number, comments: number}) {
  return (
    <div className="flex flex-col md:flex-row w-full p-6 bg-white rounded-2.5 gap-y-2 md:items-center md:gap-x-10">
      <div className="hidden md:flex">
        <UpvoteCount count={upvotes} />
      </div>
      <div className="flex flex-col gap-y-2 md:gay-y-1 w-full">
        <h2 className="line-height-4.75 md:line-height-6.5 text-3.25 md:text-4.5 -tracking-0.18px font-bold text-#3A4374">{title}</h2>
        <p className="line-height-4.75 md:line-height-5.75 text-3.25 md:text-4 text-#647196">{description}</p>
        <div className="flex justify-start mt-0.25 md:mt-2">
          <Tag title={category} active={false} />
        </div>
      </div>
      <div className="hidden md:flex"><CommentCount count={comments} /></div>
      <div className="flex justify-between items-center mt-2 md:hidden">
        <UpvoteCount count={upvotes} />
        <CommentCount count={comments} />
      </div>
    </div>
  )
}