<template>
  <div class="container mb-[104rem] department">
    <div class="grid grid-cols-12 gap-[24px] mt-[32px] mb-[32px]">
      <div class="w-full col-span-9 -1245:col-span-12">
        >
        <PageTitle :title="$t('sections')" />
        <div v-if="pending" class="grid grid-cols-2 -600:grid-cols-1 gap-[45px] mt-[40px]">
          <FacultiesCardPr v-for="item in 8" :key="item.id" />
        </div>
        <div
          v-else-if="data && data?.length"
          class="grid grid-cols-2 -600:grid-cols-1 gap-[45px] mt-[40px]"
        >
          <FacultiesCard
            v-for="(item, index) in data"
            :key="index"
            v-bind="{
              desc: item.name,
              title: item?.degree?.name,
              url: `/sections/${item.slug}`,
              pending: pending,
            }"
          />
        </div>
        <NoData v-else />
        <Pagination :total="total" class="mt-[32px]" @current-page="page = $event" />
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
      pending: false,
      tabs: [],
      total: undefined,
      page: 1,
    };
  },

  computed: {
    ...mapState({
      // faculty: (state) => state.faculties.faculty,
      news: (state) => state.post.allNews,
    }),
  },

  watch: {
    async page() {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchFaculties", {
          degree: "",
          category: "section",
          limit: 8,
          page: this.page,
        }),
      ])
        .then((res) => {
          this.data = res[0].value.data.results;
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
      this.$store.dispatch("fetchFaculties", {
        degree: "",
        category: "section",
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
        this.total = res[0].value.data.total_pages;
        this.degrees = res[1].value.data.results;
      })
      .finally(() => {
        this.pending = false;
        this.$store.dispatch("setSlugTitle", this.$t("breadcrumb.sections"));
      });
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  methods: {
    async fetchCurrent(id) {
      let degree = "";
      if (id === "all") {
        degree = "";
      } else if (id === "first") {
        degree = "doctorant";
      } else if (id === "second") {
        degree = "master";
      } else if (id === "third") {
        degree = "doktorantura";
      } else {
        degree = "";
      }

      return degree;
    },
  },
};
</script>

<style lang="scss">
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
