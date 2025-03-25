import { createI18n } from "vue-i18n";
import en from "@/language/en.json";
import uz from "@/language/uz.json";
import ru from "@/language/ru.json";
import sr from "@/language/sr.json";
const locale = localStorage.getItem("locale") || "sr";
const i18n = createI18n({
  legacy: false,
  locale: locale,
  fallbackLocale: "sr",
  silentFallbackWarn: true,
  strategy: "prefix",
  messages: {
    uz,
    en,
    sr,
    ru,
  },
});
export default i18n;
