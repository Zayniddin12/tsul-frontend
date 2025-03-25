<template>
  <div class="relative w-full">
    <img v-if="!img" class="w-full h-[320px] object-cover" :src="img" alt="top-vacancy-image" />
    <img v-else class="w-full h-[320px] object-cover" src="@/static/img/default-white.svg" alt="top-vacancy-image" />
    <div
      class="
        absolute
        bottom-[-11%]
        bg-[#F5F6FA]
        py-[20px]
        px-[40px]
        w-[90%]
        mx-auto
        left-0
        right-0
      "
    >
      <h4 class="text-[#1A2F53] minion font-bold text-[24rem] leading-[130%]">
        {{ title }}
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: { type: String, default: "@/static/img/vacancy-img.webp" },
    title: { type: String, default: "Frontend developer" },
  },
};
</script>

<style lang="sass" scoped>
</style>