<template>
  <div>
    <div
      class="relative gallery-single-cards"
    >
      <!-- :style="{
        height: height,
      }" -->
      <div
        class="
          absolute
          top-0
          right-0
          w-[100%]
          h-[100%]
          bg-[rgba(26,47,83,0.6)]
          transition-all
          duration-300
          inner-wrap
        "
      >
        <Icon
          class="absolute top-[50%] right-[50%] transform translate-x-[50%] translate-y-[-50%] z-5"
          name="zoom_icon"
        />
      </div>
      <div class="max-h-[250px]">
        <img
          v-if="image"
          :src="image"
          class="w-[100%] object-cover gallery-images h-[250px]"
          alt="gallery-image"
        />
        <img v-else class="w-[100%] h-[100%] object-cover gallery-images" src="@/static/img/default.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
    },
    image: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.gallery-single-cards {
  cursor: pointer;
  .inner-wrap {
    opacity: 0;
  }

  &:hover {
    .inner-wrap {
      opacity: 1;
    }
  }
}
</style>
