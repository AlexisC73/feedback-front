import { createContext, PropsWithChildren, useContext, useState } from "react"
import { TagType } from "./TagFilterType"
import { TagFilter } from "@/components/TagFilter/TagFilter"
import { FeedbackCategory } from "@/store/feedbacks/models/feedback"

type TagFilterCtxType = {
  currentFilter: TagType
  updateFilter: (filter: TagType) => void
}

export const TagFilterCtx = createContext<TagFilterCtxType>({
  currentFilter: "all",
  updateFilter: () => {}
})

export const TagFilterCtxProvider = ({children}: PropsWithChildren) => {

  const [currentFilter, updateFilter] = useState<TagType>("all")

  const handleUpdateFilter = (filter: TagType) => {
    updateFilter(filter)
  }

  const filterCtx: TagFilterCtxType = {
    currentFilter: currentFilter,
    updateFilter: handleUpdateFilter
  }
  return (
    <TagFilterCtx.Provider value={filterCtx}>
      {children}
    </TagFilterCtx.Provider>
  )
}

export const TagFilterComponent = () => {
  const filters = Object.values({...FeedbackCategory, ALL: "all"})
  const { currentFilter, updateFilter } = useContext(TagFilterCtx)

  const handleUpdateFilter = (filter: string) => {
    if(filters.includes(filter as TagType)) {
      updateFilter(filter as TagType)
    }
  }

  return (
    <TagFilter activeFilter={currentFilter} setActiveFilter={handleUpdateFilter} />
  )
}