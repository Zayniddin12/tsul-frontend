<template>
  <div class="bg-[#F5F6FA]">
    <div v-if="isLoading">
      <div class="relative main-slider">
        <el-carousel
          class="main-bg-slider relative _loading"
          trigger="click"
          arrow="never"
          :loop="true"
          :autoplay="true"
          :interval="5000"
        >
          <el-carousel-item v-for="(item, index) in 6" :key="index">
            <img src="" class="_loading w-full object-cover h-[100%]" alt="main-image" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div
        class="bg-[#F5F6FA] relative z-[5] border-t-[1.6rem] border-t-[solid] border-t-[#E0E5EC] border-b-[1.6rem] border-b-[solid] border-b-[#E0E5EC] p-[7rem] _loading"
      >
        <div class="container">
          <div class="flex items-center">
            <p
              class="font-semibold text-[12rem] leading-[130%] uppercase text-[#677B9E] tracking-[0.14em]"
            >
              {{ $t("heated") }}
            </p>
            <div class="flex items-center ml-[17rem]">
              <Icon
                class="cursor-pointer transition-all duration-150"
                name="chevron_left_slider"
                @click="PrevSlide()"
              />
              <Icon
                class="cursor-pointer hover:opacity-60 transition-all duration-150"
                name="chevron_right_slider"
                @click="NextSlide()"
              />
            </div>
            <div class="w-full ml-[30rem]">
              <el-carousel
                ref="newsMiniSlider"
                direction="vertical"
                arrow="never"
                indicator-position="none"
                trigger="click"
                height="24rem"
                width="100%"
              >
                <div v-if="heated && heated.length">
                  <el-carousel-item v-for="(item, index) in heated" :key="index">
                    <div class="flex items-center h-[20px]">
                      <div
                        class="bg-[#E0E5EC] font-medium text-[12rem] text-[#677B9E] p-[3px] -566:min-w-[80px] flex-shrink-0"
                      >
                        <span class="text-normal text-[rgba(103,123,158,0.8)]">
                          {{ $t($dayjs(item.publish_date).format("dddd")) }}</span
                        >
                        {{ $dayjs(item.publish_date).format("HH:mm") }}
                      </div>
                      <div class="ml-[16rem]">
                        <router-link
                          class="hover:opacity-60 transition-all duration-200 font-normal text-[13rem] leading-[140%] text-[#677B9E] line-clamp-1"
                          :to="`/news/${item.slug}`"
                          >{{ item.title }}</router-link
                        >
                      </div>
                    </div>
                  </el-carousel-item>
                </div>
              </el-carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="slider && slider.length" class="relative main-slider">
      <div class="absolute w-[100%] z-[2] flex flex-col justify-between h-[100%]">
        <div class="gradient h-[40vh] !sm:h-[240px]"></div>
        <div class="container">
          <div>
            <div
              v-if="isLoading"
              class="news-slider-main-page bg-[rgba(26,47,83,0.88)] pt-[44rem] pr-[76rem] pb-[24rem] pl-[76rem] w-[68%] -1170:w-[100%] h-[100%] -1000:pt-[22rem] -1000:pb-[12rem] -1000:pr-[22rem] -1000:pl-[22rem] _loading relative"
            >
              <p class="font-semibold text-[15rem] leading-[130%] uppercase text-[#96A5BD]">
                {{ $t("news_title") }}
              </p>
              <div class="w-[50rem] h-[2rem] bg-[#fff] mt-[12rem]"></div>

              <el-carousel
                class="newsSlider"
                trigger="click"
                arrow="never"
                :loop="true"
                :autoplay="true"
                :interval="1000"
              >
                <el-carousel-item v-for="(items, indexes) in data" :key="indexes">
                  <router-link :to="`/news/${items.slug}`">
                    <h1
                      class="section-titles text-[#fff] text-left items-start mt-[24rem] mb-[12rem] -848:line-clamp-3 transition-all duration-200 hover:opacity-60 _loading"
                    >
                      idaisdjoaidjaoidaosdj
                    </h1>
                  </router-link>
                  <p class="desciption-texts mb-[16rem] -848:line-clamp-4 _loading">
                    dasdsddssadasdsadasdasdad
                  </p>
                  <p class="desciption-texts mb-[16rem] -848:line-clamp-4 _loading">
                    dasdsddssadasdsadasdasdad
                  </p>
                </el-carousel-item>
              </el-carousel>
              <Icon class="absolute right-0 bottom-0" name="bg_pattern" />
            </div>

            <div
              v-else
              class="news-slider-main-page bg-[rgba(26,47,83,0.88)] pt-[44rem] pr-[76rem] pb-[24rem] pl-[76rem] w-[68%] -1170:w-[100%] h-[100%] -1000:pt-[22rem] -1000:pb-[12rem] -1000:pr-[22rem] -1000:pl-[22rem] relative"
            >
              <swiper
                id="newSwiper"
                ref="newsSlider"
                class="swiper newsSlider"
                :modules="modulesBlue"
                :scrollbar="{ draggable: false }"
                :effect="'fade'"
                :arrows="false"
                :allow-touch-move="false"
                loop="true"
              >
                <swiper-slide
                  v-for="items in slider"
                  :key="items.id"
                  class="!h-[79%] -1200:!h-[66%] -600:!h-[70%] !flex !flex-col !justify-between"
                >
                  <p
                    v-if="items?.tag && items?.title"
                    class="font-semibold text-[15rem] leading-[130%] uppercase text-[#96A5BD]"
                  >
                    {{ items.tag }}
                  </p>
                  <div
                    v-if="items?.button_link"
                    class="w-[50rem] h-[2rem] bg-[#fff] mt-[7rem]"
                  ></div>
                  <a :href="`${items.button_link}`">
                    <h1
                      class="section-titles line-clamp-2 text-[#fff] text-left items-start mt-[15rem] -848:line-clamp-3 transition-all duration-200 hover:opacity-60"
                    >
                      {{ items.title }}
                    </h1>
                  </a>
                  <div
                    v-if="items?.description"
                    class="desciption-texts mb-[16rem] line-clamp-2 !h-full max-h-[42px] !text-[#ffffff7f] min-h-[42px] sm:hidden mt-3"
                    v-html="items.description"
                  ></div>
                  <a
                    v-if="items?.button_link"
                    :href="`${items.button_link}`"
                    class="learn-more-buttons text-[#1A2F53] text-[15rem] font-medium max-w-[185px] !py-[10px] h-[40px] -460:mt-[15px]"
                  >
                    <p v-if="items?.button_text">
                      {{ items.button_text }}
                    </p>
                    <Icon name="arrow_right_button" />
                  </a>
                </swiper-slide>
              </swiper>
              <Icon
                class="absolute right-0 bottom-0 w-[169px] h-[198px] slider-bg-img"
                name="bg_pattern"
              />
            </div>
          </div>
        </div>
      </div>
      <swiper
        ref="mainBgSlider"
        class="swiper main-bg-slider relative"
        :modules="modules"
        :space-between="30"
        :effect="'fade'"
        loop="true"
        :arrows="false"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        :pagination="{
          el: '.swiper-pagination',
          clickable: true,
        }"
        :navigation="{
          nextEl: '.next-bg-slide',
          prevEl: '.prev-bg-slide',
        }"
        @slideChange="slideChanged"
      >
        <swiper-slide v-for="(item, index) in slider" :key="index" class="slide">
          <img
            v-lazy="{ src: item?.get_image?.origin }"
            class="w-full object-cover h-[100vh]"
            :alt="item.title"
          />
        </swiper-slide>
      </swiper>
      <div class="relative z-[956]">
        <div
          class="!absolute !h-[24px] !left-[70%] md:hidden !bottom-[32px] flex items-center gap-[12px]"
        >
          <button class="prev-bg-slide cursor-pointer">
            <Icon name="slider_arrow_left" />
          </button>
          <div
            class="!static swiper-pagination s-pagination flex items-center justify-center"
          ></div>
          <button class="next-bg-slide cursor-pointer">
            <Icon name="slider_arrow_right" />
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="heated && heated.length"
      class="bg-[#F5F6FA] relative z-[5] border-t-[1.6rem] border-t-[solid] border-t-[#E0E5EC] border-b-[1.6rem] border-b-[solid] border-b-[#E0E5EC] p-[7rem]"
    >
      <div class="container">
        <div class="flex -768:flex-col gap-[30px] -768:gap-[10px]">
          <div class="flex items-center">
            <p
              class="font-semibold text-[12rem] leading-[130%] uppercase text-[#677B9E] tracking-[0.14em]"
            >
              {{ $t("heated") }}
            </p>
            <div class="flex items-center ml-[17rem]">
              <Icon
                class="cursor-pointer hover:bg-[#1A2F53] rounded-full transition-all duration-200"
                name="chevron_left_slider"
                @click="PrevSlide"
              />
              <Icon
                class="cursor-pointer hover:bg-[#1A2F53] rounded-full transition-all duration-200"
                name="chevron_right_slider"
                @click="NextSlide"
              />
            </div>
          </div>
          <div class="w-full  ">
            <el-carousel
              ref="newsMiniSlider"
              direction="vertical"
              arrow="never"
              indicator-position="none"
              trigger="click"
              height="24rem"
              width="100%"
            >
              <div v-if="heated && heated.length">
                <el-carousel-item v-for="(item, index) in heated" :key="index">
                  <div class="flex items-center h-[20px]">
                    <div
                      class="bg-[#E0E5EC] font-medium text-[12rem] text-[#677B9E] p-[3px] -566:min-w-[80px] flex-shrink-0"
                    >
                      <span class="text-normal text-[rgba(103,123,158,0.8)]">
                        {{ $t($dayjs(item?.publish_date).format("dddd")) }}</span
                      >
                      {{ $dayjs(item?.publish_date).format("HH:mm") }}
                    </div>
                    <div class="ml-[16rem]">
                      <router-link
                        class="hover:opacity-60 transition-all duration-200 font-normal text-[13rem] leading-[140%] text-[#677B9E] line-clamp-1"
                        :to="`/news/${item?.slug}`"
                        >{{ item?.title }}</router-link
                      >
                    </div>
                  </div>
                </el-carousel-item>
              </div>
            </el-carousel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Pagination, Navigation, EffectFade, Autoplay],
      modulesBlue: [Pagination, EffectFade],
      mySliderInterval: "",
      heated: undefined,
      data: undefined,
      pending: false,
      slider: [],
    };
  },

  created() {
    this.getData();
  },
  mounted() {
    // this.mySliderInterval = setInterval(() => {
    //   this.slidersNext();
    // }, 5000);
  },
  beforeUnmount() {
    clearInterval(this.mySliderInterval);
  },
  computed: {
    ...mapState({
      pending: "getLoad", // Assuming "getLoad" is the getter for general loading
      isLoading: state => state.isLoading,
    })
  },
  methods: {
    ...mapMutations(['setLoading']),
    slidersNext() {
      this.$refs.mainBgSlider.next();
      this.$refs.newsSlider.next();
    },

    slidersPrev() {
      this.$refs.mainBgSlider.prev();
      this.$refs.newsSlider.prev();
    },

    PrevSlide() {
      this.$refs.newsMiniSlider.prev();
    },
    NextSlide() {
      this.$refs.newsMiniSlider.next();
    },
    async getData() {
      this.setLoading(true);
      await Promise.allSettled([
        this.$store.dispatch("fetchPost", {
          type: "news",
          limit: 5,
        }),
        this.$store.dispatch("fetchSlider"),
      ])
        .then((res) => {
          this.heated = res[0].value.data.results;
          this.slider = res[1].value.data.results;
        })
        .finally(() => {
          this.setLoading(false);
        });
    },
    slideChanged(e) {
      const newSwiperEl = document.querySelector("#newSwiper");
      if (newSwiperEl && newSwiperEl?.swiper) {
        newSwiperEl.swiper.slideTo(e.activeIndex);
      }
    },
  },
};
</script>

