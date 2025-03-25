export default {
  state: {
    projects: [],
  },
  mutations: {
    SET_PROJECTS(state, projects) {
      state.projects = projects;
    },
  },

  actions: {
    fetchProjects({ commit }, key) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/scientific_project/?q=${key}`)
          .then((response) => {
            commit("SET_PROJECTS", response.data.results);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
