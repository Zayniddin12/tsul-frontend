<template>
  <div
    :class="{ _loading: pending, 'values-card': !pending }"
    class="bg-[#F5F6FA] verflow-hidden relative border-[1.6px] border-[#E0E5EC] py-[24rem] px-[32rem] min-h-[128px]"
  >
    <h6
      :class="{ _loading: pending }"
      class="minion not-italic font-bold text-[20rem] leading-[130%] text-[#1A2F53]"
    >
      {{ title }}
    </h6>

    <p
      :class="{ _loading: pending }"
      class="not-italic font-normal text-[15rem] leading-[150%] mt-[2rem] text-[#677B9E]"
    >
      {{ desc }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    desc: String,
    pending: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.values-card {
  &::after {
    content: url("../../static/img/values-bg.png");
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
