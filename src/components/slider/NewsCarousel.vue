<template>
  <div class="display-none-print">
    <div v-if="list?.length" class="mb-[28px] flex items-center justify-between">
      <h4
        class="minion not-italic font-bold text-[32rem] -400:text-[20rem] leading-[130%] text-[#1A2F53] line-clamp-2"
      >
        {{ title }}
      </h4>

      <router-link
        :to="link"
        class="all_articles transition flex items-center justify-between gap-[8rem] hover:bg-[#cfd3d7] cursor-pointer bg-[#EAF0F5] py-[14rem] px-[22rem] -420:py-[7rem] -420:px-[15rem]"
      >
        <span
          class="not-italic font-medium text-[14rem] leading-[16rem] uppercase text-[#1A2F53]"
          >{{ btnText }}</span
        >
        <icon name="arrow_right" />
      </router-link>
    </div>
    <swiper
      class="swiper-container"
      :modules="modules"
      :navigation="{ prevEl: '.swiper-button-prev1', nextEl: '.swiper-button-next1' }"
      :slides-per-view="4"
      :space-between="50"
      :pagination="{
        el: '.swiper-pagination1',
        clickable: true,
      }"
      :breakpoints="{
        '0': {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        '500': {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        '640': {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        '768': {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        '1024': {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <!-- <button @click="swiper.slidePrev()"><pre>Prev</pre></button>
    <button @click="swiper.slideNext()"><pre>Next</pre></button> -->
      <swiper-slide v-for="(item, index) in list" :key="index">
        <news-card-pr v-if="pending" :height="height" />
        <news-card
          v-else
          :is-news="isNews"
          :image="item?.get_image?.middle"
          :description="item.description"
          :tag="item.post_status?.name"
          :title="item.title"
          :date="item.publish_date"
          :slug="`/news/${item.slug}`"
          :height="height"
          :width="width"
        />
      </swiper-slide>
    </swiper>

    <div class="">
      <div class="flex items-center gap-[12px] w-[220px] mx-auto">
        <button class="swiper-button-prev1">
          <Icon name="news_slider_left" />
        </button>

        <div class="swiper-pagination1"></div>
        <button class="swiper-button-next1">
          <Icon name="news_slider_right" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default {
  components: {
    Swiper,
    SwiperSlide,
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
      modules: [Navigation, Scrollbar, A11y, Pagination],
    };
  },
};
</script>

<style lang="scss">
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

.swiper-container .swiper-wrapper {
  position: relative;
  padding-bottom: 36px;

  .swiper-button-prev::after {
    content: "" !important;
  }

  .swiper-button-next::after {
    content: "" !important;
  }
}

.swiper-pagination1 {
  width: auto !important;
  margin: 0 auto !important;
}

.swiper-pagination-bullet {
  width: 10px !important;
  height: 10px !important;
  border: 1px solid rgba(26, 47, 83, 0.45) !important;
  border-radius: 5px !important;
  background: transparent !important;
}

.swiper-pagination-bullet-active {
  border: 1px solid #1a2f53 !important;
  position: relative !important;
  width: 10px !important;
  height: 10px !important;
  &:after {
    content: "" !important;
    position: absolute;
    width: 60%;
    height: 60%;
    border-radius: 50%;
    background: #1a2f53;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
