<template>
  <div class="inline-block  w-[268px] -1430:w-[100%] h-[282px] group relative">
    <div class="z-20 bg-ls group-hover:opacity-70 absolute top-0 left-0 w-full h-full"></div>
    <div>
      <img
        v-if="img"
        v-lazy="{ src: img }"
        class="w-full h-full absolute top-0 left-0 object-cover"
        :alt="title"
      />
      <img v-else src="@/static/img/default.svg" class="w-full h-full" alt="" />
    </div>
    <div class="absolute top-0 left-0 p-[16px] w-full h-full flex z-30">
      <p
        class="mt-auto not-italic font-semibold text-[18rem] text-white line-clamp-2 leading-[140%]"
      >
        {{ title }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slug: { type: String },
    img: { type: String },
    title: { type: String },
  },
};
</script>

<style lang="scss" scoped>
.bg-ls {
  background: linear-gradient(180deg, rgba(3, 21, 51, 0) 0%, #051838 100%);
  transition: all 0.3s ease;
}
</style>
