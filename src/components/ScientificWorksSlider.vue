<template>
  <div
    v-if="works?.length > 1"
    class="flex flex-wrap items-center justify-between gap-[10px] mt-[60rem] mb-[30rem]"
  >
    <h2 class="text-[32rem] leading-[130%] font-bold text-[#1A2F53] minion">
      {{ $t("his_scientific_works") }}
    </h2>
    <router-link
      to="/scientific-works"
      class="min-w-[220px] group border-[1.6px] border-[#E0E5EC] transition inline-flex items-center justify-center gap-[8px] text-[15rem] leading-[140%] font-medium text-[#1A2F53] bg-[#EAF0F5] py-[10px] px-[12px]"
    >
      {{ $t("all_works") }}
      <Icon name="arrow_right_button" class="transition group-hover:translate-x-[5px]" />
    </router-link>
  </div>
  <Splide v-if="works?.length" :options="options">
    <SplideSlide v-for="item in works" :key="item.id">
      <router-link
        :to="'/scientific-works/' + item.slug"
        class="h-full bg-image transition group cursor-pointer p-[16px] bg-[#F5F6FA] border-[1.6px] border-[#E0E5EC] min-h-[376px] flex flex-col"
      >
        <h3 class="text-[13rem] leading-[123%] font-semibold text-[#677B9E] uppercase">
          {{ item.status || item?.post_status || "Monografiya" }}
        </h3>
        <hr class="my-[16px] h-[0.5px] w-[50px] bg-[#E6E8ED]" />
        <p
          class="break-words text-[20rem] leading-[140%] font-bold text-[#1A2F53] mb-[16px] minion"
        >
          {{ item.title }}
        </p>
        <div
          class="group-hover:bg-[#1A2F53] group-hover:text-white border-[1.6px] border-[#E0E5EC] translate-x-[32px] transition inline-flex items-center gap-[8px] text-[15rem] leading-[140%] font-medium text-[#1A2F53] bg-white py-[10px] px-[12px] mt-auto ml-auto sm:translate-x-[0px]"
        >
          {{ $t("more") }}
          <Icon name="arrow_right_button" class="transition group-hover:translate-x-[7px]" />
        </div>
      </router-link>
    </SplideSlide>
  </Splide>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";

const showArrows = ref(false);

onMounted(() => {
  showArrows.value = props.works?.length > 4;
});

const props = defineProps({
  works: { type: Array, default: () => [] },
});

const options = {
  gap: "48rem",
  perPage: 4,
  perMove: 1,
  arrows: showArrows.value,
  pagination: false,
  type: "slide",
  rewind: true,
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
};
</script>

<style lang="scss">
.works-slide {
  &::after {
    @media screen and (max-width: 540px) {
      content: none !important;
    }
    content: "";
    position: absolute;
    top: 0;
    right: -1px;
    width: 98px;
    height: 100%;
    z-index: 2;
    pointer-events: none;
    background: linear-gradient(
      90deg,
      rgba(245, 246, 250, 0) 0%,
      rgba(245, 246, 250, 0.78) 45.31%,
      #f5f6fa 100%
    );
  }
  &::before {
    @media screen and (max-width: 540px) {
      content: none !important;
    }
    content: "";
    position: absolute;
    top: 0;
    left: -1px;
    width: 98px;
    height: 100%;
    z-index: 2;
    pointer-events: none;
    background: linear-gradient(
      270deg,
      rgba(245, 246, 250, 0) 0%,
      rgba(245, 246, 250, 0.78) 45.31%,
      #f5f6fa 100%
    );
  }
  .splide__arrows {
    .splide__arrow {
      z-index: 3;
      width: 44px;
      height: 44px;
      background: #eaf0f5;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        width: 14px;
        height: 22px;
        path {
          fill: #1a2f53;
        }
      }
    }
  }
  .splide__arrow--prev {
    position: absolute;
    left: -22em;
  }

  .splide__arrow--next {
    position: absolute;
    right: -22em;
  }

  @media screen and (max-width: 1300px) {
    .splide__arrow--next {
      right: -8em;
    }

    .splide__arrow--prev {
      left: -8em;
    }
  }
}
</style>
