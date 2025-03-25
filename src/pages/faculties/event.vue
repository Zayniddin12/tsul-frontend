<template>
  <div class="container mb-[104rem]">
    <div class="grid grid-cols-12 gap-[24px] mt-[32px] mb-[32px]">
      <div class="w-full col-span-9 -1245:col-span-12">
        <PageTitle :title="$t('events')" />
      </div>
      <div class="w-full col-span-3 -1245:hidden"></div>
    </div>
    <div class="grid grid-cols-12 gap-[24px] mt-[32px] mb-[32px]">
      <div class="w-full col-span-9 -1245:col-span-12">
        <CalendarMonth :calendar="group" />
      </div>
      <div class="w-full col-span-3 -1245:col-span-12">
        <SideBar :show-current-news="false" />
      </div>
    </div>
    <div class="h-auto mb-[80px]">
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
export default {
  data() {
    return {
      news: [],
      calendar: [],
      group: [],
      pending: undefined
    };
  },

  watch: {
    $route() {
      this.getData();
    },
  },

  mounted() {
    this.getData()
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  methods: {
    async getData(){
      this.currentSlug = this.$route.params.id;
      this.pending = true;
      Promise.allSettled([
        this.$store.dispatch("fetchPost", {
          type: "news",
          limit: 8,
        }),
        this.$store.dispatch("fetchPost", {
          type: "event",
          faculty: this.$route.params.id
        }),
      ])
        .then((res) => {
          this.news = res[0]?.value?.data?.results;
          this.calendar = res[1]?.value?.data?.results;
          this.group = this.getGroup();
        })
        .finally(() => {
          this.pending = false;
          this.$store.dispatch("setSlugTitle", this.$t('events'));

        });
    },
    getGroup() {
      const groups = this.calendar.reduce((groups, data) => {
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
  },
};
</script>

<style lang="scss" scoped></style>
