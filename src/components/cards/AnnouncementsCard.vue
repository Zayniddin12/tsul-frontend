<template>
  <div>
    <router-link :to="`/announcements/${slug}`">
      <div class="announcement-cards h-full flex group bg-[white]">
        <div v-if="date" class="w-[52rem]">
          <div
            class="bg-[#fff] month border-[1.6rem] border-solid border-[#E0E5EC] text-[#1A2F53] font-medium leading-[140%] uppercase h-[184rem] w-[52rem] text-center relative"
          >
            <p
              class="absolute left-1/2 -translate-x-1/2 rotate-[270deg] bottom-[65rem] text-[18rem]"
            >
              {{ $t($dayjs(date).format("MMMM")) }}
            </p>
          </div>
          <div
            class="bg-[#1A2F53] px-[12rem] py-[8rem] border-[#1A2F53] border-[1.6rem] border-solid text-[24rem] font-medium text-[#fff] date"
          >
            {{ $dayjs(date).format("DD") }}
          </div>
        </div>
        <div
          class="flex flex-col justify-between w-[100%] px-[24rem] pt-[20rem] pb-[41rem] border-[1.6rem] border-solid border-[#E0E5EC] duration-[150ms] group-hover:border-[#1A2F53]"
          :class="{ 'border-l-none': date }"
        >
          <p
            class="mb-[20rem] line-clamp-2 font-bold minion leading-[130%] text-[#1A2F53] text-[24rem] -500:text-[22rem]"
          >
            {{ title }}
          </p>
          <div
            class="font-normal line-clamp-4 text-[15rem] leading-[140%] text-[#677B9E]"
            v-html="description"
          ></div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    slug: {
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
  &:hover {
    .month {
      background: #1a2f53;
      border-color: #1a2f53;
      color: #fff;
    }

    .date {
      background: #8c97a9;
      border-color: #8c97a9;
    }
  }
}

.border-l-none {
  border-left-color: white !important;
}
.border-r-none {
  border-right-color: white !important;
}
</style>
