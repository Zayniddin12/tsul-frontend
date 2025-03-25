<template>
  <div class="container mb-[106rem]">
    <div class="grid grid-cols-12 gap-[24px] mt-[32px] mb-[32px]">
      <div class="w-full col-span-9 -1245:col-span-12">
        <PageTitle :title="$t('governing')" class="mb-[32px]" />
        <div v-if="pending" class="grid grid-cols-2 -750:grid-cols-1 gap-[45px] -750:gap-[30px]">
          <GoveringCardPr v-for="(item, index) in 2" :key="index" />
        </div>
        <div
          v-else-if="foundation && foundation.length"
          class="grid grid-cols-2 -750:grid-cols-1 gap-[45px] -750:gap-[30px]"
        >
          <GoveringCard
            v-for="(item, index) in foundation"
            :key="index"
            v-bind="{
              fullName: checkName(item),
              url: `/governing/${item?.slug}`,
              title: item?.name,
              position: `${item?.name} raisi`,
            }"
          />
        </div>
        <NoData v-else />
      </div>
      <div class="w-full col-span-3 -1245:col-span-12">
        <SideBar :show-rector-appeal="false" :show-current-news="false" :show-telegram="false" />
      </div>
    </div>
    <div>
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
      news: [],
      foundation: [],
      pending: false,
    };
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  async created() {
    this.pending = true;
    await Promise.allSettled([
      this.$store.dispatch("fetchPost", {
        type: "news",
        limit: 8,
      }),
      this.$store.dispatch("fetchFoundation", {
        category: "boshqaruv-organlari",
        page: 1,
      }),
    ])
      .then((res) => {
        this.news = res[0].value.data.results;
        this.foundation = res[1].value.data.results;
      })
      .finally(() => {
        this.pending = false;
        this.$store.dispatch("setSlugTitle", this.$t("governing"));
      });
  },
  methods: {
    checkName(item) {
      return `${item?.head?.first_name ?? ""} ${item?.head?.last_name ?? ""} ${
        item?.head?.middle_name ?? ""
      }`;
    },
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
