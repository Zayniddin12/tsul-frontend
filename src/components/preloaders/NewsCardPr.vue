<template>
  <div class="news-cards">
    <div>
      <div
        class="border-solid border-[1px] border-[#E0E5EC] w-[100%] bg-center bg-no-repeat bg-cover _loading"
        :style="{
          'background-image': 'url(' + image + ')',
          height: height,
        }"
      ></div>
      <div
        class="px-[20px] pt-[20px] pb-[16px] border-t-0 border-solid border-[1.6px] border-[#E0E5EC]"
      >
        <div :class="isNews ? '' : 'mb-[6px]'" class="flex items-center justify-start">
          <p class="font-medium text-[11px] leading-[130%] uppercase text-[#677B9E] _loading">
            fgbhnjmihuby
          </p>
          <div v-if="isNews" class="_loading w-[4px] h-[4px] rounded-[50%] mr-[8px] ml-[8px]"></div>
          <span
            v-if="isNews"
            class="font-medium text-[11px] leading-[145%] text-[#677B9E] _loading"
          >
            fgyhujiko
          </span>
        </div>
        <div v-if="isNews" class="bg-[#E0E5EC] w-[55px] h-[1px] mt-[12px] mb-[12px]"></div>
        <h6
          class="font-bold text-[#1A2F53] minion text-[18rem] leading-[130%] line-clamp-2 _loading"
        >
          _adsdadsaas
        </h6>
        <p
          v-if="isNews"
          class="font-normal line-clamp-3 text-[12rem] leading-[140%] text-[#677B9E] mt-[6px] _loading"
        >
          asd
        </p>
        <span
          v-if="isNews === false"
          class="font-medium text-[11px] leading-[145%] text-[#677B9E] mt-[6px] _loading"
        >
          asdasd
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      default: "",
    },
    tag: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    isNews: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.news-cards {
  transition: 0.3s all;

  &:hover {
    background: #f5f6fa;
  }
}
</style>
