<template>
  <div class="">
    <div class="">
      <div class="flex announcement-cards group bg-[#fff]">
        <div class="w-[52rem]">
          <div
            class="bg-[#fff] month border-[1.6rem] border-solid border-[#E0E5EC] text-[#1A2F53] font-medium leading-[140%] uppercase h-[184rem] w-[52rem] text-center relative"
          >
            <h6
              class="absolute left-[-8rem] transform rotate-[270deg] bottom-[45rem] text-[18rem] _loading"
            >
              fevral
            </h6>
          </div>
          <div class="px-[12rem] py-[8rem] text-[24rem] font-medium text-[#fff] date _loading">
            asdsasd
          </div>
        </div>
        <div
          class="w-[100%] px-[24rem] pt-[20rem] pb-[41rem] border-[1.6rem] border-solid border-[#E0E5EC] duration-[150ms] border-l-none"
        >
          <h2
            class="mb-[20rem] font-bold minion-font leading-[130%] text-[#1A2F53] text-[24rem] _loading"
          >
            asdasdasdsa
          </h2>
          <p class="font-normal text-[15rem] leading-[140%] text-[#677B9E] _loading">asdasdasdas</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slug: {
      type: String,
      default: "",
    },
    month: {
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
    description: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.announcement-cards {
  transition: 0.3s all;
  .month {
    transition: 0.3s all;
  }

  .date {
    transition: 0.3s all;
  }
}

.border-l-none {
  border-left-color: white !important;
}
</style>
