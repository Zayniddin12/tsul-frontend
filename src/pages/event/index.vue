<template>
  <div class="container mb-[104rem]">
    <div class="grid grid-cols-12 gap-[24px] mt-[32px] mb-[32px]">
      <div class="w-full col-span-9 -1245:col-span-12">
        <PageTitle :title="$t('events')" class="mb-[32rem]" />

        <CalendarMonth :calendar="group" />
        <div class="grid grid-cols-2 gap-[24px] sm:gap-[16px] mt-[20px]">
          <router-link
            v-for="item in calendarPost"
            v-show="item?.event_date"
            :key="item.id"
            :to="`/event/${item.slug}`"
          >
           <div  class="inline-flex bg-[#1A2F53] duration-150 hover:bg-[#2E4B7C] p-[16px] event-bg h-[160px] flex-col justify-between group">
             <h4  class="not-italic font-normal text-[16rem] text-white leading-[130%] flex items-end">
              <span class="font-bold text-[28rem] leading-[130%] mr-[4px] block h-[33px]">{{
                  $dayjs(item?.event_date).format("DD")
                }}</span>
               {{ $dayjs(item?.event_date).format("MMMM") }}.
             </h4>
             <h5
                 class="not-italic font-semibold text-[14rem] leading-[130%] text-white line-clamp-3 duration-150"
             >
               {{ item.title }}
             </h5>
           </div>
          </router-link>
        </div>
        <Pagination :total="totalPages" class="mt-[20px]" @current-page="page = $event" />
      </div>
      <div class="w-full col-span-3 -1245:col-span-12">
        <SideBar :show-current-news="false" />
      </div>
    </div>
    <div v-if="news && news.length" class="h-auto mb-[80px]">
      <NewsCarousel
        :title="$t('news')"
        :btn-text="$t('all_news')"
        link="/news"
        :pending="pending"
        :list="news"
        height="230rem"
      />
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapState } from "vuex";
export default {
  data() {
    return {
      group: [],
      total: 0,
      totalPages: 0,
      page: this.$route.query?.page || 1,
      pending: undefined,
      calendarDates: [],
    };
  },
  computed: {
    ...mapState({
      calendarPost: (state) => state.post.post,
      news: (state) => state.post.allNews,
    }),
  },

  watch: {
    page() {
      this.$store.dispatch("fetchPost", {
        type: "event",
        page: this.page,
        limit: 8,
      });
    },
    calendarDates() {
      this.group = this.getGroup();
    },
  },

  mounted() {
    this.getEvent();
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  methods: {
    async getData() {
      this.currentSlug = this.$route.params.id;
      this.pending = true;
      Promise.allSettled([
        this.$store.dispatch("fetchPost", {
          type: "news",
          limit: 8,
        })]
      )
        .then(() => {
        })
        .finally(() => {
          this.pending = false;
          this.$store.dispatch("setSlugTitle", this.$t("events"));
        });
    },
    async getEvent() {
      this.currentSlug = this.$route.params.id;
      this.pending = true;
      Promise.allSettled([
        this.$store.dispatch("fetchPost", {
          type: "event",
          limit: 8,
        })]
      )
        .then((res) => {
          this.total = res[0]?.value?.data?.total
          this.totalPages = res[0]?.value?.data?.total_pages
          this.getData()
          this.getCalendarPosts(this.total)
        })
        .finally(() => {
          this.pending = false;
        });
    },
    getGroup() {
      const groups = this.calendarDates.reduce((groups, data) => {
        const date = data.event_date.split(" ")[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(data);
        return groups;
      }, {});
      const groupArrays = Object.keys(groups).map((date) => {
        return {
          date: dayjs(date).format("YYYY-MM-DD"),
          event: groups[date],
        };
      });
      return groupArrays;
    },
    getCalendarPosts(limit) {
      Promise.allSettled([
        this.$store.dispatch("fetchAllCalendarPost", {
          type: "event",
          page: 1,
          limit,
        }),
      ]).then((res) => {
        this.calendarDates = res[0]?.value?.data?.results;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.event-bg {
  background-image: url("@/static/img/event-bg.png");
  background-size: 70px;
  background-position: right bottom;
  background-repeat: no-repeat;
}
</style>
