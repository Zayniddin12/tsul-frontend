<template>
  <section>
    <div class="container mt-[18px] md:mt-[32px] mb-[64rem]">
      <div class="grid grid-cols-12 gap-[24px]">
        <div class="col-span-9 lg:col-span-12">
          <Page-title :title="title" class="mb-[32rem]" />
           <el-table v-if="data?.length" :data="data">
            <template #empty> {{ $t("no_information") }} </template>

            <el-table-column :label="$t('source')" prop="source" width="230" align="left">
            <template #default="{row: scope}">
                <div class="flex items-center">
                <img
                  v-if="scope.source_icon?.get_logo"
                  :src="scope.source_icon?.get_logo?.origin"
                  class="w-[54px] h-[16px] object-cover change_img mr-[12px]"
                  alt="logo"
                />
                <a :href="scope.source" rel="noopener noreferrer" target="_blank">
                  {{ scope.source_icon.name }}
                </a>
              </div>
            </template>
              
            </el-table-column>
            <el-table-column
              :label="$t('article_and_source')"
              prop="source"
              width="450"
              align="left"
            >
            <template #default="{row: scope}">
              <a class="flex items-center gap-[12rem]" :href="`/oav/`+scope.slug">
                <Icon class="shrink-0" name="skripka" />
                <p>
                  {{ scope.title }}
                </p>
              </a>
            </template>
            </el-table-column>
            <el-table-column
             
              prop="date"
              width="130"
              :label="$t('date')"
              align="center"
            >
            <template #default="{row: scope}">
              {{ $dayjs(scope.publish_date).format("DD") }}.{{
                $dayjs(scope.publish_date).format("MM")
              }}.{{ $dayjs(scope.publish_date).format("YYYY") }}
              </template>
              
            </el-table-column>
            <el-table-column
              prop="lang"
              width="110"
              :label="$t('lang')"
              align="center"
            >
            <template #default="{row: scope}">
              <div v-if="scope.language">
                {{scope.language }}
              </div>
            </template>
            </el-table-column>
          </el-table>
          <NoData v-else />

          <div class="flex items-center mt-[24rem] justify-end">
            <Pagination :total="total" @current-page="page = $event" />
          </div>
        </div>
        <!-- SIDE BAR -->
        <div class="col-span-3 lg:col-span-12">
          <SideBar />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "MediaAboutUs",
  data() {
    return {
      title: this.$t("oav_about_us"),
      data: undefined,
      page: 1,
      total: undefined,
    };
  },
  watch: {
    async page() {
      this.getData();
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },

  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  created() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.pending = true;
    Promise.allSettled([
      this.$store.dispatch("fetchSidebarPost", {
        type: "oav-aboutus",
        page: this.page,
      }),
    ])
      .then((res) => {
        this.data = res[0].value.data.results;
        this.total = res[0].value.data.total_pages;
      })
      .finally(() => {
        this.pending = false;
        this.$store.dispatch("setSlugTitle", this.title);  
      });
  },

};
</script>

<style lang="scss" scoped>
.change_img {
  mix-blend-mode: multiply ;
  // filter: grayscale(100%);
}
</style>
