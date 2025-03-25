<template>
  <div>
    <h1 class="section-titles select-none">{{ title }}</h1>
    <div class="flex items-center justify-center mt-[8rem] w-full">
      <icon name="title_icon" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped></style>
