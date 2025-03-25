<template>
  <div class="container mt-[32rem] mb-[64rem] syllabus">
    <div class="grid grid-cols-12 gap-[24rem]">
      <div class="col-span-9 lg:col-span-12 lg:order-2">
        <page-title :title="`${$route.params.id} ${$t('syllabus')}`" />
      </div>
    </div>
    <div class="grid grid-cols-12 gap-[24rem]">
      <div class="col-span-9 lg:col-span-12 lg:order-2">
        <div class="mt-[32rem] mb-[22rem]">
          <div class="flex justify-between">
            <div>
              <el-select
                v-model="filterResults.level"
                :placeholder="inputPlaceholder.selectInput"
                class="text-[15rem] -470:w-full"
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
            </div>
            <div class="relative w-[279rem]">
              <input
                v-model="filterResults.search"
                class="pr-[40px] pl-[12px] h-[44px] border-[1.6px] border-solid text-[16rem] leading-[19px] font-[500] text-[#1A2F53] placeholder:text-[#A7AFBD] border-[#E0E5EC]"
                type="search"
                :placeholder="inputPlaceholder.search"
                autocomplete="on"
              />
              <icon class="absolute top-1/2 right-[12px] -translate-y-1/2" name="header_search" />
            </div>
          </div>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <template #empty> {{ $t("no_information") }} </template>
          <el-table-column type="index" align="center" width="70px" :index="indexMethod">
            <!-- eslint-disable-next-line -->
            <template #header="column, $index"> № </template>
          </el-table-column>
          <el-table-column
            prop="name_of_subject"
            :label="$t('name_of_subject')"
            align="left"
            width="150px"
          >
            <template #default="scope">
              <div v-if="tableData && tableData.length">
                {{ tableData[scope.$index].title }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="hours" :label="$t('hours')" align="center" width="70px">
            <template #default="scope">
              <div v-if="tableData && tableData.length">
                {{ tableData[scope.$index].hours }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="credits" :label="$t('creditss')" align="center" width="100px">
            <template #default="scope">
              <div v-if="tableData && tableData.length">
                {{ tableData[scope.$index].credits }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="alternative" :label="$t('mandatory')" align="center" width="200px">
            <template #default="scope">
              <div v-if="tableData && tableData.length">
                {{ $t(tableData[scope.$index].status) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="kafedra" :label="$t('the_kafedra')" align="center" width="150">
            <template #default="scope">
              <div
                v-if="tableData && tableData.length"
                class="bg-[#E6EAF0] rounded-[2px] px-2 py-1"
              >
                {{ tableData[scope.$index].faculty.name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column width="100px" label="Amallar" align="center">
            <template #default="scope">
              <a href="" :download="tableData[scope.$index].file">
                <Icon class="download-file" name="download_gray" />
              </a>
            </template>
          </el-table-column>
        </el-table>

        <div class="mt-[32px]">
          <pagination />
        </div>
      </div>
      <div class="col-span-3 lg:col-span-12 lg:order-1 mt-[22px] flex flex-col gap-[20px]">
        <SideBar />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: undefined,
      filterResults: {
        search: "",
        level: "",
      },
      // --------------------------------
      inputPlaceholder: {
        search: this.$t("search_subject"),
      },
    };
  },

  watch: {
    "filterResults.search"(key) {
      this.getData(key);
    },

    "filterResults.level"(slug) {
      this.getData(slug);
    },
  },

  created() {
    this.getData();
    this.getDataSelect();
  },

  methods: {
    indexMethod(index) {
      return index + 1;
    },
    getData(key) {
      this.pending = true;
      Promise.allSettled([
        this.$store.dispatch("fetchProgramSyllabus", {
          slug: this.$route.params.slug,
          key: key,
          category: "study_plan",
        }),
      ])
        .then((res) => {
          this.tableData = res[0].value?.data.results;
        })
        .finally(() => {
          this.pending = false;
        });
    },
    async getDataSelect(slug) {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchFaculties", {
          category: "department",
          degree: "",
          slug: slug,
        }),
      ])
        .then((res) => {
          this.levelOptions = res[0].value.data.results;
        })
        .finally(() => {
          this.pending = false;
        });
    },
  },
};
</script>
<style lang="scss">
.el-select {
  .el-input {
    &__inner {
      background: #ffffff;
      border: 1.6px solid #e0e5ec;
      box-sizing: border-box;
      padding: 12px;
      height: 44px;
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 15rem;
      line-height: 20px;
      color: #677b9e;
      &:focus {
        box-shadow: 0 0 0 1px steelblue inset !important;
      }
    }
  }
}

.syllabus {
  .router-link-exact-active {
    background: #2b5e9b;
    border: 1.6px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;
    transition: all 0.35s ease-in-out;
    i {
      position: relative;
      opacity: 1;
    }
  }

  table {
    .download-file {
      width: 20px !important;
      height: 20px !important;
    }

    .cell {
      padding: 0 !important;
      word-break: break-word !important;
    }
  }
}
</style>
