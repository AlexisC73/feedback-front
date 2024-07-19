import { createContext, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { DEFAULT_LANGUAGE, Language } from "./languageType";

interface LanguageCtxProps {
  setLanguage: (language: Language) => void
}

export const LanguageCtx = createContext<LanguageCtxProps>({
  setLanguage: () => {}
})

export function LanguageCtxProvider ({children}: {children: React.ReactNode}) {
  const {i18n: {changeLanguage}} = useTranslation()

  const getCurrentStoredLanguage = useCallback(() => {
    const storedLanguage = localStorage.getItem("language")
    if(!storedLanguage) {
      return DEFAULT_LANGUAGE
    }
    if(Object.values(Language).includes(storedLanguage as Language)) {
      return storedLanguage as Language
    }
    return DEFAULT_LANGUAGE
  }, [])

  const handleChangeLanguage = useCallback((language: Language) => {
    changeLanguage(language)
    localStorage.setItem("language", language)
  }, [changeLanguage])

  const languageCtx: LanguageCtxProps = {
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