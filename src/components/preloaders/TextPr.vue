<template>
  <div>
    <p v-for="(item, index) in count" :key="index" class="_loading mb-[5rem] text-[15rem]">
      dasjk djkajsk jdajsd djas jdkajs kdsjas jdklasjd
    </p>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 26,
    },
  },
};
</script>

<style lang="scss" scoped></style>
