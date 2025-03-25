export default {
  state: {
    documents: [],
    degreeTypes: [],
    normativeDocumentsType: [],
  },
  mutations: {
    SET_DOCUMENTS(state, payload) {
      state.documents = payload;
    },
    SET_DOCUMENTS_Search(state, documentsSearch) {
      state.documentsSearch = documentsSearch;
    },
    SET_DegreeTypes(state, degreeTypes) {
      state.degreeTypes = degreeTypes;
    },
    SET_NORMATIVE_DOCUMENTS_TYPE(state, normativeDocumentsType) {
      state.normativeDocumentsType = normativeDocumentsType;
    },
  },
  actions: {
    fetchDocuments(
      { commit },
      {
        faculty = "",
        category = "",
        category_normative = "",
        degree = "",
        page = 1,
        key = "",
        course = "",
      }
    ) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`document/`, {
            params: {
              category: category,
              faculty: faculty,
              category_normativ: category_normative,
              degree: degree,
              page: page,
              search: key,
              course: course,
            },
          })
          .then((res) => {
            commit("SET_DOCUMENTS", res.data.results);
            resolve(res);
          })
          .catch((error) => reject(error));
      });
    },

    fetchDegreeTypes({ commit }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`degree/`)
          .then((response) => {
            commit("SET_DegreeTypes", response.data.results);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    fetchDocumentsSearch({ commit }, { key }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`document/?search=${key}`)
          .then((response) => {
            commit("SET_DOCUMENTS_Search", response.data.results);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    fetchNormativeDocumentsType({ commit }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`document-normativ/`)
          .then((response) => {
            commit("SET_NORMATIVE_DOCUMENTS_TYPE", response.data.results);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
