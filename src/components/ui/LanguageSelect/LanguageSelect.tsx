import { Dropdown, DropdownItem } from "@/components/form/dropdown/Dropdown";
import { LanguageCtx } from "@/Context/LanguageCtx/LanguageCtx";
import { Language } from "@/Context/LanguageCtx/languageType";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

export function LanguageSelect () {
  const [isOpen, setIsOpen] = useState(false)
  const {t} = useTranslation()
  const {lang, setLanguage} = useContext(LanguageCtx)

  const toggleOpen = () => setIsOpen(prev => !prev)

  return (
    <Dropdown isOpen={isOpen} toggle={toggleOpen} current={t(`language.${lang}`)}>
      {Object.values(Language).map(lang => (<DropdownItem key={lang} active={false} label={t(`language.${lang}`)} onClick={() => setLanguage(lang)} />))}
    </Dropdown>
  )
}