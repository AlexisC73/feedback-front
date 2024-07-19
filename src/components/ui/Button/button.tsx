import { LoadingIcon } from "@/assets/icons";
import { ReactNode } from "react";

export type ButtonType = "primary" | "secondary" | "tertiary" | "danger"

export function Button ({children, type = "primary", fullWidth = false, isLoading = false}: {children?: ReactNode, type?: ButtonType, fullWidth?: boolean, isLoading?: boolean}) {
  const styles: {[key in ButtonType]: string} = {
    primary: "bg-#AD1FEA text-white hover:bg-#C75AF6",
    secondary: "bg-#4661E6 text-white hover:bg-#7C91F9",
    tertiary: "bg-#3A4374 text-white hover:bg-#656EA3",
    danger: "bg-#D73737 text-white hover:bg-#E98888",
  }
  return (
    <div className={`pt-3.25 flex gap-x-1 pb-2.75 rounded-2.5 font-bold text-3.5 flex items-center justify-center ${isLoading ? "bg-opacity-50" : ""} ${fullWidth ? "w-full" : "px-2 md:px-5"} ${styles[type]}`}>{isLoading ? <LoadingIcon className="text-5.25" /> : children}</div>
  )
}
