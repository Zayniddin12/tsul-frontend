<template>
  <div class="!mb-[46rem]">
    <div class="relative container min-h-[50px]">
      <faculty-slider-news-pr v-if="pending && !slider.length" class="container" />
      <div v-else-if="slider.length">
        <FacultySlider
          :pending="pending"
          :imgs="imgs"
          :slider-news="sliderNews"
          :faculty-name="sliderNews[0]?.faculty"
          :button-text="sliderNews[0]?.buttonText"
          :button-link="sliderNews[0]?.buttonLink"
          class="-765:mb-[150rem] -568:mb-0"
        />
      </div>
      <div class="absolute container left-0 top-0 flex flex-col max-w-[326px] z-[99]">
        <div
          class="bg-[#F5F6FA] py-[14rem] pr-[14rem] pl-[28rem] w-full md:mx-auto md:!top-[-10px]"
        >
          <span class="not-italic minion font-bold text-[15rem] leading-[22rem] text-[#1A2F53]">{{
            content
          }}</span>
        </div>
        <div class="flex h-[41px] w-full">
          <router-link
            :to="`/department/${$route.params.id}/about`"
            class="w-[50%] h-full border border-[#E0E5EC] cursor-pointer group hover:bg-[#1b3d77] bg-[#2E4B7C] duration-200 flex-center text-center"
          >
            <span class="text-white text-[13rem] mx-auto">{{ $t("about_department") }}</span>
          </router-link>

          <div
            class="w-[50%] h-full border border-[#E0E5EC] cursor-pointer relative group hover:bg-[#2E4B7C] bg-[#F5F6FA] duration-200 flex-center text-center"
          >
            <ul
              class="absolute left-[100%] top-0 bg-white curricula-list w-[240px] hidden duration-200 group-hover:block z-[20]"
            >
              <li
                v-for="(item, i) in curriculaLists"
                :key="i"
                class="p-[16px] w-full border-b border-b-[#E0E5EC] duration-200 hover:bg-[#F5F6FA]"
              >
                <router-link
                  :to="`/curricula?degree=${item.queryName}&faculty=${$route.params?.id}`"
                  class="flex-center"
                >
                  <svg
                    class="flex-shrink-0 mr-[8px]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="6"
                    height="6"
                    viewBox="0 0 6 6"
                    fill="none"
                  >
                    <path d="M3 0L6 3L3 6L0 3L3 0Z" fill="#CBD3DE" />
                  </svg>
                  <span class="truncate text-[13rem] text-[#677B9E] font-semibold">{{
                    item.label
                  }}</span>
                </router-link>
              </li>
            </ul>
            <span class="text-[#1A2F53] duration-200 group-hover:text-white text-[13rem] mx-auto">{{
              $t("education_program")
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <FacultiesGridPr v-if="pending && !news?.length" />
    <div v-if="news?.length || (events && events.length)">
      <FacultiesGrid :news="news" :events="events" :pending="pending" />
    </div>
    <div v-if="leader && leader.length" class="relative overflow-hidden z-[1] bg-[#F5F6FA]">
      <div class="container my-[48rem] -1300:my-0 py-[60rem]">
        <div class="flex items-center justify-end -1300:!block">
          <div
            class="absolute top-[50%] translate-y-[-50%] z-[-1] object-cover w-[845px] h-[382px] shrink-0 -1300:translate-y-0 main__photor"
          >
            <img
              class=""
              :src="leader[0]?.get_album?.origin || '/src/static/img/default.svg'"
              alt="department-image"
            />
          </div>
        </div>

        <div class="main__photos-id">
          <KafedraCard v-if="leader.length" :leader="leader[0] ?? {}" class="z-[2]" />
          <KafedraCardPr v-else class="z-[2] !w-[628px]" />
        </div>
        <img
          src="/src/static/img/faculties.png"
          class="absolute left-[-42rem] z-[-1] bottom-[-48rem]"
          alt="department-image"
        />
      </div>
    </div>
    <!--O‘qituvchilar ro‘yxati  -->
    <div class="mt-[48rem]">
      <div v-if="employee && employee.length" class="container -425:!p-0 mt-[38px]">
        <PageTitle :title="$t('employee_of_the_department')" />

        <div
          v-if="false"
          class="grid grid-cols-2 -856:grid-cols-1 mt-[56px] gap-x-[24px] gap-y-[56px]"
        >
          <FacultyStuffsPr v-for="(item, index) in 5" :key="index" class="" />
        </div>

        <div v-else class="grid grid-cols-2 -856:grid-cols-1 mt-[56px] gap-x-[24px] gap-y-[56px]">
          <FacultyStuffs
            v-for="(item, index) in employee"
            :key="index"
            class="-425:hidden"
            v-bind="{
              fullName: item?.first_name + ' ' + item?.last_name + ' ' + (item?.middle_name || ''),
              desc: item?.category?.name,
              phone: formatPhoneNumber(item?.phone_number),
              mail: item?.email,
              gmail: item?.google_link,
              facebook: item?.facebook_link,
              linkedin: item?.linkedin_link,
              telegram: item?.telegram_link,
              instagram: item?.instagram_link,
              twitter: item?.twitter_link,
              link: `/department/${$route.params.id}/${item.slug}`,
              img: item?.get_image?.origin,
            }"
          />

          <div class="hidden -425:block">
            <Splide :options="options">
              <SplideSlide v-for="(item, index) in employee" :key="index">
                <FacultyStuffs
                  v-bind="{
                    fullName:
                      item?.first_name + ' ' + item?.last_name + ' ' + (item?.middle_name || ''),
                    desc: item?.category?.name,
                    phone: item?.phone_number,
                    mail: item?.email,
                    gmail: item?.google_link,
                    facebook: item?.facebook_link,
                    linkedin: item?.linkedin_link,
                    link: '/scientist/' + item?.slug,
                    img: item?.get_image?.origin,
                    slider: true,
                  }"
                />
              </SplideSlide>
            </Splide>
          </div>
        </div>
        <div class="flex items-center justify-center -425:justify-start container mb-[68px]">
          <VisitAll
            icon="stuffs"
            class="-425:mt-[20px] -425:w-[220px] -425:h-[48px] mt-[32px] w-[260px] h-[56px]"
            :title="$t('all_employee')"
            :link="`/department/${currentSlug}/departmentStaff`"
            custom-css="-425:p-[12rem]"
            icon-size="-425:h-[24px] -425:w-[24px]"
          />
        </div>
      </div>
    </div>
    <!-- O'qitiladigan fanlar -->
    <div>
      <div v-if="subject && subject.length" class="bg-[#F5F6FA] py-[48rem]">
        <div class="container">
          <page-title class="mb-[32rem]" :title="$t('subjects_taught')" />
          <div v-if="pending" class="grid grid-cols-4 sm:grid-cols-1 xl:grid-cols-2 gap-[24rem]">
            <div v-for="item in 4" :key="item">
              <subjects-card-pr />
            </div>
          </div>
          <div v-else class="table-kafedra">
            <el-table border :data="tableData" style="width: 100%">
              <template #empty> {{ $t("no_information") }} </template>
              <el-table-column align="center" label="№" width="30px">
                <template #default="scope">
                  <span>{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" :label="$t('name_of_subject')" width="100%">
                <template #default="scope">
                  <router-link :to="`/universitysubjects/${scope?.row.slug}`">{{
                    scope.row.name
                  }}</router-link>
                </template>
              </el-table-column>
              <el-table-column
                v-for="(item, index) in columns"
                :key="index"
                width="50px"
                :align="item.align"
                :prop="item.prop"
                :label="item.label"
                :row-class-name="item.class"
              />
              <el-table-column align="center" :label="$t('actions')" width="50px">
                <template #default="scope">
                  <a
                    :href="tableData[scope.$index].actions"
                    download
                    target="_blank"
                    class="hover:opacity-[0.7] transition cursor-pointer"
                  >
                    <Icon name="downloadIcon" />
                  </a>
                </template>
              </el-table-column>
            </el-table>
            <Pagination
              class="mt-[32rem] pagination-kafedra"
              :total="total"
              @current-page="subjectPage = $event"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Kafedra qoshidagi to‘garaklar va ilmiy maktablar ro‘yxati -->
    <div v-if="tutor?.length" class="container py-[48rem]">
      <page-title class="mb-[32rem]" :title="$t('list_of_clubs_department')" />
      <Splide :options="options2" class="life-style__carousel scientific-schools-slider">
        <SplideSlide v-for="(item, index) in tutor" :key="index">
          <router-link :to="`/org/tutors/${item?.slug}`">
            <scientific-schools
              :slug="item?.slug"
              :title="item?.name"
              :teacher="
                item?.head?.first_name + ' ' + item?.head?.last_name + ' ' + item?.head?.middle_name
              "
              :full-name="item?.fullName"
            />
          </router-link>
        </SplideSlide>
      </Splide>
      <div
        v-if="tutor.length"
        class="flex items-center justify-center -425:justify-start container"
      >
        <VisitAll
          icon="notif"
          class="-425:mt-[20px] -425:w-[220px] -425:h-[48px] mt-[32px] w-[260px] h-[56px]"
          :title="$t('all_additional_lessons')"
          link="/org/tutors"
          custom-css="-425:p-[12rem]"
          icon-size="-425:h-[24px] -425:w-[24px]"
        />
      </div>
    </div>

    <div v-else-if="!pending && !tutor?.length">
      <Nodata />
    </div>
  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import Icon from "@/components/common/Icon.vue";
import Pagination from "@/components/common/pagination.vue";
import Nodata from "@/components/common/NoData.vue";
import { mapState } from "vuex";

export default {
  components: {
    Splide,
    SplideSlide,
    Icon,
    Pagination,
    Nodata,
  },
  data() {
    return {
      curriculaLists: [
        {
          label: this.$t("all"),
          queryName: "",
        },
        {
          label: this.$t("bachelor"),
          queryName: "bachelor",
        },
        {
          label: this.$t("magister"),
          queryName: "masters",
        },
        {
          label: this.$t("doctoranture"),
          queryName: "phd",
        },
      ],
      options: {
        perPage: 1,
        perMove: 3,
        arrows: false,
        pagination: false,
        // type: "loop",
        rewind: true,
        breakpoints: {},
      },
      options2: {
        rewind: true,
        gap: "19px",
        perPage: 3,
        perMove: 1,
        arrows: true,
        arrowPath:
          "M13.3334 8L11.4534 9.88L17.56 16L11.4534 22.12L13.3334 24L21.3334 16L13.3334 8Z",
        pagination: false,
        // type: "loop",
        breakpoints: {
          1120: {
            perPage: 2,
            perMove: 1,
          },
          860: {
            perPage: 2,
            perMove: 1,
          },
          600: {
            perPage: 1,
            perMove: 1,
          },
        },
      },
      columns: [
        {
          prop: "duration",
          label: this.$t("hours"),
          align: "center",
          width: "75px",
          class: "line-clamp-1",
        },
        {
          prop: "credits",
          label: this.$t("creditss"),
          align: "center",
          width: "75px",
          class: "line-clamp-1",
        },
        {
          prop: "choice",
          label: this.$t("mandatory"),
          align: "center",
          width: "75px",
          class: "line-clamp-1",
        },
      ],
      announce: [],
      tableData: [],
      employee: [],
      news: [],
      events: [],
      slider: [],
      currentSlug: undefined,
      currentId: undefined,
      pending: false,
      imgs: [],
      sliderNews: [],
      slug: undefined,
      leader: [],
      tutor: [],
      page: 1,
      subjectPage: 1,
      total: undefined,
      education: [],
      content: "",
    };
  },
  computed: {
    ...mapState({
      subject: (state) => state.subject.subject,
    }),
  },
  watch: {
    subjectPage() {
      this.$store
        .dispatch("fetchSubject", {
          category: "subject",
          limit: 5,
          page: this.subjectPage,
          faculty: this.$route.params?.id,
        })
        .then((res) => {
          this.tableData = [];
          if (res.data.results && res.data.results.length) {
            for (let i = 0; i < this.subject.length; i++) {
              this.tableData.push({
                name: this.subject[i]?.name,
                duration: this.subject[i]?.hours,
                slug: this.subject[i]?.slug,
                credits: this.subject[i]?.credits,
                choice: this.subject[i]?.is_required ? "Majburiy" : "Tanlov",
                actions: this.subject[i]?.files[0]?.file,
              });
            }
          }
        });

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  async created() {
    this.pending = true;
    this.currentSlug = this.$route.params.id;
    await Promise.allSettled([
      // 0
      this.$store.dispatch("fetchFacultiesSlug", {
        slug: this.$route.params.id,
      }),
      // 1
      this.$store.dispatch("fetchEmployee", {
        faculty: this.$route.params.id,
        limit: 4,
        page: 1,
      }),
      // 2
      this.$store.dispatch("fetchPost", {
        type: "news",
        limit: 4,
        page: 1,
        faculty: this.currentSlug,
      }),
      // 3
      this.$store.dispatch("fetchPost", {
        type: "event",
        limit: 3,
        page: 1,
        faculty: this.currentSlug,
      }),
      // 4
      this.$store.dispatch("fetchDepartmentSlider", {
        faculty: this.currentSlug,
      }),
      // 5

      this.$store.dispatch("fetchEmployee", {
        category: "head-of-department",
        faculty: this.$route.params?.id,
      }),

      // 6
      this.$store.dispatch("fetchSubject", {
        limit: 5,
        page: this.subjectPage,
        faculty: this.$route.params?.id,
        kafedra: this.$route.params?.id,
      }),
      // 7
      this.$store.dispatch("fetchFoundationSingle", {
        categories: "tutors,ilmiy-maktablar",
        faculty: this.$route.params.id,
        limit: 6,
        page: 1,
      }),
      // 8
      this.$store.dispatch("fetchPost", {
        type: "event",
        limit: 3,
        page: 1,
        faculty: this.currentSlug,
      }),
    ])
      .then((res) => {
        this.$store.dispatch("setSlugTitle", res[0]?.value?.data.name);
        this.currentId = this.slug?.id;
        this.content = res[0]?.value?.data?.name;
        this.employee = res[1]?.value?.data?.results;
        this.news = res[2]?.value?.data?.results;
        this.events = res[3]?.value?.data?.results;
        this.slider = res[4]?.value?.data?.results;
        this.leader = res[5]?.value?.data?.results;
        this.subject = res[6]?.value?.data?.results;
        this.total = res[6]?.value?.data?.total_pages;
        this.tutor = res[7]?.value?.data?.results;
        this.announce = res[8]?.value?.data?.results;
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
              faculty: this.slider[i].faculty.name,
            });
          }
        }
        if (this.subject !== undefined) {
          for (let i = 0; i < this.subject.length; i++) {
            this.tableData.push({
              name: this.subject[i]?.name,
              duration: this.subject[i]?.hours,
              slug: this.subject[i]?.slug,
              credits: this.subject[i]?.credits,
              choice: this.subject[i]?.is_required ? "Majburiy" : "Tanlov",
              actions: this.subject[i]?.files[0]?.file,
            });
          }
        }
      })
      .finally(() => {
        this.pending = false;
      });
  },

  methods: {
    formatPhoneNumber(number) {
      const format = number
        ?.replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
      return `+${format && format[1] ? format[1] : ""} (${format && format[2] ? format[2] : ""})
          ${format && format[3] ? format[3] : ""}-${format && format[4] ? format[4] : ""}-${
        format && format[5] ? format[5] : ""
      }`;
    },
  },
};
</script>

