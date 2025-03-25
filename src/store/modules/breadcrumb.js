export default {
  state: {
    slugTitle: "",
  },
  mutations: {
    SET_SLUG_TITLE(state, title) {
      state.slugTitle = title;
    },
  },

  actions: {
    setSlugTitle({ commit }, title) {
      commit("SET_SLUG_TITLE", title);
    },
  },
};
