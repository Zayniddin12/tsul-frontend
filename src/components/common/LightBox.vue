<template>
  <div>
    <div class="videos-modal">
      <el-dialog v-model="active" close-on-press-escape @close="closeModal">
        <div class="flex justify-between items-center absolute top-[-35px] w-full">
          <div
            class="text-[#fff] text-[16rem] font-medium leading-[19rem] line-clamp-1"
            v-html="titleLightBox"
          ></div>
          <Icon
            class="cursor-pointer w-[3Hi there, 0px] h-auto"
            name="modal_close_btn"
            @click="closeModal"
          />
        </div>
        <div
          v-if="videoArr && videos.length"
          class="flex items-center justify-between absolute w-[110%] top-[50%] right-[50%] transform translate-x-[50%] translate-y-[-50%] z-5"
        >
          <Icon class="cursor-pointer" name="prevBtnVideos" @click="prevBtnVideos" />
          <Icon class="cursor-pointer" name="nextBtnVideos" @click="nextBtnVideos" />
        </div>
        <el-carousel
          ref="videosSlider"
          arrow="never"
          indicator-position="none"
          trigger="click"
          :autoplay="false"
          height="598px"
          @change="pauseVideo()"
        >
          <el-carousel-item>
            <iframe
              id="iframe"
              ref="player"
              class="player"
              width="100%"
              height="598px"
              :src="videoArr"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </el-carousel-item>
        </el-carousel>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    videos: {
      type: Boolean,
      default: false,
    },
    videoArr: {
      type: String,
    },
    titleLightBox: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      active: false,
    };
  },
  watch: {
    videos: {
      handler(newValue) {
        this.active = newValue;
      },
      immediate: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    prevBtnVideos() {
      this.$refs.videosSlider.prev();
    },
    nextBtnVideos() {
      this.$refs.videosSlider.next();
    },
    pauseVideo() {
      let player = document.querySelectorAll(".player");
      for (let i = 0; i < player.length; i++) {
        player[i].src = player[i].src;
      }
    },
  },
};
</script>

<style lang="scss">
.videos-modal {
  .el-dialog {
    &__body,
    &__header {
      padding: 0 !important;
      margin: 0 !important;
    }
    --el-dialog-width: 55%;
    @media (max-width: 1280px) {
      --el-dialog-width: 65%;
    }

    @media (max-width: 1000px) {
      --el-dialog-width: 75%;
    }

    @media (max-width: 700px) {
      --el-dialog-width: 85%;
    }

    @media (max-width: 500px) {
      --el-dialog-width: 90%;
    }
  }
}
</style>
