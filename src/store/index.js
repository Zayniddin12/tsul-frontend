import { createStore } from "vuex";
import axios from "@/plugins/axios";
import faculties from "./modules/faculties";
import vacancy from "./modules/vacancy";
import employee from "./modules/employee";
import educationalProgramme from "./modules/educational-programme";
import scientificProjects from "./modules/scientific-projects";
import branches from "./modules/branches";
import post from "./modules/post";
import foundation from "./modules/foundation";
import subject from "./modules/subject";
import menu from "./modules/menu";
import search from "./modules/search";
import documents from "./modules/documents";
import breadcrumb from "./modules/breadcrumb";
import slider from "./modules/slider";
import videoLessons from "@/store/modules/video-lessons";

const axiosPlugin = (store) => {
  store.$axios = axios;
};

export default createStore({
  state: {
    degree: [],
    about: [],
    faq: [],
    footer: undefined,
    interactiveGroup: [],
    interactive: [],
    brand: [],
    headerTop: [],
    pending:true,
    sliderPreloader: false,
    isLoading: false,
  },

  mutations: {
    setLoading(state, status) {
      state.isLoading = status;
    },
    SET_SLIDER_PRELOADER(state, value) {
      state.sliderPreloader = value;
    },
    SET_PENDING(state, pending){
      state.pending = pending
    },
    SET_DEGREE(state, degree) {
      state.degree = degree;
    },
    SET_ABOUT(state, about) {
      state.about = about;
    },
    SET_FAQ(state, faq) {
      state.faq = faq;
    },
    SET_FOOTER(state, footer) {
      state.footer = footer;
    },
    SET_INTERACTIVE_GROUP(state, interactiveGroup) {
      state.interactiveGroup = interactiveGroup;
    },
    SET_INTERACTIVE(state, interactive) {
      state.interactive = interactive;
    },
    SET_BRAND(state, brand) {
      state.brand = brand;
    },
    SET_HEADER_TOP(state, headerTop) {
      state.headerTop = headerTop;
    },
  },
  actions: {
    fetchHeaderTop({ commit }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`top-menu/`)
          .then((response) => {
            commit("SET_HEADER_TOP", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchDegree({ commit }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`degree/`)
          .then((response) => {
            commit("SET_DEGREE", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchCalendar({ commit }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`events-calendar/`)
          .then((response) => {
            commit("SET_DEGREE", response.data.results);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchAbout({ commit }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/about/`)
          .then((response) => {
            commit("SET_ABOUT", response.data.results);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchFaq({ commit }, { degree = "", category = "" }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/faq/?category=${category}&degree=${degree}`)
          .then((response) => {
            commit("SET_FAQ", response.data.results);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchFooter({ commit }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/footer/`)
          .then((response) => {
            commit("SET_FOOTER", response.data.results);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchInteractive({ commit }, group) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/interactive-service/?group=${group}`)
          .then((response) => {
            commit("SET_INTERACTIVE", response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchBrand({ commit }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/logo/`)
          .then((response) => {
            commit("SET_BRAND", response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchInteractiveGroup({ commit }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/interactive-service-group/`)
          .then((response) => {
            commit("SET_INTERACTIVE_GROUP", response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    fetchAllCalendarPost({ commit }, { type, page, limit }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`post/?category=${type}&page=${page}&limit=${limit}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getLoad: state => state.pending,
    getSliderPreloader: (state) => state.sliderPreloader
  },
  modules: {
    faculties,
    vacancy,
    employee,
    educationalProgramme,
    scientificProjects,
    branches,
    post,
    foundation,
    subject,
    menu,
    search,
    documents,
    breadcrumb,
    slider,
    videoLessons,
  },
  plugins: [axiosPlugin],
})
