<template>
  <div class="group cursor-pointe  _loading">
    <img src="@/static/img/rector.png" class="w-full" alt />
    <div
      class="py-[24rem] px-[20rem] bg-white border-x-[1.6px] border-b-[1.6px] transition group-hover:bg-[#F5F6FA] border-[#E0E5EC] _loading"
    >
      <div class="flex items-center gap-[8rem] mb-[12rem]">
        <h6
          class="not-italic font-semibold text-[12rem] leading-[130%] uppercase text-[#2B5E9B] underline _loading"
        >
          RU
        </h6>
        <div class="!bg-[#1A2F53] rounded-full w-[4rem] h-[4rem]"></div>
        <a href="../../static/img/rector.png" download="rector.png" @click.stop>
          <icon name="adobe" />
        </a>
        <div class="!bg-[#1A2F53] rounded-full w-[4rem] h-[4rem]"></div>
        <h6
          class="not-italic group-hover:text-[#2B5E9B] font-semibold text-[12rem] leading-[130%] uppercase text-[#677B9E] _loading"
        >
          dasdas
        </h6>
      </div>

      <hr class="bg-[#E0E5EC] h-[1px] w-[55rem] mb-[12rem]" />
      <p class="not-italic font-bold text-[20rem] leading-[26rem] text-[#1A2F53] _loading">
        title title title
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      default: "/",
    },
    title: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
    file: {
      type: String,
      default: "",
    },
    lang: {
      type: String,
      default: "uz",
    },
  },
};
</script>

<style lang="scss">
.report-card {
  svg g {
    transition: all 0.3s;
  }
  &:hover {
    svg g {
      transition: all 0.3s;
      opacity: 1 !important;
    }
  }
}
</style>
