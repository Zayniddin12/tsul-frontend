<template>
  <div class="container mb-[104rem]">
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-9 lg:col-span-12">
        <Page-title :title="$t('council_of_young_scientists')" class="my-[32rem]" />
        <div v-if="pending || employee.length">
          <div class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[26rem]">
            <template v-if="pending">
              <YoungScientistsPr v-for="i in 9" :key="i" />
            </template>
            <template v-for="item in employee" v-else :key="item.id">
              <YoungScientists
                v-bind="{
                  type: '0',
                  scientist: {
                    id: item.slug,
                    name: item.first_name + ' ' + item.last_name + ' ' + item.middle_name,
                    text: item.duty,
                    image: item.get_image?.origin,
                    url: `/scientist/${item.slug}`,
                  },
                }"
              />
            </template>
          </div>
        </div>
        <!-- <div v-if="pending" class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[26rem]">
          <YoungScientistsPr v-for="item in 3" :key="item" />
        </div> -->
        <div v-else class="col-span-9 lg:col-span-12">
          <no-data />
        </div>
        <Pagination :total="total" @current-page="page = $event" />
      </div>

      <div class="col-span-3 lg:col-span-12 mt-[32px] flex flex-col gap-[20px]">
        <SideBar />
      </div>
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
import { mapState } from "vuex";
import PageTitle from "@/components/common/PageTitle.vue";

export default {
  components: { PageTitle },
  data() {
    return {
      employee: [],
      total: 2,
      page: 1,
      pending: false,
      category: [],
      post: [],
      news: [],
    };
  },

  computed: {
    ...mapState({
      employee: (state) => state.employee,
      total: (state) => state.scientists.total,
      category: (state) => state.scientists.category,
      post: (state) => state.scientists.post,
      news: (state) => state.scientists.news,
    }),
  },
  watch: {
    async page() {
      this.pending = true;
      await this.$store
        .dispatch("fetchEmployee", {
          page: this.page,
          category: "yosh-olimlar",
        })
        .then((res) => {
          this.employee = res.value?.data?.results;
          this.total = res[0].value.data.total_pages;
        })
        .catch((err) => {})
        .finally(() => {
          this.pending = false;
        });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  created() {
    this.getData();
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  methods: {
    getData() {
      this.pending = true;
      Promise.allSettled([
        this.$store.dispatch("fetchEmployee", {
          page: this.page,
          category: "yosh-olimlar",
          limit: 9,
        }),
        this.$store.dispatch("fetchPost", {
          type: "news",
          page: this.page,
          limit: 8,
        }),
      ])
        .then((res) => {
          this.employee = res[0].value.data.results;
          this.total = res[0].value.data.total_pages;
          this.news = res[1].value.data.results;
        })
        .finally(() => {
          this.pending = false;
          this.$store.dispatch("setSlugTitle", this.$t("breadcrumb.scientist"));
        });
    },
  },
};
</script>

<style lang=""></style>
