import { ArrowIcon } from "../../assets/icons";

export function UpvoteCount ({count}: {count: number}) {
  return (
    <p className="bg-#F2F4FE flex items-center gap-x-2.5 pr-3.75 pt-1.5 pb-1.75 pl-4 rounded-2.5">
      <ArrowIcon className="text-2 text-#4661E6" />
      <strong className="text-#3A4374 text-3.25 -tracking-0.18px line-height-4.75">{count}</strong>
    </p>
  )
}