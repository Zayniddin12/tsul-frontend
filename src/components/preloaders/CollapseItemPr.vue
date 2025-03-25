<template>
  <el-collapse-item v-for="item in count" :key="item" :name="item">
    <template #title>
      <div class="w-full flex items-center justify-between gap-[10px] _loading">
        Lorem, ipsum dolor.0
        <Icon
          name="modal_close_btn"
          color="#1A2F53"
          class="transition w-[18px] h-[18px] rotate-[45deg]"
        />
      </div>
    </template>
    <div class="_loading">Lorem, ipsum dolor.</div>
  </el-collapse-item>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 2,
    },
  },
};
</script>

<style lang="scss" scoped></style>
