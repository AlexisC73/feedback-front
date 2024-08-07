import { ArrowIcon } from "@/assets/icons";
import { useTranslation } from "react-i18next";

export type GoBackButtonStyle = "default" | "alt"

export function GoBackButton({style = "default", fullWidth}: {style?: GoBackButtonStyle, fullWidth?: boolean}) {
  const {t} = useTranslation()

  return (
    <div className={`flex items-center justify-center gap-x-4 cursor-pointer hover:underline rounded-2.5 ${fullWidth ? "w-full" : ""} ${style === "default" ? "hover:underline-#647196" : "bg-#373F68 hover:underline-white"}`}>
      <ArrowIcon className={`rotate-270 text-2 -mt-0.5 ${style === "default" ? "text-#4661E6" : "text-#CDD2EE"}`} />
      <span className={`font-bold text-3.5 ${style === "default" ? "text-#647196" : "text-white"}`}>{t("go_back_button_label")}</span>
    </div>
  )
}