<style lang="scss">
.scientific-schools-slider {
  .splide__arrow--prev {
    left: -15px;
  }

  .splide__arrow--next {
    right: -15px;
  }
}

.pagination-kafedra {
  .btn-prev {
    background: transparent is-first;
  }
  .btn-next {
    background: transparent !important;
  }
  .is-first {
    background: transparent !important;
  }
  .is-last {
    background: transparent !important;
  }

  .active {
    background: #fff !important;
    border: 1.6px solid #e0e5ec;
  }
  .number {
    :focus-visible {
      background: #fff !important;
      border: 1.6px solid #e0e5ec;
    }
  }
}

.table-kafedra {
  .el-table--border .el-table__cell {
    border-right: none !important;
  }
  tr {
    border: 1.6px solid red !important;
  }

  tr:nth-child(even) {
    background: #fff;
  }
  tr:nth-child(odd) {
    background: #f5f6fa;
  }
}
.main__photos-id {
  width: 628px;
}
@media screen and (max-width: 1280px) {
  .main__photos-id {
    width: 100% !important;
    position: relative;
    z-index: 2;
  }
  .main__photor {
    position: static !important;
    transform: translateY(50px) !important;
    z-index: 1;
    top: 0 !important;
    max-width: 200px;
    width: 100%;
    height: 100%;
  }
}
</style>
