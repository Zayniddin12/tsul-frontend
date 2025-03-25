<template>
  <div
    class="inline-flex duration-150 _loading p-[16px] event-bg h-[160px] flex-col justify-between group"
  >
    <h4
      class="not-italic font-normal text-[16rem] text-white leading-[130%] flex items-center _loading"
    >
      Lorem, ipsum dolor.
    </h4>
    <h5
      class="not-italic font-semibold text-[14rem] leading-[130%] text-white line-clamp-3 duration-150 _loading"
    >
      Lorem, ipsum.
    </h5>
  </div>
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
