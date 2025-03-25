<template>
  <div class="container pt-[32px] mb-[104rem] vacancy-single">
    <div class="grid grid-cols-12 gap-[25px]">
      <div class="col-span-9 md:col-span-12">
        <div v-if="pending">
          <VacancyTopPr />
          <div>
            <h4
              class="mt-[46px] text-[#1A2F53] minion font-bold text-[24rem] leading-[130%] _loading w-[500px]"
            >
              Lorem, ipsum dolor.
            </h4>
            <h4
              v-for="(item, index) in 6"
              :key="index"
              class="mt-[12px] text-[#1A2F53] minion font-bold text-[12rem] leading-[130%] _loading w-[500px]"
            >
              Lorem, ipsum dolor.
            </h4>
          </div>
        </div>

        <div v-else>
          <VacancyTop :img="vacancySlug?.get_image?.middle" :title="vacancySlug.title" />
          <div>
            <h4 class="mt-[54px] text-[#1A2F53] minion font-bold text-[24rem] leading-[130%]">
              {{ $t("requirements") }}
            </h4>
            <div>
              <ul
                class="my-[2px] list-disc text-[15rem] text-[#344666] leading-[140%] font-normal ml-[20px]"
              >
                <!-- <div class="bg-[#344666] rounded-full w-[5px] h-[5px] mr-[4px]"></div> -->
                <span
                  class=""
                  v-html="
                    vacancySlug?.requirement.replaceAll('<p>', '<li>').replaceAll('</p>', '</li>')
                  "
                >
                </span>
              </ul>
            </div>

            <h4 class="mt-[24px] text-[#1A2F53] minion font-bold text-[24rem] leading-[130%]">
              {{ $t("tasks") }}
            </h4>

            <div v-if="vacancySlug?.mission">
              <ul
                class="my-[2px] list-disc text-[15rem] text-[#344666] leading-[140%] font-normal ml-[20px]"
              >
                <!-- <div class="bg-[#344666] rounded-full w-[5px] h-[5px] mr-[4px]"></div> -->
                <span
                  class=""
                  v-html="
                    vacancySlug?.mission.replaceAll('<p>', '<li>').replaceAll('</p>', '</li>')
                  "
                >
                </span>
              </ul>
            </div>

            <h4 class="mt-[24px] text-[#1A2F53] minion font-bold text-[24rem] leading-[130%]">
              {{ $t("additional_information") }}
            </h4>
            <div v-if="vacancySlug?.additional">
              <ul
                class="my-[2px] list-disc text-[15rem] text-[#344666] leading-[140%] font-normal ml-[20px]"
              >
                <!-- <div class="bg-[#344666] rounded-full w-[5px] h-[5px] mr-[4px]"></div> -->
                <span
                  class=""
                  v-html="
                    vacancySlug?.additional.replaceAll('<p>', '<li>').replaceAll('</p>', '</li>')
                  "
                >
                </span>
              </ul>
            </div>

            <h4 class="mt-[24px] text-[#1A2F53] minion font-bold text-[24rem] leading-[130%]">
              {{ $t("conditions") }}
            </h4>

            <div v-if="vacancySlug?.condition">
              <ul
                class="my-[2px] list-disc text-[15rem] text-[#344666] leading-[140%] font-normal ml-[20px]"
              >
                <!-- <div class="bg-[#344666] rounded-full w-[5px] h-[5px] mr-[4px]"></div> -->
                <span
                  class=""
                  v-html="
                    vacancySlug?.condition.replaceAll('<p>', '<li>').replaceAll('</p>', '</li>')
                  "
                >
                </span>
              </ul>
            </div>

            <div class="flex gap-[5px] items-center mt-[40px]">
              <h4
                v-for="(item, index) in vacancySlug.tags"
                :key="index"
                class="text-[#1385FA] leading-[120%] text-[13rem] font-normal"
              >
                #{{ item.name }}
              </h4>
            </div>
          </div>

          <a
            v-if="vacancySlug?.link"
            target="_blank"
            :href="vacancySlug?.link"
            class="learn-more-buttons w-[248px] mt-[24px]"
          >
            <Icon name="application" />
            <p>{{ $t("appeal") }}</p>
            <Icon name="arrow_right_button" />
          </a>
        </div>
      </div>

      <div class="col-span-3 md:col-span-12">
        <SideBar :is-search-results="true" />
      </div>

      <div class="col-span-12">
        <div class="slider mt-[64px]">
          <div class="mb-[28px] flex items-center justify-between">
            <h4
              class="minion not-italic font-bold text-[32rem] -400:text-[20rem] leading-[130%] text-[#1A2F53]"
            >
              {{ $t("other_all_vacancies") }}
            </h4>

            <router-link
              to="/vacancy"
              class="all_articles flex items-center justify-between gap-[8rem] duration-150 hover:bg-[#cfd3d7] cursor-pointer bg-[#EAF0F5] py-[14rem] px-[22rem] -420:py-[7rem] -420:px-[15rem]"
            >
              <span
                class="not-italic font-medium text-[14rem] leading-[16rem] uppercase text-[#1A2F53]"
                >{{ $t("all_vacancies") }}</span
              >
              <icon name="arrow_right" />
            </router-link>
          </div>

          <div v-if="pending">
            <Splide :options="options">
              <SplideSlide v-for="(item, index) in 6" :key="index">
                <VacancyCardPr />
              </SplideSlide>
            </Splide>
          </div>

          <div v-else>
            <Splide :options="options">
              <SplideSlide v-for="(item, index) in vacancy" :key="index">
                <router-link :to="item.slug">
                  <VacancyCard
                    :title="item.title"
                    :days="item.work_date"
                    :time="item.work_time"
                    :price="item.solary"
                    :slug="item.slug"
                  ></VacancyCard>
                </router-link>
              </SplideSlide>
            </Splide>
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
import { mapState } from "vuex";
export default {
  components: { Splide, SplideSlide },
  data() {
    return {
      options: {
        gap: "20px",
        perPage: 4,
        perMove: 1,
        arrows: true,
        pagination: true,
        // type: "loop",
        breakpoints: {
          1120: {
            perPage: 3,
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
      vacancy: [
        // {
        //   title: "AKT bo‘limi boshlig‘i yordamchisi",
        //   time: "9:00 - 18:00",
        //   days: "Dushanba-shanba",
        //   price: "5 000 000 ",
        //   slug: "dsdasdsd",
        // },
        // {
        //   title: "AKT bo‘limi boshlig‘i yordamchisi",
        //   time: "9:00 - 18:00",
        //   days: "Dushanba-shanba",
        //   price: "5 000 000 ",
        //   slug: "dsdasdsd",
        // },
        // {
        //   title: "AKT bo‘limi boshlig‘i yordamchisi",
        //   time: "9:00 - 18:00",
        //   days: "Dushanba-shanba",
        //   price: "5 000 000 ",
        //   slug: "dsdasdsd",
        // },
        // {
        //   title: "AKT bo‘limi boshlig‘i yordamchisi",
        //   time: "9:00 - 18:00",
        //   days: "Dushanba-shanba",
        //   price: "5 000 000 ",
        //   slug: "dsdasdsd",
        // },
        // {
        //   title: "AKT bo‘limi boshlig‘i yordamchisi",
        //   time: "9:00 - 18:00",
        //   days: "Dushanba-shanba",
        //   price: "5 000 000 ",
        //   slug: "dsdasdsd",
        // },
        // {
        //   title: "AKT bo‘limi boshlig‘i yordamchisi",
        //   time: "9:00 - 18:00",
        //   days: "Dushanba-shanba",
        //   price: "5 000 000 ",
        //   slug: "dsdasdsd",
        // },
      ],
      vacancyProperties: {
        requirements: [
          "Опыт front-end разработки не менее 4-х лет",
          "Уверенное знание JavaScript и одного или нескольких JS-фреймворков",
          "Знание протоколов HTTP, WebSocket",
        ],
        tasks: [
          "Опыт front-end разработки не менее 4-х лет",
          "Уверенное знание JavaScript и одного или нескольких JS-фреймворков",
          "Знание протоколов HTTP, WebSocket",
        ],
        additionalInformation: [
          "Опыт front-end разработки не менее 4-х лет",
          "Уверенное знание JavaScript и одного или нескольких JS-фреймворков",
          "Знание протоколов HTTP, WebSocket",
        ],
        conditions: [
          "Опыт front-end разработки не менее 4-х лет",
          "Уверенное знание JavaScript и одного или нескольких JS-фреймворков",
          "Знание протоколов HTTP, WebSocket",
        ],
      },
      vacancySlug: [],
      pending: true,
      currentSlug: undefined,
    };
  },

  computed: {
    ...mapState({
      slug: (state) => state.vacancy.slug,
    }),
  },
  watch: {
    $route() {
      this.fetchData();
    },
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      this.currentSlug = this.$route.params.id;
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchVacancySlug", { slug: this.currentSlug }),
        this.$store.dispatch("fetchVacancyRecommended", {
          slug: this.$route.params.id,
          page: 1,
          limit: 4,
        }),
      ])
        .then((res) => {
          this.vacancySlug = res[0].value?.data;
          this.vacancy = res[1].value?.data.results;
        })
        .finally(() => (this.pending = false));
      this.$store.dispatch("setSlugTitle", this.vacancySlug.title);
    },
  },
};
</script>

<style lang="scss">
.vacancy-single {
  .slider .splide__pagination {
    top: 120%;
  }
  .splide__arrow--prev,
  .splide__arrow--next {
    top: 125.5% !important;

    @media screen and (max-width: 420px) {
      display: flex !important;
    }
  }
  .splide__arrow--next {
    @media screen and (max-width: 420px) {
      right: 28% !important;
    }
  }
  .splide:not(.is-overflow) .splide__pagination {
    display: flex !important;
  }
}
</style>
