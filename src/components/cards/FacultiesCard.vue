<template>
  <router-link
    class="relative block h-full sm:min-h-fit"
    :class="{ '_loading  ': pending }"
    :to="url"
  >
    <div
      class="faculties-card pt-[24px] cursor-pointer relative overflow-hidden px-[29px] pb-[64px] transition hover:!bg-[white] bg-[#F5F6FA] border-[1.6px] border-[#E0E5EC] h-full"
    >
      <h5
        class="not-italic font-semibold text-[13rem] leading-[16rem] uppercase mb-[12px]"
        :class="{ '_loading  ': pending }"
      >
        {{ title }}
      </h5>
      <hr class="mb-[8px] h-[1px] !w-[50px] bg-[#E6E8ED]" :class="[title ? 'block' : 'hidden' ]" />
      <h4
        class="not-italic minion font-bold text-[20rem] leading-[28px] -576:mb-0 -768:mb-[16px] text-gray-800 -500:text-[16rem] mb-[28px]"
        :class="{ _loading: pending }"
      >
        {{ desc }}
      </h4>
    </div>
    <router-link
      :to="url"
      :class="{ '_loading  ': pending }"
      class="more transition group absolute left-[-20px] hover:bg-[#1a2f53] cursor-pointer bottom-[10px] bg-white box-border border-[1.6px] border-[#E0E5EC] w-[146px] p-[12px] pl-[20px] h-[56px] flex items-center justify-between -500:h-[40px] -500:!bottom-[10px] -500:top-auto -500:left-[20px]"
    >
      <span
        class="not-italic group-hover:text-[#fff] font-medium text-[15rem] leading-[140%] text-justify text-[#1A2F53]"
        >{{ $t("more") }}</span
      >
      <icon class="-500:w-[24px] -500:h-[24px]" name="gray_arrow32" />
    </router-link>
  </router-link>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
    pending: {
      type: Boolean,
      default: false,
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
