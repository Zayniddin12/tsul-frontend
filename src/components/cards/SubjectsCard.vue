<template>
  <div
    class="px-[16rem] h-[252rem] pt-[16rem] pb-[48rem] bg-[#fff] border-[1.6px] border-[#E0E5EC] subject-card relative"
  >
    <router-link :to="`/department/subjects`">
      <h6 class="font-semibold text-[13rem] text-[#677B9E] uppercase leading-[16px] line-clamp-1">
        {{ tag }}
      </h6>
      <div class="w-[50px] h-[1px] bg-[#E6E8ED] mt-[16px] mb-[16px]"></div>
      <h5 class="font-bold minion text-[20rem] leading-[28px] text-[#1A2F53] line-clamp-5">
        {{ title }}
      </h5>
      <Icon name="bg_pattern" class="absolute bottom-0 left-0 z-[1]" />
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    slug: {
      type: String,
    },
    tag: {
      type: String,
    },
    title: {
      type: String,
    },
  },
};
</script>

<style lang="scss">
.subject-card {
  h5 {
    transition: 0.3s all;
  }

  &:hover {
    h5 {
      color: #677b9e;
    }
  }
  i {
    width: 142rem;
    height: 179rem;
    svg {
      path {
        fill: rgba(26, 47, 83, 1) !important;
        fill-opacity: 0.02 !important;
      }
    }
  }
}
</style>
