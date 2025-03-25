<template>
  <div class="">
<!--    <div class="relative container pb-[5%]">-->
<!--      <div class="absolute container left-0 top-0 flex flex-col max-w-[326px] z-[99]">-->
<!--        <div class="bg-[#F5F6FA] p-[12px] w-full md:mx-auto">-->
<!--          <div-->
<!--            class="not-italic minion font-bold mx-auto text-center w-full text-[18rem] leading-[22rem] text-[#1A2F53]"-->
<!--          >-->
<!--            {{ content }}-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="flex h-[41px] w-full">-->
<!--          <router-link-->
<!--            :to="`/department/${$route.params.id}/about`"-->
<!--            class="w-full h-full border border-[#E0E5EC] cursor-pointer group hover:bg-[#1b3d77] bg-[#2E4B7C] duration-200 flex-center text-center"-->
<!--          >-->
<!--            <span class="text-white text-[13rem] mx-auto">{{ $t("about_faculties") }}</span>-->
<!--          </router-link>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div class="relative container min-h-[50px] mb-[40px]">
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
    <faculty-slider-news-pr v-if="pending && !slider.length" class="container" />

    <div v-else-if="slider.length">
      <FacultySlider
        :pending="pending"
        :button-text="sliderNews[0]?.buttonText"
        :button-link="sliderNews[0]?.buttonLink"
        :imgs="imgs"
        :slider-news="sliderNews"
        :faculty-name="sliderNews[0]?.faculty"
        :education="education"
        class="-765:mb-[150rem] -568:mb-0"
      />
    </div>
    <FacultiesGridPr v-if="pending && !news?.length" />
    <div v-if="news?.length && events?.length">
      <FacultiesGrid :news="news" :events="events" :pending="pending" />
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
          (subjects.length && subjects)
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

    <announce
      v-if="announce && announce.length"
      :pending="pending"
      :announce="announce"
      class="py-[64rem]"
    />

    <div
      v-if="international_position || students_number || professors_number || scientific_potential"
      class="bg-[#F5F6FA]"
    >
      <div class="pt-[48px] container pb-[64px]">
        <PageTitle class="mb-[24px]" :title="$t('international_law_policy')" />
        <div class="grid grid-cols-4 gap-[24px] -1068:grid-cols-3 -855:grid-cols-2">
          <FacultyStatic
            v-bind="{
              icon: 'gratis',
              count: international_position,
              desc: `${$t('international_degree')}`,
              color: 'transparent',
              pending: pending,
            }"
          />
          <FacultyStatic
            v-bind="{
              icon: 'bok',
              count: students_number,
              desc: `${$t('number_of_students_studying')}`,
              color: 'transparent',
              pending: pending,
            }"
          />
          <FacultyStatic
            v-bind="{
              icon: 'persons',
              count: professors_number,
              desc: `${$t('doctor_prof_employee')}`,
              color: 'transparent',
              pending: pending,
            }"
          />
          <FacultyStatic
            v-bind="{
              icon: 'hat',
              count: scientific_potential,
              desc: `${$t('scientific_potential')}`,
              color: 'transparent',
              pending: pending,
            }"
          />
        </div>
      </div>
    </div>
    <div v-if="dean && dean.length" class="relative z-[1] pt-[64rem] bg-[#1A2F53]">
      <div class="container pb-[92rem]">
        <div class="flex justify-end -1300:block">
          <img
            class="absolute w-[954rem] top-[74px] z-[-1] h-[438rem] object-cover object-center -1300:static -1300:w-full"
            :src="dean[0]?.get_image?.origin"
            alt="faculties-image"
          />
        </div>
        <BusinessCardPr v-if="pending" class="z-[2] mt-[40px] -1300:w-full -1300:mt-[-80rem]" />
        <BusinessCard
          v-else
          :dean="dean[0]"
          class="z-[2] mt-[40px] -1300:w-full -1300:mt-[-80rem]"
        />
        <div class="flex justify-end -556:justify-center">
          <div class="overflow-hidden">
            <p
              v-if="pending"
              class="not-italic minion mt-[88rem] -1300:mt-[44rem] -1000:mt-[50rem] -612:mt-[70rem] w-[954rem] -1300:text-right -556:text-center font-bold text-[32rem] -600:text-[25rem] text-white"
            >
              <!-- need to translate -->
              <span class="!w-full _loading"
                >“Yoshlarni o‘qishdan tashqari majburiy mehnatga jalb qilgan rahbarni</span
              >
              <span class="!w-full _loading">shaxsan o‘zim vakolatidan ozod qilaman”</span>
            </p>
          </div>
        </div>
        <div class="relative flex justify-end -556:justify-center">
          <p
            class="not-italic minion mt-[88rem] -1300:mt-[44rem] -1000:mt-[50rem] -612:mt-[70rem] w-[954rem] -1300:text-right -556:text-center font-bold text-[32rem] -600:text-[25rem] text-white"
            v-html="dean[0].quote"
          ></p>
          <div class="opacity-[0.3] absolute bottom-[-10px] left-[150px] -1300:left-0">
            <img src="@/static/img/quote.png" class="" alt="quote-image" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="employee && employee.length" class="container -425:!p-0 mt-[38px] !mb-[46px]">
      <PageTitle :title="$t('faculty_staff')" />
      <div
        v-if="false"
        class="grid grid-cols-2 -856:grid-cols-1 mt-[56px] gap-x-[24px] gap-y-[56px]"
      >
        <FacultyStuffsPr
          v-for="(item, index) in 5"
          :key="index"
          class="-425:hidden"
          v-bind="{
            fullName: 'ASADBEK ESHBOEV SHAVKATOVICH',
            desc: 'Toshkent davlat yuridik universitetining moliya-iqtisod ishlari bo‘yicha prorektori vazifasini bajaruvchi',
            phone: '(+998 99) 022-24-13',
            mail: 'a.eshboev@tsul.uz',
            gmail: 'https://google.com',
            facebook: 'https://google.com',
            linkedin: 'https://google.com',
            link: '/',
            img: '',
          }"
        />

        <div class="hidden -425:block">
          <Splide :options="options">
            <SplideSlide v-for="(item, index) in 10" :key="index">
              <FacultyStuffsPr
                v-bind="{
                  fullName: 'ASADBEK ESHBOEV SHAVKATOVICH',
                  desc: 'Toshkent davlat yuridik universitetining moliya-iqtisod ishlari bo‘yicha prorektori vazifasini bajaruvchi',
                  phone: '(+998 99) 022-24-13',
                  mail: 'a.eshboev@tsul.uz',
                  gmail: 'https://google.com',
                  facebook: 'https://google.com',
                  linkedin: 'https://google.com',
                  link: '/',
                  img: '',
                }"
              />
            </SplideSlide>
          </Splide>
        </div>
      </div>
      <div v-else class="grid grid-cols-2 -856:grid-cols-1 mt-[56px] gap-x-[24px] gap-y-[56px]">
        <FacultyStuffs
          v-for="(item, index) in employee"
          :key="index"
          class="-425:hidden"
          v-bind="{
            fullName: getFullName(item),
            desc: item?.category?.name,
            phone: item?.phone_number,
            mail: item?.email,
            gmail: item?.google_link,
            facebook: item?.facebook_link,
            linkedin: item?.linkedin_link,
            link: `/faculties/${$route.params?.id}/${item?.slug}`,
            img: item?.get_image?.origin,
          }"
        />

        <div class="hidden -425:block">
          <Splide :options="options">
            <SplideSlide v-for="(item, index) in employee" :key="index" class="employee-slider">
              <FacultyStuffs
                v-bind="{
                  fullName: getFullName(item),
                  desc: item?.category?.name,
                  phone: item?.phone_number,
                  mail: item?.email,
                  gmail: item?.google_link,
                  facebook: item?.facebook_link,
                  linkedin: item?.linkedin_link,
                  link: `/faculties/${$route.params?.id}/${item?.slug}`,
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
          class="-425:mt-[20px] -425:w-[220px] -425:h-[48px] mt-[32px] w-[252px] h-[56px]"
          :title="$t('all_employees')"
          :link="`/faculties/${currentSlug}/stuffs`"
          custom-css="-425:p-[12rem]"
          icon-size="-425:h-[24px] -425:w-[24px]"
        />
      </div>
    </div>
    <NoData v-else class="!min-h-[300rem]" />
  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import NoData from "@/components/common/NoData.vue";

