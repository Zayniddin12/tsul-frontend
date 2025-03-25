<template>
  <div class="bg-[#F5F6FA] lifestyle">
    <div
      class="max-w-[1400px] mx-auto flex -1430:flex-col items-center -1024:flex-wrap py-[0] px-[16px] md:px-0 -410:px-0"
    >
      <div
        v-if="lifeStyleStudents && lifeStyleStudents.length > 0"
        class="max-w-[467px] min-w-[467px] sm:min-w-[373px] -1430:w-full h-[505px] -640:h-auto border-2 mx-auto"
        :class="{ 'border-0': pending }"
      >
        <div
          v-if="pending"
          class="h-[505px] sm:h-[210px] w-auto relative news-cards-wrapper _loading"
        ></div>

        <div class="group h-[505px] sm:h-[210px] w-auto relative news-cards-wrapper">

          <div>
            <img
              v-lazy="{ src: lifeStyleStudents[0]?.get_image?.middle }"
              class="absolute h-full w-full object-cover"
              :alt="lifeStyleStudents[0]?.title"
            />
            <div class="absolute inset-0 bg-blue-life bg-opacity-65"></div>
            <div
              class="bg-lifestyle flex flex-col h-full items-start justify-center relative pl-[80px] pb-[112px] pr-[32px] pt-[166px] sm:p-[20px]"
            >
              <Icon
                class="hover:scale-110 transition duration-150 pr-[40px] sm:pr-0 mx-auto sm:w-[36px] sm:mt-[20px] sm:h-[36px] cursor-pointer"
                name="play_video"
                @click="openModal()"
              />
              <h4
                class="text-left mt-[85px] sm:mt-[42rem] minion not-italic font-bold text-[32rem] sm:text-[28rem] leading-[130%] text-white group-hover:text-[#ffffffcb] line-clamp-2"
              >
                {{ lifeStyleStudents[0]?.title }}
              </h4>
              <div
                class="font-normal text-[15rem] leading-[140%] text-[#ffffffcc] line-clamp-2 mt-[10px]"
                v-html="lifeStyleStudents[0]?.description"
              ></div>
            </div>
            <light-box
              class="news-cards-wrapper"
              :videos="videosModal"
              :video-arr="embedYouTubeURL(videoLink)"
              :title-light-box="lifeStyleStudents[0]?.description"
              @close-modal="exitModal"
            />
          </div>
          <!--          <div>-->
          <!--            <img-->
          <!--              src="/src/static/img/default.svg"-->
          <!--              class="h-full w-full object-cover"-->
          <!--              alt="default image"-->
          <!--            />-->
          <!--          </div>-->
        </div>
      </div>
      <div class="ml-[48px] -1430:mt-[24px] -1430:ml-0 -1430:w-full" :class="classNameTabs">
        <div class="life-style__tab life-style__carousel -500:mb-6 px-0">
          <el-tabs v-model="tabs">
            <!-- klublar -->
            <el-tab-pane :label="$t('clubs')" name="first">
              <template v-if="ourClubs?.length">
                <Splide v-if="pending" :options="options">
                  <SplideSlide v-for="item in 3" :key="item">
                    <div>
                      <LifeStyleCardPr />
                    </div>
                  </SplideSlide>
                </Splide>
                <Splide v-else :options="options">
                  <SplideSlide v-for="item in ourClubs" :key="item">
                    <router-link :to="'/org/' + ourClubs[0]?.category.slug + '/' + item.slug">
                      <LifeStyleCard
                        :slug="item.slug"
                        :title="item.name"
                        :img="item?.get_image?.middle"
                      />
                    </router-link>
                  </SplideSlide>
                </Splide>
                <div class="all-btn md:!mb-[24px]">
                  <div v-if="pending" class="mt-[18px] w-[231px] _loading">
                    <Icon name="projects" />
                    <p class="font-text-15px">{{ $t("all_projects") }}</p>
                    <Icon name="arrow_right_button" />
                  </div>
                  <router-link
                    v-else
                    :to="'/org/' + ourClubs[0]?.category.slug"
                    class="learn-more-buttons mt-[18px] w-[231px] -500:!ml-0 !h-[56px]"
                  >
                    <Icon name="all_clubes" />
                    <p class="font-text-15px">{{ $t("all_clubs") }}</p>
                    <Icon name="arrow_right_button" />
                  </router-link>
                </div>
              </template>
              <NoData v-else class="!min-h-[300rem]" />
            </el-tab-pane>

            <!-- Projects -->

            <el-tab-pane :label="$t('projects')" name="second">
              <template v-if="projects?.length">
                <Splide v-if="pending" :options="options">
                  <SplideSlide v-for="item in 3" :key="item">
                    <div>
                      <LifeStyleCardPr />
                    </div>
                  </SplideSlide>
                </Splide>
                <Splide v-if="!pending" :options="options">
                  <SplideSlide v-for="item in projects" :key="item">
                    <router-link :to="'/projects/' + item.slug">
                      <LifeStyleCard
                        :slug="item.slug"
                        :title="item.name"
                        :img="item?.get_image?.middle"
                      />
                    </router-link>
                  </SplideSlide>
                </Splide>

                <div class="all-btn md:!mb-[24px]">
                  <div v-if="pending" class="mt-[18px] w-[231px] _loading">
                    <Icon name="projects" />
                    <p class="font-text-15px">{{ $t("all_projects") }}</p>
                    <Icon name="arrow_right_button" />
                  </div>

                  <router-link
                    v-else
                    :to="'/' + projects[0]?.category.slug"
                    class="learn-more-buttons mt-[18px] w-[231px] -500:!ml-0"
                  >
                    <Icon name="all_clubes" />
                    <p class="font-text-15px">{{ $t("all_projects") }}</p>
                    <Icon name="arrow_right_button" />
                  </router-link>
                </div>
              </template>
              <NoData v-else class="!min-h-[300rem]" />
            </el-tab-pane>

            <!-- ilmiy maktablar -->
            <el-tab-pane :label="$t('scientific_schools')" name="third">
              <template v-if="scientificSchools?.length">
                <Splide v-if="pending" :options="options">
                  <SplideSlide v-for="item in 3" :key="item">
                    <div>
                      <LifeStyleCardPr />
                    </div>
                  </SplideSlide>
                </Splide>
                <Splide v-else :options="options">
                  <SplideSlide v-for="item in scientificSchools" :key="item">
                    <router-link
                      :to="'/org/' + scientificSchools[0]?.category.slug + '/' + item.slug"
                    >
                      <LifeStyleCard
                        :slug="item.slug"
                        :title="item.name"
                        :img="item?.get_image?.middle"
                      />
                    </router-link>
                  </SplideSlide>
                </Splide>

                <div class="ml-[18px] md:mb-[24px]">
                  <div v-if="pending" class="mt-[18px] w-[231px] _loading">
                    <Icon name="projects" />
                    <p class="font-text-15px">{{ $t("all_projects") }}</p>
                    <Icon name="arrow_right_button" />
                  </div>
                  <router-link
                    v-if="scientificSchools"
                    :to="'/org/' + scientificSchools[0]?.category.slug"
                    class="learn-more-buttons mt-[18px] w-[231px]"
                  >
                    <Icon name="all_clubes" />
                    <p class="font-text-15px">{{ $t("all_schools") }}</p>
                    <Icon name="arrow_right_button" />
                  </router-link>
                </div>
              </template>
              <NoData v-else class="!min-h-[300rem]" />
            </el-tab-pane>

            <!--     Subjects       -->
            <el-tab-pane :label="$t('courses')" name="four">
              <template v-if="subjects?.length">
                <Splide v-if="pending" :options="options">
                  <SplideSlide v-for="item in 3" :key="item">
                    <div>
                      <LifeStyleCardPr />
                    </div>
                  </SplideSlide>
                </Splide>
                <Splide v-else :options="options">
                  <SplideSlide v-for="item in subjects" :key="item" class="!mr-[14px]">
                    <router-link :to="`/foundation/${item.slug}`">
                      <LifeStyleCard
                        :slug="item.slug"
                        :title="item.name"
                        :img="item?.get_image?.middle"
                      />
                    </router-link>
                  </SplideSlide>
                </Splide>

                <div class="all-btn md:!mb-[24px]">
                  <div v-if="pending" class="mt-[18px] w-[231px] _loading">
                    <Icon name="projects" />
                    <p class="font-text-15px">{{ $t("all_projects") }}</p>
                    <Icon name="arrow_right_button" />
                  </div>

                  <router-link
                    v-else
                    :to="'/foundation/'"
                    class="learn-more-buttons mt-[18px] w-[231px] -500:!ml-0"
                  >
                    <Icon name="all_clubes" />
                    <p class="font-text-15px">{{ $t("all_additional_lessons") }}</p>
                    <Icon name="arrow_right_button" />
                  </router-link>
                </div>
              </template>
              <NoData v-else class="!min-h-[300rem]" />
            </el-tab-pane>

            <!--     Festivals       -->
            <el-tab-pane :label="$t('festivals')" name="fifth">
              <template v-if="festivals?.length">
                <Splide v-if="pending" :options="options">
                  <SplideSlide v-for="item in 3" :key="item">
                    <div>
                      <LifeStyleCardPr />
                    </div>
                  </SplideSlide>
                </Splide>
                <Splide v-else :options="options">
                  <SplideSlide v-for="item in festivals" :key="item">
                    <router-link :to="'/org/' + item?.category.slug + '/' + item.slug">
                      <LifeStyleCard
                        :slug="item.slug"
                        :title="item.name"
                        :img="item?.get_image?.middle"
                      />
                    </router-link>
                  </SplideSlide>
                </Splide>

                <div class="all-btn md:!mb-[24px]">
                  <div v-if="pending" class="mt-[18px] w-[231px] _loading">
                    <Icon name="projects" />
                    <p class="font-text-15px">{{ $t("all_projects") }}</p>
                    <Icon name="arrow_right_button" />
                  </div>

                  <router-link
                    v-else
                    :to="'/org/' + festivals[0]?.category.slug"
                    class="learn-more-buttons mt-[18px] w-[231px] -500:!ml-0"
                  >
                    <Icon name="all_clubes" />
                    <p class="font-text-15px">{{ $t("all_festivals") }}</p>
                    <Icon name="arrow_right_button" />
                  </router-link>
                </div>
              </template>
              <NoData v-else class="!min-h-[300rem]" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
