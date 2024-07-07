import { ArrowIcon } from "@/assets/icons";

export function UpvoteCount ({count, upvoted}: {count: number, upvoted: boolean}) {
  return (
    <p className={`hover:bg-#CFD7FF cursor-pointer flex items-center gap-x-2.5 pr-3.75 pt-1.5 pb-1.75 pl-4 rounded-2.5 md:p-0 md:flex-col md:pt-3.5 md:w-10 md:h-13.25 md:gap-y-2 ${upvoted ? "bg-#4661E6 text-white" : "bg-#F2F4FE text-#3A4374"}`}>
      <ArrowIcon className={`text-2 ${upvoted ? "text-white" : "text-#4661E6"}`} />
      <strong className="text-3.25 -tracking-0.18px line-height-4.75">{count}</strong>
    </p>
  )
}