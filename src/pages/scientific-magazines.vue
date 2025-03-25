<template>
  <div class="container mb-[104rem]">
    <div class="grid grid-cols-12 gap-[24px] mt-[32px]">
      <div class="col-span-9 lg:col-span-12">
        <PageTitle :title="$t('scientific_magazines')" />

        <div class="mt-[32px]">
          <div v-if="pending">
            <div class="">
              <ScientificMagazinePr v-for="(item, index) in 4" :key="index" class="mb-[64px]" />
            </div>
          </div>
          <div v-else-if="magazines && magazines.length">
            <ScientificMagazine
              v-for="(item, index) in magazines"
              :key="index"
              class="mb-[64px]"
              :title="item.description"
              :img="item?.get_image?.middle"
              :language="item.language"
              :name="item.title"
              :source="item?.get_report_file"
            />
            <Pagination :total="total" class="mt-[32px]" @current-page="page = $event" />
          </div>
          <NoData v-else />
        </div>
      </div>
      <div class="col-span-3 lg:col-span-12">
        <SideBar />
      </div>
    </div>
    <div class="col-span-12">
      <div class="h-auto mb-[80px] mt-[20px]">
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
import ScientificMagazine from "@/components/ScientificMagazine.vue";
export default {
  components: { ScientificMagazine },
  data() {
    return {
      pending: false,
      magazines: [],
      page: 1,
      total: undefined,
    };
  },
  watch: {
    page() {
      this.$store
        .dispatch("fetchPost", {
          type: "scientific-magazine",
          page: this.page,
        })
        .then((res) => {
          this.magazines = res.data.results;
        })
        .finally(() => {
          this.$store.dispatch("setSlugTitle", this.$t("scientific_magazines"));
        });

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },

  async created() {
    this.pending = true;
    await Promise.allSettled([
      this.$store.dispatch("fetchPost", {
        type: "scientific-magazine",
      }),
      this.$store.dispatch("fetchPost", {
        type: "news",
        limit: 8,
      }),
    ])
      .then((res) => {
        this.magazines = res[0].value.data.results;
        this.total = res[0].value.data.total_pages;
        this.news = res[1].value.data.results;
      })
      .finally(() => {
        this.pending = false;
        this.$store.dispatch("setSlugTitle", this.$t("scientific_magazines"));
      });
  },
};
</script>

<style lang="scss" scoped></style>
