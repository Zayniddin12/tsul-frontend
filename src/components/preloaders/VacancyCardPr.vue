<template>
  <router-link
to="asd"
    class="
      border border-[#E0E5EC]
      py-[16px]
      px-[20px]
      bg-vacancy
      relative
      min-h-[150px]
      cursor-pointer
      group
      w-full
      _loading
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
        group-hover:text-[#3462b1]
        line-clamp-1
        _loading
      "
    >
      djasldjnasdn
    </h5>
    <div class="bg-[#E0E5EC] h-[1px] w-[55px] mt-[12px]"></div>

    <div class="flex items-center justify-between mt-[12px]">
      <div class="flex items-center">
        <Icon name="clock_grey" class="_loading" />
        <h5
          class="
            text-[#677B9E] text-[12rem]
            font-normal
            leading-[15px]
            ml-[8px]
            _loading
          "
        >
          12:12
        </h5>
      </div>
      <div class="flex items-center">
        <Icon name="calendar_empty" class="_loading" />
        <h5
          class="
            text-[#677B9E] text-[12rem]
            font-normal
            leading-[15px]
            ml-[8px]
            _loading
          "
        >
          Dushanba
        </h5>
      </div>
      <div
        class="
          absolute
          py-[14px]
          px-[28px]
          md:px-[20px] md:py-[12px]
          bottom-0
          left-0
          border-[#E0E5EC]
          flex
          items-center
          _loading
        "
      >
        <h4
          class="
            text-[#677B9E] text-[12rem]
            font-normal
            leading-[15px]
            ml-[8px]
            _loading
          "
        >
          odiasjpdiasdj
        </h4>
      </div>
    </div>
  </router-link>
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
