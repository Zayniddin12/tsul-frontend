<template>
  <div class="min-h-[400rem] flex items-center justify-center">
    <div>
      <div class="flex items-center justify-center">
        <icon name="noData" class="mb-[24rem]" />
      </div>
      <h5 class="mb-[8rem] minion not-italic font-bold text-[32rem] leading-[130%] text-center text-[#677B9E]">
        {{ $t('no_information') }}
      </h5>
      <p class="not-italic font-normal text-[14rem] text-center leading-[130%] opacity-[0.8] text-[#677B9E]">
        {{ $t('again_later_see') }}
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>
