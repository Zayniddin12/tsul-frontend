export default {
  state: {
    subject: [],
    singleSubject: [],
    facultyShort: [],
  },
  mutations: {
    SET_SUBJECT(state, subject) {
      state.subject = subject;
    },
    SET_SUBJECTSINGLE(state, singleSubject) {
      state.singleSubject = singleSubject;
    },
    SET_postSingle(state, postSingle) {
      state.postSingle = postSingle;
    },
    SET_FACULTY_SHORT(state, facultyShort) {
      state.facultyShort = facultyShort;
    },
  },
  actions: {
    fetchSubject(
      { commit },
      { faculty = "", limit = "", page = 1, category = "", kafedra = "", slug = "", search = `` }
    ) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/subject/`, {
            params: {
              faculty: faculty,
              limit: limit,
              page: page,
              category: category,
              kafedra: kafedra,
              slug: slug,
              search: search,
            },
          })
          .then((response) => {
            commit("SET_SUBJECT", response.data.results);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    fetchSubjectSingle({ commit }, { slug = "" }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/subject/${slug}`)
          .then((response) => {
            commit("SET_SUBJECTSINGLE", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchFacultyShort({ commit }, { category = "" }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`faculty-short-list/`, {
            params: {
              category__in: category,
            },
          })
          .then((response) => {
            commit("SET_FACULTY_SHORT", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
