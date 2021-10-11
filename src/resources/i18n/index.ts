import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import intervalPlural from "i18next-intervalplural-postprocessor";

import resources from "./ru.json";

void i18n
  .use(intervalPlural)
  .use(initReactI18next)
  .init({
    interpolation: {
      escapeValue: false,
    },
    lng: "ru",
    resources,
  });

export default i18n;
