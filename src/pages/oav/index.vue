<template>
  <div class="container mb-[64rem]">
    <div class="grid grid-cols-12 gap-[24rem] my-[32rem]">
      <div class="col-span-9 lg:col-span-12">
        <page-title :title="$t('oav_performances')" class="mb-[32rem]" />
        <el-tabs v-model="activeName" class="oav-tabs" @tab-click="handleClick">
          <el-tab-pane
            class="interactive__top-btns text-[12rem]"
            :label="$t('oav_performances')"
            name="first"
          >
            <div
              v-if="pending"
              class="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-[24rem] mb-[24rem]"
            >
              <video-cards-pr
                v-for="(item, index) in data"
                :key="index"
                :height="height"
                :content-height="contentHeight"
              />
            </div>

            <div
              v-else-if="textContent?.length"
              class="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-[24rem] mb-[24rem]"
            >
              <div v-for="(item, index) in textContent" :key="index">
                <video-cards
                  :image="item?.get_image?.middle"
                  :description="item.description"
                  :tag="item.status"
                  :title="item.title"
                  :date="item.publish_date"
                  :slug="`/oav/${item.slug}`"
                  :height="height"
                  :videos-data="item.video"
                  :content-height="contentHeight"
                  @click="openModal(item)"
                />
              </div>
              <light-box
                v-if="videoData?.video"
                :videos="showModal"
                :video-arr="video"
                :title-light-box="videoData.title"
                @close-modal="exitModal"
              />
            </div>
            <NoData v-else />
            <Pagination :total="total" @current-page="page = $event" />
          </el-tab-pane>

          <el-tab-pane
            class="interactive__top-btns text-[12rem]"
            :label="$t('video')"
            name="second"
          >
            <div
              v-if="pending"
              class="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-[24rem] mb-[24rem]"
            >
              <video-cards-pr
                v-for="(item, index) in data"
                :key="index"
                :height="height"
                :content-height="contentHeight"
              />
            </div>

            <div
              v-else-if="videoContent?.length"
              class="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-[24rem] mb-[24rem]"
            >
              <div v-for="(item, index) in videoContent" :key="index">
                <video-cards
                  :image="item?.get_image?.middle"
                  :description="item.description"
                  :tag="item.status"
                  :title="item.title"
                  :date="item.publish_date"
                  :slug="`/oav/${item.slug}`"
                  :height="height"
                  :videos-data="item.video"
                  :content-height="contentHeight"
                  @click="openModal(item)"
                />
              </div>
              <light-box
                v-if="videoData?.video"
                :videos="showModal"
                :video-arr="video"
                :title-light-box="videoData.title"
                @close-modal="exitModal"
              />
            </div>
            <NoData v-else />
            <Pagination :total="total" @current-page="page = $event" />
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="col-span-3 lg:col-span-12"><SideBar /></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      activeName: "first",
      height: "170rem",
      contentHeight: "185rem",
      page: 1,
      total: undefined,
      oav: [],
      data: undefined,
      pending: undefined,
      videoContent: [],
      textContent: [],
      showModal: false,
      videoData: undefined,
      video: "",
      modalka: {
        videosData: [],
        title: "",
      },
    };
  },
  computed: {
    ...mapState({
      post: (state) => state.post.post,
    }),
  },
  watch: {
    async page() {
      this.getData();
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    videoData() {
      this.video = this.videoData.video?.replace("watch?v=", "embed/");
    },
  },

  created() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.getData();
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  methods: {
    openModal(item) {
      this.videoData = item;
      this.showModal = true;
    },

    exitModal() {
      this.showModal = false;
      this.videoData = {};
    },
    async getData() {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchPost", {
          type: "oav-performances",
          page: this.page,
          limit: 12,
        }),
      ])
        .then((res) => {
          this.data = res[0].value.data.results;
          this.total = res[0].value.data.total_pages;

          for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].video !== "" && this.data[i].video !== null) {
              this.videoContent.push(this.data[i]);
            } else {
              this.textContent.push(this.data[i]);
            }
          }
        })
        .finally(() => {
          this.pending = false;
          this.$store.dispatch("setSlugTitle", this.$t("breadcrumb.oav"));
        });
    },
  },
};
</script>

<style lang="scss">
.oav-tabs {
  .el-tabs__active-bar {
    display: none;
  }
  .el-tabs__nav {
    display: flex;
    justify-content: center;
    gap: 24px;
  }
  .el-tabs__item {
    max-width: 200px;
    height: 52px;
    background: #ffffff;
    border: 1.6px solid #e0e5ec;
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 15rem;
    line-height: 140%;
    color: #8c97a9;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 74px !important;
    margin: 0;
    white-space: initial;
    text-align: center;
    &:hover {
      background: #f0f2fa;
      border: 1.6px solid #d8e0eb;
    }
    &.is-active {
      background: #2b5e9b;
      border: 1.6px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      &::after {
        content: "";
        width: 20px;
        height: 3px;
        //margin-left: 10px;
        display: block;
        background-repeat: no-repeat;
        position: absolute;
        top: 36px;
        //background-image: url("@/static/img/vector-active.png");
        background-position: center;
        background-size: cover;
      }
    }
  }
  .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
  }
  .el-tabs__nav-wrap::after {
    display: none;
  }
}

.el-tabs__nav.is-top {
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
}
</style>
