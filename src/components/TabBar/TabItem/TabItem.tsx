import { ReactNode } from "react";

export function TabItem ({children, active = false, onClick}: {children: ReactNode, active?: boolean, onClick?: () => void}) {
  return (
    <li onClick={onClick} className={`cursor-pointer flex items-center justify-center flex-1 text-#3A4374 font-bold text-3.25 -tracking-0.18px border-b-4 ${active ? "border-#AD1FEA" : "border-transparent text-opacity-40"}`}>
      {children}
    </li>
  )
}