<template>
  <div
    class="
      border border-[#E0E5EC]
      py-[16px]
      px-[20px]
      bg-vacancy
      relative
      min-h-[150px]
      cursor-pointer
      group
      duration-[150ms]
      hover:bg-[#F5F6FA]
      w-full
    "
  >
    <h5
      class="
        minion
        text-[#1A2F53]
        font-bold
        text-[16rem]
        leading-[22px]
        duration
        line-clamp-1
      "
    >
      {{ title }}
    </h5>
    <div class="bg-[#E0E5EC] h-[1px] w-[55px] mt-[12px]"></div>

    <div class="flex items-center justify-between mt-[12px]">
      <div class="flex items-center">
        <Icon name="clock_grey" />
        <h5
          class="text-[#677B9E] text-[12rem] font-normal leading-[15px] ml-[8px]"
        >
          {{ time }}
        </h5>
      </div>
      <div class="flex items-center">
        <Icon name="calendar_empty" />
        <h5
          class="text-[#677B9E] text-[12rem] font-normal leading-[15px] ml-[8px]"
        >
          {{ days }}
        </h5>
      </div>
      <div
        class="
          absolute
          py-[14px]
          px-[28px]
          justify-center
          md:px-[20px] md:py-[12px]
          bottom-0
          left-0
          border-[#E0E5EC]
          bg-[#1A2F53]
          flex
          items-center
        "
      >
        <Icon name="money_grey" />
        <h5
          class="
            text-[#FFFFFF] text-[15rem]
            font font-semibold
            leading-[140%]
            ml-[10px]
            line-clamp-1
          "
        >
          {{ price }} UZS
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String },
    time: { type: String },
    days: { type: String },
    price: { type: String },
    slug: { type: String },
  },
};
</script>

<style lang="scss" scoped>
.bg-vacancy {
  background-image: url("@/static/img/bg-vacancy.png");
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: 110px;
}
</style>
