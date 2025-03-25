<template>
  <div
    class="bg-[#fff] border-[1.6px] shadow p-[8rem] -450:p-[4rem] border-[#E0E5EC] absolute top-0 w-full left-0 scale-[1.15] z-[10]"
    @click.stop
  >
    <div class="relative flex items-start justify-center mb-[16rem]">
      <div class="grid">
        <h6
          class="not-italic font-medium text-[13rem] leading-[16rem] capitalize text-center text-[#677B9E]"
        >
          {{ month }}
        </h6>
        <span
          class="not-italic font-semibold text-[20rem] leading-[24rem] text-center text-[#1A2F53]"
        >
          {{ day }}
        </span>
      </div>
      <Icon
        class="cursor-pointer absolute top-0 right-0 w-[23rem] h-[23rem] -450:w-[15rem] -450:h-[15rem]"
        name="close"
        @click="$emit('changeShow', false)"
      />
    </div>

    <div class="grid gap-[4rem]">
      <div
        v-for="(item, index) in date?.event"
        :key="index"
        class="bg-[#039BE5] hover:opacity-[0.7] cursor-pointer w-full h-[25rem] px-[6rem] py-[4rem]"
      >
        <router-link :to="`/event/${item[0].slug}`">
          <span
            class="not-italic font-medium text-[12rem] line-clamp-1 leading-[130%] text-white"
            >{{ item[0].title }}</span
          >
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { getShort } from "@/helpers/months.js";

export default {
  props: {
    date: {
      type: Object,
      default: undefined,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      months: getShort(this.$t),
    };
  },

  computed: {
    day() {
      return dayjs(this.date.date).format("D");
    },
    month() {
      return this.months[Number(dayjs(this.date.date).format("M"))];
    },
  },
};
</script>

<style lang="scss" scoped>
.shadow {
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
}
</style>
