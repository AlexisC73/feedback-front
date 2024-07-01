import { SuggestionsIcon } from "../../assets/icons"
import { SelectSortFilter } from "../SelectSortFilter/SelectSortFilter"

export function Suggestions () {
  return (
    <div className="flex bg-#373F68 pl-6 md:pr-3 pr-6 lg:pr-4 py-3.5 md:rounded-2.5 justify-between">
      <div className="flex gap-x-9.5 items-center">
        <p className="hidden text-white gap-x-4 items-center md:flex"><SuggestionsIcon className="text-6 text-white" /> <strong>6 Suggestions</strong></p>
        <SelectSortFilter activeFilter="Most Upvotes" />
      </div>
      <AddFeedbackButton />
    </div>
  )
}

export function AddFeedbackButton () {
  return (
    <button className="text-white bg-#C75AF6 text-3.25 md:text-3.5 line-height-4.75 md:line-height-5 pl-4 pr-4.25 py-2.625 md:pl-6 md:pr-6.25 md:pt-3.125 md:pb-2.875 rounded-2.5 font-bold">+ Add Feedback</button>
  )
}
