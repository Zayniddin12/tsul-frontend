<template>
  <div class="!mb-[46rem] container">
    <div class="py-[32rem]">
      <div v-if="pending" class="grid grid-cols-4 sm:grid-cols-1 xl:grid-cols-2 gap-[24rem]">
        <div v-for="item in 4" :key="item">
          <subjects-card-pr />
        </div>
      </div>
      <div v-else class="table-kafedra grid grid-cols-12 gap-[24px]">
        <div class="col-span-9 lg:col-span-12">
          <page-title class="mb-[32rem]" :title="$t('subjects_taught')" />
          <Form-input
            :filterResults="filterResults"
            :input-placeholder="inputPlaceholder"
            :level-options="facultyShort"
            class="mb-[20px] !flex-row-reverse !ml-0"
          />
          <el-table
            v-if="subject && subject.length"
            :key="subject.length"
            border
            :data="tableData"
            style="width: 100%"
          >
            <template #empty> {{ $t("no_information") }} </template>
            <el-table-column align="center" label="№" width="40px">
              <template #default="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" :label="$t('name_of_subject')" width="130px">
              <template #default="scope">
                <router-link :to="`/universitysubjects/${scope?.row.slug}`">{{
                  scope.row.name
                }}</router-link>
              </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('department_kafedra')" width="200px">
              <template #default="scope">
                {{ scope?.row.faculty }}
              </template>
            </el-table-column>
            <el-table-column
              v-for="(item, index) in columns"
              :key="index"
              width="100px"
              :align="item.align"
              :prop="item.prop"
              :label="item.label"
              :row-class-name="item.class"
            />
            <el-table-column align="center" :label="$t('actions')" width="85px">
              <template #default="scope">
                <a
                  v-if="scope?.row?.actions"
                  class="hover:opacity-[0.7] transition"
                  :href="scope?.row?.actions"
                  target="_blank"
                  download
                >
                  <Icon name="downloadIcon" />
                </a>
              </template>
            </el-table-column>
          </el-table>

          <div v-else>
            <div class="min-h-[400rem] flex items-center justify-center">
              <div>
                <div class="flex items-center justify-center">
                  <icon name="noData" class="mb-[24rem]" />
                </div>
                <h5
                  class="mb-[8rem] minion not-italic font-bold text-[32rem] leading-[130%] text-center text-[#677B9E]"
                >
                  {{ $t("no_information") }}
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-3 lg:col-span-12">
          <SideBar />
        </div>
        <Pagination
          class="mt-[32rem] pagination-kafedra"
          :total="total"
          @current-page="page = $event"
        />
      </div>
    </div>
  </div>

  <div class="h-auto mb-[80px] container">
    <NewsCarousel
      :title="$t('news')"
      :btn-text="$t('all_news')"
      link="/news"
      :pending="pending"
      :list="news"
      height="250rem"
    />
  </div>
</template>

<script>
import { debounce } from "~/helpers/globals";
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      pending: false,
      tableData: [],
      news: [],
      inputPlaceholder: {
        selectInput: this.$t("department"),
        group: this.$t("course"),
        search: this.$t("science_search"),
        name: this.$t("all_faculties"),
      },
      levelOptions: undefined,
      filterResults: {
        level: "",
        course: "",
        search: "",
      },
      columns: [
        {
          prop: "duration",
          label: this.$t("hours"),
          align: "center",
          width: "52px",
          class: "line-clamp-1",
        },
        {
          prop: "credits",
          label: this.$t("creditss"),
          align: "center",
          width: "62px",
          class: "line-clamp-1",
        },
        {
          prop: "choice",
          label: this.$t("mandatory"),
          align: "center",
          width: "144px",
          class: "line-clamp-1",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      facultyShort: (state) => state.subject.facultyShort,
      subject: (state) => state.subject.subject,
    }),
  },
  watch: {
    filterResults: {
      handler() {
        debounce(
          "filterWorks",
          () => this.getData(this.filterResults.search, this.filterResults.level),
          500
        );
      },
      deep: true,
    },
  },
  mounted() {
    this.getData();
  },
  async created() {
    this.currentSlug = this.$route.params.id;

    this.pending = true;
    await Promise.allSettled([
      this.$store.dispatch("fetchSubject", {
        limit: 5,
        page: this.page,
        faculty: this.currentId,
      }),
      this.$store.dispatch("fetchPost", {
        type: "news",
        limit: 8,
      }),
      this.$store.dispatch("fetchFacultyShort", {
        type: "short",
        category: "department",
      }),
    ])
      .then((res) => {
        this.slug = res[0]?.value?.data;
        this.subject = res[6]?.value?.data?.results;
        this.news = res[1].value?.data?.results;
        if (this.slider !== undefined) {
          for (let i = 0; i < this.slider.length; i++) {
            if (this.slider[i]?.get_image?.origin) {
              this.imgs.push(this.slider[i]?.get_image?.origin);
            }
            this.sliderNews.push({
              title: this.slider[i].title,
              description: this.slider[i].description,
              status: this.slider[i].tag,
              slug: this.slider[i].slug,
              buttonText: this.slider[i].button_text,
              buttonLink: this.slider[i].button_link,
            });
          }
        }
      })
      .finally(() => {
        this.pending = false;
        this.$store.dispatch("setSlugTitle", this.$t("subjects_taught"));
      });
  },
  methods: {
    getData(search, faculty) {
      this.$store
        .dispatch("fetchSubject", { category: "subject", search, faculty })
        .then((res) => {
          this.tableData = [];
          this.subject = res?.data?.results;
          if (this.subject?.length) {
            for (let i = 0; i < this.subject.length; i++) {
              this.tableData.push({
                name: this.subject[i]?.name,
                duration: this.subject[i]?.hours,
                slug: this.subject[i]?.slug,
                credits: this.subject[i]?.credits,
                choice: this.subject[i]?.is_required ? this.$t("Mandatory") : this.$t("selection"),
                actions: this.subject[i]?.files[0]?.file,
                faculty: this.subject[i]?.faculty?.name,
              });
            }
          }
        })
        .then((res) => {
          this.levelOptions = res;
        });
    },
  },
};
</script>
<style></style>
