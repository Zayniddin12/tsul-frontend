<template>
  <section>
    <div class="container mt-[32px] pb-[64px]">
      <div class="bg-white">
        <div class="grid grid-cols-12 gap-[24px]">
          <!-- MAIN -->
          <div class="col-span-9 md:col-span-12">
            <div
              :class="[
                isSearchResults ? 'pt-[24px] pb-[36px]' : 'pt-[36px] pb-[72px]',
                'px-[24px] bg-[#F5F6FA] transition border-[1.6px] border-[#E0E5EC] border-solid',
              ]"
            >
              <!-- search input -->
              <form class="search-form" @submit.prevent="">
                <div class="relative">
                  <input
                    v-model="searchInput"
                    class="w-full form-input bg-white text-[15rem] text-[##1A2F53] font-[400] leading-[20px] py-[8px] px-[12px] border-[1.6px] box-border block border-solid border-[#E0E5EC] outline-none"
                    type="search"
                    :placeholder="$t('search')"
                    autocomplete="on"
                  />
                  <icon
                    name="header_search"
                    class="absolute top-1/2 -translate-y-1/2 right-[12px]"
                  />
                </div>
              </form>

              <!-- SEARCH RESULTS NOT FOUND -->
              <div v-if="isSearchResults" class="text-center">
                <div class="text-center inline-block mt-[64px]">
                  <img
                    class="mb-[32px] inline-block"
                    src="../static/img/search-icon.png"
                    alt="rector-image"
                  />
                  <h1
                    class="mb-[12px] not-italic font-semibold text-[24rem] leading-[20px] text-[#1A2F53]"
                  >
                    {{ $t("failer_serch_result") }}
                  </h1>
                  <p
                    class="not-italic font-normal text-[14rem] leading-[20px] text-[#1A2F53] opacity-50"
                  >
                    {{ $t("failer_serch_result_subtitle") }}
                  </p>
                </div>
              </div>

              <!-- SEARCH RESULT CARD -->
              <div v-else>
                <div>
                  <div v-if="pending">
                    <div
                      v-for="(item, index) in 4"
                      :key="index"
                      class="mt-[12px] relative w-full h-[120px] border-[1.6px] border-solid border-[#E0E5EC] p-[12px] bg-white"
                    >
                      <div class="flex items-center justify-between mb-[12px]">
                        <h2 class="text-[18rem] text-[#1A2F53] leading-[130%] font-[500] _loading">
                          itemddtitle
                        </h2>
                        <span
                          class="text-[12rem] text-[#1A2F53] opacity-40 leading-[20px] font-[400] _loading"
                          >ddadasdasdasdsad
                        </span>
                      </div>
                      <p
                        class="text-[14rem] text-[#677B9E] leading-[150%] font-[400] pr-[88px] _loading"
                      >
                        dasdasdasdasdasd
                      </p>
                      <!-- read more btn -->
                      <div
                        class="absolute right-0 bottom-0 flex items-center gap-[9px] w-[100px] py-[11px] px-[12px] border-[1.6px] border-[#E0E5EC] border-solid border-r-0 border-b-0 text-[12rem] leading-[140%] font-[500] transition _loading hover:text-white"
                      >
                        {{ $t("more") }} <icon class="min-w-[16px]" name="arrow_right_button" />
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="!pending && searchResults.length"
                    class="flex flex-col gap-[24px] mt-[36px]"
                  >
                    <div
                      v-for="(item, index) in searchResults"
                      :key="index"
                      class="relative w-full h-[120px] border-[1.6px] border-solid border-[#E0E5EC] p-[12px] bg-white"
                    >
                      <div class="flex items-center justify-between mb-[12px]">
                        <h2
                          class="line-clamp-1 text-[18rem] text-[#1A2F53] leading-[130%] font-[500] max-w-[75%]"
                        >
                          <WordHighlighter highlight-class="highlightStyle" :query="searchInput">
                            {{ item.title }}
                          </WordHighlighter>
                        </h2>

                        <span
                          class="text-[12rem] text-[#1A2F53] flex-shrink-0 opacity-40 leading-[20px] font-[400]"
                        >
                          {{ $dayjs(item.publish_date).format("DD.MM.YYYY") }}
                        </span>
                      </div>
                      <div
                        class="text-[14rem] line-clamp-3 text-[#677B9E] leading-[150%] font-[400] pr-[88px]"
                        v-html="item.description"
                      ></div>
                      <router-link
                        v-if="item.category?.slug === 'event'"
                        :to="`/event/${item.slug}`"
                        class="absolute right-0 bottom-0 flex items-center gap-[9px] w-[100px] py-[11px] px-[12px] border-[1.6px] border-[#E0E5EC] border-solid border-r-0 border-b-0 text-[12rem] leading-[140%] font-[500] text-[#1A2F53] transition hover:bg-[#1A2F53] hover:text-white"
                        >{{ $t("more") }} <icon class="min-w-[16px]" name="arrow_right_button"
                      /></router-link>
                      <router-link
                        v-if="item.category?.slug === 'gallery'"
                        :to="`/gallery/${item.slug}`"
                        class="absolute right-0 bottom-0 flex items-center gap-[9px] w-[100px] py-[11px] px-[12px] border-[1.6px] border-[#E0E5EC] border-solid border-r-0 border-b-0 text-[12rem] leading-[140%] font-[500] text-[#1A2F53] transition hover:bg-[#1A2F53] hover:text-white"
                        >{{ $t("more") }} <icon class="min-w-[16px]" name="arrow_right_button"
                      /></router-link>
                      <router-link
                        v-if="item.category?.slug === 'news'"
                        :to="`/news/${item.slug}`"
                        class="absolute right-0 bottom-0 flex items-center gap-[9px] w-[100px] py-[11px] px-[12px] border-[1.6px] border-[#E0E5EC] border-solid border-r-0 border-b-0 text-[12rem] leading-[140%] font-[500] text-[#1A2F53] transition hover:bg-[#1A2F53] hover:text-white"
                        >{{ $t("more") }} <icon class="min-w-[16px]" name="arrow_right_button"
                      /></router-link>
                      <router-link
                        v-if="item.category?.id === 3"
                        :to="`/oav/${item.slug}`"
                        class="absolute right-0 bottom-0 flex items-center gap-[9px] w-[100px] py-[11px] px-[12px] border-[1.6px] border-[#E0E5EC] border-solid border-r-0 border-b-0 text-[12rem] leading-[140%] font-[500] text-[#1A2F53] transition hover:bg-[#1A2F53] hover:text-white"
                        >{{ $t("more") }} <icon class="min-w-[16px]" name="arrow_right_button"
                      /></router-link>
                      <router-link
                        v-if="item.category?.slug === 'announcements'"
                        :to="`/announcements/${item.slug}`"
                        class="absolute right-0 bottom-0 flex items-center gap-[9px] w-[100px] py-[11px] px-[12px] border-[1.6px] border-[#E0E5EC] border-solid border-r-0 border-b-0 text-[12rem] leading-[140%] font-[500] text-[#1A2F53] transition hover:bg-[#1A2F53] hover:text-white"
                        >{{ $t("more") }} <icon class="min-w-[16px]" name="arrow_right_button"
                      /></router-link>
                      <router-link
                        v-if="item.category?.id === 7"
                        :to="`/scientific-projects`"
                        class="absolute right-0 bottom-0 flex items-center gap-[9px] w-[100px] py-[11px] px-[12px] border-[1.6px] border-[#E0E5EC] border-solid border-r-0 border-b-0 text-[12rem] leading-[140%] font-[500] text-[#1A2F53] transition hover:bg-[#1A2F53] hover:text-white"
                        >{{ $t("more") }} <icon class="min-w-[16px]" name="arrow_right_button"
                      /></router-link>
                      <router-link
                        v-if="item.category?.id === 10"
                        :to="`/report/${item.slug}`"
                        class="absolute right-0 bottom-0 flex items-center gap-[9px] w-[100px] py-[11px] px-[12px] border-[1.6px] border-[#E0E5EC] border-solid border-r-0 border-b-0 text-[12rem] leading-[140%] font-[500] text-[#1A2F53] transition hover:bg-[#1A2F53] hover:text-white"
                        >{{ $t("more") }} <icon class="min-w-[16px]" name="arrow_right_button"
                      /></router-link>
                      <router-link
                        v-if="item.category?.id === 11"
                        :to="`/purchase`"
                        class="absolute right-0 bottom-0 flex items-center gap-[9px] w-[100px] py-[11px] px-[12px] border-[1.6px] border-[#E0E5EC] border-solid border-r-0 border-b-0 text-[12rem] leading-[140%] font-[500] text-[#1A2F53] transition hover:bg-[#1A2F53] hover:text-white"
                        >{{ $t("more") }} <icon class="min-w-[16px]" name="arrow_right_button"
                      /></router-link>
                      <router-link
                        v-if="item.category?.slug === 'static'"
                        :to="`/static/${item.slug}`"
                        class="absolute right-0 bottom-0 flex items-center gap-[9px] w-[100px] py-[11px] px-[12px] border-[1.6px] border-[#E0E5EC] border-solid border-r-0 border-b-0 text-[12rem] leading-[140%] font-[500] text-[#1A2F53] transition hover:bg-[#1A2F53] hover:text-white"
                        >{{ $t("more") }} <icon class="min-w-[16px]" name="arrow_right_button"
                      /></router-link>
                      <router-link
                        v-if="item.category?.slug === 'scientific-works'"
                        :to="`/scientific-works/${item.slug}`"
                        class="absolute right-0 bottom-0 flex items-center gap-[9px] w-[100px] py-[11px] px-[12px] border-[1.6px] border-[#E0E5EC] border-solid border-r-0 border-b-0 text-[12rem] leading-[140%] font-[500] text-[#1A2F53] transition hover:bg-[#1A2F53] hover:text-white"
                        >{{ $t("more") }} <icon class="min-w-[16px]" name="arrow_right_button"
                      /></router-link>
                      <router-link
                        v-if="item.category?.id === 14"
                        :to="`/static/${item.slug}`"
                        class="absolute right-0 bottom-0 flex items-center gap-[9px] w-[100px] py-[11px] px-[12px] border-[1.6px] border-[#E0E5EC] border-solid border-r-0 border-b-0 text-[12rem] leading-[140%] font-[500] text-[#1A2F53] transition hover:bg-[#1A2F53] hover:text-white"
                        >{{ $t("more") }} <icon class="min-w-[16px]" name="arrow_right_button"
                      /></router-link>
                      <router-link
                        v-if="item.category?.id === 5"
                        :to="`/life-of-students`"
                        class="absolute right-0 bottom-0 flex items-center gap-[9px] w-[100px] py-[11px] px-[12px] border-[1.6px] border-[#E0E5EC] border-solid border-r-0 border-b-0 text-[12rem] leading-[140%] font-[500] text-[#1A2F53] transition hover:bg-[#1A2F53] hover:text-white"
                        >{{ $t("more") }} <icon class="min-w-[16px]" name="arrow_right_button"
                      /></router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Pagination v-if="!isSearchResults && searchResults.length" class="mt-[36px]" />
          </div>

          <!-- SIDE BAR -->
          <div class="col-span-3 md:col-span-12 mt-[-20px]">
            <SideBar />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import WordHighlighter from "vue-word-highlighter";
