import router from "@/router";

export default {
  state: {
    employee: [],
    slug: undefined,
    allEmployee: [],
    application_title: "",
  },
  mutations: {
    SET_EMPLOYEE(state, employee) {
      state.employee = employee;
    },
    SET_EMPLOYEE_SLUG(state, slug) {
      state.slug = slug;
    },
    SET_ALL_EMPLOYEE(state, allEmployee) {
      state.allEmployee = allEmployee;
    },
    SET_ALL_EMPLOYEE_CATEGORIES(state, allEmployee) {
      state.categories = allEmployee;
    },
    SET_APPLICATION_TITLE(state, commit) {
      state.categories = commit;
    },
    SET_VIDEO_ID(state, videoId) {
      state.videoId = videoId;
    },
  },
  actions: {
    fetchApplicationTitle({ commit }, category) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/application_title/?category=${category}`)
          .then((response) => {
            commit("SET_APPLICATION_TITLE", response.data.results);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchEmployee(
      { commit },
      { faculty = "", page = 1, category = "", limit = "", foundation = "", ordering = "" }
    ) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/employee/`, {
            params: {
              faculty: faculty,
              category: category,
              foundation: foundation,
              limit: limit,
              ordering: ordering,
              page: page,
            },
          })
          .then((response) => {
            commit("SET_EMPLOYEE", response.data.results);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    fetchEmployeeRecommended({ commit }, { slug = "", limit = "", faculty = "", category = "" }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/employee/recommend/${slug}`, {
            params: {
              limit: limit,
              faculty: faculty,
              category: category,
            },
          })
          .then((response) => {
            commit("SET_EMPLOYEE", response.data.results);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    fetchEmployeeSlug({ commit }, { slug }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`employee/${slug}`)
          .then((response) => {
            commit("SET_EMPLOYEE_SLUG", response.data);
            resolve(response);
          })
          .catch((error) => {
            router.push('/error')
            reject(error);
          });
      });
    },
    fetchAllEmployee({ commit }, { page = 1, limit = "", search ='' }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`employee`, {
            params: {
              page,
              limit,
              search
            }
          })
          .then((response) => {
            commit("SET_ALL_EMPLOYEE", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error)
            router.push('/error')
          });
      });
    },
    filterEmployees({ commit }, { page = 1, limit = "", category }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`employee?page=${page}&limit=${limit}&category=${category}`)
          .then((response) => {
            commit("SET_ALL_EMPLOYEE", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchSearchCategories({ commit }, { limit = "", page = 1, search = "" }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get("position/", {
            params: {
              limit: limit,
              page: page,
              search: search,
            },
          })
          .then((response) => {
            commit("SET_ALL_EMPLOYEE_CATEGORIES", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchCategories({ commit }, { limit = "", page = 1 }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get("position/", {
            params: {
              limit: limit,
              page: page,
            },
          })
          .then((response) => {
            commit("SET_ALL_EMPLOYEE_CATEGORIES", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchVideoId({ commit }, { id }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`employee/${id}`)
          .then((response) => {
            commit("SET_VIDEO_ID", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters:{
    getEmployee:state => state.employee
  }
};
