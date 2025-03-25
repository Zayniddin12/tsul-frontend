<template>
  <router-link
    :to="`/event/${link}`"
    class="inline-flex bg-[#1A2F53] duration-150 hover:bg-[#2E4B7C] p-[16px] event-bg h-[160px] flex-col justify-between group"
  >
    <h4
      class="not-italic font-normal text-[16rem] text-white leading-[130%] flex items-end"
    >
      <span class="font-bold text-[28rem] leading-[130%] mr-[4px] block h-[33px]">{{ $dayjs(day).format("DD" )}}</span>
      {{ $dayjs(day).format("MMMM" ) }}.
    </h4>
    <h5
      class="not-italic font-semibold text-[14rem] leading-[130%] text-white line-clamp-3 duration-150 "
    >
      {{ title }}
    </h5>
  </router-link>
</template>

<script>
export default {
  props: {
    day: {
      type: String,
    },
    month: {
      type: String,
    },
    title: {
      type: String,
    },
    link: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.event-bg {
  background-image: url("@/static/img/event-bg.png");
  background-size: 70px;
  background-position: right bottom;
  background-repeat: no-repeat;
}
</style>
