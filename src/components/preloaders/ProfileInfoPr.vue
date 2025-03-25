<script setup lang="ts">
defineProps({
  type: { type: Number, default: 1 },
  profile: { type: Object, default: () => ({}) },
});
</script>

<template>
  <div>
    <div class="container">
      <div class="flex gap-[24rem] mt-[32rem] sm:flex-col">
        <div class="_loading max-w-[300px] w-full max-h-[400px]">
          <img src="" alt="single-foto" class="" />
        </div>
        <div>
          <h1 class="text-[28rem] leading-[130%] font-bold text-[#1A2F53] mb-[12px] _loading">
            hsduajsdadsa
          </h1>
          <span
            class="block text-[15rem] leading-[150%] font-semibold text-[#677B9E] mb-[20rem] _loading"
            >Lorem, ipsum.</span
          >
          <p class="text-[15rem] leading-[150%] font-normal text-[#677B9E] mb-[27rem] _loading"></p>
          <div class="flex items-end justify-between gap-[10px] xs:flex-col xl:items-start">
            <div class="flex flex-col gap-[12px]">
              <a
                class="flex items-center gap-[8px] text-[14rem] leading-[142%] font-medium text-[#1A2F53] _loading"
              >
                <Icon name="clock_grey" />
              </a>
              <a
                class="flex items-center gap-[8px] text-[14rem] leading-[142%] font-medium text-[#1A2F53] _loading"
              >
                <Icon name="gray_dark_phone" />
              </a>
              <a
                class="flex items-center gap-[8px] text-[14rem] leading-[142%] font-medium text-[#1A2F53] _loading"
              >
                <Icon name="gray_dark_mail" />
              </a>
            </div>
            <div class="flex items-center gap-[12px]">
              <a
                class="w-[24px] h-[24px] flex items-center justify-center bg-[#E0E5EC] _loading"
                href=""
                target="_blank"
              >
                <Icon name="faceboook" color="#8596B2" class="w-[14px] h-[14px]" />
              </a>
              <a
                class="w-[24px] h-[24px] flex items-center justify-center bg-[#E0E5EC] _loading"
                href=""
                target="_blank"
              >
                <Icon name="linkedin" color="#8596B2" class="w-[14px] h-[14px]" />
              </a>
              <a
                class="w-[24px] h-[24px] flex items-center justify-center bg-[#E0E5EC] _loading"
                href="
                target=_blank"
              >
                <Icon name="google" color="#8596B2" class="w-[14px] h-[14px]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.management-single {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: baseline;
  width: 100%;

  & .management-img {
    // content: "";
    position: absolute;
    top: 32px;
    right: 0;
    width: 869rem;
    height: 482rem;
    object-fit: cover;
    z-index: -1;
    @media (max-width: 1200px) {
      position: static;
      @apply mx-auto;
      width: 100%;
      max-width: 630px;
      margin-top: 70rem;
    }
  }
}
.bg-image {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 142px;
    height: 179px;
    background: url("@/static/img/bg-image.png") left bottom no-repeat;
    background-size: cover;
    pointer-events: none;
  }
}
</style>
