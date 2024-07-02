import { ArrowIcon } from "../../assets/icons";

export type GoBackButtonStyle = "default" | "alt"

export function GoBackButton({style = "default", fullWidth}: {style?: GoBackButtonStyle, fullWidth?: boolean}) {

  return (
    <div className={`flex items-center justify-center gap-x-4 cursor-pointer hover:underline rounded-2.5 ${fullWidth ? "" : "w-39.5"} ${style === "default" ? "hover:underline-#647196" : "bg-#373F68 hover:underline-white"}`}>
      <ArrowIcon className={`rotate-270 text-2 -mt-0.5 ${style === "default" ? "text-#4661E6" : "text-#CDD2EE"}`} />
      <span className={`font-bold text-3.5 pt-4 pb-4.25 ${style === "default" ? "text-#647196" : "text-white"}`}>Go Back</span>
    </div>
  )
}