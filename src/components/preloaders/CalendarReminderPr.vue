<template>
  <div class="_loading p-[16px] h-full">
    <div class="grid gap-[58px]">
      <h1 class="not-italic _loading font-bold text-[28rem] leading-[130%] uppercase text-white">
        23
        <span class="ml-[4px] not-italic text-[16rem] font-[400] text-normal text-white _loading"
          >23.</span
        >
      </h1>
      <p class="not-italic _loading font-semibold text-[14rem] leading-[130%] text-white">
        Hurmatli Olmazor va Shayxontohur tumani aholisi
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.reminder {
  z-index: 1;
  transition: all 0.3s ease-out;
  &::after {
    content: url("../../static/img/yurdik.png");
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    z-index: 2 !important;
  }
}
</style>
