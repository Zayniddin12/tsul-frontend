<template>
  <div class="container -500:p-0">
    <div class="grid grid-cols-12 gap-[25px] mt-[32px]">
      <div class="col-span-9 lg:col-span-12">
        <div class="w-full h-[430px] relative">
          <img
            class="w-full h-full object-cover bg-blur"
            src="@/static/img/education-img.webp"
            alt="bachelor-image"
          />
          <div class="absolute top-0 mx-auto left-0 right-0 w-[300px] mt-[40px] px-[128px]">
            <page-title class="color-white" :title="$t('bachelor')" />
          </div>
        </div>

        <div
          v-if="pending"
          class="bg-[#1A2F53] bg-bachelor flex items-center justify-around md:flex-col border-[1.6px] border-[#6A7890]"
        >
          <div class="flex flex-col text-center p-[27px]">
            <h3 class="text-[#E0E8F4] not-italic font-bold text-[32rem] leading-[130%] _loading">
              1212
            </h3>
            <p class="text-[#93A7C9] not-italic font-normal text-[14rem] _loading mt-[8px]">
              {{ $t("amount_students") }}
            </p>
          </div>

          <div class="w-[1.6px] h-[50px] bg-[#425471] md:hidden"></div>

          <div class="flex flex-col text-center p-[27px]">
            <h3 class="text-[#E0E8F4] not-italic font-bold text-[32rem] leaning-[130%] _loading">
              1231
            </h3>
            <p class="text-[#93A7C9] not-italic font-normal text-[14rem] _loading mt-[8px]">
              {{ $t("year_of_foundation") }}
            </p>
          </div>

          <div class="w-[1.6px] h-[50px] bg-[#425471] md:hidden"></div>

          <div class="flex flex-col text-center p-[27px]">
            <h3 class="text-[#E0E8F4] not-italic font-bold text-[32rem] leaning-[130%] _loading">
              1321
            </h3>
            <p class="text-[#93A7C9] not-italic font-normal text-[14rem] _loading mt-[8px]">
              {{ $t("amount_professors") }}
            </p>
          </div>

          <div class="w-[1.6px] h-[50px] bg-[#425471] md:hidden"></div>

          <div class="flex flex-col text-center p-[27px]">
            <h3 class="text-[#E0E8F4] not-italic font-bold text-[32rem] leaning-[130%] _loading">
              1223
            </h3>
            <p class="text-[#93A7C9] not-italic font-normal text-[14rem] _loading mt-[8px]">
              {{ $t("amount_graduates") }}
            </p>
          </div>
        </div>

        <div
          v-if="Object.keys(bachelor).length"
          class="bg-[#1A2F53] bg-bachelor flex items-center justify-around md:flex-col border-[1.6px] border-[#6A7890]"
        >
          <div class="flex flex-col text-center p-[27px] -768:flex-col-reverse">
            <h3 class="text-[#E0E8F4] not-italic font-bold text-[32rem] leaning-[130%]">
              {{ bachelor?.students_number }}
            </h3>
            <p
              class="text-[#93A7C9] not-italic font-normal text-[14rem] mt-[4px] leading-[150%] -768:text-[16rem]"
            >
              {{ $t("amount_students") }}
            </p>
          </div>

          <div class="w-[1.6px] h-[50px] bg-[#425471] md:hidden"></div>

          <div class="flex flex-col text-center p-[27px] -768:flex-col-reverse">
            <h3 class="text-[#E0E8F4] not-italic font-bold text-[32rem] leaning-[130%]">
              {{ bachelor?.foundation_year }} {{ $t("th_year") }}
            </h3>
            <p
              class="text-[#93A7C9] not-italic font-normal text-[14rem] mt-[4px] leading-[150%] -768:text-[16rem]"
            >
              {{ $t("year_of_foundation") }}
            </p>
          </div>

          <div class="w-[1.6px] h-[50px] bg-[#425471] md:hidden"></div>

          <div class="flex flex-col text-center p-[27px] -768:flex-col-reverse">
            <h3 class="text-[#E0E8F4] not-italic font-bold text-[32rem] leaning-[130%]">
              {{ bachelor?.professors_number }}
            </h3>
            <p
              class="text-[#93A7C9] not-italic font-normal text-[14rem] mt-[4px] leading-[150%] -768:text-[16rem]"
            >
              {{ $t("amount_professors") }}
            </p>
          </div>

          <div class="w-[1.6px] h-[50px] bg-[#425471] md:hidden"></div>

          <div class="flex flex-col text-center p-[27px] -768:flex-col-reverse">
            <h3 class="text-[#E0E8F4] not-italic font-bold text-[32rem] leaning-[130%]">
              {{ bachelor?.graduated_number }}
            </h3>
            <p
              class="text-[#93A7C9] not-italic font-normal text-[14rem] mt-[4px] leading-[150%] -768:text-[16rem]"
            >
              {{ $t("amount_graduates") }}
            </p>
          </div>
        </div>

        <div class="mt-[12px] -500:px-[10px]">
          <div v-if="pending">
            <h5 class="text-[18rem] _loading">Lorem ipsum dolor sit amet.</h5>
            <p class="mt-[6px] text-[14rem] _loading">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <p class="mt-[6px] text-[14rem] _loading">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <p class="mt-[6px] text-[14rem] _loading">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <p class="mt-[6px] text-[14rem] _loading">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <div v-else class="mt-[48rem] -500:mt-0 education-bachelor">
            <span
              class="text-[#344666] not-italic font-normal text-[15rem] leaning-[130%]"
              v-html="bachelor?.content"
            ></span>
          </div>
        </div>

        <div class="mt-[70px]">
          <SocialSharing :views="bachelor?.view_count" />
        </div>

        <h4 class="minion normal font-[700] text-[24rem] leading-[130%] text-[#1A2F53] mt-[44px]">
          {{ $t("facultys") }}
        </h4>

        <div>
          <div
            v-if="pending"
            class="mt-[32px] grid grid-cols-2 -600:grid-cols-1 gap-x-[44px] gap-y-[52px]"
          >
            <FacultiesCardPr v-for="(item, index) in 4" :key="index"></FacultiesCardPr>
          </div>
          <div v-else class="mt-[32px] grid grid-cols-2 -600:grid-cols-1 gap-x-[44px] gap-y-[52px]">
            <div v-for="(item, index) in faculties" :key="index">
              <router-link :to="'/faculties' + `${item.slug}`">
                <FacultiesCard
                  :title="item.degree.name"
                  :desc="item.name"
                  :url="'/faculties/' + `${item.slug}`"
                ></FacultiesCard>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-3 lg:col-span-12 lg:mt-[24px]">
        <SideBar />
      </div>
    </div>
    <div class="grid grid-cols-12 mb-[100px] md:mt-0">
      <div class="col-span-12 mt-[84px]">
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
    </div>
    <div class="mb-[64px]"></div>
  </div>
