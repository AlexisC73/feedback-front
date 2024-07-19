import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import enJSON from "@/languages/en.json"
import frJSON from "@/languages/fr.json"
import detector from "i18next-browser-languagedetector"

i18n.use(detector).use(initReactI18next).init({
  resources: {
    en: enJSON,
    fr: frJSON
  }
})