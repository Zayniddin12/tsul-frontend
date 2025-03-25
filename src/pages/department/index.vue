<template>
  <div class="container mb-[104rem] department">
    <div class="grid grid-cols-12 gap-[24px] mt-[32px] mb-[32px]">
      <div class="w-full col-span-9 -1245:col-span-12">
        >
        <PageTitle :title="$t('department_kafedra')" />
        <div v-if="pending" class="grid grid-cols-2 -600:grid-cols-1 gap-[45px] mt-[48rem]">
          <div v-for="(item, index) in 8" :key="index">
            <FacultiesCardPr />
          </div>
        </div>
        <Tabs class="mt-[32px]" :data="tabs" :active="currentTab" @fetch-current="fetchCurrent">
          <template #all>
            <div v-if="data.length">
              <div class="grid grid-cols-2 -600:grid-cols-1 gap-[45px]">
                <FacultiesCard
                  v-for="(item, index) in data"
                  :key="index"
                  v-bind="{
                    desc: item.name,
                    title: item?.degree?.name,
                    url: `/department/${item.slug}`,
                    pending: pending,
                  }"
                />
              </div>
              <pagination :total="total" class="mt-[64px]" @current-page="page = $event" />
            </div>

            <NoData v-else />
          </template>
          <template #first>
            <div v-if="data?.length" class="grid grid-cols-2 -600:grid-cols-1 gap-[45px]">
              <FacultiesCard
                v-for="(item, index) in data"
                :key="index"
                v-bind="{
                  desc: item?.name,
                  title: item?.degree?.name,
                  url: `/department/${item.slug}`,
                  pending: pending,
                }"
              />
            </div>
            <NoData v-else />
          </template>
          <template #second>
            <div v-if="data?.length" class="grid grid-cols-2 -600:grid-cols-1 gap-[45px]">
              <FacultiesCard
                v-for="(item, index) in data"
                :key="index"
                v-bind="{
                  desc: item?.name,
                  title: item?.degree?.name,
                  url: `/department/${item.slug}`,
                  pending: pending,
                }"
              />
            </div>
            <NoData v-else />
          </template>
          <template #third>
            <div v-if="data?.length" class="grid grid-cols-2 -600:grid-cols-1 gap-[45px]">
              <FacultiesCard
                v-for="(item, index) in data"
                :key="index"
                v-bind="{
                  desc: item?.name,
                  title: item?.degree?.name,
                  url: `/department/${item.slug}`,
                  pending: pending,
                }"
              />
            </div>
            <NoData v-else />
          </template>
        </Tabs>
      </div>
      <div class="w-full col-span-3 lg:col-span-12">
        <SideBar />
      </div>
    </div>

    <div class="w-full department">
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
import { mapState } from "vuex";

export default {
  data() {
    return {
      data: [],
      degrees: [],
      degree: this.$route?.query?.degree || "",
      pending: false,
      tabs: [],
      total: undefined,
      page: 1,
      currentTab: this.$route.query.tab || "all",
      degreeValue: {
        first: "first-rate",
        second: "master",
        third: "doktorantura",
      },
    };
  },

  computed: {
    ...mapState({
      faculty: (state) => state.faculties.faculty,
      news: (state) => state.post.allNews,
    }),
  },
  watch: {
    page() {
      this.$store
        .dispatch("fetchFaculties", {
          degree: this.degree,
          category: "department",
          limit: 8,
          page: this.page,
        })
        .then((res) => {
          this.data = res.data.results;
        });

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },

  async created() {
    this.pending = true;
    await Promise.allSettled([
      this.$store.dispatch("fetchFaculties", {
        degree: this.degree,
        category: "department",
        limit: 8,
        page: this.page,
      }),
      this.$store.dispatch("fetchDegree"),
      this.$store.dispatch("fetchPost", {
        type: "news",
        limit: 8,
      }),
    ])
      .then((res) => {
        this.data = res[0].value.data.results;
        this.degrees = res[1].value.data.results;
        this.total = res[0].value.data?.total_pages;
        this.tabs = this.getTabs(this.degrees);
      })
      .finally(() => {
        this.pending = false;
        const i18n = this.$i18n;
        this.$store.dispatch("setSlugTitle", "department");

      });
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  methods: {
    async fetchCurrent(id) {

      // this.pending = true;
      this.degree = "";
      this.currentTab = id;
      if (id === "all") {
        this.degree = "";
        this.$router.push({
          path: this.$route.path,
          query: {},
        });
      } else if (Object.keys(this.degreeValue).find((el) => el === id) === id) {
        this.degree = this.degreeValue[id];
        this.$router.push({
          path: this.$route.path,
          query: {
            tab: id,
            degree: this.degreeValue[id],
          },
        });
      } else {
        this.$router.push({
          path: this.$route.path,
          query: {},
        });
        this.degree = "";
      }

      // await this.$router.push({
      //   path: this.$route.path,
      //   query: { degree: degree },
      // });
      await this.$store
        .dispatch("fetchFaculties", {
          degree: this.degree,
          limit: 8,
          page: 1,
          category: "department",
        })
        .then((res) => (this.total = res.data.total_pages))
        .finally(() => {
          this.pending = false;
        });

      this.data = this.faculty;
    },
  },
};
</script>

<style lang="scss">
.tabs .is-top {
  flex-wrap: wrap !important;
  @media screen and (max-width: 678px) {
    gap: 12px !important;
  }
}
.department {
  .splide__pagination {
    top: 109.5%;
  }

  @media screen and (max-width: 500px) {
    .el-tabs__nav-scroll {
      overflow: auto !important;
      &::-webkit-scrollbar {
        width: 0 !important;
      }
    }
    .el-tabs__nav-prev,
    .el-tabs__nav-next {
      display: none !important;
    }
  }

  .slider .splide__arrows .splide__arrow--prev {
    @media screen and (max-width: 617px) {
      left: 20% !important;
    }
    @media screen and (max-width: 560px) {
      left: 15% !important;
    }
    @media screen and (max-width: 490px) {
      left: 10% !important;
      display: flex !important;
    }
    @media screen and (max-width: 420px) {
      left: 15px !important;
    }
  }
  .slider .splide__arrows .splide__arrow--next {
    @media screen and (max-width: 617px) {
      right: 20% !important;
    }
    @media screen and (max-width: 560px) {
      right: 15% !important;
    }
    @media screen and (max-width: 490px) {
      right: 10% !important;
    }
    @media screen and (max-width: 420px) {
      right: 15px !important;
    }
  }
}
</style>
