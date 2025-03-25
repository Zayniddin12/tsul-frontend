<template>
  <div class="container">
    <div class="grid grid-cols-12 gap-[24px] mt-[32px] mb-[32px]">
      <div class="w-full col-span-9 -1245:col-span-12">
        <PageTitle :title="$t('goals_and_values')" class="mb-[32rem]" />
        <ValuesCard
          v-if="value"
          v-bind="{
            title: value?.title,
            desc: value?.description,
            pending: pending,
          }"
          class="mb-[32rem] -425:mb-0"
        />
        <div v-else class="w-full col-span-9 -1245:col-span-12">
          <no-data />
        </div>
        <div v-if="pending" class="px-[109rem] -766:px-[50rem] -640:px-[20rem] -425:py-[20rem]">
          <TextPr />
        </div>
        <div
          v-else-if="!pending"
          class="px-[109rem] -766:px-[50rem] -640:px-[20rem] -425:py-[20rem]"
        >
          <div class="text-[15rem] reg-text leading-[140%]" v-html="value?.content"></div>
        </div>
      </div>
      <div class="w-full col-span-3 -1245:col-span-12"><SideBar /></div>
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
      value: [],
      pending: false,
    };
  },
  watch: {
    $route() {
      this.created();

    },
    slug() {
      if (this.slug) {
        this.counterFinished = Date.parse(this.slug?.event_date) > Date.parse(new Date());
      }
    },
  },
  created() {
    this.created();

  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  methods:{
    async created() {
    this.pending = true;
    await Promise.allSettled([
      this.$store.dispatch("fetchPost", {
        type: "news",
        limit: 8,
      }),
      this.$store.dispatch("fetchSinglePages", {
        slug: "values",
      }),
    ])
      .then((res) => {  
        this.news = res[0]?.value?.data?.results;
        this.value = res[1]?.value?.data;
      })
      .finally(() => {
        this.pending = false;
        this.$store.dispatch("setSlugTitle", this.$t("breadcrumb.values"));
      });
  },
  }
};
</script>

<style lang="scss">
.reg-text {
  strong {
    font-family: "Minion 3";
    font-style: normal;
    font-weight: 700;
    font-size: 24rem;
    line-height: 130%;
    color: #1a2f53;
  }
  p {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 17rem;
    line-height: 160%;
    color: #344666;
    margin-top: 15px;
  }
}

.all_articles {
  transition: all 0.3s ease;
  &:hover {
    transition: all 0.3s ease;
  }
}
</style>