import {debounce} from "@/helpers/globals";

export default {
  name: "Search",
  components: {
    WordHighlighter,
  },
  data() {
    return {
      searchInput: "",
      isSearchResults: false,
      pending: false,
      title: "Natija topilmadi",
      subtitle: "Iltimos, kalit so‘zlarni almashtirib qaytadan urinib ko‘ring",
      readMore: "Batafsil",
      // search results
      searchResults: [],
    };
  },
  watch: {
    searchInput: function (key) {
      debounce('search', () => this.search(key));
      if (key === "") {
        this.searchResults = [];
      }
    },
  },


  mounted() {
    console.log('search mounted', this.$store.getters.getInputVal)
    this.searchInput = this.$store.getters.getInputVal;
    if (this.$route.params.slug) {
      // this.searchInput = this.$route.params.slug;

    }
    let searchField = document.querySelector(".form-input");
    if (searchField) {
      searchField.focus();
    }
  },
  methods: {

    async search(key) {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchSearch", {
          key: key,
        }),
      ])
        .then((res) => {
          this.searchResults = res[0].value.data.results;
          console.log(this.searchResults)
          if (this.searchResults.length === 0) {
            this.isSearchResults = true;
          } else {
            this.isSearchResults = false;
          }
        })
        .finally(() => {
          this.pending = false;
        });
    },
  },
};
</script>

<style lang="scss">
.highlightStyle {
  font-weight: 700;
  line-height: 130%;
  background: transparent;
}
</style>
