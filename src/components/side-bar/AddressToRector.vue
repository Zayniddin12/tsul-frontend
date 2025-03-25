<template>
  <div class="relative overflow-hidden p-[20px] h-[356px] bg-[#E6E9F0]">
    <h2 class="mb-[16px] text-[24rem] leading-[130%] text-[#1A2F53] font-[700] minion">
      Rektorga murojaat
    </h2>
    <router-link
      class="hover:!opacity-[0.8] transition !z-[5] relative inline-block cursor-pointer bg-[#1A2F53] py-[12px] px-[20px] text-[13rem] font-[600] leading-[130%] text-white"
      to="/management/apply"
      >Murojat qilish</router-link
    >
    <div class="w-full absolute bottom-0 left-0 !z-[1]">
      <img class="w-full object-cover" src="@/static/img/rector-img.png" alt="" />
    </div>
    <img class="absolute bottom-[14px] left-[0] z-[1]" src="@/static/img/decaration.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "AddressToRector",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
