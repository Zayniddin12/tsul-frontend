export default {
  state: {
    videoLessons: [],
  },
  mutations: {
    SET_VIDEO_LESSONS(state, video) {
      state.videoLessons = video;
    },
  },
  actions: {
    fetchVideoLessons({ commit }, slug) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/video-lessons/${slug}/list/`)
          .then((response) => {
            commit("SET_VIDEO_LESSONS", response.data.results);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
