import { FeedbackStatus } from "@/store/feedbacks/models/feedback";
import { Dropdown, DropdownItem } from "../dropdown/Dropdown";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export function StatusSelect ({current, onSelect}: {current: FeedbackStatus, onSelect: (selected: FeedbackStatus) => void}) {
  const {t} = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSelect = () => {
    setIsOpen(prev => !prev)
  }

  const handleSelectedStatus = (selected: string) => {
    if(!Object.values(FeedbackStatus).includes(selected as FeedbackStatus)) {
      return
    }
    onSelect(selected as FeedbackStatus)
    toggleSelect()
  }

  return (
    <div className="bg-#F7F8FD rounded-1.25">
      <Dropdown isOpen={isOpen} toggle={toggleSelect} current={t(`status.${current}`)}>
        {Object.values(FeedbackStatus).map(c => (<DropdownItem key={c} active={current === c} label={t(`status.${c}`)} onClick={() => handleSelectedStatus(c)}></DropdownItem>))}
      </Dropdown>
    </div>
    
  )
} 