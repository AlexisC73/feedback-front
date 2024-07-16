import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import enJSON from "@/languages/en.json"
import frJSON from "@/languages/fr.json"
import { Language } from "./Context/LanguageCtx/languageType"

i18n.use(initReactI18next).init({
  lng: Language.FR,
  resources: {
    en: enJSON,
    fr: frJSON
  }
})