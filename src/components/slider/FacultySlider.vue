<template>
  <div class="relative bg-white">
    <div class="relative grid grid-cols-12 -768:block -768:!p-0">
      <div class="col-span-4 -768:flex-center-center">
        <FacultySliderEduPr v-if="pending" />
        <div v-else class="w-full">
          <div
            v-if="education && education.length"
            class="md:hidden z-30 text-center transition-all md:mx-auto cursor-pointer relative group"
          >
            <div
              class="hover:opacity-[0.7] transition flex items-center justify-center gap-[8rem] bg-[#1A2F53] w-[193rem]"
            >
              <icon name="buger" />
              <span class="text-[13rem] py-[12px] block text-white">
                {{ $t("education_program") }}
              </span>

              <div
                v-if="education && education.length"
                class="faculty-education absolute top-0 right-0 shadow transition-all duration-300 w-0 translate-x-40 overflow-hidden opacity-0 group-hover:opacity-100 group-hover:w-auto group-hover:translate-x-0"
              >
                <div
                  v-for="(item, index) in education"
                  :key="index"
                  class="!bg-[#FFFFFF] transition hover:!text-[#2E4B7C] text-[#677B9E] relative -mt-px border-[1.6px] border-b-[#E0E5EC] w-[220rem] border-b font-semibold text-[13rem] py-[16px] px-[30px] el-collapse-item__header"
                >
                  <router-link
                    :to="`/curricula/${item?.slug}`"
                    class="text-[14rem] line-clamp-3 !text-left"
                    >{{ item?.name }}</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <FacultySliderTextPr v-if="pending" />
        <div
          v-else
          class="absolute faculty-news left-50 -768:!left-[16px] -768:!right-[16px] bottom-0 -765:bottom-[-107rem] !z-[10] w-[605rem]"
        >
          <div
            class="bg-[#F5F6FA] news_sliders px-[78rem] pt-[29rem] pb-[74rem] -425:px-[20rem] -425:pt-[20rem] -768:pb-0"
          >
            <el-carousel
              ref="newsSlider"
              trigger="click"
              class="faculty-slider"
              arrow="never"
              :loop="true"
              :height="heightNews"
              @change="changeCarousel"
            >
              <el-carousel-item
                v-for="(items, index) in sliderNews"
                :id="items.slug"
                :key="index"
                class="newsSliderDepartment"
                :data-link="items.buttonLink"
                :data-active="index"
              >
                <span
                  class="mb-[12rem] line-clamp-1 not-italic font-semibold text-[15rem] leading-[130%] uppercase text-[#677B9E]"
                  >{{ items.status }}</span
                >

                <hr class="border-[1px] border-[#E6E8ED] w-[50rem] h-[1px] mt-[12rem] mb-[24rem]" />
                <h6
                  class="mb-[20rem] line-clamp-2 minion not-italic font-bold text-[32rem] leading-[130%] text-[#1A2F53]"
                >
                  {{ items.title }}
                </h6>
                <p
                  class="not-italic font-normal line-clamp-3 max-w-[411rem] text-[15rem] leading-[140%] text-[#677B9E]"
                  v-html="items.description"
                ></p>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="grid grid-cols-6">
            <div class="col-span-4 bg-[#FFFFFF] -768:col-span-6">
              <div
                class="flex items-center justify-end -768:justify-center -768:mt-[16rem] -768:mr-0 mr-[70px] h-full"
              >
                <div
                  v-if="sliderNews.length > 1"
                  :class="[
                    { 'mr-[28px]': sliderNews.length === 3 },
                    { 'mr-[56px]': sliderNews.length === 4 },
                    { 'mr-[72px]': sliderNews.length === 5 },
                  ]"
                  class="arrows z-[2] flex items-center justify-between w-[180px] cursor-pointer mr-[15px] md:hidden"
                >
                  <Icon color="#1a2f5373" name="slider_arrow_left" @click="slidersPrev()" />
                  <ul v-if="sliderNews.length > 1" class="flex gap-[14px]">
                    <li
                      v-for="i in sliderNews.length"
                      :key="i"
                      class="w-[10px] h-[10px] rounded-[5px] border border-[#1A2F5373]"
                      :class="{ '!border-[#1A2F53] active-dot': activeIndex === i - 1 }"
                      @click="getCarouselItem(i - 1)"
                    >
                      {{ i }}/{{ activeIndex }}
                    </li>
                  </ul>
                  <Icon color="#1a2f5373" name="slider_arrow_right" @click="slidersNext()" />
                </div>
              </div>
            </div>
            <p
              class="inline-flex col-span-2 -768:absolute -768:flex-center-between -768:border-[1.6px] -768:border-[#E0E5EC] -768:bottom-[30rem] -768:left-[80rem] -425:left-[20rem] bg-[#1A2F53] justify-center hover:bg-[#1b3d77] transition cursor-pointer py-[19rem] px-[10rem] h-[57px] flex-center z-20 -768:py-[8rem] -768:px-[12rem] -768:w-[155rem] -768:bg-[#FFFFFF]"
              @click="updateRouteWithCurrentActiveLink"
            >
              <span
                class="not-italic -768:text-[#1A2F53] font-semibold text-[15rem] leading-[130%] uppercase text-white"
              >
                {{ buttonText }}
              </span>
              <icon v-if="width < 768" name="gray_arrow32" class="arrow w-[24rem] h-[24rem]" />
            </p>
          </div>
        </div>
      </div>
      <div v-if="pending" class="_loading w-[869rem] h-[613rem] -768:mt-[20px]"></div>
      <div v-else class="col-span-8 -768:mt-[20px]">
        <el-carousel
          v-if="imgs && imgs.length"
          ref="mainBgSlider"
          class="!z-[5]"
          trigger="click"
          arrow="never"
          :loop="true"
          indicator-position="none"
          :height="heightImg"
        >
          <el-carousel-item v-for="(item, index) in imgs" :key="index">
            <img
              :src="item"
              class="w-[869rem] !h-[615px] -768:w-full border-[2px] border-[#F5F6FA] -568:h-[400rem] object-cover"
              alt="slider-image"
            />
          </el-carousel-item>
        </el-carousel>
        <img
          v-else
          src="/src/static/img/default.svg"
          class="max-w-[836px] w-full h-[616px] object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  props: {
    sliderNews: Array,
    imgs: Array,
    pending: Boolean,
    facultyName: String,
    education: Array,
    buttonText: String,
    buttonLink: String,
  },
  data() {
    return {
      // subLinks: [
      //   { title: this.$t("admission_bachelor"), link: "/static/admission-to-bachelor" },
      //   { title: this.$t("admission_magister"), link: "/static/admission-to-magister" },
      //   { title: this.$t("education_program"), link: "/curricula" },
      // ],
      width: window.innerWidth,
      heightNews: "295px",
      heightImg: "613px",
      activeIndex: 1,
    };
  },

  mounted() {
    this.changeCarousel();
    if (this.width < 768 && this.width > 425)
      this.width < 768 ? (this.heightNews = "270px") : (this.heightNews = "295px");
    if (this.width < 425 && this.width > 375)
      this.width < 425 ? (this.heightNews = "250px") : (this.heightNews = "295px");
    if (this.width < 375 && this.width > 0)
      this.width < 375 ? (this.heightNews = "280px") : (this.heightNews = "295px");
    if (this.width < 569 && this.width > 0)
      this.width < 569 ? (this.heightImg = "400px") : (this.heightImg = "613px");
  },
  methods: {
    router() {
      return router;
    },
    getCarouselItem(i) {
      if (i < this.activeIndex) {
        this.$refs.mainBgSlider.prev();
        this.$refs.newsSlider.prev();
      } else {
        this.$refs.mainBgSlider.next();
        this.$refs.newsSlider.next();
      }
    },
    changeCarousel() {
      const sliders = document.querySelectorAll(".newsSliderDepartment");
      const activeSlider = Array.from(sliders).find((slider) =>
        slider.classList.contains("is-active")
      );

      if (activeSlider) {
        this.activeIndex = +activeSlider.getAttribute("data-active");
      }
    },
    updateRouteWithCurrentActiveLink() {
      const sliders = document.querySelectorAll(".newsSliderDepartment");
      const activeSlider = Array.from(sliders).find((slider) =>
        slider.classList.contains("is-active")
      );

      if (activeSlider) {
        const newUrl = activeSlider.getAttribute("data-link");
        window.location.replace(newUrl);
      }
    },
    slidersNext() {
      this.$refs.mainBgSlider.next();
      this.$refs.newsSlider.next();
      if (this.activeIndex === this.sliderNews.length - 1) {
        this.activeIndex = 0;
      } else this.activeIndex += 1;
    },
    slidersPrev() {
      this.$refs.mainBgSlider.prev();
      this.$refs.newsSlider.prev();
      if (this.activeIndex === 0) {
        this.activeIndex = this.sliderNews.length - 1;
      } else this.activeIndex -= 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.active-dot {
  position: relative;
}
.active-dot::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background: #1a2f53;
}
.faculty-news {
  @media (max-width: 768px) {
    width: calc(100% - 32px);
  }
}

// .container {
//   padding: 0 !important;
// }

.education-prog-list {
  opacity: 0;
  position: absolute;
  top: 0;
  transition: all ease 0.3s;
  z-index: 11;
  left: 169px;
  width: 241px;
  pointer-events: none;

  @media screen and (max-width: 768px) {
    top: 40px;
    left: -24px;
  }
}

.education-prog:hover .education-prog-list {
  opacity: 1;
  pointer-events: auto;
}

.education-prog-list li:hover {
  background: rgba(142, 167, 211, 0.2);
}
</style>

<style lang="scss">
@import "../../assets/styles/mixins";

.news_sliders {
  &::after {
    content: url("@/static/img/faculty-slider.png");
    position: absolute;
    bottom: 20px;
    right: 0;
  }
}

.faculty-slider {
  position: relative !important;
  overflow-x: clip !important;

  // .el-carousel__arrow {
  //   display: none;
  // }

  .el-carousel__indicators {
    z-index: 80;
    left: inherit;
    display: flex;
    @include adaptiv(bottom, -110, -107);
    @include adaptiv(left, 140, 140);

    @media (max-width: 768px) {
      display: none;
      //@include adaptiv(bottom, -45, -33);
      right: 50%;
      transform: translate(50%, 0);
    }

    .is-active {
      background: #1a2f53 !important;
      border: 2px solid white !important;
      opacity: 1;
      outline: 2px solid #1a2f53 !important;
    }
  }

  .el-carousel__indicator {
    margin-right: 7px;
    margin-left: 7px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    padding: 1px;
    border: 2px solid rgba(26, 47, 83, 0.45);
    box-sizing: border-box;

    button {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      opacity: 0;
      transition: 0.3s all;
    }
  }
}

.faculty-education {
  .el-collapse-item__header::before {
    content: " ";
    display: block;
    position: absolute;
    top: 43%;
    left: 12px;
    width: 10px;
    height: 10px;
    background-repeat: no-repeat;
    transition: all 0.3s ease-in-out;
    background-image: url("@/static/img/collapse-romb.png");
  }
}
.curricula-list {
  background: #fff;
  box-shadow: 0 -8px 54px 0 rgba(0, 0, 0, 0.15), 0 2px 6px 0 rgba(0, 0, 0, 0.11);
}
</style>