export default {
  components: {
    Splide,
    SplideSlide,
  },
  props: {
    lifeStyleStudents: {
      type: Object,
      default: () => {},
    },
    ourClubs: {
      type: Object,
      default: () => {},
    },
    projects: {
      type: Object,
      default: () => {},
    },
    scientificSchools: {
      type: Object,
      default: () => {},
    },
    subjects: {
      type: Array,
      default: () => [],
    },
    festivals: {
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
      videosModal: false,
      tabs: "first",
      options: {
        rewind: false,
        perPage: 3,
        perMove: 1,
        arrows: true,
        pagination: false,
        type: "slide",
        breakpoints: {
          1120: {
            perPage: 2,
            perMove: 1,
            spaceBetween: 20,
          },
          860: {
            perPage: 2,
            spaceBetween: 20,
            perMove: 1,
          },
          600: {
            perPage: 2,
            perMove: 1,
            spaceBetween: 20,
          },
          450: {
            perPage: 1,
            perMove: 1,

          },
        },
      },
      videoLink: undefined,
    };
  },
  computed: {
    ...mapState({
      foundation: (state) => state.foundation.foundation,
    }),
    classNameTabs() {
      if (this.tabs == "first") {
        return this.ourClubs?.length ? "w-[876px]" : "w-full";
      } else if (this.tabs == "second") {
        return this.projects?.length ? "w-[876px]" : "w-full";
      } else if (this.tabs == "third") {
        return this.scientificSchools?.length ? "w-[876px]" : "w-full";
      } else if (this.tabs == "four") {
        return this.subjects?.length ? "w-[876px]" : "w-full";
      } else if (this.tabs == "fifth") {
        return this.festivals?.length ? "w-[876px]" : "w-full";
      } else {
        return "w-[876px]";
      }
    },
  },

  methods: {
    openModal() {
      this.videosModal = !this.videosModal;
      this.videoLink = this.lifeStyleStudents[0].video;
    },
    embedYouTubeURL(url) {
      if (!url) return url;
      return url.replace(
        /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
        "https://www.youtube.com/embed/$1"
      );
    },

    exitModal() {
      this.videosModal = false;
      this.videoLink = "";
    },
  },
};
</script>

