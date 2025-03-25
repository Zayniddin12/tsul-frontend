<template>
  <div class="!mb-[46rem] bg-[#F5F6FA]">
    <div class="relative container pb-[5%]">
      <div class="absolute container left-0 top-0 flex flex-col max-w-[326px] z-[99]">
        <div class="bg-[#F5F6FA] p-[12px] w-full md:mx-auto">
          <div
            class="not-italic minion font-bold mx-auto text-center w-full text-[18rem] leading-[22rem] text-[#1A2F53]"
          >
            {{ content }}
          </div>
        </div>
        <div class="flex h-[41px] w-full">
          <router-link
            :to="`/department/${$route.params.id}/about`"
            class="w-full h-full border border-[#E0E5EC] cursor-pointer group hover:bg-[#1b3d77] bg-[#2E4B7C] duration-200 flex-center text-center"
          >
            <span class="text-white text-[13rem] mx-auto">{{ $t("about_centers") }}</span>
          </router-link>
        </div>
      </div>
    </div>
    <faculty-slider-news-pr v-if="pending && !slider.length" class="container" />
    <div v-else-if="slider.length">
      <FacultySlider
        :pending="pending"
        :imgs="imgs"
        :slider-news="sliderNews"
        :faculty-name="slug?.name"
        :button-text="sliderNews[0]?.buttonText"
        :button-link="sliderNews[0]?.buttonLink"
        :education="education"
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

    <!--    tabs-->
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
        :subjects="subjects"
        :pending="pending"
      />
    </div>
    <div v-if="!pending && activeStudents?.length" class="container my-[55rem]">
      <h4 class="minion not-italic mb-[28rem] font-bold text-[32rem] leading-[130%] text-[#1A2F53]">
        {{ $t("active_students") }}
      </h4>

      <div>
        <div
          v-if="pending"
          class="gap-[24rem] grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
        >
          <YoungScientistsPr v-for="(item, index) in 4" :key="index" />
        </div>

        <div class="gap-[24rem] grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
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
              type: '0',
            }"
          />
        </div>
      </div>

      <NoData v-if="!pending && !activeStudents.length" />
    </div>

    <!-- <pre>{{ announce }}</pre> -->
    <announce
      v-if="announce && announce.length"
      :pending="pending"
      :announce="announce"
      class="py-[64rem]"
    />
    <div v-if="employee.length" class="bg-[#1A2F53] py-[22px]">
      <div class="container">
        <profile-info-pr
          v-if="pending"
          v-bind="{
            type: 4,
            profile: {
              image: 'https://picsum.photos/1000/1000/',
              name: 'Raxmatov Sanjar',
              work: 'Html Developer',
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              time: '09:00 - 18:00',
              phone: '+99897-9-9-9-9-9-9',
              email: 'www@gmail.com',
              facebook: '#',
              linkedin: '#',
              google: '#',
            },
          }"
        />
        <template v-else>
          <profile-info
            :key="routeID"
            v-bind="{
              type: 4,
              profile: {
                quote: employee[0]?.quote,
                image: employee[0]?.get_album?.origin,
                name: `${employee[0]?.last_name} ${employee[0]?.first_name} ${
                  employee[0]?.middle_name ?? ''
                }`,
                work: employee[0]?.work,
                description: employee[0]?.duty,
                time: employee[0]?.work_date,
                phone: employee[0]?.phone_number,
                email: employee[0]?.email,
                facebook: employee[0]?.facebook_link,
                linkedin: employee[0]?.linkedin_link,
                google: employee[0]?.google_link,
                instagram: employee[0]?.instagram_link,
                twitter: employee[0]?.twitter_link,
                telegram: employee[0]?.telegram_link,
              },
            }"
          />
        </template>
        <div class="max-w-[846px] mx-auto mt-[32px] px-[15px] -540:px-0 -540:mt-[12px]">
          <info-tabs
            v-bind="{
              inShort: posts?.biography,
              functions: posts?.duty,
              pending: pending,
              education: education,
              careera: careera,
              career: [
                {
                  title: posts?.description,
                  children: [
                    {
                      text: posts?.careers[0]?.content,
                      year: posts?.careers[0]?.years,
                    },
                    {
                      year: posts?.careers[0]?.years,
                      text: posts?.careers[0]?.content,
                    },
                  ],
                },
              ],
              scentificWorks: works,
              articles: articles,
              activeTab: 'inShort',
            }"
            @load-more-works="loadMoreWorks"
            @load-more-videos="loadMoreVideos"
          />
          <!-- Tabs end -->
          <div
            v-if="$route.query?.category == '001'"
            class="bg-[#1B2F53] relative p-[24px] mt-[60px] flex -768:!flex-col items-center gap-[50px]"
          >
            <img
              src="/logo.svg"
              class="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3"
              alt=""
            />
            <img src="/rektorga-murojat.svg" alt="" />
            <div>
              <h2 class="text-[32px] text-white font-minion font-bold">Rektorga murojaat</h2>
              <p class="text-[15px] text-white/60 py-[20px]">
                Sizda hal qilinmagan savollaringiz, muammolaringiz, bayonotlaringiz,
                shikoyatlaringiz yoki takliflaringiz bormi? Bunday holda siz Toshkent davlat yuridik
                universiteti rektori bilan bevosita ikki yo'l bilan bog'lanishingiz mumkin: telefon
                orqali yoki yozma so'rov shaklida.
              </p>
              <router-link
                to="/management/prorektor-apply"
                class="learn-more-buttons text-[#1A2F53] text-[15rem] font-medium max-w-[185px] !py-[10px] h-[40px] -460:mt-[15px]"
              >
                <p>Murojaat qilish</p>
                <Icon name="arrow_right_button" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";

