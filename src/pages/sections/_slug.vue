<template>
  <div class="!mb-[46rem]">
    <faculty-slider-news-pr v-if="pending && !slider.length" class="container" />
    <div v-else-if="slider.length">
      <FacultySlider
        :pending="pending"
        :imgs="imgs"
        :slider-news="sliderNews"
        :faculty-name="slug?.name"
        :button-text="sliderNews[0]?.buttonText"
        :button-link="sliderNews[0]?.buttonLink"
        class="-765:mb-[150rem] -568:mb-0"
      />
    </div>
    <FacultiesGridPr v-if="pending && !news?.length" />
    <div v-if="news?.length || (events && events.length)">
      <FacultiesGrid :news="news" :events="events" :pending="pending" />
    </div>
    <div v-if="leader.length" class="relative overflow-hidden z-[1] bg-[#F5F6FA]">
      <div class="container my-[48rem] -1300:my-0 py-[60rem]">
        <div class="flex items-center justify-end -1300:!block">
          <img
            class="absolute top-[50%] w-[845rem] translate-y-[-50%] z-[-1] h-[382rem] object-cover -600:h-[300rem] object-center -1300:static -1300:w-full -1300:h-[500rem] -1300:translate-y-0"
            :src="leader[0]?.get_album?.origin || '/src/static/img/default.svg'"
            alt="department-image"
          />
        </div>
        <KafedraCard
          v-if="leader.length"
          :leader="leader[0]"
          class="z-[2] w-[628rem] -1300:w-full"
        />
        <KafedraCardPr v-else class="z-[2] w-[628rem] -1300:w-full" />

        <img
          src="../../static/img/faculties.png"
          class="absolute left-[-42rem] z-[-1] bottom-[-48rem]"
          alt="department-image"
        />
      </div>
    </div>
    <div class="mt-[20px] md:mt-[120px]">
      <LifeStylePr v-if="pending" />
      <LifeStyle
        v-else-if="
          (categoryClubs.length && categoryClubs) ||
          (categoryProjects.length && categoryProjects) ||
          (lifeStyleStudents.length && lifeStyleStudents) ||
          (scientificSchools.length && scientificSchools) ||
          (categoryFestivals.length && categoryFestivals) ||
          subjects
        "
        :our-clubs="categoryClubs"
        :projects="categoryProjects"
        :scientific-schools="scientificSchools"
        :life-style-students="lifeStyleStudents"
        :festivals="categoryFestivals"
        :subjects="tutors"
        :pending="pending"
      />
    </div>

    <div v-if="activeStudents && activeStudents.length" class="container my-[55rem]">
      <h4 class="minion not-italic mb-[28rem] font-bold text-[32rem] leading-[130%] text-[#1A2F53]">
        {{ $t("active_students") }}
      </h4>

      <div>
        <div
          v-if="false"
          class="gap-[24rem] grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
        >
          <YoungScientistsPr v-for="(item, index) in 4" :key="index" />
        </div>

        <div
          v-else
          class="gap-[24rem] grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
        >
          <YoungScientists
            v-for="item in activeStudents"
            :key="item"
            v-bind="{
              scientist: {
                id: item?.slug,
                name: item?.last_name + ' ' + item?.first_name + ' ' + item?.middle_name,
                text: item?.description,
                image: item?.get_image?.origin,
              },
              type: '1',
            }"
          />
        </div>
      </div>
    </div>
    <!-- <pre>{{ announce }}</pre>
    <announce
      v-if="announce && announce.length"
      :pending="pending"
      :announce="announce"
      class="py-[64rem]"
    /> -->
    <!--workers  -->
    <div class="mt-[48rem]">
      <div v-if="employee && employee.length" class="container -425:!p-0 mt-[38px]">
        <PageTitle :title="$t('stuffs')" />
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
              fullName: item.first_name + ' ' + item.last_name + ' ' + (item?.middle_name || ''),
              desc: item?.category?.name,
              phone: formatPhoneNumber(item.phone_number),
              mail: item?.email,
              gmail: item?.google_link,
              facebook: item?.facebook_link,
              linkedin: item?.linkedin_link,
              link: `${$route.params.id}/${item?.slug}`,
              img: item?.get_image?.origin,
            }"
          />

          <div class="hidden -425:block">
            <Splide :options="options">
              <SplideSlide v-for="(item, index) in employee" :key="index">
                <FacultyStuffs
                  v-bind="{
                    fullName:
                      item.first_name + ' ' + item.last_name + ' ' + (item?.middle_name || ''),
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
            :title="$t('all_employees')"
            :link="`/sections/${currentSlug}/stuffs`"
            custom-css="-425:p-[12rem]"
            icon-size="-425:h-[24px] -425:w-[24px]"
          />
        </div>
      </div>
    </div>
    <!--    Announcements-->
    <PageTitle :title="$t('announcements')" />
    <div
      v-if="data?.length"
      class="grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-2 gap-[24rem] mb-[24rem] container mt-[30px]"
    >
      <div v-for="(item, index) in data.slice(1)" :key="index">
        <announcements-card
          :date="item?.event_date"
          :title="item.title"
          :description="item.description"
          :slug="item.slug"
          :bg="'#fff'"
          class="!h-full"
        />
      </div>
    </div>
    <div class="flex items-center justify-center -425:justify-start container mb-[68px]">
      <VisitAll
        icon="stuffs"
        class="-425:mt-[20px] -425:w-[220px] -425:h-[48px] mt-[32px] w-[260px] h-[56px]"
        :title="$t('all_announcements')"
        :link="`/announcements`"
        custom-css="-425:p-[12rem]"
        icon-size="-425:h-[24px] -425:w-[24px]"
      />
    </div>
  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
