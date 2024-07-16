import { PropsWithChildren } from "react";

export function TabBar ({children}: PropsWithChildren) {
  return (
    <div id="tab-bar" className="md:hidden">
      <ul className="h-13.75 flex border-b-1 border-#8C92B3 border-opacity-25">
        {children}
      </ul>
    </div>
  )
}