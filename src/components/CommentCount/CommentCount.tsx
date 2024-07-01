import { MessageIcon } from "../../assets/icons";

export function CommentCount ({count}: {count: number}) {
  return (
    <p className="flex items-center gap-x-1.5">
      <MessageIcon className="text-#CDD2EE text-4" />
      <strong className={`text-#3A4374 text-3.25 -tracking-0.18px line-height-4.75 ${count > 0 ? "opacity-100" : "opacity-50"}`}>{count}</strong>
    </p>
  )
}
