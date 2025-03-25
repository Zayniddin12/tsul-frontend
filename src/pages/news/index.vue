<template>
  <div class="container news-single">
    <div>
      <div class="grid grid-cols-12 gap-[24px]">
        <div class="col-span-9 lg:col-span-12">
          <div class="mt-[32px] sm:mt-[0px] mb-[32px]">
            <page-title :title="$t('news_title')" />
          </div>
          <div>
            <div v-if="pending" class="mb-[65px]">
              <news-main-card-pr :height="mainNewsHeight" />
            </div>
            <div v-else class="mb-[65px]">
              <news-main-card
                :description="mainNews?.description"
                :title="mainNews?.title"
                :slug="`/news/${mainNews?.slug}`"
                :image="mainNews?.get_image?.middle"
                :tag="mainNews?.post_status?.name"
                :date="mainNews?.publish_date"
                :height="mainNewsHeight"
              />
            </div>
            <div
              v-if="pending"
              class="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-[24rem] mb-[24rem]"
            >
              <div v-for="(item, index) in 9" :key="index">

                <news-card-pr :height="newsHeight" />
              </div>
            </div>
            <div v-else-if="news && news.length">
              <div class="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-[24rem] mb-[24rem]">
                <news-card
                  v-for="(item, index) in news"
                  :key="index"
                  :is-news="true"
                  :image="item?.get_image?.middle"
                  :description="item?.description"
                  :tag="item?.post_status?.name ?? item?.category.name"
                  :title="item?.title"
                  :date="item?.publish_date"
                  :slug="`/news/${item?.slug}`"
                  :height="newsHeight"
                />
              </div>
            </div>
            <Pagination :total="total" @current-page="page = $event" />
          </div>
        </div>
        <div class="col-span-3 lg:col-span-12 mt-[32px] sm:mt-[0px]"><SideBar /></div>
      </div>
    </div>
  </div>
  <div v-if="events && events.length" class="mt-[64px] mb-[64px]">
    <page-title :title="$t('events')" />
    <div v-if="pendingEvents === true" class="mt-[32px]">
      <Splide :options="options">
        <SplideSlide v-for="index in 4" :key="index">
          <recommended-events-pr />
        </SplideSlide>
      </Splide>
    </div>
    <div v-else class="mt-[32px]">
      <Splide :options="options" class="recommended-events-slider">
        <SplideSlide v-for="(item, index) in events" :key="index">
          <recommended-events
              :slug="`/event/${item?.slug}`"
              :title="item?.title"
              :date="item?.event_date"
              :month="item?.month"
          />
        </SplideSlide>
      </Splide>
    </div>
  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";

export default {
  components: {
    Splide,
    SplideSlide,
  },
  data() {
    return {
      total: undefined,
      page: 1,
      pending: undefined,
      pendingEvents: undefined,
      pageNumber: 10,
      mainNewsHeight: "230px",
      newsHeight: "230px",
      mainNews: undefined,
      news: undefined,
      options: {
        rewind: true,
        gap: "20rem",
        perPage: 6,
        arrows: false,
        pagination: false,
        breakpoints: {
          1120: {
            perPage: 6,
            perMove: 1,
          },
          860: {
            perPage: 4,
            perMove: 1,
          },
          600: {
            perPage: 3,
            perMove: 1,
          },
          400: {
            perPage: 2,
            perMove: 1,
          },
        },
      },
      events: [],
    };
  },
  watch: {
    async page() {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchPost", {
          type: "news",
          page: this.page,
          limit: 10,
        }),
      ])
        .then((res) => {
          this.mainNews = res[0].value.data.results[0];
          this.news = res[0].value.data.results.splice(1);
          this.total = res[0].value.data.total_pages;
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        })
        .finally(() => {
          this.pending = false;
        });

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  created() {
    this.getData();
  },

  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },

  methods: {
    async getData() {
      this.pending = true;
      this.page = 1;
      await Promise.allSettled([
        this.$store.dispatch("fetchPost", {
          type: "news",
          page: this.page,
          limit: 10,
        }),
      ])
        .then((res) => {
          this.mainNews = res[0].value.data.results[0];
          this.news = res[0].value.data.results.splice(1, res[0].value.data.results.length);
          this.total = res[0].value.data.total_pages;
        })
        .finally(() => {
          this.pending = false;
        });
      this.pendingEvents = true;
      await Promise.allSettled([this.$store.dispatch("fetchPost", { type: "event" })])
        .then((res) => {
          this.events = res[0].value.data.results?.filter(item => item.event_date);
        })
        .finally(() => {
          this.pendingEvents = false;
          this.$store.dispatch("setSlugTitle", this.$t("news"));
        });
    },
  },
};
</script>

<style lang="scss"></style>
