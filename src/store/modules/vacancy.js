export default {
  state: {
    vacancy: [],
    slug: undefined,
    vacancySingle: [],
  },
  mutations: {
    SET_VACANCY(state, vacancy) {
      state.vacancy = vacancy;
    },
    SET_VACANCY_SLUG(state, vacancy) {
      state.vacancy = vacancy;
    },
    SET_VACANCY_SINGLE(state, vacancySingle) {
      state.vacancySingle = vacancySingle;
    },
  },
  actions: {
    fetchVacancy({ commit }, { page = "", limit = "" }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`vacancy/`, {
            params: {
              page: page,
              limit: limit,
            },
          })
          .then((response) => {
            commit("SET_VACANCY", response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    fetchVacancySlug({ commit }, { slug }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`vacancy/${slug}`)
          .then((response) => {
            commit("SET_VACANCY_SLUG", response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    fetchVacancyRecommended({ commit }, { slug = "", page = "", limit = "" }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`vacancy/recommend/${slug}`, {
            params: {
              page: page,
              limit: limit,
            },
          })
          .then((response) => {
            commit("SET_VACANCY_SINGLE", response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
