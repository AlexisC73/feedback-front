import { PropsWithChildren } from "react";

export function RoadmapColumnList ({children}: PropsWithChildren) {
  return (
    <ul id="list" className="flex flex-col gap-y-4">
      {children}
    </ul>
  )
}