export default {
  components: {
    Splide,
    SplideSlide,
    NoData,
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
      employee: [],
      content: "",
      currentSlug: undefined,
      activeStudents: [],
      pending: false,
      announce: [],
      news: [],
      events: [],
      slider: [],
      imgs: [],
      sliderNews: [],
      dean: [],
      international_position: undefined,
      students_number: undefined,
      professors_number: undefined,
      scientific_potential: undefined,
      education: [],
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
      // 0
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
      this.$store.dispatch("fetchEmployee", {
        faculty: this.currentSlug,
        limit: 4,
        page: 1,
        category: "talaba",
      }),
      // 3
      this.$store.dispatch("fetchPost", {
        type: "announcements",
        faculty: this.currentSlug,
        limit: 6,
        page: 1,
      }),
      // 4
      this.$store.dispatch("fetchPost", {
        type: "news",
        limit: 4,
        page: 1,
        faculty: this.currentSlug,
      }),
      // 5
      this.$store.dispatch("fetchPost", {
        type: "event",
        limit: 3,
        page: 1,
        faculty: this.currentSlug,
      }),
      // 6
      this.$store.dispatch("fetchDepartmentSlider", { faculty: `this.currentSlug` }),
      // this.$store.dispatch("fetchPost", {
      //   type: "news",
      //   limit: 4,
      //   page: 2,
      //   faculty: this.currentSlug,
      // }),
      // 7
      this.$store.dispatch("fetchEmployee", {
        faculty: this.currentSlug,
        limit: 1,
        category: "dekan",
      }),

      // 8
      this.$store.dispatch("fetchEducationalPrograms", {
        faculty: this.currentSlug,
      }),
      // 9 Loyihalar
      this.$store.dispatch("fetchFoundation", {
        category: "projects",
        faculty: this.currentSlug,
        page: 1,
      }),
      // 10 Klublar
      this.$store.dispatch("fetchFoundation", {
        category: "clubs",
        faculty: this.currentSlug,
        page: 1,
      }),
      // 11 Ilmiy maktablar
      this.$store.dispatch("fetchFoundation", {
        category: "ilmiy-maktablar",
        faculty: this.currentSlug,
        page: 1,
      }),
      // 12 Faculty video
      this.$store.dispatch("fetchFacultyVideo", {
        faculty: this.currentSlug,
      }),
      // 13 festivalse
      this.$store.dispatch("fetchFoundation", {
        type: "festivals",
        faculty: this.currentSlug,
        page: 1,
      }),
      // 14  to'garaklar
      this.$store.dispatch("fetchFoundation", {
        type: "tutors",
        faculty: this.currentSlug,
        page: 1,
      }),
    ])
      .then((res) => {
        this.content = res[0]?.value?.data?.name;
        this.slug = res[0]?.value?.data;
        this.employee = res[1]?.value?.data?.results;
        this.activeStudents = res[2]?.value?.data?.results;
        this.announce = res[3]?.value?.data?.results;
        this.news = res[4]?.value?.data?.results;
        this.events = res[5]?.value?.data?.results;
        this.slider = res[6]?.value?.data?.results;
        this.dean = res[7]?.value?.data?.results;
        this.education = res[8]?.value?.data?.results;
        this.categoryProjects = res[9]?.value?.data?.results;
        this.categoryClubs = res[10]?.value?.data?.results;
        this.scientificSchools = res[11]?.value?.data?.results;
        this.lifeStyleStudents = res[12]?.value?.data?.results;
        this.categoryFestivals = res[13]?.value?.data?.results;
        this.subjects = res[14]?.value?.data?.results;

        if (this.slider !== undefined) {
          for (let i = 0; i < this.slider.length; i++) {
            this.imgs.push(this.slider[i]?.get_image?.middle);
            this.sliderNews.push({
              title: this.slider[i].title,
              description: this.slider[i].description,
              status: this.slider[i].tag,
              buttonText: this.slider[i].button_text,
              buttonLink: this.slider[i].button_link,
              faculty: this.slider[i].faculty.name,
            });
          }
        }

        if (this.slug !== undefined) {
          this.international_position = this.slug.international_position;
          this.students_number = this.slug.students_number;
          this.professors_number = this.slug.professors_number;
          this.scientific_potential = this.slug.scientific_potential;
        }
      })
      .finally(() => {
        this.pending = false;
        this.$store.dispatch("setSlugTitle", this.slug.name);
      });
  },
  methods: {
    getFullName(item) {
      return `${item?.first_name + " " + item?.last_name + " " + item?.middle_name}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.employee-slider {
  overflow-x: clip !important;

  .faculty-stuffs {
    @media screen and (max-width: 425px) {
      margin-left: 0 !important;
    }
  }
}
</style>
