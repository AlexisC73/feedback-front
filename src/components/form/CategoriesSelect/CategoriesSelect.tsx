import { FeedbackCategory } from "@/store/feedbacks/models/feedback";
import { CustomDropdown, CustomDropdownItem } from "../dropdown/custom-dropdown";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export function CategoriesSelect ({current, onSelect}: {current: FeedbackCategory, onSelect: (selected: FeedbackCategory) => void}) {
  const {t} = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSelect = () => {
    setIsOpen(prev => !prev)
  }

  const handleSelectedCategory = (selected: string) => {
    if(!Object.values(FeedbackCategory).includes(selected as FeedbackCategory)) {
      return
    }
    onSelect(selected as FeedbackCategory)
    toggleSelect()
  }

  return (
    <CustomDropdown isOpen={isOpen} toggle={toggleSelect} current={t(`categories.${current}`)}>
      {Object.values(FeedbackCategory).map(c => (<CustomDropdownItem key={c} active={current === c} label={t(`categories.${c}`)} onClick={() => handleSelectedCategory(c)}></CustomDropdownItem>))}
    </CustomDropdown>
  )
} 