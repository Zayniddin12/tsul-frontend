<template>
  <div class="relative">
    <div>
      <CalendarHeader
        :current-date="today"
        :selected-date="selectedDate"
        @dateSelected="selectDate"
      />
    </div>

    <ol
      class="h-full relative grid-cols-7 -600:grid-cols-4 -450:grid-cols-3 grid week-day-name-relative"
    >
      <CalendarMonthDayItem
        v-for="(item, index) in days"
        :key="index"
        class=""
        v-bind="{
          list: calendar,
          isToday: item.date === today,
          day: item,
        }"
      />
      <div class="week-day-name-absolute md:hidden flex items-center justify-between">
        <h4 v-for="(item, index) in weekDays" :key="index" class="week-day-name">
          {{ item.weekDay }}
        </h4>
      </div>
    </ol>
  </div>
</template>

<script>
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export default {
  name: "CalendarMonth",
  props: {
    calendar: Array,
  },
  data() {
    return {
      selectedDate: dayjs(),
      weekDays: [
        { weekDay: this.$t("calendar.monday") },
        { weekDay: this.$t("calendar.tuesday") },
        { weekDay: this.$t("calendar.wednesday") },
        { weekDay: this.$t("calendar.thursday") },
        { weekDay: this.$t("calendar.friday") },
        { weekDay: this.$t("calendar.saturday") },
        { weekDay: this.$t("calendar.sunday") },
      ],
    };
  },

  computed: {
    days() {
      const days = [...this.previousMonthDays, ...this.currentMonthDays, ...this.nextMonthDays];
      const list = this.calendar;
      for (let i = 0; i < days.length; i++) {
        days[i].event = [];
        for (let k = 0; k < list.length; k++) {
          if (days[i].date === list[k].date) {
            days[i].event.push(list[k].event);
          }
        }
      }
      return days;
    },

    today() {
      return dayjs().format("YYYY-MM-DD");
    },

    month() {
      return Number(this.selectedDate.format("M"));
    },

    year() {
      return Number(this.selectedDate.format("YYYY"));
    },

    numberOfDaysInMonth() {
      return dayjs(this.selectedDate).daysInMonth();
    },

    currentMonthDays() {
      return [...Array(this.numberOfDaysInMonth)].map((day, index) => {
        return {
          date: dayjs(`${this.year}-${this.month}-${index + 1}`).format("YYYY-MM-DD"),
          isCurrentMonth: true,
        };
      });
    },

    previousMonthDays() {
      const firstDayOfTheMonthWeekday = this.getWeekday(this.currentMonthDays[0].date);
      const previousMonth = dayjs(`${this.year}-${this.month}-01`).subtract(1, "month");

      // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
      const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
        ? firstDayOfTheMonthWeekday - 1
        : 6;

      const previousMonthLastMondayDayOfMonth = dayjs(this.currentMonthDays[0].date)
        .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
        .date();

      return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
        return {
          date: dayjs(
            `${previousMonth.year()}-${previousMonth.month() + 1}-${
              previousMonthLastMondayDayOfMonth + index
            }`
          ).format("YYYY-MM-DD"),
          isCurrentMonth: false,
        };
      });
    },

    nextMonthDays() {
      const lastDayOfTheMonthWeekday = this.getWeekday(
        `${this.year}-${this.month}-${this.currentMonthDays.length}`
      );

      const nextMonth = dayjs(`${this.year}-${this.month}-01`).add(1, "month");

      const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
        ? 7 - lastDayOfTheMonthWeekday
        : lastDayOfTheMonthWeekday;

      return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        return {
          date: dayjs(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`).format(
            "YYYY-MM-DD"
          ),
          isCurrentMonth: false,
        };
      });
    },
  },

  // watch: {
  //   calendar() {
  //     for (let i = 0; i < this.days?.length; i++) {
  //       let date = this.calendar.find((el) => el.date === this.days[i].date);
  //     }
  //   },
  // },

  methods: {
    getWeekday(date) {
      return dayjs(date).weekday();
    },

    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
    },
  },
};
</script>

<style lang="scss">
.week-day-name-relative {
  position: relative;
}

.week-day-name-absolute {
  position: absolute;
  top: -15px;
  left: 0;
  width: 100%;
  height: 20px;
  background: #1a2f53;
  padding: 0 10px;
}

.week-day-name {
  color: #fff;
  font-size: 12rem;
  font-weight: 500;
  text-align: center;
  width: 100%;
  height: 100%;
}
</style>
