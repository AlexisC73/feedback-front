import { Link } from "react-router-dom";
import { EmptyFeedbackIcon } from "../../assets/icons";
import { Button } from "../Button/button";

export function EmptyFeedback () {
  return (
    <div className="flex flex-col px-6 py-19 md:py-27.5 justify-center items-center gap-y-13.5 bg-white w-full h-full rounded-2.5">
        <EmptyFeedbackIcon />
        <div className="flex flex-col items-center gap-y-4 max-w-102.5">
          <p className="text-6 text-#3A4374 font-bold -tracking-0.33px line-height-8.75">There is no feedback yet.</p>
          <p className="text-#647196 text-center">Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
          <Link to="/feedbacks/new" className="mt-8">
            <Button>+ Add Feedback</Button>
          </Link>
        </div>
      </div>
  )
}