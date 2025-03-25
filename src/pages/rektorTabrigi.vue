<template>
  <div class="container">
    <div class="grid grid-cols-12 gap-[24px] mt-[32px] mb-[32px]">
      <div class="w-full col-span-9 -1245:col-span-12">
        <PageTitle :title="$t('rector_congratulations')" class="mb-[32px]" />
        <div class="relative mb-[48rem]">
          <div
            v-if="pending"
            class="_loading w-[331rem] -1245:w-[600rem] -1245:h-[350rem] -811:h-[500rem] -425:h-[300rem] -811:w-full h-[248rem]"
          ></div>
          <div v-else-if="!isExist">
            <no-data />
          </div>
          <img
            v-else-if="rectorData?.get_image?.middle"
            :src="rectorData?.get_image?.middle"
            class="w-[331rem] h-[248rem] object-cover object-center -1245:w-[600rem] -1245:h-[350rem] -811:h-[500rem] -425:h-[300rem] -811:w-full"
            alt="rector-image"
          />
          <img
            v-else
            src="@/static/img/default.svg"
            class="w-[331rem] h-[248rem] object-cover object-center -1245:w-[600rem] -1245:h-[350rem] -811:h-[500rem] -425:h-[300rem] -811:w-full"
            alt=""
          />
          <div
            class="absolute -811:static -811:top-0 -811:translate-y-0 -811:w-full w-[736rem] -944:w-[600rem] top-[50%] translate-y-[-50%] right-0"
          >
            <QuoteRectorPr v-if="pending" />
            <QuoteRector
              v-else-if="isExist"
              v-bind="{
                title: rectorData?.quote ?? '',
                position: 'Toshkent Davlat Yuridik Universiteti rektori',
                fullName: `${rectorData?.last_name} ${rectorData?.first_name.slice(
                  0,
                  1
                )}. ${rectorData?.first_name.slice(0, 1)}.`,
              }"
            />
            
          </div>
        </div>
        <div
          v-if="pending"
          class="py-[48rem] px-[109rem] -766:px-[50rem] -640:px-[20rem] -425:py-[20rem] bg-[#F5F6FA] border-[1.6px] border-[ #E0E5EC]"
        >
          <TextPr />
        </div>
        <div
          v-else
          class="py-[48rem] px-[109rem] -766:px-[50rem] -640:px-[20rem] -425:py-[20rem] bg-[#F5F6FA] border-[1.6px] border-[ #E0E5EC]"
        >
        
          <div
            class="reg-text font-normal leading-[140%] text-[17rem]"
            v-html="rector?.content"
          ></div>
        </div>
      </div>
      <div class="w-full col-span-3 -1245:col-span-12"><SideBar /></div>
    </div>
    <div class="w-full mt-[64rem] mb-[104rem]">
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
      rector: null,
      pending: false,
      isExist: true,
      rectorData: [],
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
  methods: {
    async created() {
    this.pending = true;
    await Promise.allSettled([
      this.$store.dispatch("fetchPost", {
        type: "news",
        limit: 6,
      }),
      this.$store.dispatch("fetchPostSingle", {
        slug: "rector-congratulations",
      }),
      this.$store.dispatch("fetchEmployeeSlug", {
        slug: "?category=001",
      }),

    ])
      .then((res) => {
        this.news = res[0].value?.data?.results;
        this.rector = res[1].value?.data;
        this.rectorData = res[2].value?.data?.results[0];
      })
      .finally(() => {
        this.pending = false;
        this.$store.dispatch("setSlugTitle", this.$t("rektor-tabrigi"));
      });
  },
},
};
</script>

<style lang="scss">
.all_articles {
  transition: all 0.3s ease;
  &:hover {
    transition: all 0.3s ease;
  }
}

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
    font-size: 15rem;
    line-height: 140%;
    color: #344666;
    margin-top: 8px;
  }
}
</style>
