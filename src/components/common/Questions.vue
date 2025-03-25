<template>
  <div v-if="data">
    <el-collapse v-model="accordion1" accordion class="questions mt-[12px]">
      <el-collapse-item name="1">
        <template #title>
          <div class="w-full flex items-center justify-between gap-[10px]">
            {{ $t("buses") }}
            <Icon
              name="modal_close_btn"
              color="#1A2F53"
              class="transition w-[18px] h-[18px] rotate-[45deg]"
            />
          </div>
        </template>
        <div class="" v-html="data?.contact_bus"></div>
      </el-collapse-item>
    </el-collapse>
    <el-collapse v-model="accordion2" accordion class="questions mt-[12px]">
      <el-collapse-item name="2">
        <template #title>
          <div class="w-full flex items-center justify-between gap-[10px]">
            {{ $t("bus_station") }}
            <Icon
              name="modal_close_btn"
              color="#1A2F53"
              class="transition w-[18px] h-[18px] rotate-[45deg]"
            />
          </div>
        </template>
        <div class="" v-html="data?.contact_bus_stop"></div>
      </el-collapse-item>
    </el-collapse>
    <el-collapse v-model="accordion3" accordion class="questions mt-[12px]">
      <el-collapse-item name="3">
        <template #title>
          <div class="w-full flex items-center justify-between gap-[10px]">
            {{ $t("route_taxis") }}
            <Icon
              name="modal_close_btn"
              color="#1A2F53"
              class="transition w-[18px] h-[18px] rotate-[45deg]"
            />
          </div>
        </template>
        <div class="" v-html="data?.contact_bus_stop"></div>
      </el-collapse-item>
    </el-collapse>
    <el-collapse v-model="accordion4" accordion class="questions mt-[12px]">
      <el-collapse-item name="4">
        <template #title>
          <div class="w-full flex items-center justify-between gap-[10px]">
            {{ $t("close_metros") }}
            <Icon
              name="modal_close_btn"
              color="#1A2F53"
              class="transition w-[18px] h-[18px] rotate-[45deg]"
            />
          </div>
        </template>
        <div class="" v-html="data?.contact_metro"></div>
      </el-collapse-item>
    </el-collapse>
    <el-collapse v-model="accordion5" accordion class="questions mt-[12px]">
      <el-collapse-item name="5">
        <template #title>
          <div class="w-full flex items-center justify-between gap-[10px]">
            {{ $t("work_days") }}
            <Icon
              name="modal_close_btn"
              color="#1A2F53"
              class="transition w-[18px] h-[18px] rotate-[45deg]"
            />
          </div>
        </template>
        <div class="" v-html="data?.contact_workday"></div>
      </el-collapse-item>
    </el-collapse>
    <el-collapse v-model="accordion6" accordion class="questions mt-[12px]">
      <el-collapse-item name="6">
        <template #title>
          <div class="w-full flex items-center justify-between gap-[10px]">
            {{ $t("working_time") }}
            <Icon
              name="modal_close_btn"
              color="#1A2F53"
              class="transition w-[18px] h-[18px] rotate-[45deg]"
            />
          </div>
        </template>
        <div class="" v-html="data?.contact_worktime"></div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pending: undefined,
      data: undefined,
      accordion1: 1,
      accordion2: 2,
      accordion3: 3,
      accordion4: 4,
      accordion5: 5,
      accordion6: 6,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.pending = true;
      await Promise.allSettled([this.$store.dispatch("fetchAbout")])
        .then((res) => {
          this.data = res[0].value.data;
        })
        .finally(() => {
          this.pending = false;
        });
    },
  },
};
</script>

<style lang="scss">
.questions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: none;
  & .el-icon {
    display: none;
  }
  .el-collapse {
    display: flex;
    flex-direction: column;
    gap: 12px;
    &-item {
      //	border: 1.6px solid #E0E5EC;
      &.is-active {
        .rotate-\[45deg\] {
          transform: rotate(0deg);
          transition: all 0.35s ease-in-out;
        }
      }
    }
    &-item__wrap {
      border: none !important;
      & > div {
        padding: 12rem 24rem !important;
        font-size: 16rem;
        font-weight: 500;
        color: #677b9e;
      }
    }
    &-item__header {
      height: auto;
      background: #ffffff;
      font-weight: 500;
      font-size: 18rem;
      line-height: calc(22 / 18 * 100%);
      color: #1a2f53;
      padding: 12rem 24rem;
      border: none;
    }
  }
}
</style>
