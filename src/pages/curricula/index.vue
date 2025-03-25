<template>
  <div class="container mt-[32rem] mb-[64rem]">
    <div class="grid grid-cols-12 mt-[32rem] gap-[24rem]">
      <div class="col-span-9 lg:col-span-12">
        <Page-title :title="$t('education_program')" class="mb-[32rem]" />

        <Tabs
          class="curricula"
          :active="active"
          :data="tabsData"
          @fetch-current="fetchCurrent"
        >
          <template #all>
            <el-table :data="tableData" style="width: 100%">
              <template #empty> {{ $t("no_information") }} </template>
              <el-table-column
                type="index"
                align="center"
                width="70px"
                label="№"
                :class="pending ? '_loading' : ''"
              >
              </el-table-column>
              <el-table-column align="left" :label="$t('programs')" width="260">
                <template #default="scope">
                  <div v-if="tableData && tableData.length" :class="pending ? '_loading' : ''">
                    <router-link :to="`/curricula/${tableData[scope.$index].slug}`">
                      <Icon name="skripka" />
                      {{ tableData[scope.$index]?.name }}
                    </router-link>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="left" :label="$t('faculty')" width="230px">
                <template #default="scope">
                  <div v-if="tableData && tableData.length" :class="pending ? '_loading' : ''">
                    <router-link :to="`/department/${tableData[scope.$index].faculty.slug}`">
                      {{ tableData[scope.$index].faculty?.name }}
                    </router-link>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="left" :label="$t('degree')" width="185px">
                <template #default="scope">
                  <div v-if="tableData && tableData.length" :class="pending ? '_loading' : ''">
                    {{ tableData[scope.$index].degree?.name }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" :label="$t('duration')" width="120px">
                <template #default="scope">
                  <div v-if="tableData && tableData.length" :class="pending ? '_loading' : ''">
                    {{ tableData[scope.$index].duration }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <template #bachelor>
            <el-table :data="bachelor" style="width: 100%">
              <template #empty> {{ $t("no_information") }} </template>
              <el-table-column
                type="index"
                align="center"
                width="70px"
                label="№"
                :class="pending ? '_loading' : ''"
              >
              </el-table-column>
              <el-table-column align="left" :label="$t('programs')" width="260">
                <template #default="scope">
                  <div v-if="bachelor && bachelor.length" :class="pending ? '_loading' : ''">
                    <router-link :to="`/curricula/${bachelor[scope.$index].slug}`">
                      <Icon name="skripka" />
                      {{ bachelor[scope.$index].name }}
                    </router-link>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="left" :label="$t('faculty')" width="230px">
                <template #default="scope">
                  <div v-if="bachelor && bachelor.length" :class="pending ? '_loading' : ''">
                    <router-link :to="`/department/${bachelor[scope.$index].faculty.slug}`">
                      {{ bachelor[scope.$index].faculty.name }}
                    </router-link>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="left" :label="$t('degree')" width="185px">
                <template #default="scope">
                  <div v-if="bachelor && bachelor.length" :class="pending ? '_loading' : ''">
                    {{ bachelor[scope.$index].degree.name }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" :label="$t('duration')" width="120px">
                <template #default="scope">
                  <div v-if="bachelor && bachelor.length" :class="pending ? '_loading' : ''">
                    {{ bachelor[scope.$index].duration }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <template #masters>
            <el-table :data="magister" style="width: 100%">
              <template #empty> {{ $t("no_information") }} </template>
              <el-table-column
                type="index"
                align="center"
                width="70px"
                label="№"
                :class="pending ? '_loading' : ''"
              >
              </el-table-column>
              <el-table-column align="left" :label="$t('programs')" width="260">
                <template #default="scope">
                  <div v-if="magister && magister.length" :class="pending ? '_loading' : ''">
                    <router-link :to="`/curricula/${magister[scope.$index].slug}`">
                      <Icon name="skripka" />
                      {{ magister[scope.$index].name }}
                    </router-link>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="left" :label="$t('faculty')" width="230px">
                <template #default="scope">
                  <div v-if="magister && magister.length" :class="pending ? '_loading' : ''">
                    <router-link :to="`/department/${magister[scope.$index].faculty.slug}`">
                      {{ magister[scope.$index].faculty.name }}
                    </router-link>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="left" :label="$t('degree')" width="185px">
                <template #default="scope">
                  <div v-if="magister && magister.length" :class="pending ? '_loading' : ''">
                    {{ magister[scope.$index].degree.name }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" :label="$t('duration')" width="120px">
                <template #default="scope">
                  <div v-if="magister && magister.length" :class="pending ? '_loading' : ''">
                    {{ magister[scope.$index].duration }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <template #phd>
            <el-table style="width: 100%">
              <template #empty> {{ $t("no_information") }} </template>
              <el-table-column
                type="index"
                align="center"
                width="70px"
                label="№"
                :class="pending ? '_loading' : ''"
              >
              </el-table-column>
              <el-table-column align="left" :label="$t('programs')" width="260">
                <template #default="scope">
                  <div
                    v-if="doctorantura && doctorantura.length"
                    :class="pending ? '_loading' : ''"
                  >
                    <router-link :to="`/curricula/${doctorantura[scope.$index].slug}`">
                      <Icon name="skripka" />
                      {{ doctorantura[scope.$index].name }}
                    </router-link>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="left" :label="$t('faculty')" width="230px">
                <template #default="scope">
                  <div
                    v-if="doctorantura && doctorantura.length"
                    :class="pending ? '_loading' : ''"
                  >
                    <router-link :to="`/department/${doctorantura[scope.$index].faculty.slug}`">
                      {{ doctorantura[scope.$index].faculty.name }}
                    </router-link>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="left" :label="$t('degree')" width="185px">
                <template #default="scope">
                  <div
                    v-if="doctorantura && doctorantura.length"
                    :class="pending ? '_loading' : ''"
                  >
                    {{ doctorantura[scope.$index].degree.name }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" :label="$t('duration')" width="120px">
                <template #default="scope">
                  <div
                    v-if="doctorantura && doctorantura.length"
                    :class="pending ? '_loading' : ''"
                  >
                    {{ doctorantura[scope.$index].duration }}
                  </div>
                </template>
              </el-table-column>
            </el-table>

          </template>
        </Tabs>
        <Pagination v-if="showPagination"  :activePage="page" :total="total" @current-page="page = $event"  />
      </div>
      <div class="col-span-3 lg:col-span-12 gap-[20px]">
        <side-bar :show-current-news="false" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pending: undefined,
      data: undefined,
      tableData: undefined,
      degree: this.$route.query.degree || "all",  // Default to "all"
      active: this.$route.query.degree || "all",
      doctorantura: [],
      faculty: this.$route.query.faculty || "",
      bachelor: [],
      magister: [],
      items: [],
      page: parseInt(this.$route.query.page) || 1,
      total: 1,
      tabsData: [
        {
          label: this.$t("all"),
          name: "all",
          queryName: "all",
        },
        {
          label: this.$t("bachelor"),
          name: "bachelor",
          queryName: "bachelor",
        },
        {
          label: this.$t("magister"),
          name: "masters",
          queryName: "masters",
        },
        {
          label: this.$t("doctoranture"),
          name: "phd",
          queryName: "phd",
        },
      ],
      pageChangeInProgress: false,
    };
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  async created() {
    this.pending = true;
    await this.fetchData();
  },
  watch: {
    page(newPage) {
      if (!this.pageChangeInProgress) {
        this.fetchData();
      }
    },
    degree(newDegree) {
      this.page = 1;
      this.$router.push({ ...this.$route.path, query: { page: this.page } })
      this.fetchData();
    }
  },
  computed: {
    showPagination() {
      return this.active !== "phd";
    }
  },
  methods: {
    async fetchData() {
      this.pending = true;
      try {
        const res = await this.$store.dispatch("fetchEduProgramm", {
          degree: this.degree,
          faculty: this.faculty,
          limit: 10,
          page: this.page
        });
        this.tableData = res.data?.results;
        this.bachelor = res.data.results;
        this.magister = res.data.results;
        this.doctorantura = res.data.results;
        this.total = res.data.total_pages;
      } catch (error) {
        console.error(error);
      } finally {
        this.pending = false;
        this.$store.dispatch("setSlugTitle", this.$t("education_program"));
      }
    },
    async fetchCurrent(id) {
      if (this.active !== id) {
        let temp = this.tabsData.find((item) => item.name === id);
        this.active = temp.name;
        this.degree = temp.queryName;
        this.page = this.$route.query.page;
        this.$router.push({ ...this.$route.path, query: { page: this.page } });
        await this.fetchData();
      }
    }
  }


};
</script>

<style lang="scss" scoped>
.router-link-exact-active {
  background: #2b5e9b;
  border: 1.6px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  transition: all 0.35s ease-in-out;

  i {
    position: relative;
    opacity: 1;
  }

  &:hover {
    opacity: 0.8;
  }
}
</style>
