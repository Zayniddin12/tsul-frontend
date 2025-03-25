<template>
  <div class="p-[22px] pb-[32px] bg-[#F5F6FA]">
    <div class="flex items-center justify-between">
      <div class="flex gap-[16rem]">
        <div class="flex gap-[12rem]">
          <Icon
            class="hover:opacity-[0.7] transition cursor-pointer w-[18rem] h-[32rem]"
            name="left"
            @click="selectPrevious"
          />
          <Icon
            class="hover:opacity-[0.7] transition cursor-pointer w-[18rem] h-[32rem]"
            name="right"
            @click="selectNext"
          />
        </div>
        <h5
          class="not-italic transition select-none cursor-pointer font-bold hover:opacity-[0.7] capitalize text-[24rem] leading-[32rem] minion text-[#1A2F53]"
          @click="selectCurrent"
        >
          {{ selectedMonth }}
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { getLong } from "@/helpers/months.js";

export default {
  props: {
    currentDate: {
      type: String,
      required: true,
    },

    selectedDate: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      months: getLong(this.$t),
    };
  },
  computed: {
    selectedMonth() {
      const month = this.selectedDate.format("M");
      return this.months[month] + " " + this.selectedDate.format("YYYY");
    },
  },

  methods: {
    selectPrevious() {
      let newSelectedDate = dayjs(this.selectedDate).subtract(1, "month");
      this.$emit("dateSelected", newSelectedDate);
    },

    selectCurrent() {
      let newSelectedDate = dayjs(this.currentDate);
      this.$emit("dateSelected", newSelectedDate);
    },

    selectNext() {
      let newSelectedDate = dayjs(this.selectedDate).add(1, "month");
      this.$emit("dateSelected", newSelectedDate);
    },
  },
};
</script>
