<template>
  <div class="container mb-[64px]">
    <div class="grid grid-cols-12 gap-[24px] mb-[32px]">
      <div class="col-span-9 lg:col-span-12">
        <PageTitle class="my-[32px]" :title="$t('breadcrumb.all_employees')" />
        <div class="container">
          <el-select
            v-model="employeeLevel"
            placeholder="Level"
            filterable
            class="text-[15rem] -470:w-full mb-[24px] focus:!ring-0"
            :filter-method="getSelectSearchValue"
          >
            <el-option :label="$t('all')" value="all"> </el-option>
            <el-option
              v-for="(item, index) in levelOptions"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
            <div ref="observerTarget" style="overflow: hidden"></div>
          </el-select>
          <div v-if="pending" class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[26rem]">
            <YoungScientistsPr v-for="(item, index) in 6" :key="index" />
          </div>
          <div v-else>
            <div
              v-if="employee.length"
              class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[26rem]"
            >
              <YoungScientists
                v-for="item in filteredEmployee"
                :key="item"
                v-bind="{
                  type: '2',
                  scientist: {
                    id: item.id,
                    name:
                      item?.last_name + ' ' + item?.first_name + ' ' + (item?.middle_name || ''),
                    text: item.description,
                    image: item?.get_image?.middle,
                    slug: `${item.slug}?faculty=${item.faculty?.slug}`,
                    path:
                      item?.category?.slug === '001' || item?.category?.slug === '002'
                        ? '/management/' + item.slug +  `?category=${item?.category?.slug}`
                        : null,
                  },
                }"
              />
            </div>
            <div v-else>
              <NoData />
            </div>
          </div>
        </div>
        <Pagination
          :key="reRenderPagination"
          class="mt-[24px]"
          :total="total"
          :active-page="$route.query.page"
          @current-page="page = $event"
        />
      </div>
      <div class="col-span-3 lg:col-span-12 my-[32px]">
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
import PageTitle from "@/components/common/PageTitle.vue";
import Pagination from "@/components/common/pagination.vue";
import { mapState } from "vuex";
import { useI18n } from "vue-i18n";

import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";
export default {
  components: { PageTitle, Pagination },
  setup() {
    const { t } = useI18n();
    const observerTarget = ref(null);
    let optionsPage = ref(1);
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
      employee: [],
      total: undefined,
      page: 1,
      pending: true,
      employeeLevel: "all",
      levelOptions: [],
      optionsLimit: 10,
      reRenderPagination: "",
    };
  },
  computed: {
    ...mapState({
      news: (state) => state.post.allNews,
    }),
    filteredEmployee() {
      return this.employee.filter((item) => {
        const facultySlug = item?.category?.slug;
        return facultySlug !== "rektor" && facultySlug !== "prorector";
      });
    },
  },

  watch: {
    async page() {
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
    employeeLevel(newValue) {
      this.page = 1;
      this.$router.push({
        name: "PAllEmployees",
        query: { page: this.page, category: newValue },
      });
      this.employeeLevel = newValue;
      this.reRenderPagination = newValue;
    },
    optionsPage() {
      this.getCategories();
    },
    "$route.query.page"() {
      if (!this.$route.query.page) {
        this.page = 1;
      }
      if (this.employeeLevel === "all") {
        this.getData();
      } else {
        this.filterData(this.employeeLevel);
      }
    },
    "$route.query.category"() {
      if (this.employeeLevel === "all") {
        this.getData();
      } else {
        this.filterData(this.employeeLevel);
      }
    },
  },
  created() {
    this.employeeLevel = this.$route.query.category ?? "all";
    this.getData();
    this.getCategories();
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },

  methods: {
    async getData() {
      this.pending = true;
      await Promise.allSettled([
        this.employeeLevel === "all"
          ? this.$store.dispatch("fetchAllEmployee", {
            page: this.$route.query.page,
            limit: 9,
          })
          : this.employeeLevel
            ? this.$store.dispatch("filterEmployees", {
              page: this.$route.query.page,
              limit: 9,
              category: this.employeeLevel,
            })
            : "",
      ])
        .then((res) => {
          this.employee = res[0].value.data.results;
          this.total = res[0].value?.data?.total_pages;
        })
        .finally(() => {
          this.pending = false;
          this.employeeLevel = 'all'
          this.$store.dispatch("setSlugTitle", this.$t("breadcrumb.all_employees"));

        });
    },
    async getSelectSearchValue(searchText) {
      console.log("filtered", searchText);
      await Promise.allSettled([
        this.$store.dispatch("fetchSearchCategories", {
          limit: this.optionsLimit,
          page: 1,
          search: searchText,
        }),
      ]).then((res) => {
        this.totalOptions = res[0]?.value?.data?.total;
        this.levelOptions = res[0]?.value?.data?.results ?? [];
      });
    },
    async filterData(category) {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("filterEmployees", {
          page: this.$route.query.page,
          limit: 9,
          category: category,
        }),
      ])
        .then((res) => {
          this.employee = res[0].value.data.results;
          this.total = res[0].value?.data?.total_pages;
        })
        .finally(() => {
          setTimeout(() => {
            this.pending = false;
          }, 100);
        });
    },
    async getCategories() {
      if (this.levelOptions?.length >= this.totalOptions) return;
      await Promise.allSettled([
        this.$store.dispatch("fetchCategories", {
          limit: this.optionsLimit,
          page: this.optionsPage,
        }),
      ]).then((res) => {
        this.totalOptions = res[0]?.value?.data?.total;
        this.levelOptions = [...this.levelOptions, ...(res[0]?.value?.data?.results ?? [])];
        console.log("array push");
      });
    },
  },
};
</script>
