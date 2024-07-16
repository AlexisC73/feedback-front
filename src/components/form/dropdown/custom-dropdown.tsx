import { ReactNode } from "react";
import { ArrowIcon, CheckIcon } from "@/assets/icons";

export function CustomDropdown ({current, children, isOpen, toggle}: {current?: string, children: ReactNode, isOpen?: boolean, toggle: () => void}) {

  return (
    <div className="relative">
      <div onClick={toggle} className="bg-#F7F8FD h-12 rounded-1.25 px-6 flex justify-between items-center cursor-pointer">
        <span className="text-#3A4374">{current? current : "Choisir un élement"}</span>
        <ArrowIcon className={`text-2 text-#4661E6 ${isOpen ? "rotate-0" : "rotate-180"}`} />
      </div>
      {isOpen && (<div className="absolute left-0 right-0 top-16 bg-white dropdown-shadow z-50">
        <ul className="rounded-1.25 overflow-hidden flex flex-col gap-y-1px bg-#3A4374 bg-opacity-15">
          {children}
        </ul>
      </div>)}
    </div>
  )
}

export function CustomDropdownItem ({onClick, active, label}: {active: boolean, label: string, onClick: () => void}) {
  return <li className="w-full bg-white"><button type="button" className="px-6 py-3 w-full text-#647196 hover:text-#AD1FEA cursor-pointer bg-white flex justify-between items-center" onClick={onClick}>{label}{active && <CheckIcon className="text-2.5 self:end" />}</button></li>
}