<script setup lang="ts">
defineProps({
  scientist: { type: Object, default: () => ({}) },
});
</script>

<template>
  <div v-if="scientist" class="young-scientists _loading">
    <img src="@/static/img/default.svg" alt="young scientists" />
    <div
      class="flex flex-col justify-end absolute bottom-0 left-0 p-[16px] h-full w-full cursor-pointer transition"
    >
      <div class="young-scientists__name line-clamp-2 _loading">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, porro.
      </div>
      <hr />
      <div class="young-scientists__text line-clamp-3 _loading">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut perferendis magni eveniet?
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.young-scientists {
  position: relative;
  min-height: 380px;
  hr {
    height: 1px;
    width: 45px;
    @apply my-[12px];
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }
  // .young-scientists__name
  &__name {
    font-weight: 700;
    font-size: 18rem;
    line-height: 130%;
    color: #ffffff;
  }
  // .young-scientists__text
  &__text {
    font-weight: 600 !important;
    font-size: 12rem !important;
    line-height: 130% !important;
    color: #ffffff !important;
    opacity: 0.8 !important;
  }
}
</style>
