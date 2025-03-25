<template>
  <div class="container mb-[64rem]">
    <div class="grid grid-cols-12">
      <div class="col-span-6 lg:col-span-6 md:col-span-12">
        <div class="max-w-[520px] mt-[80px]">
          <h2 class="text-[#1A2F53] minion text-[48px] leading-[66px] font-bold">404 Error</h2>
          <h6 class="font-normal text-[16rem] leading-[140%] text-[#67789E]">
            {{ $t("not_found_text") }}
          </h6>
          <div class="relative pt-[24px]">
            <input
              v-model="searchInput"
              class="w-[80%] sm:w-[100%] pr-[45px] pl-[20px] py-[15px] h-[44px] border-[1.6px] border-solid text-[16rem] leading-[19px] duration-[150ms] focus:border-none text-[#1A2F53] placeholder:text-[#A7AFBD] border-[#E0E5EC]"
              type="search"
              autocomplete="on"
              :placeholder="$t('search')"
              @keyup.enter="searchFunc"
            />
            <icon
              class="absolute left-[73%] sm:left-[90%] top-[50%] cursor-pointer"
              name="header_search"
              @click="searchFunc"
            />
          </div>
          <router-link
            to="/"
            class="learn-more-buttons bluee w-[282px] md:w-[160px] mt-[36px] sm:w-[100%]"
          >
            <Icon name="back_to_home" class="back-home" />
            <p>{{ $t("back_to_home") }}</p>
            <Icon name="arrow_right_button" />
          </router-link>
        </div>
      </div>

      <div class="col-span-6 lg:col-span-6 md:col-span-12">
        <div class="mb-[28px] mt-[60px] flex items-center justify-between">
          <PageTitle :title="$t('news')" />

          <router-link
            to="/news"
            class="all_articles flex items-center justify-between gap-[8rem] hover:bg-[#cfd3d7] cursor-pointer bg-[#EAF0F5] py-[14rem] px-[22rem] -420:py-[7rem] -420:px-[15rem]"
          >
            <span
              class="not-italic font-medium text-[14rem] leading-[16rem] uppercase text-[#1A2F53]"
              >{{ $t("all_news") }}</span
            >
            <icon name="arrow_right" />
          </router-link>
        </div>
        <div v-if="news.length" class="grid grid-cols-1 gap-y-[20px]">
          <div v-for="(item, index) in news" :key="index">
            <ErrorNews
              :img="item?.get_image?.middle"
              :title="item.title"
              :date="item.date"
              :link="'/news/' + item.slug"
            />
          </div>
        </div>
        <NoData v-else class="!min-h-[200px]" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error",
  data() {
    return {
      news: [],
      searchInput: "",
    };
  },
  async mounted() {
    await Promise.allSettled([
      this.$store.dispatch("fetchPost", {
        type: "news",
      }),
    ]).then((res) => {
      this.news = res[0].value.data.results;
    });
  }, // you can enter any name (optional)
  methods: {
    searchFunc() {
      this.$router.push(`/search/${this.searchInput}`);
      this.isSearchActive = false;
      this.isMenuOpen = false;
    },
  },
};
</script>

<style>
/* your style */
.bluee .back-home svg path {
  fill: #1a2f53;
}
</style>