// import Icon from "@/components/common/Icon.vue";
// import Pagination from "@/components/common/pagination.vue";
// import Nodata from "@/components/common/NoData.vue";

export default {
  components: {
    Splide,
    SplideSlide,
  },
  data() {
    return {
      data: undefined,
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
      tableData: [],
      employee: [],
      news: [],
      events: [],
      slider: [],
      currentSlug: undefined,
      pending: false,
      imgs: [],
      sliderNews: [],
      slug: undefined,
      leader: [],
      page: 1,
      total: undefined,
      announce: [],
      activeStudents: [],
      subjects: [],
      tutors: [],
      categoryProjects: undefined,
      categoryClubs: undefined,
      scientificSchools: undefined,
      lifeStyleStudents: undefined,
      categoryFestivals: undefined,
    };
  },

  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  async created() {
    this.currentSlug = this.$route.params.id;

    this.pending = true;
    await Promise.allSettled([
      //   0 slug
      this.$store.dispatch("fetchFacultiesSlug", {
        slug: this.currentSlug,
      }),
      // 1
      this.$store.dispatch("fetchEmployee", {
        faculty: this.currentSlug,
        limit: 4,
        page: 1,
        category: "",
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
      // 4 slider
      this.$store.dispatch("fetchDepartmentSlider", {
        faculty: this.currentSlug,
      }),
      // 5
      this.$store.dispatch("fetchEmployee", {
        category: "section",
        faculty: this.currentSlug,
      }),
      // 6
      this.$store.dispatch("fetchSubject", {
        category: "subject",
        limit: 5,
        page: this.page,
        faculty: this.currentSlug,
      }),
      // 7 announcements
      this.$store.dispatch("fetchPost", {
        type: "announcements",
        faculty: this.currentSlug,
        limit: 6,
        page: 1,
      }),
      // 8 employee
      this.$store.dispatch("fetchEmployee", {
        faculty: this.currentSlug,
        limit: 4,
        page: 1,
        category: "talaba",
      }),
      // 9 Loyihalar
      this.$store.dispatch("fetchFoundation", {
        category: "projects",
        faculty: this.currentSlug,
        page: this.page,
      }),
      // 10 Klublar
      this.$store.dispatch("fetchFoundation", {
        category: "clubs",
        faculty: this.currentSlug,
        page: this.page,
      }),
      // 11 Ilmiy maktablar
      this.$store.dispatch("fetchFoundation", {
        category: "ilmiy-maktablar",
        faculty: this.currentSlug,
        page: this.page,
      }),
      // 12 Faculty video
      this.$store.dispatch("fetchFacultyVideo", {
        faculty: this.currentSlug,
      }),
      // 13 festivalse
      this.$store.dispatch("fetchFoundation", {
        category: "festivals",
        faculty: this.currentSlug,
        page: this.page,
      }),
      // 14  to'garaklar
      this.$store.dispatch("fetchFoundation", {
        category: "tutors",
        faculty: this.currentSlug,
        page: this.page,
      }),
      this.$store.dispatch("fetchPost", {
        type: "announcements",
        page: this.page,
        limit: 7,
      }),
    ])
      .then((res) => {
        console.log(res);
        this.slug = res[0]?.value?.data;
        this.employee = res[1]?.value?.data?.results;
        this.news = res[2]?.value?.data?.results;
        this.events = res[3]?.value?.data?.results;
        this.slider = res[4]?.value?.data?.results;
        this.leader = res[5]?.value?.data?.results;
        this.total = res[6]?.value?.data?.total_pages;
        this.subjects = res[6]?.value?.data?.results;
        this.tutor = res[7]?.value?.data?.results;
        this.announce = res[8]?.value?.data?.results;
        this.activeStudents = res[8]?.value?.data?.results;
        this.categoryProjects = res[9]?.value?.data?.results;
        this.categoryClubs = res[10]?.value?.data?.results;
        this.scientificSchools = res[11]?.value?.data?.results;
        this.lifeStyleStudents = res[12]?.value?.data?.results;
        this.categoryFestivals = res[13]?.value?.data?.results;
        this.tutors = res[14]?.value?.data?.results;
        this.data = res[15].value.data.results;

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
        if (this.subject !== undefined) {
          for (let i = 0; i < this.subject.length; i++) {
            this.tableData.push({
              name: this.subject[i]?.name,
              duration: this.subject[i]?.hours,
              credits: this.subject[i]?.credits,
              choice: this.subject[i]?.is_required ? "Majburiy" : "Tanlov",
              actions: this.subject[i]?.files[0]?.file,
            });
          }
        }
      })
      .finally(() => {
        this.pending = false;
        this.$store.dispatch("setSlugTitle", this.slug.name);
      });
  },

  methods: {
    formatPhoneNumber(number) {
      const format = number
        ?.replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
      return `(+${format && format[1] ? format[1] : ""} ${format && format[2] ? format[2] : ""})
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
</style>
