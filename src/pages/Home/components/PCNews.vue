<template>
  <div class="bg-[#F5F6FA] py-[64px] sm:py-[24px] -640:pt-[70px]">
    <div class="container">
      <div class="grid grid-cols-12">
        <!-- main news -->
        <!-- :to="'/news' + `${allNews[0]}`" -->
        <div class="col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 mr-[24px] -640:mr-0">
          <div>
            <div v-if="pending" class="group flex justify-end relative _loading">
              <div class="h-[587px] sm:h-[430px] object-cover w-full" />
              <img
                src="@/static/img/default.svg"
                class="w-[200px] h-[200px] _loading"
                alt="loading"
              />

              <div class="absolute top-0 left-0 w-full">
                <div class="h-[587px] sm:h-[430px] p-[32px] sm:p-[20px] flex flex-col justify-end">
                  <p
                    class="not-italic font-medium text-[12rem] uppercase text-[#96A5BD] duration-150 group-hover:text-[#78869c] _loading"
                  >
                    dassdadsasdadsadsa
                  </p>
                  <h2
                    class="not-italic font-bold text-[24rem] text-white mt-[4px] line-clamp-2 _loading"
                  >
                    Ilmiy maktablar ochilishi haqida qonun kuchga kirdi
                  </h2>
                  <div class="flex items-center justify-between">
                    <p
                      class="not-italic font-medium text-[12rem] text-[#96A5BD] mt-[12px] duration-150 group-hover:text-[#78869c] _loading"
                    >
                      Bugun 10:15
                    </p>

                    <icon
                      class="opacity-0 duration-150 ml-[8px] group-hover:translate-x-[-5px] group-hover:opacity-100 _loading"
                      name="arrow_right_button"
                    />
                  </div>
                </div>
              </div>

              <div
                v-if="$i18n.locale === 'uz'"
                class="absolute top-[49px] left-[-101px] xl:-rotate-0 xl:left-0 xl:top-[-52px] -1378:-rotate-0 -1378:left-0 -1378:top-[-52px] -rotate-90 sm px-[20px] py-[10px] minion not-italic font-bold text-[24rem] leading-[32px] text-white _loading"
              >
                newsnewsnews
              </div>
            </div>

            <router-link
              v-else
              class="group flex justify-end relative"
              :to="'/news/' + `${news[0]?.slug}`"
            >
              <img
                v-lazy="{ src: news[0]?.get_image?.origin }"
                class="h-[587px] sm:h-[430px] object-cover w-full"
                :alt="news[0]?.title"
              />
              <div class="absolute top-0 left-0 w-full">
                <div
                  class="news-shadow h-[587px] sm:h-[430px] p-[32px] sm:p-[20px] flex flex-col justify-end"
                >
                  <p
                    class="not-italic font-medium text-[12rem] uppercase text-[#96A5BD] duration-150 group-hover:text-[#78869c]"
                  >
                    {{ $t("important_news") }}
                  </p>
                  <p
                    class="minion not-italic font-bold text-[24rem] text-white mt-[4px] line-clamp-2"
                  >
                    {{ news[0]?.title }}
                  </p>
                  <div class="flex items-center justify-between">
                    <p
                      class="not-italic font-medium text-[12rem] text-[#96A5BD] mt-[12px] duration-150 group-hover:text-[#78869c]"
                    >
                      {{ $dayjs(news[0]?.publish_date).format("DD.MM.YYYY  HH:MM") }}
                    </p>

                    <icon
                      class="opacity-0 duration-150 ml-[8px] group-hover:translate-x-[-5px] group-hover:opacity-100"
                      name="arrow_right_button"
                    />
                  </div>
                </div>
              </div>

              <div
                class="absolute -translate-y-[120%] left-0  bg-[#1A2F53] px-[20px] py-[10px] -678:px-[14px] -678:py-[7px]  -678:text-[20rem] minion not-italic font-bold text-[24rem] leading-[32px] text-white"
              >
                {{ $t("news") }}
              </div>
            </router-link>
          </div>

          <router-link to="/news" class="learn-more-buttons w-[263px] mt-[33px] !h-[56px] sm:hidden">
            <Icon name="newspaper" />
            <p>{{ $t("all_news") }}</p>
            <Icon name="arrow_right_button" />
          </router-link>
        </div>
        <!-- news list -->
        <div
          class="mr-[24px] col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 sm:mt-[24px] -640:pt-0 sm:ml-[0px] relative"
        >
          <div
            id="newsContainer"
            class="none-scroll grid gap-[20px] h-[587px] sm:h-fit overflow-scroll sm:overflow-auto news-container-top news-container-bottom"
            :class="{
              'before:!block': scrollPosition > 10,
              'after:!block': scrollPosition < 255,
            }"
          >
            <div v-if="pending">
              <NewsSmallPr v-for="item in 6" :key="item" />
            </div>
            <div v-else>
              <div class="flex flex-col">
                <NewsSmall
                  v-for="(item, index) in news.slice(1)"
                  :key="index"
                  class="mb-[20px]"
                  :img="item?.get_image?.small"
                  :title="item.title"
                  :date="item.publish_date"
                  :link="'/news/' + `${item.slug}`"
                />
              </div>
            </div>
          </div>
        </div>
        <router-link
          to="/news"
          class="hidden sm:flex learn-more-buttons w-[251px] !h-[56px] mt-[24px] :md:w-[231px]"
        >
          <Icon name="newspaper" />
          <p class="font-text-15px">{{ $t("all_news") }}</p>
          <Icon name="arrow_right_button" />
        </router-link>
        <!-- events -->
        <div
          class="col-span-4 lg:col-span-12 -1024:pt-0 md:col-span-12 flex flex-col justify-between"
        >
          <div>
            <p
              class="minion not-italic font-bold text-[32rem] leading-[130%] text-[#1A2F53] -1024:mt-[20px]"
            >
              {{ $t("events") }}
            </p>
            <div
              v-if="pending"
              class="grid grid-cols-2 sm:grid-cols-2 gap-[20px] sm:gap-[16px] mt-[20px] min-h-[425px] -500:grid-cols-1"
            >
              <EventCardPr v-for="item in 6" :key="item" />
            </div>

            <div v-else class="grid grid-cols-2 gap-[24px] sm:gap-[16px] mt-[20px]">
              <EventCard
                v-for="(item, index) in windowSize >= 1000 ? events : events.slice(0, 4)"
                :key="index"
                :day="item?.event_date"
                :month="item?.event_date"
                :title="item.title"
                :link="item.slug"
              />
            </div>
          </div>
          <router-link
            to="/event"
            class="learn-more-buttons w-[251px] !h-[56px] mt-[33px] :md:w-[231px] -500:py-[12rem]"
          >
            <Icon name="events_calendar" />
            <p class="font-text-15px">{{ $t("all_events") }}</p>
            <Icon name="arrow_right_button" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewsSmall from "@/components/NewsSmall.vue";
