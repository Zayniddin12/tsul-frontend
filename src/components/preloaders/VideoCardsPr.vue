<template>
  <div class="news-cards-wrapper">
    <div>
      <div class="news-cards">
        <div
          class="border-solid border-[1px] border-[#E0E5EC] w-full bg-center bg-no-repeat bg-cover bg-[rgba(26,47,83,0.56)] relative cursor-pointer _loading"
          :style="{
            height: height,
          }"
        >
          <img
            v-if="image"
            :src="image"
            class="w-full h-[100%] object-cover relative z-[-1]"
            alt=""
          />
          <icon
            v-if="videosData && videosData.length"
            class="absolute top-[50%] right-[50%] transform translate-x-[50%] translate-y-[-50%] z-5"
            name="play"
            @click="videosModal = !videosModal"
          />
          <icon
            v-if="image && !videosData"
            class="absolute top-[16px] left-[16px] z-5"
            name="gallery_photos"
          />
        </div>
        <div
          class="content px-[20px] pt-[20px] pb-[16px] border-t-0 border-solid border-[1.6px] border-[#E0E5EC]"
        >
          <div class="flex items-center justify-start mb-[6px]">
            <span class="font-medium text-[11px] leading-[145%] text-[#677B9E] _loading">
              asd
            </span>
          </div>
          <div class="bg-[#E0E5EC] w-[55px] h-[1px] mt-[12px] mb-[12px]"></div>
          <h6
            class="font-bold text-[#1A2F53] minion text-[18rem] leading-[130%] line-clamp-2 _loading"
          >
            asdasda
          </h6>
          <p
            class="font-normal line-clamp-3 text-[12rem] leading-[140%] text-[#677B9E] mt-[6px] _loading"
          >
            asd
          </p>
        </div>
      </div>
    </div>
    <light-box
      :videos="videosModal"
      :videos-arr="videosData"
      :title-light-box="title"
      @closeModal="videosModal = false"
    />
  </div>
</template>

<script>
export default {
  props: {
    video: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      default: "",
    },
    tag: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    videosData: {
      type: Array,
    },
  },
  data() {
    return {
      videosModal: false,
    };
  },

  methods: {
    prevBtnVideos() {
      this.$refs.videosSlider.prev();
    },
    nextBtnVideos() {
      this.$refs.videosSlider.next();
    },
  },
};
</script>

<style lang="scss">
.news-cards-wrapper {
  .content {
    transition: 0.3s all;
  }

  &:hover {
    .content {
      background: #f5f6fa;
    }
  }
  .el-dialog__header {
    display: none;
  }
  .el-dialog__footer {
    display: none;
  }
  .el-dialog__headerbtn {
    display: none !important;
  }

  .el-dialog__body {
    padding: 0 !important;
  }

  .el-overlay {
    background: rgba(13, 24, 44, 0.9);
  }
}
</style>
