<template>
  <div
    v-if="$dayjs(date).format('DD.MM.YYYY HH:MM') > $dayjs(currentTime).format('DD.MM.YYYY HH:MM')"
    class="grid grid-cols-4 relative pt-[40rem] px-[74rem] -768:p-[20px] pb-[68rem] bg-[#F5F6FA] bottom-[1.6px] border-[#E0E5EC]"
  >
    <div class="border-r-[1.6px] border-[#E0E5EC]">
      <h5
        class="not-italic font-bold text-[74rem] -768:text-[45rem] -680:text-[30rem] leading-[130%] minion text-center text-[#1A2F53]"
      >
        {{ days || 0 }}
      </h5>
      <h6
        class="not-italic font-normal text-[20rem] -600:text-[15rem] leading-[150%] text-center text-[#677B9E]"
      >
        {{ $t('day') }}
      </h6>
    </div>
    <div class="border-r-[1.6px] border-[#E0E5EC]">
      <h5
        class="not-italic font-bold text-[74rem] -768:text-[45rem] -680:text-[30rem] leading-[130%] minion text-center text-[#1A2F53]"
      >
        {{ hours || 0 }}
      </h5>
      <h6
        class="not-italic font-normal text-[20rem] -600:text-[15rem] leading-[150%] text-center text-[#677B9E]"
      >

        {{ $t('hour') }}
      </h6>
    </div>
    <div class="border-r-[1.6px] border-[#E0E5EC]">
      <h5
        class="not-italic font-bold text-[74rem] -768:text-[45rem] -680:text-[30rem] leading-[130%] minion text-center text-[#1A2F53]"
      >
        {{ minutes || 0 }}
      </h5>
      <h6
        class="not-italic font-normal text-[20rem] -600:text-[15rem] leading-[150%] text-center text-[#677B9E]"
      >

        {{ $t('minute') }}
      </h6>
    </div>
    <div class>
      <h5
        class="not-italic font-bold text-[74rem] -768:text-[45rem] -680:text-[30rem] leading-[130%] minion text-center text-[#1A2F53]"
      >
        {{ seconds || 0 }}
      </h5>
      <h6
        class="not-italic font-normal text-[20rem] -600:text-[15rem] leading-[150%] text-center text-[#677B9E]"
      >

        {{ $t('second') }}
      </h6>
    </div>

    <a
      v-if="isFinished"
      :href="link"
      target="_blank"
      class="flex items-center h-[56rem] transition group hover:bg-[#fff] absolute bottom-[-30rem] -768:bottom-[-45rem] left-[50%] min-w-[204rem] -800:px-[15rem] -800:py-[10rem] translate-x-[-50%] justify-between pt-[17rem] bg-[#1A2F53] border-[1.6px] border-[#E0E5EC] pr-[12rem] pb-[18rem] pl-[20rem]"
    >
      <span
        class="not-italic font-medium group-hover:!text-[#1A2F53] text-[15rem] leading-[140%] text-justify text-white flex-shrink-0"
      >
        {{ button_text }}
      </span>
      <icon name="gray_arrow32" class="arrow -800:w-[20rem] w-[32rem] h-[32rem] -800:h-[20rem]" />
    </a>
  </div>
</template>

<script>
export default {
  filters: {
    twoDigits(value) {
      if (value.toString().length <= 1) {
        return 0;
      }
      return value.toString();
    },
  },

  props: {
    date: null,
    link: String,
    isFinished: Boolean,
    button_text: String,
  },
  emits: ["onFinish"],
  data() {
    return {
      currentTime: new Date(),
      now: Math.trunc(new Date().getTime() / 1000),
      finish: false,
      timer: undefined,
    };
  },

  computed: {
    secondCount() {
      return this.calculatedDate - this.now;
    },
    calculatedDate() {
      return Math.trunc(Date.parse(this.date) / 1000);
    },
    seconds() {
      if (this.secondCount < 0) return 0;
      if (this.secondCount < 10) return ("0" + this.secondCount).slice(-2);
      if (this.secondCount % 60 < 10) {
        return ("0" + (this.secondCount % 60)).slice(-2);
      } else {
        return this.secondCount % 60;
      }
    },
    minutes() {
      if (this.secondCount < 0) return 0;
      if (Math.trunc(this.secondCount / 60) % 60 < 10) {
        return ("0" + (Math.trunc(this.secondCount / 60) % 60)).slice(-2);
      } else {
        return Math.trunc(this.secondCount / 60) % 60;
      }
    },
    hours() {
      if (this.secondCount < 0) return 0;
      if (Math.trunc(this.secondCount / 60 / 60) % 24 < 10) {
        return ("0" + (Math.trunc(this.secondCount / 60 / 60) % 24)).slice(-2);
      } else {
        return Math.trunc(this.secondCount / 60 / 60) % 24;
      }
    },
    days() {
      if (this.secondCount < 0) return 0;

      if (Math.trunc(this.secondCount / 60 / 60 / 24) < 10) {
        return ("0" + Math.trunc(this.secondCount / 60 / 60 / 24)).slice(-2);
      } else {
        return Math.trunc(this.secondCount / 60 / 60 / 24);
      }
    },
  },

  mounted() {
    this.timer = setInterval(() => {
      this.now = Math.trunc(new Date().getTime() / 1000);
      if (!this.finish && this.calculatedDate - this.now <= 0) {
        this.finish = true;
        this.$emit("onFinish");
      }
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>
<style lang="scss"></style>
