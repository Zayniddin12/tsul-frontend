import axios from "axios";
import i18n from "@/plugins/i18n";

const $axios = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "accept-language": i18n.global.locale.value,
  },
});

export default $axios;
