export default {
  state: {
    slider: [],
    departmentSlider: [],
  },
  mutations: {
    SET_SLIDER(state, slider) {
      state.slider = slider;
    },
    SET_DEPARTMENT_SLIDER(state, departmentSlider) {
      state.departmentSlider = departmentSlider;
    },
  },
  actions: {
    fetchSlider({ commit }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`sliders/`)
          .then((response) => {
            commit("SET_SLIDER", response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchDepartmentSlider({ commit }, { faculty }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/faculty-slider/`, {
            params: {
              faculty__slug: faculty,
            },
          })
          .then((response) => {
            commit("SET_DEPARTMENT_SLIDER", response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
