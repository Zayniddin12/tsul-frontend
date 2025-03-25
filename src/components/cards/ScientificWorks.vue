<template>
  <router-link
    :to="`/scientific-works/${slug}`"
    class="block min-w-[278px] px-[16rem] pt-[16rem] pb-[24rem] bg-[#F5F6FA] border-[1.6px] h-[376rem] border-[#E0E5EC] subject-card relative hover:bg-[#fff] transition duration-300"
  >
    <div class="flex flex-col justify-between h-[100%]">
      <div>
        <h6 class="font-semibold text-[13rem] text-[#677B9E] uppercase leading-[16px] line-clamp-1">
          {{ tag }}
        </h6>
        <div class="w-[50px] h-[1px] bg-[#E6E8ED] mt-[16px] mb-[16px]"></div>
        <h5 class="font-bold minion text-[20rem] leading-[28px] text-[#1A2F53] line-clamp-5">
          {{ title }}
        </h5>
        <img
          src="@/static/img/science-bg.svg"
          class="absolute bottom-0 left-0 z-[1]"
          alt="scientific-work"
        />
      </div>
      <div class="flex justify-end w-[100%]">
        <router-link
          :to="`/scientific-works/${slug}`"
          class="learn-more-buttons w-[146rem] translate-x-[40px] sm:translate-x-[0px] transform h-[56px]"
        >
          <p>{{ $t("more") }}</p>
          <Icon name="arrow_right_button" class="w-[32px]" />
        </router-link>
      </div>
    </div>
  </router-link>
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
  .absolute {
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