<style lang="scss">
.main-slider {
  .gradient {
    background: linear-gradient(
      180deg,
      rgba(24, 35, 54, 0.95) 0%,
      rgba(24, 34, 54, 0.35) 72.4%,
      rgba(24, 35, 54, 0) 100%
    );
    backdrop-filter: blur(1rem);
    width: 100%;
  }
}

.swiper-horizontal .swiper-pagination-bullets {
  z-index: 1000 !important;
  width: 150px !important;
}

.swiper-pagination {
  .swiper-pagination-bullet {
    width: 14px !important;
    height: 14px !important;
    border: 1px solid rgba(255, 255, 255, 0.45) !important;
    border-radius: 50% !important;
    position: relative !important;
    flex-shrink: 0;
  }

  .swiper-pagination-bullet-active {
    border: 1px solid #ffffff;
    background: transparent;
  }
  .swiper-pagination-bullet-active:after {
    position: absolute !important;
    background: #ffffff !important;
    content: "" !important;
    width: 8px !important;
    height: 8px !important;
    border-radius: 50% !important;
    top: 2px;
    left: 2px;
  }
}

.news-slider-main-page {
  .swiper-slide {
    opacity: 0 !important;
    transition-property: opacity;
    transition-duration: 300ms;
    //   pointer-events: none;
  }
  .swiper-slide-active {
    opacity: 1 !important;
  }

  //background: rgba(26, 47, 83, 0.88);
  backdrop-filter: blur(8rem);
  .el-carousel {
    overflow: hidden !important;
  }

  .el-carousel__indicators {
    display: none;
  }
}

.main-slider {
  .main-bg-slider {
    height: 96vh;
    .el-carousel__container {
      height: 96vh;
      @media screen and (max-width: 1024px) {
        height: 60vh;
      }

      @media screen and (min-height: 1000px) {
        height: 800px !important;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .main-slider {
    .main-bg-slider {
      height: 50vh;
    }
  }
}

.slider-bg-img svg {
  width: 169px !important;
  height: 198px !important;
}
</style>
