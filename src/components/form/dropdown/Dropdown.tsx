import { ReactNode } from "react";
import { ArrowIcon, CheckIcon } from "@/assets/icons";
import { useTranslation } from "react-i18next";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export function Dropdown ({current, children, isOpen, toggle}: {current?: string, children: ReactNode, isOpen: boolean, toggle: () => void}) {
  const {t} = useTranslation()
  function handleCloseIfOpen () {
    if(isOpen) {
      toggle()
    }
  }
  const ref = useOutsideClick(handleCloseIfOpen)

  return (
    <div className="relative w-full">
      <div ref={ref} onClick={toggle} className="h-12 rounded-1.25 px-6 flex justify-between items-center cursor-pointer justify-between">
        <span className="text-#3A4374">{current? current : t("choose_element")}</span>
        <ArrowIcon className={`text-2 text-#4661E6 ${isOpen ? "rotate-0" : "rotate-180"}`} />
      </div>
      {isOpen && (<div className="absolute left-0 right-0 top-16 bg-white dropdown-shadow z-50 rounded-1.25">
        <ul className="rounded-1.25 overflow-hidden flex flex-col gap-y-1px bg-#3A4374 bg-opacity-15">
          {children}
        </ul>
      </div>)}
    </div>
  )
}

export function DropdownItem ({onClick, active, label}: {active: boolean, label: string, onClick: () => void}) {
  return <li className="w-full bg-white"><button type="button" className="px-6 py-3 w-full text-#647196 hover:text-#AD1FEA cursor-pointer bg-white flex justify-between items-center" onClick={onClick}>{label}{active && <CheckIcon className="text-2.5 self:end" />}</button></li>
}