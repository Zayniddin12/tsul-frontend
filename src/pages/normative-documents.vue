<template>
  <section class="container mt-[32px]">
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-9 lg:col-span-12 mt-[32rem] mb-[32rem]">
        <Page-title :title="title" />
      </div>
    </div>
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-9 lg:col-span-12">
        <!-- serach input -->
        <div
          class="flex items-center gap-5 filter-normative mb-[20px] justify-between -620:justify-center flex-row -620:flex-col"
        >
        
          <el-select
            v-model="filterResults.level"
            :placeholder="inputPlaceholder.selectInput"
            class="text-[15rem] w-[244px] h-[44px]"
          >
            <el-option :label="$t('all')" value=""> </el-option>
            <el-option
              v-for="item in levelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.slug"
            >
            </el-option>
          </el-select>
          <form class="relative inline-block  h-[44px] w-[303px]" @submit.prevent="submit">
            <input
              v-model="searchInput"
              class="w-full h-full pr-[40px] pl-[12px] border-[1.6px] border-solid text-[16rem] leading-[19px] font-[500] text-[#1A2F53] placeholder:text-[#A7AFBD] border-[#E0E5EC]"
              type="search"
              :placeholder="inputPlaceholder.search"
              autocomplete="on"
              @input="debounceSearch"
            />
            <icon class="absolute top-1/2 right-[12px] -translate-y-1/2" name="header_search" />
          </form>
        </div>

        <el-table :data="tableData" style="width: 100%">
          <template #empty> {{ $t("no_information") }} </template>
          <el-table-column type="index" label="#" align="center" width="70px"> </el-table-column>
          <el-table-column
            v-for="(column, index) in columns"
            :key="column.label"
            :prop="column.prop"
            :align="column.align"
            :width="column.width"
            :label="column.label"
            :min-width="column.minWidth"
            @click="getIndex(index)"
          ></el-table-column>
          <el-table-column v-slot="scope" :label="$t('actions')" align="center" width="150px">
            <a
              :href="tableData[scope.$index].slug"
              :download="tableData[scope.$index].file"
              class="flex files-download justify-center items-center gap-[8px]"
              target="_blank"
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
      <!-- SIDE BAR -->
      <div class="col-span-3 lg:col-span-12">
        <SideBar />
      </div>
    </div>
    <div class="h-auto mt-[20px] mb-[80px]">
      <NewsCarousel
        :title="$t('news')"
        :btn-text="$t('all_news')"
        link="/news"
        :pending="pending"
        :list="news"
        height="230rem"
      />
    </div>
  </section>
</template>

<script>
import { debounce } from 'lodash';
import PageTitle from "@/components/common/PageTitle.vue";
export default {
  name: "OfficialDocuments",
  components: { PageTitle },
  data() {
    return {
      searchInput: "",
      isSearchResults: false,
      pending: false,
      page: 1,
      total: undefined,
      debounceSearch: debounce(() => {
        this.search(this.searchInput);
      }, 500),
      news: [],
      levelOptions: [],
      title: this.$t("normative_documents"),
      download: this.$t("download"),
      filterResults: {
        level: "",
        search: "",
      },
      inputPlaceholder: {
        selectInput: this.$t("fight_against_corruption"),
        search: this.$t("search_document"),
      },
      columns: [
        {
          label: this.$t("doc_number"),
          prop: "doc_id",
          width: "150",
          align: "center",
        },
        {
          label: this.$t("doc_name"),
          prop: "title",
          width: "386",
          align: "left",
        },
        { label: this.$t("date"), prop: "date", width: "150", align: "center" },
      ],
      tableData: [],
    };
  },

  watch: {
    async page() {
      this.getData();
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    searchInput: function (key) {
      this.debounceSearch();
    },

    "filterResults.level"(category) {
      this.category(category);
    },
  },

  created() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.getData();
    this.getDataSelect();
  },

  methods: {
    async getData() {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchDocuments", {
          category: "",
          page: this.page,
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
          this.$store.dispatch("setSlugTitle", this.$t("breadcrumb.normative_documents"));
        });
    },

    async getDataSelect() {
      this.pending = true;
      await Promise.allSettled([this.$store.dispatch("fetchNormativeDocumentsType")])
        .then((res) => {
          this.levelOptions = res[0].value.data.results;
        })
        .finally(() => {
          this.pending = false;
        });
    },

    async search(key) {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchDocumentsSearch", {
          key: key,
          page: this.page,
        }),
      ])
        .then((res) => {
          this.tableData = res[0].value?.data?.results;
          this.total = res[0].value?.data?.total_pages;
          if (this.searchResults?.length === 0) {
            this.isSearchResults = true;
          } else {
            this.isSearchResults = false;
          }
        })
        .finally(() => {
          this.pending = false;
        });
    },

    async category() {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchDocuments", {
          category_normative: this.filterResults.level,
        }),
      ])
        .then((res) => {
          this.tableData = res[0].value?.data?.results;
          this.total = res[0].value?.data?.total_pages;
          this.isSearchResults = this.searchResults?.length === 0;
        })
        .finally(() => {
          this.pending = false;
        });
    },
  },
};
</script>

<style lang="scss">
.el-select__wrapper{
  height:100%;
  border-radius:0 !important;
}
.filter-normative {
  .el-input__wrapper {
    border-radius: 0 !important;
  }
  .el-input {
    height: 40px !important;
    border-radius: 0 !important;
  }
}

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
