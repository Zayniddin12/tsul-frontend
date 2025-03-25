<template>
  <div class="container mb-[105rem]">
    <div class="grid grid-cols-12 gap-[24rem] mt-[32rem] mb-[32rem]">
      <div class="w-full col-span-9 -1245:col-span-12">
        <PageTitle :title="$t('reports_and_presentations')" class="mb-[32rem]" />

        <div v-if="pending" class="grid grid-cols-3 -750:grid-cols-2 -425:grid-cols-1 gap-[45rem]">
          <ReportCardPr v-for="(item, index) in 6" :key="index" />
        </div>

        <div
          v-else-if="reports && reports.length"
          class="grid grid-cols-3 -750:grid-cols-2 -425:grid-cols-1 gap-[24rem]"
        >
          <ReportCard
            v-for="(item, index) in reports"
            :key="index"
            v-bind="{
              link: item.get_report_file,
              title: item?.title,
              size: item?.report_file_size,
              file: item?.get_report_file,
              lang: item?.language,
              img: item?.get_image?.middle,
            }"
          />
        </div>
        <NoData v-else />

        <Pagination :total="total" class="mt-[24rem]" @current-page="page = $event" />
      </div>
      <div class="w-full col-span-3 -1245:col-span-12 -1245:mt-[30rem]">
        <SideBar />
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
export default {
  data() {
    return {
      news: [],
      reports: [],
      total: undefined,
      pending: false,
      page: 1,
    };
  },

  watch: {
    async page() {
      await this.$store
        .dispatch("fetchPost", {
          type: "reports",
          page: this.page,
        })
        .then((res) => {
          this.reports = res.data.results;
        });

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },

  async created() {
    this.pending = true;
    await Promise.allSettled([
      this.$store.dispatch("fetchPost", {
        type: "news",
        limit: 8,
      }),

      this.$store.dispatch("fetchPost", {
        type: "reports",
        page: this.page,
      }),
    ])
      .then((res) => {
        this.news = res[0].value.data.results;
        this.reports = res[1].value.data.results;
        this.total = res[1].value.data.total_pages;
      })
      .finally(() => {
        this.pending = false;
        this.$store.dispatch("setSlugTitle", this.$t("breadcrumb.report"));
      });
  },
};
</script>

<style lang="scss" scoped>
.all_articles {
  transition: all 0.3s ease;
  &:hover {
    transition: all 0.3s ease;
  }
}
</style>
