import { CheckIcon } from "../../../assets/icons";

export function SortFilterItem ({filter, active}: {filter: string, active: boolean}) {
  return (
    <li className="px-6 py-3 text-#647196 hover:text-#AD1FEA cursor-pointer bg-white flex justify-between items-center">{filter} {active && <CheckIcon className="text-2.5" />}</li>
  )
}