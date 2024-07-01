import { SortFilterItem } from "./SortFilterItem/SortFilterItem"

export function SortFilter ({activeFilter} : {activeFilter: string}) {
  const filters = ['Most Upvotes', 'Least Upvotes', 'Most Comments', 'Least Comments']

  return (
    <ul className="flex flex-col bg-#3A4374 bg-opacity-15 gap-y-1px w-63.75 rounded-2.5 overflow-hidden">
      {filters.map((filter) => <SortFilterItem filter={filter} active={activeFilter === filter} />)}
    </ul>
  )
}