<style lang="scss">
.interactive__top-btns {
  @media only screen and (max-width: 450px) {
    margin-bottom: 12px !important;
    flex-wrap: wrap;
    justify-content: center !important;
  }
}
.el-tabs__nav {
  @media only screen and (max-width: 450px) {
    flex-wrap: wrap;
    justify-content: center !important;
    .el-tabs__item {
      margin-bottom: 8px !important;
    }
  }
}
.bg-blue-life {
  background: linear-gradient(180deg, rgba(26, 47, 83, 0.51) 0%, #1a2f53 100%);
}
.el-tabs__nav-wrap.is-scrollable.is-top {
  @media only screen and (max-width: 450px) {
    padding: 0 !important;
  }
}
.el-tabs__nav-wrap::after {
  @media only screen and (max-width: 450px) {
    display: none !important;
  }
}
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
  background-position: left 285px;
  background-size: 150px;
}

.life-style__tab {
  //  margin-top: 20px;
  width: 100%;
  padding: 30px 0px;

  @media only screen and (max-width: 768px) {
    padding: 0;
  }
  .el-tabs__header {
    .el-tabs__nav-wrap {
      .el-tabs__nav-scroll {
        .el-tabs__nav {
          .el-tabs__item {
            &:hover {
              background: #385a94;
              color: #ffffff !important;
            }
            white-space: initial;
            //text-align: center;
            font-family: "Inter";
            height: 40px;
            font-style: normal;
            font-weight: 500;
            justify-content: center;
            font-size: 15rem;
            line-height: 20px;
            color: #677b9e !important;
            padding: 12px;
            border-bottom: 2px solid #e0e5ec;
            transition: all ease-in 0.3s;
            &:hover {
              background: #1a2f53;
              color: #ffffff !important;
            }
            &.is-active {
              color: #1a2f53 !important;
              border-bottom: 2px solid #1a2f53 !important;
              &:hover {
                background: #1a2f53;
                color: #ffffff !important;
              }
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
      margin-right: 14px !important;
    }
    .splide__slide.is-prev {
      // margin-left: -6px !important;
      // visibility: hidden;

      @media screen and (max-width: 400px) {
        margin-left: 0;
      }
    }

    @media screen and (max-width: 768px) {
      padding-top: 0;
    }
  }
  .el-tabs__nav-wrap {
    //    margin-left: 20px;

    @media screen and (max-width: 500px) {
      margin-left: 0;
    }
  }
  .splide,
  .el-tabs__header,
  .all-btn {
    width: 96%;
    margin-left: auto;
    margin-right: auto;

    @media screen and (max-width: 768px) {
      width: 92%;
    }
    // @media screen and (max-width: 500px) {
    //   width: 90%;
    // }
    // @media screen and (max-width: 365px) {
    //   margin-left: 10px;
    //   margin-right: 10px;
    // }
  }
  .splide {
    @media screen and (max-width: 500px) {
      width: 95%;
      margin-left: auto;
    }
    @media screen and (max-width: 400px) {
      width: 98%;
    }
  }
  .splide__arrow--prev {
    left: -14px;

    @media screen and (max-width: 500px) {
      left: 8px;
    }
  }
  .splide__arrow--next {
    right: -4px;
    @media screen and (max-width: 1300px) {
      right: -13px;
    }
    @media screen and (max-width: 500px) {
      right: 10px;
    }
  }
  .splide__list {
    @media screen and (max-width: 500px) {
      gap: 16px;
    }
    .splide__slide {
      //  margin-right: 10px !important;
    }
  }
  // .group {
  //   width: 100%;
  // }
  .is-prev {
    margin-left: -6px !important;
  }
  @media screen and (max-width: 500px) {
  }
}

.life-style__carousel {
  // max-width: 840px;

  //  #pane-third .splide__track {
  //     padding-left: 17px !important;
  //  }

  .splide__arrow--prev {
    background: #ffffff;
    border: 1.6px solid #e0e5ec;
    box-sizing: border-box;
    border-radius: 0;
    width: 32px;
    height: 32px;
    opacity: 1;
    transition: 0.3s ease-in-out;
    &:hover {
      background: #e0e9f7;
    }
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
    transition: 0.3s ease-in-out;
    &:hover {
      background: #e0e9f7;
    }

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
