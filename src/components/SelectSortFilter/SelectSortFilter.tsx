import { useState } from "react"
import { ArrowIcon } from "@/assets/icons"
import { DropdownItem } from "../form/dropdown/Dropdown"
import { useTranslation } from "react-i18next"
import { useOutsideClick } from "@/hooks/useOutsideClick"

export function SelectSortFilter ({activeFilter, filters, onUpdateFilter}: {activeFilter: string, filters: string[], onUpdateFilter: (filter: string) => void}) {
  const {t} = useTranslation()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const ref = useOutsideClick(() => {
    setIsFilterOpen(false)
  })

  const toggleFilter = () => {
    setIsFilterOpen(prev => !prev)
  }

  const handleUpdateFilter = (filter: string) => {
    onUpdateFilter(filter)
    setIsFilterOpen(false)
  }

  return (
    <div ref={ref} className="text-white relative">
      <p onClick={toggleFilter} className="flex items-center gap-x-2 text-#F2F4FE text-opacity-75 text-3.25 md:text-3.5 cursor-pointer">{t("sort_by")} : <strong>{t(`sort_filters.${activeFilter}`)}</strong> <ArrowIcon className={`text-1.75 text-white ${isFilterOpen ? "rotate-0" : "rotate-180"}`} /></p>
      { isFilterOpen && (
        <ul className="rounded-1.25 overflow-hidden w-63.75 top-10.5 left-0 absolute flex flex-col gap-y-1px bg-#3A4374 bg-opacity-15">
          {filters.map((filter, index) => (
            <DropdownItem active={filter === activeFilter} onClick={() =>handleUpdateFilter(filter)} label={t(`sort_filters.${filter}`)} key={index}  />
          ))}
        </ul>)
      }
    </div>
  )
}