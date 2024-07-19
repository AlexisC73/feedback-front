import { createContext, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Language } from "./languageType";

interface LanguageCtxProps {
  lang: Language
  setLanguage: (language: Language) => void
}

export const LanguageCtx = createContext<LanguageCtxProps>({
  lang: Language.EN,
  setLanguage: () => {}
})

export function LanguageCtxProvider ({children}: {children: React.ReactNode}) {
  const {i18n: {changeLanguage, language}} = useTranslation()

  const getCurrentStoredLanguage = useCallback(() => {
    const storedLanguage = localStorage.getItem("language")
    if(!storedLanguage) {
      return language as Language
    }
    if(Object.values(Language).includes(storedLanguage as Language)) {
      return storedLanguage as Language
    }
    return language as Language
  }, [language])

  const handleChangeLanguage = useCallback((language: Language) => {
    changeLanguage(language)
    localStorage.setItem("language", language)
  }, [changeLanguage])

  const languageCtx: LanguageCtxProps = {
    lang: language as Language,
    setLanguage: handleChangeLanguage
  }

  useEffect(() => {
    const storedLanguage = getCurrentStoredLanguage()
    handleChangeLanguage(storedLanguage)
  }, [handleChangeLanguage, getCurrentStoredLanguage])

  return (
    <LanguageCtx.Provider value={languageCtx}>
      {children}
    </LanguageCtx.Provider>
  )
}