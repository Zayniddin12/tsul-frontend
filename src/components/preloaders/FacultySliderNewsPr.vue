<template>
  <div
    class="bg-[#F5F6FA] news_sliders px-[78rem] pt-[44rem] pb-[74rem] -425:px-[20rem] -425:pt-[20rem] -768:pb-0"
  >
    <el-carousel ref="newsSlider" trigger="click" class="faculty-slider" arrow="never" :loop="true">
      <el-carousel-item v-for="(items, indexes) in 3" :key="indexes">
        <span
          class="mb-[12rem] not-italic font-semibold text-[15rem] leading-[130%] _loading uppercase text-[#677B9E]"
        >Helllooooooo000</span>

        <hr class="border-[1px] border-[#E6E8ED] w-[50rem] h-[1px] mt-[12rem] mb-[24rem]" />
        <h6
          class="mb-[20rem] minion not-italic font-bold text-[32rem] leading-[130%] _loading text-[#1A2F53]"
        >Helllooooooo</h6>

        <h6
          class="mb-[20rem] minion not-italic font-bold text-[32rem] leading-[130%] _loading text-[#1A2F53]"
        >Helllooooooo</h6>

        <h6
          class="mb-[20rem] minion not-italic font-bold w-[80%] text-[32rem] leading-[130%] _loading text-[#1A2F53]"
        >Helllooooooo</h6>
        <p
          class="not-italic font-normal max-w-[411rem] text-[15rem] leading-[140%] _loading text-[#677B9E]"
        >Helllooooooo</p>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped></style>