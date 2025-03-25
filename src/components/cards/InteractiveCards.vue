<template>
  <div>
    <router-link
      class="flex flex-col items-center interactive-cards"
      :to="slug"
    >
      <div
        class="
          flex
          items-center
          justify-between
          py-[12rem]
          px-[16rem]
          w-full
          bg-[#1A2F53]
          border-solid border-[1rem] border-[rgba(255,255,255,0.15)]
        "
      >
        <Icon :name="iconName" />
        <p class="minion font-bold text-[20rem] leading-[28rem] text-[#fff] line-clamp-1">
          {{ title }}
        </p>
        <Icon name="arrow_right_button" />
      </div>
      <div class="bg-[#E0E5EC] w-[98%] rem-[20rem] py-[16px] px-[20px] h-[74px]">
        <h6
          class="
            font-normal
            line-clamp-2
            text-[15rem] text-[#8C97A9]
            leading-[140%]
          "
        >
          {{ description }}
        </h6>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.interactive-cards {
  transition: 0.2s all;
  h6 {
    transition: 0.2s all;
  }

  &:hover {
    h6 {
      color: #1a2f53;
    }
  }
}
</style>
