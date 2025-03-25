<template>
  <div class="container">

    <div class="grid grid-cols-12 gap-[24px] mt-[32px] mb-[32px]">
      <div class="w-full col-span-9 -1245:col-span-12">
        <div class="w-full ">
          <PageTitle :title="myData[0]?.category.name" class="mb-[30px]" />
        </div>
        <div v-if="pending" class="grid grid-cols-2 -750:grid-cols-1 gap-[45px]">
          <GoveringCardPr v-for="(item, index) in 8" :key="index" />
        </div>

        <div v-else class="grid grid-cols-2 -750:grid-cols-1 gap-[45px]">
          <GoveringCard
              v-for="(item, index) in myData"
              v-bind="{
              fullName: item?.head ? item?.head?.first_name + ' ' + item?.head?.last_name : '',
              title: item.name,
              position: item.category.name,
            }"
              :key="index"
              :url="'/projects/' + item.slug"
          />
        </div>
        <Pagination class="mt-[24px]" :total="total" @current-page="page = $event" />
      </div>
      <div class="w-full col-span-3 -1245:col-span-12"><SideBar /></div>
    </div>
    <div class="mb-[106rem]">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: undefined,
      myData: [],
      news: [],
      pending: false,
      currentSlug: undefined,
      page: 1,
    };
  },

  watch: {
    async page() {
      this.pending = true;
      await this.$store
        .dispatch("fetchFoundation", {
          category: "projects",
          page: this.page,
          limit: 16,
        })
        .then((res) => {
          this.myData = res.data.results;
        })
        .finally(() => {
          this.pending = false;
        });

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },

  async created() {
    this.pending = true;
    await Promise.allSettled([
      this.$store.dispatch("fetchFoundation", {
        category: "projects",
        page: this.page,
        limit: 16,
      }),
      this.$store.dispatch("fetchPost", {
        type: "news",
        limit: 8,
      }),
    ])
      .then((res) => {
        this.myData = res[0]?.value?.data?.results;
        this.total = res[0].value?.data?.total_pages;
        this.news = res[1]?.value?.data?.results;
      })
      .finally(() => {
        this.pending = false;
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
