<template>
  <div
    v-if="$route.query?.category === '001'"
    class="bg-[#1A2F53] h-[120px] z-1 w-full mb-[-120px] relative bottom-[6px]"
  ></div>
  <div class="container">
    <div class="grid grid-cols-12">
      <div
        class="col-span-9 lg:col-span-12 mb-[24px]"
        :class="{ '!col-span-12': $route.query?.category == '001' }"
      >
        <profile-info-pr
          v-if="pending"
          v-bind="{
            type: 2,
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
          <ViceRectorCard
            v-if="posts.category.id === '002'"
            class="my-[32rem]"
            v-bind="{
              mail: posts?.email,
              phone: posts?.phone_number,
              time: posts?.work_date,
              fullName: posts?.last_name + ' ' + posts?.first_name + ' ' + posts?.middle_name,
              position: posts?.description,
              img: posts?.get_image?.origin,
              quote: posts?.quote,
              telegram: posts?.telegram_link,
              twitter: posts?.twitter_link,
              facebook: posts?.facebook_link,
              instagram: posts?.instagram_link,
              linkedin: posts?.linkedin_link,
              slug: posts?.slug,
            }"
          />
          <profile-info
            v-else
            :key="routeID"
            v-bind="{
              type: typeOfEmployee,
              profile: {
                quote: posts?.quote,
                image: posts?.get_album?.origin,
                name: `${posts?.last_name} ${posts?.first_name} ${posts?.middle_name ?? ''}`,
                work: posts?.description,
                description: posts?.duty,
                time: posts?.work_date,
                phone: posts?.phone_number,
                email: posts?.email,
                facebook: posts?.facebook_link,
                linkedin: posts?.linkedin_link,
                google: posts?.google_link,
                instagram: posts?.instagram_link,
                twitter: posts?.twitter_link,
                telegram: posts?.telegram_link,
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
      <div
        v-if="typeOfEmployee !== 1 || posts?.category?.slug === '002'"
        class="col-span-3 lg:col-span-12 pt-[10px] mb-[20px]"
      >
        <SideBar />
        <div
          v-if="posts?.category?.slug === 'prorector' || posts?.category?.slug === '002'"
          class="apply-prorector bg-[#E6E9F0] p-[20px] mt-[24px]"
        >
          <h3 class="text-[#1A2F53] minion font-bold text-[24rem] leading-[130%]">
            Prorektorga murojaat
          </h3>
          <router-link
            class="text-white text-[13rem] leading-[130%] font-semibold bg-[#1A2F53] px-[20px] py-[12px] inline-block mt-[16px]"
            :to="prorector[0]?.path ?? '/management/apply'"
            >{{ $t("apply") }}</router-link
          >
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div v-if="faculty_emplyee.length && $route.query?.category !== '001'">
      <div v-if="pending" class="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        <YoungScientistsPr
          v-for="(item, index) in 4"
          :key="item"
          class="ml-[24rem]"
          :class="index === 0 ? '!ml-0' : ''"
        />
      </div>
      <div class="my-[28px]">
        <h2 class="text-[32px] font-bold font-minion">{{ $t("other_members") }}</h2>
      </div>
      <div class="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[24rem]">
        <YoungScientists
          v-for="item in faculty_emplyee"
          :key="item"
          v-bind="{
            type: '4',

            scientist: {
              id: item.id,
              name: item?.last_name + ' ' + item?.first_name + ' ' + item?.middle_name,
              text: item.description,
              image: item?.get_image?.middle,
              slug: `/department/${$route.params.id}/${item?.slug}`,
              faculty: item.faculty?.slug,
              category: item.category.slug,
            },
          }"
        />
      </div>
    </div>
  </div>
  <div>
    <NewsCarousel
      :title="$t('scientific_works')"
      :btn-text="$t('all_works')"
      link="/scientific_works"
      :pending="pending"
      :list="posts?.careers"
      height="230rem"
    />
  </div>

  <div v-if="typeOfEmployee === 1">
    <div v-if="true" class="container mb-[88rem]">
      <div v-if="pending">
        <Scientific-works-slider-pr
          v-bind="{
            works: [
              {
                id: 1,
                text: '“Konstitutsiyaviy islohotlar”',
              },
            ],
          }"
        />
      </div>

      <div v-else-if="works.length">
        <Scientific-works-slider :works="works" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import SideBar from "@/components/side-bar/SideBar.vue";
