<template>
  <div class="short-news relative cursor-pointer _loading">
    <div>
      <div class="w-[100%] h-[248px]" />
      <div
        class="w-[100%] !h-full z-50 py-[24px] px-[28px] bg-[#FFFFFF] border-[1.6px] border-[#E0E5EC]"
      >
        <h5 class="not-italic font-medium text-[12rem] mb-[4px] uppercase text-[#677B9E] _loading">
          typetypetype
        </h5>
        <h4 class="not-italic font-bold text-[24rem] minion text-[#1A2F53] _loading">
          titletitletitle
        </h4>
        <span class="not-italic font-medium text-[12rem] mt-[12px] text-[#677B9E] _loading"
          >datedatedate</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {
      width: false,
    };
  },
  mounted() {
    this.width = window.innerWidth > 1100;
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/mixins";
.short-news {
  transition: all 0.3s ease-out;
}
</style>
