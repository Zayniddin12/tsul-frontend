export default {
  state: {
    educationalProgramme: [],
    eduProgramm: [],
    programSingle: [],
    syllabus: [],
    eduEducation: [],
    eduEducationAll: []
  },
  mutations: {
    SET_EDUCATIONAL_PROGRAMME(state, educationalProgramme) {
      state.educationalProgramme = educationalProgramme;
    },

    SET_EDU_PROGRAMM(state, eduProgramm) {

      state.eduProgramm = eduProgramm;
    },

    SET_EDU_EDUCATION(state, eduEducation) {
      state.eduEducation = eduEducation;
    },

    SET_ALL_EDUCATION(state, eduEducationAll) {
      state.eduEducationAll = eduEducationAll;
    },

    SET_programSingle(state, programSingle) {
      state.programSingle = programSingle;
    },
    SET_syllabus(state, syllabus) {
      state.syllabus = syllabus;
    },
  },
  actions: {
    fetchEducationalProgramme({ commit }, { faculty = "" }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`educational_programme/`, {
            params: {
              faculty: faculty,
            },
          })
          .then((response) => {
            commit("SET_EDUCATIONAL_PROGRAMME", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    fetchEduProgramm({ commit },   {
      degree,
      faculty ,
      limit = "",
      page = 1,
      slug = "",
    }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`educational_programme/`, {
            params: {
              faculty: faculty,
              limit,
              page,
              slug,
              ...(degree && degree !== "all" ? { degree: degree === "masters" ? "master" : degree } : {}),
            },
          })
          .then((res) => {
            commit("SET_EDU_PROGRAMM", res);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },




    fetchProgramSingle({ commit }, { slug = "" }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/educational_programme/${slug}`)
          .then((res) => {
            commit("SET_programSingle", res);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    fetchProgramSyllabus({ commit }, { slug = "", key = "", category = "" }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/educational_programme/${slug}/docs/`, {
            params: {
              search: key,
              category: category,
            },
          })
          .then((res) => {
            commit("SET_syllabus", res);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },









  },
};
