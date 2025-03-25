<template>
  <div class="flex items-center group mt-[12px]">
    <img
      src=""
      class="w-[88px] _loading h-[88px] object-cover border border-[#E0E5EC]"
      alt="news-image"
    />
    <div class="ml-[16px]">
      <h5 class="not-italic font-medium text-[11px] text-[#677B9E] uppercase _loading">
        dsdasdsadasdsadsad
      </h5>

      <h4
        class="minion mt-[6px] not-italic font-bold text-[18rem] text-[#1A2F53] leading-[130%] duration-150 group-hover:text-[#3353bb] line-clamp-2 _loading"
      >
        sdaddsadsadasdasdsdas
      </h4>

      <h6
        class="mt-[6px] not-italic font-medium leading-[16px] text-[11px] text-[#677B9E] _loading"
      >
        sdasdasdasdsadasdasda
      </h6>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
    },
    title: {
      type: String,
    },
    img: {
      type: String,
    },
    date: {
      type: String || Number,
    },
  },
};
</script>

<style lang="scss" scoped></style>
