<template>
  <div class="container mb-[104rem]">
    <div class="grid grid-cols-12 gap-[24px] mt-[32px]">
      <div  class="col-span-9 md:col-span-12">
        <page-title class="mt-[32px]" :title="$t('vacancies')" />

        <div>
          <div v-if="pending" class="mt-[32px] grid grid-cols-3 -600:grid-cols-1 gap-[24px]">
            <VacancyCardPr v-for="(item, index) in 6" :key="index" />
          </div>
          <NoData v-else-if="!vacancy.length" class=" mt-[32px] col-span-9 md:col-span-12 !items-start "/>
          <div
            v-else
            class=" grid grid-cols-3 -1024:grid-cols-2 -600:grid-cols-1 gap-[24px]"
          >
            <div v-for="(item, index) in vacancy" :key="index">
              <router-link :to="'/vacancy/' + item.slug">
                <VacancyCard
                  :title="item.title"
                  :days="item.work_date"
                  :time="item.work_time"
                  :price="numberWithSpaces(item.solary)"
                ></VacancyCard>
              </router-link>
            </div>
          </div>

          <div v-if="vacancy" class="flex items-center justify-end mt-[24rem]">
            <Pagination :total="total" @current-page="page = $event" />
          </div>
        </div>
      </div>
      <div class="col-span-3 md:col-span-12">
        <div class=" md:mt-0">
          <SideBar />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12">
      <div v-if="news && news.length" class="col-span-12 mt-[64px]">
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
  </div>
</template>

<script>
// import { mapState } from "vuex";
export default {
  data() {
    return {
      vacancy: [],
      pending: false,
      total: undefined,
      page: 1,
      news: undefined,
    };
  },

  // computed: {
  //   ...mapState({
  //     vacancy: (state) => state.vacancy.vacancy,
  //   }),
  // },

  watch: {
    async page() {
      this.pending = true;
      await this.$store
        .dispatch("fetchVacancy", {
          page: this.page,
          limit: 6,
        })
        .then((res) => {
          this.vacancy = res.data.results;
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
      this.$store.dispatch("fetchVacancy", {
        page: this.page,
        limit: 6,
      }),
      this.$store.dispatch("fetchPost", {
        type: "news",
        limit: 8,
      }),
    ])
      .then((res) => {
        this.vacancy = res[0].value.data.results;
        this.total = res[0].value.data.total_pages;
        this.news = res[1].value.data.results;
      })
      .catch((err) => console.log(err))

      .finally(() => (this.pending = false));
    this.$store.dispatch("setSlugTitle", this.$t("breadcrumb.vacancy"));
  },
};
</script>

<style lang="scss" scoped></style>
