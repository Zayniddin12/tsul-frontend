<template>
  <div class="container mt-[32px] mb-[64rem]">
    <div class="grid grid-cols-12 gap-[24px] mt-[46px]">
      <div class="col-span-9 lg:col-span-12">
        <Page-title :title="title" class="mb-[32rem]" />
        <Form-input
          :input-placeholder="inputPlaceholder"
          :level-options="levelOptions"
          :filterResults="filterResults"
          :course-options="courseOptions"
          :is-have-course="true"
          class="mb-[20px]"
        >
        </Form-input>
        <el-table :data="tableData" style="width: 100%">
          <template #empty> {{ $t("no_information") }} </template>

          <el-table-column type="index" label="#" align="center" width="100px"></el-table-column>
          <el-table-column
            v-for="column in columns"
            :key="column.index"
            :prop="column.prop"
            :align="column.align"
            :width="column.width"
            :label="column.label"
            :min-width="column.minWidth"
          ></el-table-column>
          <el-table-column v-slot="scope" :label="$t('actions')" align="center" width="150">
            <a
              :href="tableData[scope.$index].file"
              :download="tableData[scope.$index].file"
              target="_blank"
              class="flex files-download justify-center items-center gap-[8px]"
            >
              <p>
                {{ $t("download") }}
              </p>
              <Icon name="download_gray" />
            </a>
          </el-table-column>
        </el-table>
        <Pagination class="mt-[24px]" :total="total" @current-page="page = $event" />
      </div>
      <!-- side bar -->
      <div class="col-span-3 lg:col-span-12">
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
export default {
  name: "ClassSchedule",
  data() {
    return {
      title: this.$t("class_schedule"),
      download: this.$t("download"),
      pending: false,
      page: 1,
      total: undefined,
      news: [],
      tableData: undefined,
      key: "",
      filterResults: {
        level: "",
        course: "",
        search: "",
      },
      // --------------------------------
      inputPlaceholder: {
        selectInput: this.$t("level"),
        group: this.$t("course"),
        search: this.$t("search_group"),
        name: this.$t("level"),
      },
      courseOptions: [
        {
          name: "I",
          slug: 1,
        },
        {
          name: "II",
          slug: 2,
        },
        {
          name: "III",
          slug: 3,
        },
        {
          name: "IV",
          slug: 4,
        },
        {
          name: "V",
          slug: 5,
        },
      ],

      levelOptions: undefined,

      columns: [
        {
          label: this.$t("level"),
          prop: "degree.name",
          width: "150",
          align: "left",
        },
        {
          label: this.$t("course"),
          prop: "course",
          width: "265",
          align: "center",
        },
        {
          label: this.$t("group"),
          prop: "group",
          width: "265",
          align: "center",
        },
      ],
    };
  },

  watch: {
    async page() {
      await this.getData();
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    filterResults: {
      handler() {
        this.getData();
      },
      deep: true,
    },
  },

  created() {
    this.getData();
    this.getDegree();
  },

  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  mounted() {
    this.getData();
  },

  methods: {
    async getData() {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchDocuments", {
          category: "class_schedule",
          key: this.filterResults.search,
          page: this.page,
          degree: this.filterResults.level,
          course: this.filterResults.course,
        }),
        this.$store.dispatch("fetchPost", {
          type: "news",
          limit: 8,
        }),
      ])
        .then((res) => {
          this.tableData = res[0].value?.data?.results;
          this.total = res[0].value?.data?.total_pages;
          this.news = res[1].value?.data?.results;
        })
        .finally(() => {
          this.pending = false;
          this.$store.dispatch("setSlugTitle", this.$t("class_schedule"));
        });
    },
    async getDegree() {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchDegreeTypes"),
        this.$store.dispatch("fetchDocuments", { degre: "" }),
      ])
        .then(async (res) => {
          this.levelOptions = res[0].value?.data?.results;
        })
        .finally(() => {
          this.pending = false;
          this.$store.dispatch("setSlugTitle", this.$t("class_schedule"));
        });
    },
  },
};
</script>

<style lang="scss">
.files-download {
  font-weight: 400;
  font-size: 15rem;
  line-height: 20px;
  text-align: center;
  color: #2b5e9b;
  i {
    width: 20px;
    height: 20px;
  }
  svg {
    path {
      fill: #2b5e9b;
    }
  }
}
</style>
