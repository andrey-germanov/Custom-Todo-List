import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";

export const setupTranslation = async () => {
  console.log("Loading translations");
  return await i18n
  .use(Backend)
  .use(initReactI18next)
    .init(
      {
        fallbackLng: "ru",
        fallbackNS: "translation",
        backend: {
          loadPath: "/locales/{{lng}}/translation.json"
        }
      },
      err => {
        console.error(err);
      }
    );
};
