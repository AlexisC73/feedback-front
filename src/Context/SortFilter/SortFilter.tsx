import { createContext, PropsWithChildren, useContext, useState } from "react"
import { SortFilter } from "./SortFilterType"
import { SelectSortFilter } from "@/components/SelectSortFilter/SelectSortFilter"

type SortFilterCtxType = {
  currentFilter: SortFilter
  updateFilter: (filter: SortFilter) => void
}

const SortFilterCtx = createContext<SortFilterCtxType>({
  currentFilter: SortFilter.MostUpvotes,
  updateFilter: () => {}
})

export const SortFilterCtxProvider = ({children}: PropsWithChildren) => {

  const [currentFilter, updateFilter] = useState<SortFilter>(SortFilter.MostUpvotes)

  const handleUpdateFilter = (filter: SortFilter) => {
    updateFilter(filter)
  }

  const filterCtx: SortFilterCtxType = {
    currentFilter: currentFilter,
    updateFilter: handleUpdateFilter
  }
  return (
    <SortFilterCtx.Provider value={filterCtx}>
      {children}
    </SortFilterCtx.Provider>
  )
}

export const SortFilterComponent = () => {
  const filters = Object.values(SortFilter)
  const { currentFilter, updateFilter } = useContext(SortFilterCtx)

  const handleUpdateFilter = (filter: string) => {
    if(filters.includes(filter as SortFilter)) {
      updateFilter(filter as SortFilter)
    }
  }

  return (
    <SelectSortFilter activeFilter={currentFilter} onUpdateFilter={handleUpdateFilter} filters={filters} />
  )
}