import { ReactNode } from "react";

export function CommentList ({children}: {children?: ReactNode}) {
  return (
    <ul className="flex flex-col bg-white p-6 rounded-2.5 gap-y-6">
      {children}
    </ul>
  )
}