import ViceRectorCard from "@/components/cards/ViceRectorCard.vue";
export default {
  components: {
    ViceRectorCard,
    Splide,
    SplideSlide,
    SideBar,
  },
  data() {
    return {
      pending: undefined,
      posts: undefined,
      articles: [],
      scientificWorksInTabs: [],
      eventsTabsData: [],
      works: [],
      array: [],
      limit: 4,
      typeOfEmployee: 2,
      employee: [],
      education: [],
      careera: [],
      application: [],
      prorector: [],
      vid: [],

      options: {
        gap: "20px",
        perPage: 4,
        perMove: 4,
        arrows: true,
        pagination: true,
        rewind: true,
        employeeId: "",
        breakpoints: {
          1120: {
            perPage: 3,
            perMove: 1,
          },
          860: {
            perPage: 2,
            perMove: 1,
          },
          768: {
            pagination: false,
          },
          600: {
            perPage: 1,
            perMove: 1,
          },
        },
      },
    };
  },

  computed: {
    ...mapState({
      faculty_emplyee: (state) => state.employee.employee,
    }),
    routeID() {
      return this.$route.params.slug;
    },
  },
  watch: {
    routeID() {
      this.pending = true;
      Promise.allSettled([
        this.$store.dispatch("fetchEmployeeSlug", { slug: this.$route.params.slug }),
        this.$store
          .dispatch("fetchEmployeeRecommended", {
            slug: this.$route.params.slug,
            faculty: this.$route.params.id,
            limit: 4,
          })
          .then((res) => {
            this.array = res?.data?.data?.results;
            this.pending = false;
            this.total = res[0]?.value?.data?.data?.total_pages;
          }),
        this.$store.dispatch("fetchApplicationTitle", "rector"),
        this.$store.dispatch("fetchApplicationTitle", "prorector"),
      ])
        .then((res) => {
          if (
            res[0].value.data?.category?.slug === "rektor" ||
            res[0].value.data?.category?.slug === "001" ||
            res[0].value.data?.category?.slug === "002"
          ) {
            this.typeOfEmployee = 1;
          }
          this.posts = res[0].value?.data;
          this.employeeId = res[0].value?.data.id;
          this.employee = res[1].value?.data.results;
          this.application = res[2].value?.data.results;
          this.prorector = res[3].value?.data.results;

          this.works.forEach((item) => {
            this.scientificWorksInTabs.push({
              height: "230px",
              image: item?.get_image?.middle,
              tag: this.$t("scientific_researches"),
              title: item?.title,
              date: item?.publish_date,
              slug: item?.slug,
              description: item?.description,
            });
          });
        })
        .finally(() => {
          this.pending = false;
          this.getVideoLessons();
          this.$store.dispatch("setSlugTitle", this.posts.first_name + " " + this.posts.last_name);
        });
    },
  },

  async created() {
    this.pending = true;

    await Promise.allSettled([
      this.$store.dispatch("fetchEmployeeSlug", { slug: this.$route.params.slug }),
      this.$store.dispatch("fetchEmployeeRecommended", {
        slug: this.$route.params.slug,
        faculty: this.$route.params.id,
        limit: 4,
      }),
      this.$store.dispatch("fetchApplicationTitle", "rector"),
      this.$store.dispatch("fetchApplicationTitle", "prorector"),
    ])
      .then((res) => {
        console.log(res);
        if (
          res[0].value.data?.category?.slug === "rektor" ||
          res[0].value.data?.category?.slug === "001" ||
          res[0].value.data?.category?.slug === "002"
        ) {
          this.typeOfEmployee = 1;
        }
        this.posts = res[0].value?.data;
        this.employeeId = res[0].value?.data.id;
        this.employee = res[1].value?.data.results;
        this.application = res[2].value?.data.results;
        this.prorector = res[3].value?.data.results;

        this.works.forEach((item) => {
          this.scientificWorksInTabs.push({
            height: "230px",
            image: item?.get_image?.middle,
            tag: this.$t("scientific_researches"),
            title: item?.title,
            date: item?.publish_date,
            slug: item?.slug,
            description: item?.description,
          });
        });
      })
      .finally(() => {
        this.pending = false;
        this.$store.dispatch("setSlugTitle", this.posts.first_name + " " + this.posts.last_name);
        this.getVideoLessons();
      });
    for (let i = 0; i < this.posts.careers.length; i++) {
      if (this.posts.careers[i].category === "education") {
        this.education.push(this.posts.careers[i]);
      } else if (this.posts.careers[i].category === "career") {
        this.careera.push(this.posts.careers[i]);
      }
    }
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  methods: {
    getEmployee() {
      this.$store
        .dispatch("fetchEmployee", {
          slug: this.$route.params.slug,
          limit: 4,
          // category: "department_head",
        })
        .then((res) => {
          this.array = res?.data?.results;
          this.pending = false;
          this.total = res[0]?.value?.data?.total_pages;
        });
    },
    getVideoLessons() {
      this.$store
        .dispatch(
          "fetchPost",
          { type: "articles", limit: this.limit, author_id: this.employeeId },
          { root: true }
        )
        .then((res) => {
          this.articles = res.data.results;
        });
      this.$store
        .dispatch("fetchPost", {
          type: "scientific-works",
          limit: this.limit,
          author_id: this.employeeId,
        })
        .then((res) => {
          this.works = res.data.results;
        });
    },
    async loadMoreWorks() {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchPost", { type: "scientific-works", limit: this.limit }),
      ])
        .then((res) => {
          this.works = res[0].value.data.results;
          this.works.forEach((item) => {
            this.scientificWorksInTabs.push({
              height: "230px",
              image: item?.get_image?.middle,
              tag: this.$t("scientific_researches"),
              title: item?.title,
              date: item?.publish_date,
              slug: item?.slug,
              description: item?.description,
            });
          });
        })
        .finally(() => {
          this.pending = false;
        });
    },
    async loadMoreVideos() {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchPost", { type: "scientific-works", limit: this.limit }),
      ])
        .then((res) => {
          this.news = res[0].value.data.results;

          this.news.forEach((item) => {
            this.eventsTabsData.push({
              height: "230px",
              image: item?.get_image?.middle,
              tag: "Ilmiy tadqiqotlar",
              title: item.title,
              date: item.publish_date,
              slug: `/news/${item.slug}`,
              description: item.description,
              videosArray: item.video,
            });
          });
        })
        .finally(() => {
          this.pending = false;
        });
    },
  },
};
</script>
<style lang="scss">
.bg-rector {
  background-image: url("@/static/img/event-bg.png");
  background-position: right bottom;
  background-size: 150px;
  background-repeat: no-repeat;
}

.apply-prorector {
  background-image: url("@/static/img/pro-bg.png");
  background-position: right bottom;
  background-size: 110px;
  background-repeat: no-repeat;
}

.bg-blue {
  &::before {
    content: "";
    position: absolute;
    top: 135px;
    left: 0;
    width: 100%;
    height: 120px;
    background: #1a2f53;
    z-index: -2;
  }
}
</style>
