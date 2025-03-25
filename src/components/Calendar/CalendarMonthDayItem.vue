<template>
  <li
    class="pt-[16rem] relative pb-[73rem] bg-[#fff] hover:bg-[#EFF6FA] border-[1.6px] border-[#E0E5EC] !select-none flex justify-center"
    :class="{
      'calendar-today  !overflow-hidden': isToday,
      '!overflow-visible': show,
      'cursor-pointer': day?.event,
    }"
    @click="day?.event ? (show = true) : ''"
  >
    <span
      :class="{
        'p-[6rem] !bg-[#2B5E9B] !text-[#FFFFFF] flex items-center justify-center': isToday,
        'text-[#677B9E]': !day.isCurrentMonth,
        'w-[26rem] h-[26rem]  p-[0rem]': label == 1,
      }"
      class="not-italic font-semibold text-[13rem] leading-[16rem] text-center text-[#1A2F53]"
      >{{ label }}</span
    >

    <div
      v-if="day?.event && day?.event?.length"
      class="absolute flex left-0 bottom-[20rem] bg-[#0B8043] py-[4rem] px-[6rem]"
      :class="{ '!bg-[#CBD3DE]': !day.isCurrentMonth }"
    >
      <b
        class="not-italic font-medium text-[13rem] text-center text-white"
        :class="{ '!text-[#677B9E]': !day.isCurrentMonth }"
        >{{ day.event.length }} ta {{ $t("event") }}</b
      >
    </div>
    <CalendarSelectedDate
      v-if="show && day.event && day.event.length"
      class="day_select"
      :date="day"
      @changeShow="show = $event"
    />
  </li>
</template>

<script>
import dayjs from "dayjs";
import { getLong } from "@/helpers/months.js";

export default {
  name: "CalendarMonthDayItem",
  props: {
    day: {
      type: Object,
      required: true,
    },

    isToday: {
      type: Boolean,
      default: false,
    },

    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      months: getLong(this.$t),
      show: false,
    };
  },

  computed: {
    label() {
      if (dayjs(this.day.date).format("D") == 1) {
        const month = dayjs(this.day.date).format("M");
        return dayjs(this.day.date).format("D") + " - " + this.months[month];
      } else {
        return dayjs(this.day.date).format("D");
      }
    },
  },

  mounted() {
    this.hideElement("show", ".day_select");
  },
};
</script>

<style lang="scss" scoped>
.calendar-today {
  &::after {
    content: url("@/static/img/calendarbg.svg");
    position: absolute;
    bottom: -29px;
    right: -21px;
  }
}
</style>
