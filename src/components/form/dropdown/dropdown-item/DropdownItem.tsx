import { CheckIcon } from "@/assets/icons";
import { uppercaseFirstLetter } from "@/helpers/uppercase-first-letter";

export function DropdownItem ({option, active}: {option: string, active?: boolean}) {
  return (
    <li className="px-6 py-3 text-#647196 hover:text-#AD1FEA cursor-pointer bg-white flex justify-between items-center">{uppercaseFirstLetter(option)} {active && <CheckIcon className="text-2.5" />}</li>
  )
}