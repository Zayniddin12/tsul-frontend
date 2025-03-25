import router from "@/router";

export default {
  state: {
    foundation: [],
    foundationSingle: [],
    slug: [],
  },
  mutations: {
    SET_FOUNDATION(state, foundation) {
      state.foundation = foundation;
    },
    SET_FOUNDATION_SLUG(state, slug) {
      state.slug = slug;
    },
    SET_FOUNDATION_SINGLE(state, foundationSingle) {
      state.foundationSingle = foundationSingle;
    },
  },

  actions: {
    fetchFoundation({ commit }, { category = "", faculty = "", limit = "", page = "" }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`foundation/`, {
            params: {
              category: category,
              faculty: faculty,
              limit: limit,
              page: page,
            },
          })
          .then((response) => {
            commit("SET_FOUNDATION", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchFoundationSingle({ commit }, { categories = "", faculty = "", limit = "", page = "" }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`foundation/`, {
            params: {
              categories: categories,
              faculty: faculty,
              limit: limit,
              page: page,
            },
          })
          .then((response) => {
            commit("SET_FOUNDATION_SINGLE", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchFoundationSlug({ commit }, { slug = "" }) {
      return new Promise((resolve) => {
        this.$axios
          .get(`foundation/${slug}`)
          .then((response) => {
            commit("SET_FOUNDATION_SLUG", response.data);
            resolve(response);
          })
          .catch((error) => {
            router.push('/error');
          });
      });
    },
  },
};
