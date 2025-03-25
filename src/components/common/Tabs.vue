<template>
  <div class="tabs">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane v-for="(item, index) in data" :key="index" :label="item.label" :name="item.name">
        <slot :name="item.name"></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    active: {
      type: String,
      default: "first",
    },
  },
  emits: ["fetchCurrent"],
  data() {
    return {
      activeName: "",
    };
  },
  watch: {
    activeName(val) {
      this.$emit("fetchCurrent", val);
    },
  },
  mounted() {
    this.activeName = this.active;
  },
};
</script>
<style lang="scss">
@import "../../assets/styles/mixins";

.demo-tabs > .el-tabs__content {
  @include adaptiv(padding, 32, 0);
  color: #6b778c;
  font-size: 32rem;
  font-weight: 600;
}

.tabs {
  .el-tabs__nav-wrap {
    overflow: hidden;
    &::after {
      background-color: transparent !important;
    }
  }

  .is-top {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }

  .el-tabs__item {
    font-style: normal;
    font-weight: 500;
    font-size: 16rem;
    line-height: 140%;
    color: #8c97a9;
    width: 194px;
    padding: 0 !important;
    height: 52px;
    background: #ffffff;
    border: 1.6px solid #e0e5ec;
    box-sizing: border-box;
    white-space: initial;
    text-align: center;

    transition: all 0.35s ease-in-out;
    &:hover:not(.is-active) {
      color: #1a2f53;
      transition: all 0.35s ease-in-out;
      background: #f0f2fa;
    }
    @media screen and (max-width: 500px) {
      font-size: 14rem;
      padding-block: 12px;
      //height: 42px;
      //max-width: fit-content;
      //padding-left: 15px !important;
      //padding-right: 15px !important;
    }
  }

  .el-tabs__item.is-active {
    background: #2b5e9b;
    border: 1.6px solid rgba(255, 255, 255, 0.2);
    box-sizing: border-box;
    font-style: normal;
    font-weight: 500;
    font-size: 16rem;
    line-height: 140%;
    text-align: center;
    color: #ffffff !important;

    transition: all 0.35s ease-in-out;
    &:hover {
      transition: all 0.35s ease-in-out;
    }

    &::after {
      content: url("../../static/img/tabs-title.png");
      position: absolute;
      top: 70%;
      left: 50%;
      transform: translate(-70%, -50%);
    }
  }

  .el-tabs__active-bar {
    width: 0 !important;
  }
}
</style>
