import { Link } from "react-router-dom"
import { SuggestionsIcon } from "../../assets/icons"
import { Button } from "../Button/button"
import { SelectSortFilter } from "../SelectSortFilter/SelectSortFilter"
import { useState } from "react"

export function Suggestions () {
  const filters = ["Most Upvotes", "Least Upvotes", "Most Comments", "Least Comments"]
  const [currentFilter, setCurrentFilter] = useState("Most Upvotes")

  const handleUpdateFilter = (filter: string) => {
    setCurrentFilter(filter)
  }

  return (
    <div className="flex bg-#373F68 p-6 md:pr-3 lg:pr-4 py-3.5 md:rounded-2.5 justify-between">
      <div className="flex gap-x-9.5 items-center">
        <p className="hidden text-white gap-x-4 items-center md:flex"><SuggestionsIcon className="text-6 text-white" /> <strong>6 Suggestions</strong></p>
        <SelectSortFilter activeFilter={currentFilter} filters={filters} onUpdateFilter={handleUpdateFilter} />
      </div>
      <Link to="/feedbacks/new" className="w-33.5 md:w-39.5">
        <Button>+ Add Feedback</Button>
      </Link>
    </div>
  )
}
