<template>
  <div class="bg-[#F5F6FA]">
    <div v-if="pending">
      <div class="relative main-slider">
        <div class="absolute w-[100%] z-[2] flex flex-col justify-between h-[100%]">
          <div class="min-h-[40vh]"></div>
          <div class="container">
            <div>
              <div
                class="news-slider-main-page pt-[44rem] pr-[76rem] pb-[24rem] pl-[76rem] w-[68%] -1170:w-[100%] h-[100%] -1000:pt-[22rem] -1000:pb-[12rem] -1000:pr-[22rem] -1000:pl-[22rem] relative"
              >
                <p
                  class="font-semibold text-[15rem] leading-[130%] uppercase text-[#96A5BD] _loading"
                >
                  asdasdasdasdasdsadasd sa dsa dsa das
                </p>
                <div class="w-[50rem] h-[2rem] bg-[#fff] mt-[12rem]"></div>
                <el-carousel
                  ref="newsSlider"
                  class="newsSlider"
                  trigger="click"
                  arrow="never"
                  width="100%"
                  :loop="true"
                  :autoplay="true"
                  :interval="1000"
                  indicator-position="none"
                >
                  <el-carousel-item
                    v-for="(items, indexes) in 6"
                    :key="indexes"
                    class="h-[70%] flex flex-col justify-between _loading"
                  >
                    <router-link :to="`/news/asd`">
                      <h1
                        class="_loading section-titles line-clamp-2 text-[#fff] text-left items-start mt-[24rem] mb-[12rem] -848:line-clamp-3 transition-all duration-200 hover:opacity-60"
                      >
                        asdasdasdas
                      </h1>
                    </router-link>
                    <div
                      class="desciption-texts mb-[16rem] -848:line-clamp-4 line-clamp-2 _loading"
                    >
                      asdasdasd asd as das das das
                    </div>
                    <router-link
                      :to="`/news/sadasd`"
                      class="learn-more-buttons w-[155rem] h-[40px] _loading"
                    >
                      <p class="_loading">asdas das</p>
                      <Icon name="arrow_right_button" />
                    </router-link>
                  </el-carousel-item>
                </el-carousel>
                <Icon class="absolute right-0 bottom-0" name="bg_pattern" />
              </div>
            </div>
          </div>
        </div>
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

          <div
            class="arrows absolute bottom-[25.5rem] right-[248rem] z-[2] flex justify-between w-[150px] cursor-pointer -1000:right-[0]"
          >
            <Icon name="slider_arrow_left" @click="slidersPrev()" />
            <Icon name="slider_arrow_right" @click="slidersNext()" />
          </div>
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
              v-if="pending"
              class="news-slider-main-page bg-[rgba(26,47,83,0.88)] pt-[44rem] pr-[76rem] pb-[24rem] pl-[76rem] w-[68%] -1170:w-[100%] h-[100%] -1000:pt-[22rem] -1000:pb-[12rem] -1000:pr-[22rem] -1000:pl-[22rem] _loading relative"
            >
              <p class="font-semibold text-[15rem] leading-[130%] uppercase text-[#96A5BD]">
                {{ $t("news_title") }}
              </p>
              <div class="w-[50rem] h-[2rem] bg-[#fff] mt-[12rem]"></div>
              <el-carousel
                ref="newsSlider"
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
              <el-carousel
                ref="newsSlider"
                class="newsSlider"
                trigger="click"
                arrow="never"
                width="100%"
                :loop="true"
                :autoplay="false"
                :interval="5000"
                indicator-position="none"
              >
                <el-carousel-item
                  v-for="(items, indexes) in slider"
                  :key="indexes"
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
                  <a :href="`${items.button_link}`" target="_blank">
                    <h1
                      class="section-titles line-clamp-2 text-[#fff] text-left items-start mt-[15rem] -848:line-clamp-3 transition-all duration-200 hover:opacity-60"
                    >
                      {{ items.title }}
                    </h1>
                  </a>
                  <div
                    v-if="items?.description"
                    class="desciption-texts mb-[16rem] line-clamp-2"
                    v-html="items.description"
                  ></div>
                  <a
                    v-if="items?.button_link"
                    :href="`${items.button_link}`"
                    class="learn-more-buttons text-[#1A2F53] text-[15rem] font-medium max-w-[185px] !py-[10px] h-[40px] sm:mt-[10px]"
                  >
                    <p v-if="items?.button_text">
                      {{ items.button_text }}
                    </p>
                    <Icon name="arrow_right_button" />
                  </a>
                </el-carousel-item>
              </el-carousel>
              <Icon
                class="absolute right-0 bottom-0 w-[169px] h-[198px] slider-bg-img"
                name="bg_pattern"
              />
            </div>
          </div>
        </div>
      </div>
      <el-carousel
        ref="mainBgSlider"
        class="main-bg-slider relative"
        trigger="click"
        arrow="never"
        type="fade"
        :loop="true"
        :autoplay="true"
        :interval="3000"
        @change="changeSecond"
      >
        <el-carousel-item v-for="(item, index) in slider" :key="index">
          <img
            v-lazy="{ src: item?.get_image?.origin }"
            class="w-full object-cover h-[100%]"
            :alt="item.title"
          />
        </el-carousel-item>
        <div
          :class="[
            { '!w-[150px]': slider.length > 2 },
            { '!w-[170px]': slider.length > 3 },
            { '!w-[190px]': slider.length > 4 },
            { '!w-[210px]': slider.length > 5 },
          ]"
          class="arrows absolute bottom-[25.5rem] right-[248rem] z-[2] flex justify-between w-[120px] cursor-pointer -1000:right-[0] -1345:right-[150rem]"
        >
          <Icon name="slider_arrow_left" @click="slidersPrev()" />
          <Icon name="slider_arrow_right" @click="slidersNext()" />
        </div>
      </el-carousel>
    </div>

    <div
      v-if="heated && heated.length"
      class="bg-[#F5F6FA] relative z-[5] border-t-[1.6rem] border-t-[solid] border-t-[#E0E5EC] border-b-[1.6rem] border-b-[solid] border-b-[#E0E5EC] p-[7rem] lg:hidden"
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
export default {
  data() {
    return {
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

  methods: {
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
      this.pending = true;
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
          this.pending = false;
        });
    },
    changeSecond(activeIndex) {
      this.$refs.newsSlider.setActiveItem(activeIndex);
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

.news-slider-main-page {
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
.slider-bg-img svg {
  width: 169px !important;
  height: 198px !important;
}
</style>
