<template>
  <div
    class="
      group
      border-[1.6px]
      px-[20px]
      py-[16px]
      bg-[#F5F6FA]
      max-w-[295px]
      bg-vacancy
      cursor-pointer
    "
  >
    <h4
      class="
        text-[#677B9E]
        font-semibold
        text-[12rem]
        leading-[130%]
        uppercase
        flex
        items-center
        _loading
      "
    >
      dsdsd
      <span
        class="block mx-[8px] bg-[#1A2F53] rounded-[5px] h-[4px] w-[4px]"
      ></span>
      fdsf fdfd dasdasdadasd
    </h4>

    <h3
      class="
        minion
        mt-[12px]
        font-bold
        text-[20rem]
        leading-[130%]
        text-[#1A2F53]
        duration-[0.3s]
        group-hover:text-[#4d5ef1]
        line-clamp-2
        _loading
      "
    >
      dsadsadasdsaasdsdsdsdsads
    </h3>

    <div class="bg-[#E0E5EC] h-[2px] w-[94%] mx-auto mt-[16px] z-20"></div>

    <div class="mt-[16px] flex items-center">
      <Icon name="calendar_gray" />
      <h4
        class="
          text-[#1a2f53]
          ml-[7px]
          font-semibold
          text-[12rem]
          leading-[15px]
          _loading
        "
      >
        deadlinedsdsdasd
      </h4>
    </div>

    <div class="mt-[12px] flex items-center">
      <Icon name="money_grey" />
      <h4
        class="
          text-[#1a2f53]
          ml-[7px]
          font-semibold
          text-[12rem]
          leading-[15px]
          _loading
        "
      >
        1 000 000
      </h4>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.bg-vacancy {
  background: url("@/static/img/footer-bg.png");
  background-repeat: no-repeat;
  background-position: right 140px;
  background-size: 100px;
}
</style>
