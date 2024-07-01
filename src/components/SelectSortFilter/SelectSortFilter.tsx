import { useState } from "react"
import { SortFilter } from "../SortFilter/SortFilter"
import { ArrowIcon } from "../../assets/icons"

export function SelectSortFilter ({activeFilter}: {activeFilter: string}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const toggleFilter = () => {
    setIsFilterOpen(prev => !prev)
  }

  return (
    <div className="text-white relative">
      <p onClick={toggleFilter} className="flex items-center gap-x-2 text-#F2F4FE text-opacity-75 text-3.25 md:text-3.5 cursor-pointer">Sort by : <strong>{activeFilter}</strong> <ArrowIcon className={`text-1.75 text-white ${isFilterOpen ? "rotate-0" : "rotate-180"}`} /></p>
      { isFilterOpen && (
        <div className="absolute left-0 top-10.5">
          <SortFilter activeFilter={activeFilter} />
        </div>)
      }
    </div>
  )
}