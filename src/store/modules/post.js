export default {
  state: {
    post: [],
    postSingle: [],
    postRecommended: [],
    singlePages: {},
    sidebarAnons: [],
    sidebarNews: [],
    allNews: [],
  },
  mutations: {
    SET_POST(state, post) {
      state.post = post;
    },
    SET_ALL_NEWS(state, news) {
      state.allNews = news;
    },
    SET_SIDEBAR_NEWS(state, news) {
      state.sidebarNews = news;
    },
    SET_SIDEBAR_ANONS(state, events) {
      state.sidebarAnons = events;
    },
    SET_postSingle(state, postSingle) {
      state.postSingle = postSingle;
    },
    SET_POST_RECOMMENDED(state, postSingle) {
      state.postRecommended = postSingle;
    },
    SET_SINGLE_PAGES(state, payload) {
      state.singlePages = payload;
    },
  },
  actions: {
    fetchPost(
      { commit },
      {
        author = "",
        author_id = "",
        faculty = "",
        foundation = "",
        limit = "",
        on_slider = "",
        page = 1,
        search = "",
        slug = "",
        type = "",
        has_images = null,
      }
    ) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`post/`, {
            params: {
              category: type,
              author_id: author_id,
              limit: limit,
              page: page,
              faculty: faculty,
              foundation: foundation,
              slug: slug,
              search: search,
              author: author,
              on_slider: on_slider,
              has_images: has_images,
            },
          })
          .then((response) => {
            commit(type === "news" ? "SET_ALL_NEWS" : "SET_POST", response.data.results);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchSidebarPost(
      { commit },
      {
        author = "",
        author_id = "",
        faculty = "",
        foundation = "",
        limit = "",
        on_slider = "",
        page = 1,
        search = "",
        slug = "",
        type = "",
        has_images = "",
      }
    ) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`post/`, {
            params: {
              category: type,
              author_id: author_id,
              limit: limit,
              page: page,
              faculty: faculty,
              foundation: foundation,
              slug: slug,
              search: search,
              author: author,
              on_slider: on_slider,
              has_images,
            },
          })
          .then((response) => {
            commit(
              type === "news" ? "SET_SIDEBAR_NEWS" : "SET_SIDEBAR_ANONS",
              response.data.results
            );
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchPostRecommended(
      { commit },
      {
        author = "",
        author_id = "",
        faculty = "",
        foundation = "",
        limit = "",
        on_slider = "",
        page = 1,
        search = "",
        slug = "",
        type = "",
      }
    ) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`post/recommend/${slug}`, {
            params: {
              category: type,
              author_id: author_id,
              limit: limit,
              page: page,
              faculty: faculty,
              foundation: foundation,
              search: search,
              author: author,
              on_slider: on_slider,
            },
          })
          .then((response) => {
            commit("SET_POST_RECOMMENDED", response.data.results);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchPostSingle({ commit }, { slug = "" }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/post/${slug}`)
          .then((response) => {
            commit("SET_postSingle", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchTopPost() {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/top-post/`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchSinglePages({ commit }, { slug = "" }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/media-detail/${slug}`)
          .then((response) => {
            commit("SET_SINGLE_PAGES", response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
