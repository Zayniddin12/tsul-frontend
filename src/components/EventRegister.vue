<template>
  <div
    class="relative bg-[#1A2F53] grid grid-cols-2 -660:grid-cols-1 -400:px-[15px] gap-[18rem] pt-[16rem] pb-[37rem] pl-[28rem]"
    :class="{ '_loading bg-transparent': pending }"
  >
    <div class="border-r-[1px] border-[#ffffff33] -400:border-none">
      <h6
        class="not-italic font-semibold text-[12rem] opacity-[0.4] leading-[130%] mb-[2rem] uppercase text-white"
        :class="{ _loading: pending }"
      >
        {{ $t("address") }}:
      </h6>
      <p class="not-italic font-bold text-[14rem] leading-[21rem] text-white">{{ address }}</p>
    </div>
    <div class="grid gap-[12rem] -660:flex -660:gap-[20rem]">
      <div v-if="date" class="flex items-center justify-start gap-[10rem]">
        <icon name="calendar_empty" class="-800:w-[17rem]" />
        <span class="not-italic font-semibold text-[12rem] leading-[21rem] text-white">
          {{ $dayjs(date).format("DD") }} -
          {{ $t($dayjs(date).format("MMMM")) }}
          {{ $dayjs(date).format(" HH:mm") }}</span
        >
      </div>
      <div v-if="phone" class="flex items-center justify-start gap-[10rem]">
        <icon name="phon" class="-800:w-[17rem]" />
        <a
          :href="`tel: ${phone}`"
          class="not-italic font-semibold text-[12rem] leading-[21rem] text-white"
          >{{ phone }}</a
        >
      </div>
    </div>

    <img
      class="absolute top-[3rem] left-[-15rem]"
      src="../static/img/locate.png"
      alt="event-register-image"
    />
    <a
      v-if="isFinished && buttonText?.length"
      :href="link"
      target="_blank"
      class="display-none-print bg-[#F5F6FA] flex transition group cursor-pointer hover:bg-[#1A2F53] hover:border-[white] py-[12rem] px-[20rem] -1245:p-[8rem] absolute bottom-[-21rem] left-[50%] translate-x-[-50%] border-[1.6px] border-[#E0E5EC]"
      :class="{ _loading: pending }"
    >
      <span
        class="not-italic group-hover:text-[#fff] font-semibold text-[13rem] leading-[130%] uppercase text-[#8394B1]"
        >{{ buttonText }}</span
      >
    </a>
  </div>
</template>

<script>
export default {
  props: {
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    date: {
      type: String,
    },
    link: {
      type: String,
    },
    buttonText: {
      type: String,
    },
    pending: Boolean,
    isFinished: Boolean,
  },
};
</script>

<style lang="scss" scoped></style>
