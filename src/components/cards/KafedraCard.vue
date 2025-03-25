<template>
  <router-link :to="'/heads-of-department/' + leader.slug">
    <div
      class="w-full z-[2] -1300:block bg-[#FFFFFF] border-[1.6px] border-[#E0E5EC] px-[24rem] -425:p-[12rem] pt-[24rem] pb-[20rem]"
    >
      <p
        class="not-italic line-clamp-7 font-normal mb-[28rem] leading-[140%] text-[15rem] text-[#344666]"
        v-html="leader?.description"
      ></p>

      <span
        class="not-italic line-clamp-1 font-semibold text-[12rem] leading-[130%] opacity-[0.8] mb-[2rem] text-[#677B9E]"
        >{{ leader?.category?.name }}</span
      >

      <h6
        class="not-italic font-bold line-clamp-1 text-[20rem] leading-[130%] minion text-[#1A2F53]"
      >
        {{ getFullName(leader) }}
      </h6>
      >
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    leader: Object,
  },
};
</script>

<style lang="scss" scoped></style>
