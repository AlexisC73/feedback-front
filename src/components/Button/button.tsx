import { ReactNode } from "react";

export type ButtonType = "primary" | "secondary" | "tertiary" | "danger"

export function Button ({children, type = "primary", fullWidth = false}: {children?: ReactNode, type?: ButtonType, fullWidth?: boolean}) {
  const styles: {[key in ButtonType]: string} = {
    primary: "bg-#AD1FEA text-white hover:bg-#C75AF6",
    secondary: "bg-#4661E6 text-white hover:bg-#7C91F9",
    tertiary: "bg-#3A4374 text-white hover:bg-#656EA3",
    danger: "bg-#D73737 text-white hover:bg-#E98888",
  }
  return (
    <div className={`pt-3.25 pb-2.75 rounded-2.5 font-bold text-3.5 text-center ${fullWidth ? "w-full" : "w-39.5"} ${styles[type]}`}>{children}</div>
  )
}