import defaultPhoto from "@/static/img/default.svg";
export default {
  components: { NewsSmall },
  props: {
    news: {
      type: Array,
      default: () => [],
    },
    events: {
      type: Array,
      default: () => [],
    },
    pending: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      clientScrollHeight: 0,
      scrollPosition: 0,
      dePhoto: defaultPhoto,
      allEvents: undefined
    };
  },
  computed: {
    windowSize() {
      return window.innerWidth;
    },
  },

  mounted() {
    console.log(this.fetchEventss)
    let newsContainer = document.getElementById("newsContainer");
    this.clientScrollHeight = newsContainer.scrollHeight;
    newsContainer.addEventListener("scroll", () => {
      this.scrollPosition = newsContainer.scrollTop;
    });
    newsContainer.addEventListener("resize", () => {
      this.clientScrollHeight = newsContainer.scrollHeight;
    });

  },
  methods:{

  }

};
</script>

<style lang="scss" scoped>
.news-container-top {
  &::before {
    content: "";
    display: none;
    width: 98%;
    position: absolute;
    top: -5px;
    background: linear-gradient(to top, rgba(255, 255, 255, 0), rgba(#f5f6fa, 1) 100%);
    height: 70px;
    transition: all 0.3s ease;
  }
}

.news-container-bottom {
  &::after {
    content: "";
    display: none;
    width: 98%;
    position: absolute;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(#f5f6fa, 1) 100%);
    height: 70px;
    bottom: 86px;
    transition: all 0.3s ease;

    @media screen and (max-width: 640px) {
      bottom: -5px;
    }
  }
}

.news-shadow {
  background: linear-gradient(180deg, rgba(24, 35, 54, 0) 0%, rgba(24, 35, 54, 0.88) 100%);
}

.none-scroll {
  &::-webkit-scrollbar {
    width: 3px;
    height: 0px;
    background-color: #e0e5ec;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #677b9e;
    border: 3px solid #677b9e;
  }
}

.blue-scroll {
  position: relative;

  &::-webkit-scrollbar-track {
    background-color: #e0e5ec;
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 47px;
    transform: rotate(180deg);
    background: linear-gradient(180deg, rgba(245, 246, 250, 0) 0%, #f5f6fa 100%);
    @media screen and (max-width: 767px) {
      top: -4px;
    }
  }
}

.absolute-uz {
  position: absolute;
  left: -111px;
  top: 60px;
  @media screen and (max-width: 1378px) {
    position: absolute;
    top: -52px;
    left: 0;
    transform: rotate(0);
  }
}
.absolute-ru {
  position: absolute;
  left: -93px;
  top: 41px;

  @media screen and (max-width: 1378px) {
    position: absolute;
    top: -52px;
    left: 0;
    transform: rotate(0);
  }
}
.absolute-en {
  position: absolute;
  left: -74px;
  top: 22px;

  @media screen and (max-width: 1378px) {
    position: absolute;
    top: -52px;
    left: 0;
    transform: rotate(0);
  }
}
</style>
