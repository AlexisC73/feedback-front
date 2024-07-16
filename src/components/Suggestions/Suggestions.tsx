import { Link } from "react-router-dom"
import { SuggestionsIcon } from "@/assets/icons"
import { Button } from "@/components/ui/Button/button"
import { SortFilterComponent } from "@/Context/SortFilter/SortFilter"
import { useTranslation } from "react-i18next"

export function Suggestions ({ suggestionCount }: {suggestionCount: number}) {
  const {t} = useTranslation()

  return (
    <div className="flex bg-#373F68 p-6 md:pr-3 xl:pr-4 py-3.5 md:rounded-2.5 justify-between">
      <div className="flex gap-x-9.5 items-center">
        <p className="hidden text-white gap-x-4 items-center md:flex"><SuggestionsIcon className="text-6 text-white" /> <strong>{suggestionCount} {t('suggestion_header.suggestion')}</strong></p>
        <SortFilterComponent />
      </div>
      <Link to="/feedbacks/new" className="w-33.5 md:w-39.5">
        <Button>{t('suggestion_header.add_feedback_button')}</Button>
      </Link>
    </div>
  )
}
