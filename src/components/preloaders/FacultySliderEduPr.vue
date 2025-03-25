<template>
  <div class="bg-[#F5F6FA] py-[14rem] pr-[14rem] pl-[28rem] w-[193rem]">
    <el-carousel
      ref="headFaculty"
      trigger="click"
      arrow="never"
      height="76px"
      :loop="true"
      indicator-position="none"
    >
      <el-carousel-item v-for="(items, indexes) in 5" :key="indexes">
        <span
          class="not-italic _loading minion font-bold text-[15rem] leading-[22rem] text-[#1A2F53]"
        >Helllooooooo</span>
        <h6
          class="not-italic mt-[5rem] w-[80%] _loading minion font-bold text-[15rem] leading-[22rem] text-[#1A2F53]"
        >Hellloo</h6>
        <h2
          class="mt-[5rem] not-italic _loading w-full  font-bold text-[15rem] leading-[22rem] text-[#1A2F53]"
        >Helllooooooo</h2>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped></style>