<template>
  <div>
    <div
      class="relative gallery-single-cards"
      :style="{
        height: height
      }"
    >
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
        <div
          class="
            bg-[rgba(26,47,83,0.8)]
            backdrop-blur-[8rem]
            p-[12rem]
            w-[136rem]
            flex
            justify-between
            items-center
            right-[8rem]
            top-[8rem]
            absolute
          "
        >
          <a :href="image" :download="image">
            <Icon name="download_white" />
          </a>
          <!-- TODO: NEED TO ADD SHARE  -->
          <Icon name="share_icon" />
          <Icon name="printer_white" @click="window.print()" />
        </div>
        <Icon
          class="
            absolute
            top-[50%]
            right-[50%]
            transform
            translate-x-[50%] translate-y-[-50%]
            z-5
          "
          name="zoom_icon"
        />
      </div>
      <img :src="image" class="w-[100%] h-[100%] object-cover _loading" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String
    },
    image: {
      type: String
    },
  }
}
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
