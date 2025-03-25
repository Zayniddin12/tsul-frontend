<template>
  <div class="slider">
    <div class="mb-[28px] flex items-center justify-between">
      <h4
        class="
          minion
          not-italic
          font-bold
          text-[32rem]
          -400:text-[20rem]
          leading-[130%]
          text-[#1A2F53]
          line-clamp-2
        "
      >
        {{ title }}
      </h4>

      <router-link
        :to="link"
        class="
          all_articles
          transition
          flex
          items-center
          justify-between
          gap-[8rem]
          hover:bg-[#cfd3d7]
          cursor-pointer
          bg-[#EAF0F5]
          py-[14rem]
          px-[22rem]
          -420:py-[7rem] -420:px-[15rem]
        "
      >
        <span
          class="not-italic font-medium text-[14rem] leading-[16rem] uppercase text-[#1A2F53]"
          >{{ btnText }}</span
        >
        <icon name="arrow_right" />
      </router-link>
    </div>
    <div v-if="type === 'news'" class="news-carusel">
      <Splide :options="options" :has-track="false">
         <SplideSlide v-for="(item, index) in list" :key="index">
          <div>
            <news-card-pr v-if="pending" :height="height" />
            <news-card
              v-else
              :is-news="isNews"
              :image="item?.get_image?.middle"
              :description="item.description"
              :tag="item.status"
              :title="item.title"
              :date="item.event_date"
              :slug="`/news/${item.slug}`"
              :height="height"
              :width="width"
            />
          </div>
        </SplideSlide>
      </Splide>
    </div>
    <div v-if="type === 'announcement'" class="announcement-carusel">
      <Splide :options="options2">
        <SplideSlide v-for="(item, index) in list" :key="index">
          <div>
            <announcements-card-pr v-if="pending" />
            <announcements-card
              :date="item.event_date"
              :title="item.title"
              :description="item.description"
              :slug="item.slug"
              :bg="'#fff'"
            />
          </div>
        </SplideSlide>
      </Splide>
    </div>
  </div>
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
  props: {
    type: {
      type: String,
      default: "news",
    },
    list: {
      type: Array,
      default: () => [],
    },
    height: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    btnText: {
      type: String,
      default: "",
    },
    isNews: {
      type: Boolean,
      default: true,
    },
    pending: {
      type: Boolean,
      default: false,
    },
  },



  data() {
    return {
      options: {
        rewind: true,
        rewindSpeed:500,
        speed:400,
        gap: "19px",
        perPage: 4,
        perMove: 4,
        arrows: true,
        pagination: true,
        type: "slide",
        role: "region",
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
            perPage: 2,
            perMove: 1,
            // pagination: false,
          },
          600: {
            perPage: 1,
            perMove: 1,
          },
        },
      },
      options2: {
        gap: "19px",
        perPage: 3,
        perMove: 3,
        arrows: true,
        pagination: true,
        type: "slide",
        snap: true,
        drag: 'free',
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
    };
  },

};
</script>

<style lang="scss">
.news-carusel {
  .splide__pagination {
    top: 109%;
  }
  .splide__arrow--prev {
    @media screen and (max-width: 600px) {
      left: 19% !important;
    }
    @media screen and (max-width: 535px) {
      left: 15% !important;
    }
    @media screen and (max-width: 475px) {
      left: 10% !important;
    }
    @media screen and (max-width: 475px) {
      left: 10px !important;
      display: flex !important;
    }
  }
  .splide__arrow--next {
    @media screen and (max-width: 600px) {
      right: 19% !important;
    }
    @media screen and (max-width: 535px) {
      right: 15% !important;
    }
    @media screen and (max-width: 475px) {
      right: 10% !important;
    }
    @media screen and (max-width: 420px) {
      right: 10px !important;
    }
  }
}
</style>
