<template>
  <div class="relative w-full _loading">
    <img
      class="w-full h-[320px] object-cover"
      src="https://picsum.photos/1000/1000"
      alt=""
    />
    <div
      class="
        absolute
        bottom-[-11%]
        bg-[#F5F6FA]
        py-[20px]
        px-[40px]
        w-[90%]
        mx-auto
        left-0
        right-0
        z-index-[10]
      "
    >
      <h4
        class="
          text-[#1A2F53]
          minion
          font-bold
          text-[24rem]
          leading-[130%]
          _loading
        "
      >
        Lorem, ipsum dolor.
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
};
</script>

<style lang="sass" scoped>
</style>