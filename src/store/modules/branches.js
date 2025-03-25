export default {
  state: {
    branches: [],
  },
  mutations: {
    SET_BRANCHES(state, branches) {
      state.branches = branches;
    },
  },

  actions: {
    fetchBranches({ commit }, { page = 1, type = "", limit = "" }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`foundation/`, {
            params: {
              category: type,
              limit: limit,
              page: page,
            },
          })
          .then((response) => {
            commit("SET_BRANCHES", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
