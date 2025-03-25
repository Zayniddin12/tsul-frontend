<template>
  <div class="faculties container !mb-[104rem]">
    <div class="grid grid-cols-12 gap-[24px] mt-[32px] mb-[32px]">
      <div class="w-full col-span-9 -1245:col-span-12">
        <PageTitle :title="$t('faculties_and_professions')" class="mb-[32rem]" />
        <!-- <div v-if="true">
          <div class="flex">
            <div v-for="i in 4" :key="i" class="_loading text-[14rem]">asd asdasdas</div>
          </div>

          <div class="">
            <div v-for="i in 6" :key="i">
              <p class="text-[15rem]">das dasd</p>
            </div>
          </div>
        </div> -->
        <div v-if="pending" class="grid grid-cols-2 -600:grid-cols-1 gap-[45px] mt-[48rem]">
          <div v-for="(item, index) in 6" :key="index">
            <FacultiesCardPr />
          </div>
        </div>
        <!--        <pre>{{ tabs }}</pre>-->
        <Tabs v-if="!pending" :data="tabs" :active="currentTab" @fetch-current="fetchCurrent">
          <template #all>
            <div v-if="data?.length" class="grid grid-cols-2 -600:grid-cols-1 gap-[45px]">
              <FacultiesCard
                v-for="(item, index) in data"
                :key="index"
                v-bind="{
                  desc: item?.name,
                  title: item?.degree?.name,
                  url: `/faculties/${item?.slug}`,
                  pending: pending,
                }"
              />
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
                  url: `/faculties/${item?.slug}`,
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
                  url: `/faculties/${item?.slug}`,
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
                  url: `/faculties/${item?.slug}`,
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
    <div class="w-full">
      <div class="h-auto mb-[80px]">
        <div
          v-if="pending"
          class="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-[24rem] mb-[24rem]"
        >
          <div v-for="(item, index) in 3" :key="index">
            <news-card-pr height="230px" />
          </div>
        </div>
        <NewsCarousel
          v-else
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
      name: "",
      degrees: [],
      pending: false,
      tabs: [],
      news: [],
      degree: this.$route.query.degree || "",
      active: "all",
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
    }),
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },

  async created() {
    this.getData();
    await Promise.allSettled([
      this.$store.dispatch("fetchPost", {
        type: "news",
        limit: 8,
      }),
    ])
      .then((res) => {
        this.news = res[0].value?.data?.results;
      })
      .finally(() => {
        this.pending = false;
      });
  },

  methods: {
    getData() {
      this.pending = true;
      Promise.allSettled([
        this.$store.dispatch("fetchFaculties", {
          degree: this.degree,
          category: "faculty",
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
          this.tabs = this.getTabs(this.degrees);
          this.active = this.tabs.filter((item) => item.id === this.degree)[0]?.name;
        })
        .finally(() => {
          this.pending = false;
          this.$store.dispatch("setSlugTitle", this.$t("breadcrumb.faculties"));
        });
      this.pending = true;
      Promise.allSettled([
        this.$store.dispatch("fetchFaculties", {
          degree: this.degree,
          category: "faculty",
        }),
        this.$store.dispatch("fetchDegree"),
        // this.$store.dispatch("fetchPost", {
        //   type: "news",
        // }),
      ])
        .then((res) => {
          this.data = res[0].value.data.results;
          this.degrees = res[1].value.data.results;
          this.tabs = this.getTabs(this.degrees);
          // this.news = res[1].value?.data?.results;
          this.currentTab = this.tabs.filter((item) => item.id === this.degree)[0]?.name;
        })
        .finally(() => {
          this.pending = false;
          this.$store.dispatch("setSlugTitle", this.$t("breadcrumb.faculties"));
        });
    },

    addParams(key, val) {
      this.$router.push({
        query: {
          [key]: val ? val : "",
        },
      });
    },
    async fetchCurrent(id) {
      this.name = id;
      let temp = this.tabs.filter((item) => item.name === id);
      this.degree = temp[0].name === "all" ? "" : temp[0].id;
      this.addParams("degree", this.degree);
      // this.degree = "";
      // this.currentTab = id;
      // if (id === "all") {
      //   this.degree = "";
      //   this.$router.push({
      //     path: this.$route.path,
      //     query: {},
      //   });
      // } else if (Object.keys(this.degreeValue).find((el) => el === id) === id) {
      //   this.degree = this.degreeValue[id];
      //   this.$router.push({
      //     path: this.$route.path,
      //     query: {
      //       tab: id,
      //       degree: this.degreeValue[id],
      //     },
      //   });
      // } else {
      //   this.$router.push({
      //     path: this.$route.path,
      //     query: {},
      //   });
      //   this.degree = "";
      // }

      await this.$store
        .dispatch("fetchFaculties", {
          degree: this.degree,
          category: "faculty",
        })
        .finally(() => {
          this.pending = false;
        });
      this.data = this.faculty;
    },
  },
};
</script>

<style lang="scss">
.faculties {
  .splide__arrow--next {
    @media screen and (max-width: 419px) {
      // display: none;
    }
    @media screen and (max-width: 365px) {
      right: 22%;
    }
  }

  .splide__arrow--prev {
    @media screen and (max-width: 419px) {
      display: flex !important;
    }
  }
}

.tabs .is-top {
  @media screen and (max-width: 670px) {
    flex-wrap: wrap;
  }
}
</style>
