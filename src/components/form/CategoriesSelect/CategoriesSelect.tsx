import { FeedbackCategory } from "@/store/feedbacks/models/feedback";
import { Dropdown, DropdownItem } from "../dropdown/Dropdown";
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
    <div className="bg-#F7F8FD rounded-1.25">
      <Dropdown isOpen={isOpen} toggle={toggleSelect} current={t(`categories.${current}`)}>
        {Object.values(FeedbackCategory).map(c => (<DropdownItem key={c} active={current === c} label={t(`categories.${c}`)} onClick={() => handleSelectedCategory(c)}></DropdownItem>))}
      </Dropdown>
    </div>
    
  )
} 