<template>
  <div class="container mb-[24px]">
    <div class="grid grid-cols-12 gap-[36rem] sm:gap-[0]">
      <div class="col-span-9 lg:col-span-12">
        <div class="mt-[32rem] mb-[32rem]">
          <page-title :title="$t('scientific_researches')" />
        </div>
        <div>
          <div class="flex-center-between -768:flex-col gap-[16px] my-[24px]">
            <div class="w-[250px] -768:w-full">
              <el-select
                v-model="filterResults.level"
                :placeholder="$t('all_authors')"
                filterable
                class="text-[15rem] focus:!ring-0 block h-[44px] rounded-none"
                :filter-method="getSearchValue"
              >
                <el-option :label="$t('all')" value=""> </el-option>
                <el-option
                  v-for="(item, index) in levelOptions"
                  :key="index"
                  :label="item.first_name + ' ' + item.last_name"
                  :value="item.slug"
                >
                </el-option>
                <div ref="observerTarget" style="overflow: hidden"></div>
              </el-select>
            </div>
            <Form-input
              :is-scientific-works="true"
              :filterResults="filterResults"
              :input-placeholder="inputPlaceholder"
              :level-options="levelOptions"
            />
          </div>
          <div
            v-if="pending"
            class="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-[48rem] mb-[24rem]"
          >
            <subjects-card-pr v-for="i in 12" :key="i" />
          </div>
          <div
            v-if="data && data.length"
            class="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-[48rem] mb-[24rem]"
          >
            <div v-for="(item, index) in data" :key="index">
              <scientific-works :slug="`${item.slug}`" :title="item.title" :tag="item.tag" />
            </div>
          </div>
          <div v-else class="col-span-9 lg:col-span-12">
            <no-data />
          </div>
          <Pagination :total="total" class="mt-[32rem]" @current-page="page = $event" />
        </div>
      </div>

      <div class="col-span-3 lg:col-span-12 my-[32rem] lg:mt-[0]">
        <SideBar />
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "~/helpers/globals";
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

export default {
  setup() {
    const observerTarget = ref(null);
    let optionsPage = ref(0);
    const totalOptions = ref(undefined);

    const { stop } = useIntersectionObserver(observerTarget, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        optionsPage.value += 1;
      }
    });

    return {
      stop,
      optionsPage,
      totalOptions,
      observerTarget,
    };
  },
  data() {
    return {
      search: "",
      data: undefined,
      pending: true,
      total: undefined,
      optionsLimit: 10,
      page: this.$route.query.page || 1,
      options: {
        rewind: true,
        gap: "20rem",
        perPage: 6,
        arrows: false,
        pagination: false,
        type: "loop",
        breakpoints: {
          1120: {
            perPage: 6,
            perMove: 1,
          },
          860: {
            perPage: 4,
            perMove: 1,
          },
          600: {
            perPage: 3,
            perMove: 1,
          },
          400: {
            perPage: 2,
            perMove: 1,
          },
        },
      },
      download: "Yuklab olish",
      filterResults: {
        level: "",
        search: "",
      },
      // --------------------------------
      inputPlaceholder: {
        selectInput: this.$t("level"),
        search: this.$t("search"),
      },

      levelOptions: [],
    };
  },
  watch: {
    filterResults: {
      handler: function () {
        debounce("filterWorks", () => this.getData(), 500);
      },
      immediate: false,
      deep: true,
    },
    optionsPage() {
      if (!this.search) {
        this.getDataSelect();
      }
    },
    async page() {
      this.getData();
      if (!this.employeeLevel) {
        this.pending = true;
        await Promise.allSettled([
          this.$store.dispatch("fetchAllEmployee", {
            page: this.page,
            limit: 9,
          }),
        ])
          .then((res) => {
            this.employee = res[0].value.data.results;
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          })
          .finally(() => {
            this.pending = false;
          });
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    async search() {
      await Promise.allSettled([
        this.$store.dispatch("fetchAllEmployee", {
          page: this.page,
          limit: 9,
          search: this.search,
        }),
      ]).then((res) => {
        this.levelOptions = res[0]?.value?.data?.results ?? [];
      });
    },
  },
  created() {
    this.getData();
    this.getDataSelect();
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  methods: {
    async getData() {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchPost", {
          type: "scientific-works",
          page: this.page,
          limit: 12,
          search: this.filterResults.search,
          author: this.filterResults.level,
        }),
      ])
        .then((res) => {
          this.data = res[0].value.data.results;
          this.total = res[0].value.data.total_pages;
        })
        .finally(() => {
          this.pending = false;
          this.$store.dispatch("setSlugTitle", "scientific_researches");
        });
    },
    // async getDataSelect() {
    //   await Promise.allSettled([
    //     this.$store.dispatch("fetchEmployee", {
    //       type: "",
    //     }),
    //   ]).then((res) => {
    //     this.levelOptions = res[0].value.data.results;
    //   });
    // },
    async getDataSelect() {
      if (this.levelOptions?.length >= this.totalOptions) return;
      await Promise.allSettled([
        this.$store.dispatch("fetchEmployee", {
          limit: this.optionsLimit,
          page: this.optionsPage,
        }),
      ]).then((res) => {
        this.totalOptions = res[0]?.value?.data?.total;
        this.levelOptions = [...this.levelOptions, ...(res[0]?.value?.data?.results ?? [])];
      });
    },
    getSearchValue(search) {
      this.search = search;
    },
  },
};
</script>

<style lang="scss">
.el-select__wrapper {
  border-radius: 0 !important;
  border: 1.6px solid #e0e5ec;
  outline: none !important;
  height: 100%;
  box-shadow: none !important;
}
.el-select__wrapper.is-focused {
  box-shadow: none !important;
  border: 1.6px solid #2563eb;
}
</style>
