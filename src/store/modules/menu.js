export default {
  state: {
    menu: [],
    ratingList: [],
  },
  mutations: {
    SET_MENU(state, menu) {
      state.menu = menu;
    },
    SET_RATING_LIST(state, ratingList) {
      state.ratingList = ratingList;
    },
  },
  actions: {
    fetchMenu({ commit }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/menu/`)
          .then((response) => {

            commit("SET_MENU", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchRatingList({ commit }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`rating/`)
          .then((response) => {
            commit("SET_RATING_LIST", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
