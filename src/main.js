import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "./store";
import "./assets/styles/styles.scss";
import i18n from "./plugins/i18n.js";
import axios from "./plugins/axios";
import VueAxios from "vue-axios";
import VueLazyLoad from "vue3-lazyload";
import dayjs from "dayjs"; //import dayjs in your main.js
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueNumber from "vue-number-animation";
import WordHighlighter from "vue-word-highlighter";
import VueClickAway from "vue3-click-away";
import "dayjs/locale/uz-latn";
import "dayjs/locale/ru";
import "dayjs/locale/en-gb";
import "dayjs/locale/uz";
const locale = localStorage.getItem("locale");

const responsiveVoiceScript = document.createElement('script');
responsiveVoiceScript.setAttribute('src', 'https://code.responsivevoice.org/responsivevoice.js?key=BiYgxJ4l');
document.head.appendChild(responsiveVoiceScript);
if (locale === "ru") {
  dayjs.locale("ru");
} else if (locale === "uz") {
  dayjs.locale("uz");
} else if (locale === "en") {
  dayjs.locale("en-gb");
} else if (locale === "sr") {
  dayjs.locale("uz-latn");
} else {
  dayjs.locale("uz-latn");
}
import {
  registerGlobalProperties,
  preventXXS,
  hideElement,
  getTabs,
  getFullName,
  numberWithSpaces,
  addParams,
} from "./helpers/globals.js";

const app = createApp(App);

registerGlobalProperties.call(app, {
  preventXXS,
  hideElement,
  getTabs,
  getFullName,
  numberWithSpaces,
  WordHighlighter,
  addParams,
});

app.config.globalProperties.$dayjs = dayjs;
import Maska from "maska";
app.provide("dayJS", dayjs);
app.use(Maska);
app.use(Toast);
app.use(VueAxios, axios);
app.use(router);
app.use(store);
app.use(i18n);
app.use(VueNumber);
app.use(WordHighlighter);
app.use(VueClickAway);
app.use(VueLazyLoad);
app.mount("#app");
