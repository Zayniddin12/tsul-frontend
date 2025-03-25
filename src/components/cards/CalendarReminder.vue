<template>
  <div
    class="bg-[#1A2F53] cursor-pointer hover:bg-[#274372] hover:transition-all p-[16px] h-[186px] sm:w-auto w-[194px] reminder relative"
    @click="$router.push(`/event/${link}`)"
  >
    <router-link :to="`/event/${link}`" class="grid gap-[58rem]">
      <h1 class="not-italic font-bold text-[28rem] leading-[130%]  text-white">
        {{ $dayjs(date).format("DD") }}
        <span class="ml-[4px] not-italic text-[16rem] font-[400] text-normal text-white"
          >{{ $t($dayjs(date).format("MMMM")) }}.</span
        >
      </h1>
      <p
        class="not-italic line-clamp-3 font-semibold text-[14rem] leading-[130%] text-white -690:line-clamp-2"
      >
        {{ title }}
      </p>
    </router-link>

    <img
      class="absolute right-[-12rem] bottom-[12rem]"
      src="../../static/img/event-pattern.png"
      alt="calendar-reminder-image"
    />
  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
  },
};
</script>
