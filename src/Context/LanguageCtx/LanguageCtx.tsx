import { createContext, useState } from "react";
import { useTranslation } from "react-i18next";

enum Language {
  EN = "en",
  FR = "fr"
}

interface LanguageCtxProps {
  setLanguage: (language: Language) => void
}

export const LanguageCtx = createContext<LanguageCtxProps>({
  setLanguage: () => {}
})

export function LanguageCtxProvider ({children}: {children: React.ReactNode}) {
  const {i18n: {changeLanguage}} = useTranslation()
  const [language, setLanguage] = useState<Language>(Language.EN)

  const handleChangeLanguage = (language: Language) => {
    setLanguage(language)
    changeLanguage(language)
  }

  const languageCtx: LanguageCtxProps = {
    setLanguage: handleChangeLanguage
  }

  const toggleLanguage = () => {
    handleChangeLanguage(language === Language.EN ? Language.FR : Language.EN)
  }

  return (
    <LanguageCtx.Provider value={languageCtx}>
      {children}
      <button className="absolute top-1 left-1 px-2 py-1 text-white rounded-1 bg-blue-6" onClick={toggleLanguage}>Toggle fr/en</button>
    </LanguageCtx.Provider>
  )
}