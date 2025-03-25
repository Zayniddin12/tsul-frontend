export default {
  state: {
    faculty: [],
    slug: undefined,
    educationalPrograms: [],
    facultyVideo: {},
    facultyContent: "",
    scientificSchools: [],
  },
  mutations: {
    SET_FACULTY(state, faculty) {
      state.faculty = faculty;
    },
    SET_FACULTY_SLUG(state, slug) {
      state.slug = slug;
    },
    SET_EDUCATIONAL_PROGRAMS(state, educationalPrograms) {
      state.educationalPrograms = educationalPrograms;
    },
    SET_FACULTY_VIDEO(state, facultyVideo) {
      state.facultyVideo = facultyVideo;
    },
    SET_SCIENTIFIC_SCHOOLS(state, scientificSchools) {
      state.scientificSchools = scientificSchools;
    },
    SET_FACULTY_CONTENT(state, facultyContent) {
      state.facultyContent = facultyContent;
    },
  },
  actions: {
    fetchFaculties({ commit }, { degree, category, limit = "", page = 1 }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`faculty/`, {
            params: {
              degree: degree,
              category: category,
              limit: limit,
              page: page,
            },
          })
          .then((response) => {
            commit("SET_FACULTY", response.data.results);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchFacultiesSlug({ commit }, { slug }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`faculty/${slug}`)
          .then((response) => {
            commit("SET_FACULTY_SLUG", response.data);
            commit("SET_FACULTY_CONTENT", response.data.content);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchEducationalPrograms({ commit }, { faculty }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`educational_programme/?faculty=${faculty}`)
          .then((response) => {
            commit("SET_EDUCATIONAL_PROGRAMS", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    fetchFacultyVideo({ commit }, { faculty }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/faculty-video/?faculty=${faculty}`)
          .then((response) => {
            commit("SET_FACULTY_VIDEO", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    fetchScientificSchools({ commit }, { faculty }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/foundation_department/?faculty=${faculty}`)
          .then((response) => {
            commit("SET_SCIENTIFIC_SCHOOLS", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
