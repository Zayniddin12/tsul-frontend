<template>
  <div class="bg-[#F5F6FA] flex items-center justify-center">
    <div
      class="
        max-w-[1440px]
        mx-auto
        py-[36px]
        sm:py-[12px]
        cursor-pointer
        flex
        items-start
      "
    >
      <div class="grid grid-cols-12 gap-[24px]">
        <div class="col-span-4 -1300:col-span-12">
          <div class="group h-[500px] relative">
            <img
              class="absolute h-full w-full object-cover _loading"
              alt=""
              src=""
            />
            <div class="absolute inset-0 bg-[#1a2f535d] bg-opacity-65"></div>
            <div
              class="
                bg-lifestyle
                flex flex-col
                h-full
                items-start
                justify-center
                relative
                p-[50px]
              "
            >
              <Icon
                class="duration-150 group-hover:translate-y-[15px] mx-auto"
                name="play_video"
              />
              <!-- <h4
                class="
                  text-left
                  mt-[80px]
                  minion
                  not-italic
                  font-bold
                  !text-[32rem]
                  text-white
                  group-hover:text-[#ffffffcb]
                  _loading
                "
              >
                Talabalar hayoti
              </h4>
              <p
                class="
                  text-normal text-[15rem]
                  leading-[140%]
                  text-[#ffffffcc]
                  mt-[12px]
                  _loading
                "
              >
                Talabalar hayoti bilan tanishish uchun video roligimizni tomosha
                qiling.
              </p> -->
            </div>
          </div>
        </div>
        <div class="col-span-8 -1300:col-span-12">
          <!-- tabs -->
          <div class="life-style__tab life-style__carousel">
            <el-tabs v-model="activeName" class="">
              <el-tab-pane label="Loyihalar" name="first">
              
                <Splide :options="options">
                  <SplideSlide v-for="(item, index) in clubs" :key="index">
                    <router-link to="/">
                      <LifeStyleCard
                        :slug="item.slug"
                        :title="item.title"
                        :img="item.img"
                      />
                    </router-link>
                  </SplideSlide>
                </Splide>

                <router-link
                  to="/news"
                  class="learn-more-buttons w-[251px] mt-[24px] :md:w-[231px]"
                >
                  <Icon name="all_clubes" />
                  <p class="text-[15rem]">{{ $t("all_clubs") }}</p>
                  <Icon name="arrow_right_button" />
                </router-link>

                
              </el-tab-pane>
              <el-tab-pane label="Klublar" name="second">
                <Splide :options="options" class="works-slide">
                  <SplideSlide v-for="item in clubs" :key="item">
                    <router-link to="/">
                      <LifeStyleCard
                        :slug="item.slug"
                        :title="item.title"
                        :img="item.img"
                      />
                    </router-link>
                  </SplideSlide>
                </Splide>
                <router-link
                  to="/news"
                  class="learn-more-buttons w-[251px] mt-[24px] :md:w-[231px]"
                >
                  <Icon name="all_clubes" />
                  <p class="font-text-15px">{{ $t("all_clubs") }}</p>
                  <Icon name="arrow_right_button" />
                </router-link>
              </el-tab-pane>
              <el-tab-pane label="Ilmiy maktablar" name="third">
                <Splide :options="options" class="works-slide">
                  <SplideSlide v-for="item in clubs" :key="item">
                    <router-link to="/">
                      <LifeStyleCard
                        :slug="item.slug"
                        :title="item.title"
                        :img="item.img"
                      />
                    </router-link>
                  </SplideSlide>
                </Splide>
                <router-link
                  to="/news"
                  class="learn-more-buttons w-[251px] mt-[24px] :md:w-[231px]"
                >
                  <Icon name="all_clubes" />
                  <p class="font-text-15px">{{ $t("all_clubs") }}</p>
                  <Icon name="arrow_right_button" />
                </router-link>
              </el-tab-pane>
              <el-tab-pane label="To‘garaklar" name="fourth">
                <Splide :options="options" class="works-slide">
                  <SplideSlide v-for="item in clubs" :key="item">
                    <router-link to="/">
                      <LifeStyleCard
                        :slug="item.slug"
                        :title="item.title"
                        :img="item.img"
                      />
                    </router-link>
                  </SplideSlide>
                </Splide>
                <router-link
                  to="/news"
                  class="learn-more-buttons w-[251px] mt-[24px] :md:w-[231px]"
                >
                  <Icon name="all_clubes" />
                  <p class="font-text-15px">{{ $t("all_clubs") }}</p>
                  <Icon name="arrow_right_button" />
                </router-link>
              </el-tab-pane>
              <el-tab-pane label="Festivallar" name="fifty">
                <Splide :options="options" class="works-slide">
                  <SplideSlide v-for="item in clubs" :key="item">
                    <router-link to="/">
                      <LifeStyleCard
                        :slug="item.slug"
                        :title="item.title"
                        :img="item.img"
                      />
                    </router-link>
                  </SplideSlide>
                </Splide>
                <router-link
                  to="/news"
                  class="learn-more-buttons w-[251px] mt-[24px] :md:w-[231px]"
                >
                  <Icon name="all_clubes" />
                  <p class="font-text-15px">{{ $t("all_clubs") }}</p>
                  <Icon name="arrow_right_button" />
                </router-link>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
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
      activeName: "first",
      options: {
        rewind: true,
        gap: "20px",
        perPage: 3,
        perMove: 1,
        arrows: true,
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
      clubs: [
        {
          img: "https://picsum.photos/200/200",
          title: "“Zakovat” klubi",
          slug: "saddsdsada",
        },
        {
          img: "https://picsum.photos/200/200",
          title: "“Zakovat” klubi",
          slug: "saddsdsada",
        },
        {
          img: "https://picsum.photos/200/200",
          title: "“Zakovat” klubi",
          slug: "saddsdsada",
        },
        {
          img: "https://picsum.photos/200/200",
          title: "“Zakovat” klubi",
          slug: "saddsdsada",
        },
        {
          img: "https://picsum.photos/200/200",
          title: "“Zakovat” klubi",
          slug: "saddsdsada",
        },
        {
          img: "https://picsum.photos/200/200",
          title: "“Zakovat” klubi",
          slug: "saddsdsada",
        },
        {
          img: "https://picsum.photos/200/200",
          title: "“Zakovat” klubi",
          slug: "saddsdsada",
        },
        {
          img: "https://picsum.photos/200/200",
          title: "“Zakovat” klubi",
          slug: "saddsdsada",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.el-carousel__container {
  .el-carousel__arrow--left {
    background: #ffffff;
    border: 1.6px solid #e0e5ec;
    box-sizing: border-box;
    border-radius: 0;
    &:after {
      content: "";
      display: block;
      background: url("@/static/img/chev-left.png") no-repeat;
      width: 20px;
      height: 20px;
      position: absolute;
      top: 26%;
      left: 27%;
    }
  }

  .el-carousel__arrow--right {
    background: #ffffff;
    border: 1.6px solid #e0e5ec;
    box-sizing: border-box;
    border-radius: 0;
    &:after {
      content: "";
      display: block;
      background: url("@/static/img/chev-right.png") no-repeat;
      width: 20px;
      height: 20px;
      position: absolute;
      top: 26%;
      left: 40%;
    }
  }
}

.bg-lifestyle {
  background: url("@/static/img/bg-lifestyle.png");
  background-repeat: no-repeat;
  background-position: left bottom;
  background-size: 150px;
}

.life-style__tab {
  //  margin-top: 20px;
  .el-tabs__header {
    .el-tabs__nav-wrap {
      .el-tabs__nav-scroll {
        .el-tabs__nav {
          .el-tabs__item {
            font-family: "Inter";
            font-style: normal;
            font-weight: 500;
            font-size: 15rem;
            line-height: 20px;
            color: #677b9e !important;
            padding-bottom: 10px;
            border-bottom: 2px solid #e0e5ec;
             white-space: initial;
    text-align: center;
            &.is-active {
              color: #1a2f53 !important;
              border-bottom: 2px solid #1a2f53 !important;
            }
          }

          .el-tabs__active-bar {
            background: transparent !important;
          }
        }
      }
    }
  }
  .el-tabs__content {
    margin-top: 32px;

    .splide__slide {
      margin: 0 !important;
    }

    @media screen and (max-width: 768px) {
      padding-top: 0;
    }
  }
}

.life-style__carousel {
  // max-width: 840px;

  // .splide__track {
  //    margin-left: 23px;
  //  }

  .splide__arrow--prev {
    background: #ffffff;
    border: 1.6px solid #e0e5ec;
    box-sizing: border-box;
    border-radius: 0;
    width: 32px;
    height: 32px;
    opacity: 1;
    &:after {
      content: "";
      display: block;
      background: url("@/static/img/chev-left.png") no-repeat;
      width: 20px;
      height: 20px;
      position: absolute;
      top: 26%;
      left: 27%;
    }
    svg {
      display: none;
    }
  }

  .splide__arrow--next {
    background: #ffffff;
    border: 1.6px solid #e0e5ec;
    box-sizing: border-box;
    border-radius: 0;
    width: 32px;
    height: 32px;
    opacity: 1;

    &:after {
      content: "";
      display: block;
      background: url("@/static/img/chev-right.png") no-repeat;
      width: 20px;
      height: 20px;
      position: absolute;
      top: 26%;
      left: 35%;
    }
    svg {
      display: none;
    }
  }
}
</style>
