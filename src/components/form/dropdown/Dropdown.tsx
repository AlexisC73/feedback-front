import { useState } from "react";
import { ArrowIcon } from "@/assets/icons";
import { DropdownItem } from "./dropdown-item/DropdownItem";

export function Dropdown ({options, current, onSelect}: {options: string[], current?: string, onSelect: (selected: string) => void}) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <div className="relative">
      <div onClick={toggleDropdown} className="bg-#F7F8FD h-12 rounded-1.25 px-6 flex justify-between items-center cursor-pointer">
        <span className="text-#3A4374">{current? current : "Choisir un élement"}</span>
        <ArrowIcon className={`text-2 text-#4661E6 ${isOpen ? "rotate-0" : "rotate-180"}`} />
      </div>
      {isOpen && (<div className="absolute left-0 right-0 top-16 dropdown-shadow z-50">
        <DropdownMenu options={options} current={current} onSelect={onSelect} />
      </div>)}
    </div>
  )
}

export function DropdownMenu ({options, current, onSelect}: {options: string[], current?: string, onSelect: (select: string) => void}) {
  return (
    <ul className="rounded-1.25 overflow-hidden flex flex-col gap-y-1px bg-#3A4374 bg-opacity-15">
      {options.map((option) => (<button type="button" key={option} onClick={() => onSelect(option)}><DropdownItem option={option} active={current === option} /></button>))}
    </ul>
  )
}
