<template>
  <div class="container mb-[64rem] -500:mb-[48px] faq-page">
    <div class="grid grid-cols-12 gap-[24px] mt-[32px] mb-[32px]">
      <div class="w-full col-span-9 -1024:!col-span-12">
        <PageTitle :title="$t('faq')" />
      </div>
      <div class="w-full col-span-3 -768:hidden"></div>
    </div>

    <div class="grid grid-cols-12">
      <div class="col-span-9 lg:col-span-12">
        <tabs active="all" :data="tabs" @fetch-current="fetchCurrent">
          <template #all>
            <div
              class="col-span-12 bg-[#F5F6FA] border-[#F2F3F8] border-[1.6px] p-[24px] -768:p-[14px]  mb-[32px] -500:mb-[24px]"
            >
              <el-collapse v-model="accordion" accordion class="questions">
                <CollapseItemPr v-if="pending" :count="3" />
                <template v-else-if="faqs && faqs.length && !pending">
                  <el-collapse-item v-for="item in faqs" :key="item" :name="item">
                    <template #title>
                      <div class="w-full flex items-center justify-between gap-[10px]">
                        <span class=" title-text question-text" v-html="item.question"></span>
                        <Icon
                          name="modal_close_btn"
                          color="#1A2F53"
                          class="transition w-[18px] h-[18px] rotate-[45deg]"
                        />
                      </div>
                    </template>
                    <div class="answer-text" v-html="item.answer"></div>
                  </el-collapse-item>
                </template>

                <NoData v-else />
              </el-collapse>
            </div>
          </template>
          <template #first>
            <div
              class="col-span-12 bg-[#F5F6FA] border-[#F2F3F8] border-[1.6px] p-[24px] mb-[32px] -500:mb-[24px]"
            >
              <el-collapse v-model="accordion" accordion class="questions">
                <CollapseItemPr v-if="pending" :count="3" />
                <template v-else-if="faqs && faqs.length&& !pending">
                  <el-collapse-item v-for="item in faqs" :key="item" :name="item">
                    <template #title>
                      <div class="w-full flex items-center justify-between gap-[10px]">
                        <span v-html="item.question"></span>
                        <Icon
                          name="modal_close_btn"
                          color="#1A2F53"
                          class="transition w-[18px] h-[18px] rotate-[45deg]"
                        />
                      </div>
                    </template>
                    <div v-html="item.answer"></div>
                  </el-collapse-item>
                </template>

                <NoData v-else />
              </el-collapse>
            </div>
          </template>
          <template #second>
            <div class="col-span-12 bg-[#F5F6FA] p-[24px] mb-[32px] -500:mb-[24px]">
              <el-collapse v-model="accordion" accordion class="questions">
                <CollapseItemPr v-if="pending" :count="3" />
                <template v-else-if="faqs && faqs.length && !pending">
                  <el-collapse-item v-for="item in faqs" :key="item" :name="item">
                    <template #title>
                      <div class="w-full flex items-center justify-between gap-[10px]">
                        <span v-html="item.question"></span>
                        <Icon
                          name="modal_close_btn"
                          color="#1A2F53"
                          class="transition w-[18px] h-[18px] rotate-[45deg]"
                        />
                      </div>
                    </template>
                    <div v-html="item.answer"></div>
                  </el-collapse-item>
                </template>

                <NoData v-else />
              </el-collapse>
            </div>
          </template>
          <template #third>
            <div class="col-span-12 bg-[#F5F6FA] p-[24px] mb-[32px] -500:mb-[24px]">
              <el-collapse v-model="accordion" accordion class="questions">
                <CollapseItemPr v-if="pending" :count="3" />
                <template v-else-if="faqs && faqs.length && !pending">
                  <el-collapse-item v-for="item in faqs" :key="item" :name="item">
                    <template #title>
                      <div class="w-full flex items-center justify-between gap-[10px]">
                        <span v-html="item.question"></span>
                        <Icon
                          name="modal_close_btn"
                          color="#1A2F53"
                          class="transition w-[18px] h-[18px] rotate-[45deg]"
                        />
                      </div>
                    </template>
                    <div v-html="item.answer"></div>
                  </el-collapse-item>
                </template>
                <NoData v-else />
              </el-collapse>
            </div>
          </template>
        </tabs>
      </div>
      <div class="col-span-3 lg:col-span-12">
        <SideBar :show-sidebar="false" :show-current-news="false" :is-search-results="true" />
      </div>
    </div>
  </div>
</template>

<script>
import NoData from "../components/common/NoData.vue";
export default {
  components: { NoData },
  data() {
    return {
      tabs: [],
      pending: true,
      faqs: [],
      accordion: -1,
    };
  },
  async created() {
    this.pending = true;
    await this.$store.dispatch("fetchDegree")
      .then((res) => {
        this.degrees = res.data.results;
        this.tabs = this.getTabs(this.degrees);
      })
      .finally(() => {
        this.pending = false;
        this.$store.dispatch("setSlugTitle", "faq");
      });
  },
  methods: {
    async fetchCurrent(id) {
      let degree = "";
      if (this.tabs.length) {
        let temp = this.tabs.filter((item) => item.name == id);
        degree = temp[0].name == "all" ? "" : temp[0].id;
      }
      await this.$store
        .dispatch("fetchFaq", {
          degree: degree,
        })
        .then((res) => {
          this.faqs = res.data.results;
        });
    },
  },
};
</script>

<style lang="scss">
.question-text{
  font-size: 16rem !important;
  text-align: start;
}
.answer-text{
  font-size: 14rem;
}
  @media screen and (min-width: 768px) {
    .question-text{
      font-size: 18rem !important;
    }
    .answer-text{
      font-size: 16rem;
    }
  }
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
        border: none !important;

        .rotate-\[45deg\] {
          transform: rotate(0deg);
          transition: all 0.35s ease-in-out;
        }
      }
    }
    &-item__wrap {
      border: none !important;
      text-align: left;
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
      transition: all .3s;
      &:hover{
        background: #f0f2fa;
      }
    }
  }
}
</style>
