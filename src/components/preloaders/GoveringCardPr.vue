<template>
  <div class="relative _loading">
    <div
      class="relative overflow-hidden cursor-pointerbg-[#FFFFFF] border-[#E0E5EC] border-[1.6px] py-[20rem] px-[28rem]"
    >
      <h4
        class="minion not-italic font-bold text-[24rem] leading-[130%] mb-[12rem] text-[#1A2F53] _loading"
      >
        titletitletitle
      </h4>
      <h5
        class="not-italic font-semibold text-[12rem] mb-[2rem] opacity-[0.8] leading-[130%] text-[#677B9E] _loading"
      >
        fullNamefullnamefullname
      </h5>
      <h6
        class="not-italic font-normal text-[12rem] opacity-[0.8] leading-[130%] text-[#677B9E] _loading"
      >
        positionpositionposition
      </h6>
    </div>
    <div
      class="more absolute group right-[-12px] bottom-[-12px] py-[17px] px-[20px] z-[20] bg-[#FFFFFF] border-[1.6px] w-[146px] h-[56px] border-[#E0E5EC] flex items-center justify-between _loading"
    >
      <span
        class="not-italic font-medium group-hover:text-[#fff] text-[15rem] leading-[140%] text-justify text-[#1A2F53] _loading"
        >Batafsil</span
      >
      <icon name="gray_arrow32" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
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