export default {
  components: {
    Splide,
    SplideSlide,
  },
  data() {
    return {
      content: "",
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
          prop: "name",
          label: "Fan nomi",
          align: "left",
          width: "150px",
          class: "line-clamp-1",
        },
        {
          prop: "duration",
          label: "Soatlar",
          align: "left",
          width: "52px",
          class: "line-clamp-1",
        },
        {
          prop: "credits",
          label: "Kreditlar",
          align: "center",
          width: "62px",
          class: "line-clamp-1",
        },
        {
          prop: "choice",
          label: "Majburiy yoki tanlov",
          align: "center",
          width: "144px",
          class: "line-clamp-1",
        },
      ],
      activeStudents: [],
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
      education: [],
      announce: [],
      subjects: [],
      categoryProjects: [],
      categoryClubs: [],
      scientificSchools: [],
      lifeStyleStudents: [],
      categoryFestivals: [],
    };
  },

  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  async created() {
    this.currentSlug = this.$route.params.id;

    this.pending = true;
    await Promise.allSettled([
      // 0
      this.$store.dispatch("fetchFacultiesSlug", {
        slug: this.currentSlug,
      }),
      // 1
      this.$store.dispatch("fetchEmployee", {
        faculty: this.currentSlug,
        limit: 4,
        page: 1,
        category: "dekan-orinbosari",
      }),
      // 2
      this.$store.dispatch("fetchEducationalProgramme", {
        faculty: this.currentSlug,
      }),
      // 3
      this.$store.dispatch("fetchPost", {
        type: "news",
        limit: 4,
        page: 1,
        faculty: this.currentSlug,
      }),
      // 4
      this.$store.dispatch("fetchPost", {
        type: "event",
        limit: 3,
        page: 1,
        faculty: this.currentSlug,
      }),
      // 5
      this.$store.dispatch("fetchDepartmentSlider", {
        faculty: this.currentSlug,
      }),
      // 6
      this.$store.dispatch("fetchEmployee", {
        category: "center",
        faculty: this.currentSlug,
      }),
      // 7
      this.$store.dispatch("fetchSubject", {
        category: "subject",
        limit: 5,
        page: this.page,
        faculty: this.currentSlug,
      }),
      // 8
      this.$store.dispatch("fetchPost", {
        type: "announcements",
        faculty: this.currentSlug,
        limit: 6,
        page: 1,
      }),
      // 9
      this.$store.dispatch("fetchEmployee", {
        faculty: this.currentSlug,
        limit: 4,
        page: 1,
        category: "talaba",
      }),

      // 10 Loyihalar
      this.$store.dispatch("fetchFoundation", {
        category: "projects",
        faculty: this.currentSlug,
        page: this.page,
      }),
      // 11 Klublar
      this.$store.dispatch("fetchFoundation", {
        category: "clubs",
        faculty: this.currentSlug,
        page: this.page,
      }),
      // 12 Ilmiy maktablar
      this.$store.dispatch("fetchFoundation", {
        category: "ilmiy-maktablar",
        page: this.page,
        faculty: this.currentSlug,
      }),
      // 13 Faculty video
      this.$store.dispatch("fetchFacultyVideo", {
        faculty: this.currentSlug,
      }),
      // 14 festivalse
      this.$store.dispatch("fetchFoundation", {
        category: "festivals",
        faculty: this.currentSlug,
        page: this.page,
      }),
      // 15  to'garaklar
      this.$store.dispatch("fetchFoundation", {
        category: "tutors",
        faculty: this.currentSlug,
        page: this.page,
      }),
      this.$store.dispatch("fetchEmployee", {
        faculty: this.currentSlug,
        limit: 5,
        page: 1,
        category: "talaba",
      }),
    ])
      .then((res) => {
        this.content = res[0]?.value?.data?.name;
        this.slug = res[0]?.value?.data;
        this.employee = res[1]?.value?.data?.results;
        this.news = res[3]?.value?.data?.results;
        this.events = res[4]?.value?.data?.results;
        this.slider = res[5]?.value?.data?.results;
        this.leader = res[6]?.value?.data?.results;
        this.subject = res[7]?.value?.data?.results;
        this.total = res[7]?.value?.data?.total_pages;
        // this.tutor = res[7]?.value?.data?.results;
        this.announce = res[8]?.value?.data?.results;
        this.activeStudents = res[9]?.value?.data?.results;
        this.categoryProjects = res[10]?.value?.data?.results;
        this.categoryClubs = res[11]?.value?.data?.results;
        this.scientificSchools = res[12]?.value?.data?.results;
        this.lifeStyleStudents = res[13]?.value?.data?.results;
        this.categoryFestivals = res[14]?.value?.data?.results;
        this.subjects = res[15]?.value?.data?.results;

        if (this.slider !== undefined) {
          for (let i = 0; i < this.slider.length; i++) {
            if (this.slider[i]?.get_image?.middle) {
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
