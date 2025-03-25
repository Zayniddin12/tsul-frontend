<template>
  <div v-if="total > 1" class="example-pagination-block flex justify-end">
    <el-pagination
      v-model:currentPage="currentPage"
      :default-page-size="1"
      :total="total"
      layout="prev, pager, next"
      :pager-count="5"
      :current-page="currentPage"
      @click="changeUrl"
    />
  </div>
</template>

<script>
export default {
  props: {
    total: Number,
    activePage: Number,
  },
  emits: ["currentPage"],
  data() {
    return {
      currentPage: this.activePage || 1,
    };
  },
  watch: {
    currentPage(newVal) {
      this.$emit("currentPage", newVal);
    },
    activePage(newVal) {
      this.currentPage = newVal;
    }
  },
  mounted() {
    this.currentPage = +this.$route.query?.page || this.activePage || 1;
  },
  methods: {
    changeUrl() {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: this.currentPage,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.example-pagination-block {
  .el-pager {
    .number {
      font-weight: 600;
      font-size: 16rem;
      line-height: 19rem;
      color: #cbd3de;
      background: #f5f6fa;
      margin-right: 4rem;
      margin-left: 4rem;
      transition: all 0.3s ease-in-out;

      &:hover {
        color: #1a2f53 !important;
        background: #f5f6fa !important;
        transition: all 0.3s ease-in-out !important;
      }
    }

    .active {
      border: 1.6rem solid #e0e5ec !important;
      color: #1a2f53 !important;
    }

    li.is-active {
      color: #1a2f53 !important;
    }
  }
}
</style>
