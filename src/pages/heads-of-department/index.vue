<template>
  <div class="container mb-[104rem]">
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-9 lg:col-span-12">
        <page-title :title="$t('heads_of_department')" class="my-[32px]" />
        <div>
          <div v-if="pending" class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[26rem]">
            <YoungScientistsPr v-for="(item, index) in 9" :key="index" />
          </div>
          <div v-else class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[26rem]">
            <YoungScientists
              v-for="item in faculty_employee"
              :key="item"
              v-bind="{
                type: '3',
                scientist: {
                  id: item.id,
                  name: item?.last_name + ' ' + item?.first_name + ' ' + item?.middle_name,
                  text: item.description,
                  image: item?.get_image?.middle,
                  slug: item.slug + `?faculty=${item.faculty?.slug}`,
                },
              }"
            />
          </div>
        </div>

        <Pagination
          class="mt-[32rem] pagination-kafedra"
          :total="total"
          @current-page="page = $event"
        />
      </div>
      <div class="col-span-3 lg:col-span-12 flex flex-col gap-[20px] mt-[32px] sm:mt-0">
        <side-bar />
      </div>
    </div>

    <div class="h-auto mb-[80px] mt-[32rem]">
      <NewsCarousel
        :title="$t('news')"
        :btn-text="$t('all_news')"
        link="/news"
        :pending="newsPending"
        :list="news"
        height="230rem"
      />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      employee: [],
      total: undefined,
      page: this.$route.query?.page || 1,
      pending: true,
      news: undefined,
      newsPending: true,
    };
  },

  computed: {
    ...mapState({
      faculty_employee: (state) => state.employee.employee,
    }),
  },
  watch: {
    async page() {
      this.$router.push({
        path: this.$route.path,
        query: {
          page: this.page,
        },
      });
      this.getData();
      this.scrollToTop();
    },
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },

  created() {
    // if (!this.$route.query.page) {
    //   this.$router.push({ path: "/heads-of-department/", query: { page: 1 } });
    // }

    this.getData();

    this.newsPending = true;
    Promise.allSettled([
      this.$store.dispatch("fetchPost", {
        type: "news",
        limit: 8,
      }),
    ])
      .then((res) => {
        this.news = res[0].value.data.results;
      })
      .finally(() => (this.newsPending = false));
  },

  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    getData() {
      this.pending = true;
      Promise.allSettled([
        this.$store.dispatch("fetchEmployee", {
          faculty: "",
          category: "head-of-department",
          limit: 9,
          page: this.page,
        }),
      ])
        .then((res) => {
          this.employee = res[0].value.data.results;
          console.log(this.employee);
          this.employee.forEach((item) => {
            console.log(item.category.weight);
          });
          this.total = res[0].value.data.total_pages;
        })
        .finally(() => {
          this.pending = false;
          this.$store.dispatch("setSlugTitle", "heads_of_department");
        });
    },
  },
};
</script>
<style lang=""></style>
