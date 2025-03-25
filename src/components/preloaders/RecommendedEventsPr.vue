<template>
  <div
    class="pb-[20rem] px-[12rem] h-[180rem] pt-[16rem] bg-[#8394B1] border-[1.6rem] border-[1.6rem solid-[#E0E5EC] hover:bg-[#1A2F53] transition-all duration-200 relative"
  >
    <router-link class="flex flex-col justify-between h-[100%]" :to="slug">
      <Icon
        class="absolute right-[-20rem] top-[-23rem] z-1"
        name="events_recommended_pattern"
      />
      <h5 class="font-normal text-[16rem] leading-[130%] text-[#fff] _loading" >
        <span class="font-bold text-[28rem] text-[#fff] leading-[130%] _loading">asd</span>
        asd
      </h5>
      <h6
        class="font-semibold text-[12rem] leading-[130%] text-[#fff] line-clamp-2 _loading"
      >
        {asd
      </h6>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    slug: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
    month: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped></style>
