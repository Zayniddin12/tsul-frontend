<template>
  <div
    class="bg-[#F5F6FA] quote-rector overflow-hidden min-h-[150px] relative border-[1.6px] border-[#E0E5EC] py-[24rem] px-[32rem] flex gap-[16rem]"
  >
    <img
      src="@/static/img/quote-rector.png"
      class="w-[42rem] h-[32rem] object-cover"
      alt="quote-rector-image"
    />
    <div class>
      <h6
        class="minion line-clamp-3 not-italic font-bold text-[20rem] leading-[130%] text-[#1A2F53]"
        v-html="title"
      ></h6>

      <div class="flex gap-[8rem] -425:block items-center mt-[12rem]">
        <h5 class="not-italic font-semibold text-[15rem] leading-[130%] text-[#677B9E]">
          {{ fullName }}
        </h5>
        <div
          class="not-italic line-clamp-1 font-normal text-[12rem] text-[#677B9E] leading-[130%]"
          v-html="position"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    position: String,
    fullName: String,
  },
};
</script>

<style lang="scss" scoped>
.quote-rector {
  &::after {
    content: url("/src/static/img/faculties.png");
    position: absolute;
    bottom: -65px;
    right: 0;
  }
}
</style>
