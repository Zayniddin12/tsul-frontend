

export default {
  state: {
    search: [],
    searchInputVal:''
  },
  mutations: {
    SET_SEARCH(state, search) {
      state.search = search;
    },
    SET_VALUE(state, value){
      state.searchInputVal = value
    }
  },

  actions: {
    fetchSearch({ commit }, { key }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/post/?search=${key}`)
          .then((response) => {
            commit("SET_SEARCH", response.data.results);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getInputVal: state => state.searchInputVal,
  },
};
