import { Link } from "react-router-dom"
import { SuggestionsIcon } from "@/assets/icons"
import { Button } from "@/components/ui/Button/button"
import { SortFilterComponent } from "@/Context/SortFilter/SortFilter"

export function Suggestions ({ suggestionCount }: {suggestionCount: number}) {

  return (
    <div className="flex bg-#373F68 p-6 md:pr-3 lg:pr-4 py-3.5 md:rounded-2.5 justify-between">
      <div className="flex gap-x-9.5 items-center">
        <p className="hidden text-white gap-x-4 items-center md:flex"><SuggestionsIcon className="text-6 text-white" /> <strong>{suggestionCount} Suggestions</strong></p>
        <SortFilterComponent />
      </div>
      <Link to="/feedbacks/new" className="w-33.5 md:w-39.5">
        <Button>+ Add Feedback</Button>
      </Link>
    </div>
  )
}
