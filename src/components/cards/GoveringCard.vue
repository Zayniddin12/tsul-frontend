<template>
  <router-link :to="`${url}`" class="relative">
    <div
      class="faculties-card h-full flex flex-col relative overflow-hidden transition cursor-pointer hover:bg-[#F5F6FA] bg-[#FFFFFF] border-[#E0E5EC] border-[1.6px] py-[20rem] px-[28rem]"
    >
      <h4 class="minion not-italic font-bold text-[24rem] leading-[130%] mb-[12rem] text-[#1A2F53]">
        {{ title }}
      </h4>
      <div class="pr-[110px] mt-auto">
        <h5
          class="not-italic font-semibold text-[12rem] mb-[2rem] opacity-[0.8] leading-[130%] text-[#677B9E]"
        >
          {{ fullName }}
        </h5>
        <h6
          class="not-italic font-semiboldt-normal text-[12rem] opacity-[0.8] leading-[130%] text-[#677B9E]"
        >
          {{ position }}
        </h6>
      </div>
    </div>
    <div
      class="more absolute group right-[-12px] transition hover:bg-[#1a2f53] bottom-[-12px] py-[17px] px-[20px] z-[20] bg-[#FFFFFF] border-[1.6px] w-[146px] h-[56px] border-[#E0E5EC] flex items-center justify-between -500:px-[12px] -500:py-[8px] -500:h-auto"
    >
      <span
        class="not-italic font-medium group-hover:text-[#fff] text-[15rem] leading-[140%] text-justify text-[#1A2F53]"
      >
        {{ $t("more") }}
      </span>
      <icon class="-500:w-[24px] -500:h-[24px]" name="gray_arrow32" />
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    category: String,
    position: {
      type: String,
      default: "",
    },
    fullName: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.faculties-card {
  &::after {
    content: url("../../static/img/faculties.png");
    position: absolute;
    right: -25px;
    top: calc(50% - 200px / 2 + 40.5px);
  }

  &:hover ~ .more {
    background: #1a2f53;
    border: 1.6px solid #e0e5ec;
    box-sizing: border-box;
    transition: all 0.2s ease-in;

    span {
      color: #ffffff;
    }
  }
}
</style>