</template>

<script>
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import SideBar from "@/components/side-bar/SideBar.vue";
import { mapState } from "vuex";
import axios from "@/plugins/axios";

export default {
  components: { SideBar },

  data() {
    return {
      pending: false,
      faculty: [
        {
          title: "Bakalavriat",
          desc: "Xalqaro huquq va siyosiy huquqshunoslik",
          url: "national-faculty",
        },
        {
          title: "Bakalavriat",
          desc: "Xalqaro huquq va siyosiy huquqshunoslik",
          url: "national-faculty",
        },
        {
          title: "Bakalavriat",
          desc: "Xalqaro huquq va siyosiy huquqshunoslik",
          url: "national-faculty",
        },
        {
          title: "Bakalavriat",
          desc: "Xalqaro huquq va siyosiy huquqshunoslik",
          url: "national-faculty",
        },
      ],
      data: [
        {
          image: "@/static/img/news-example.png",
          tag: "dolzarb",
          title: "Ishga qabul qilish bo‘yicha navbatdagi tanlov o‘tkaziladi",
          date: "16.03.2021 10:15",
          slug: "/news/1",
          description: "description",
        },
        {
          image: "@/static/img/news-example.png",
          tag: "Ilmiy tadqiqotlar",
          title: "Ishga qabul qilish bo‘yicha navbatdagi tanlov o‘tkaziladi",
          date: "16.03.2021 10:15",
          slug: "/news/1",
          description: "description",
        },
        {
          image: "@/static/img/news-example.png",
          tag: "Ilmiy tadqiqotlar",
          title: "Ishga qabul qilish bo‘yicha navbatdagi tanlov o‘tkaziladi",
          date: "16.03.2021 10:15",
          slug: "/news/1",
          description: "description",
        },
        {
          image: "@/static/img/news-example.png",
          tag: "Ilmiy tadqiqotlar",
          title: "Ishga qabul qilish bo‘yicha navbatdagi tanlov o‘tkaziladi",
          date: "16 - mart 10:15",
          slug: "/news/1",
          description: "description",
        },
      ],

      amountStudents: 1745,
      yearFoundation: this.$t("year_foundation"),
      yearOfFoundation: this.$t("year_of_foundation"),
      amountProfessors: 45,
      amountGraduates: 8745,
      faculties: [],
      bachelor: {},
    };
  },

  computed: {
    ...mapState({
      faculties: (state) => state.faculties.faculty,
      news: (state) => state.post.allNews,
    }),
  },

  async created() {
    this.fetchDegree("bachelor");
    this.pending = true;
    await Promise.allSettled([
      this.$store.dispatch("fetchFaculties", {
        degree: "",
        category: "faculty",
      }),
      this.$store.dispatch("fetchPost", {
        type: "news",
      }),
    ])
      .then((res) => {
        this.faculties = res[0].value.data.results;
      })
      .finally(() => {
        this.pending = false;
        this.$store.dispatch("setSlugTitle", this.$t("bachelor"));
      });
  },
  methods: {
    async fetchDegree(detail) {
      await axios
        .get(`degree/${detail}`)
        .then((response) => {
          this.bachelor = response?.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
.education-bachelor {
  p {
    margin-bottom: 12px;
  }
}

.color-white {
  .section-titles {
    color: #fff !important;
  }
  svg path {
    fill: #fff !important;
  }
}

.bg-blur {
  background: linear-gradient(
    180deg,
    rgba(24, 35, 54, 0.95) 0%,
    rgba(24, 34, 54, 0.35) 72.4%,
    rgba(24, 35, 54, 0) 100%
  );
  backdrop-filter: blur(2px);
}

.bg-bachelor {
  background-image: url("@/static/img/business.png");
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: 70px;
}
</style>
