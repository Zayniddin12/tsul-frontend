<template>
  <div  class="block border-[1px] border-[#E0E5EC] bg-[#FFFFFF]">
    <div class="news-cards news-cards-wrapper cursor-pointer h-full overflow-y-hidden">
      <router-link
:to="!videosData ? slug : ''"
        class="w-[100%] bg-center bg-no-repeat bg-cover bg-[rgba(26,47,83,0.56)] relative cursor-pointer video-box"
      >
        <span
          v-if="videosData"
          class="absolute z-[3] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group"
        >
          <svg
            class="group-hover:scale-110 transition-all duration-300"
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            fill="none"
          >
            <path d="M15.1875 7.59375V46.4062L45.5625 27L15.1875 7.59375Z" fill="white" />
          </svg>
        </span>
        <div v-if="videosData">
          <img
            v-if="image"
            :src="image"
            graggable="false"
            class="w-full h-[170px] object-cover relative z-[1] pointer-events-none"
            alt="video"
          />
        </div>
        <router-link v-else :to="slug">
         
          <img
            v-if="image"
            :src="image"
            graggable="false"
            class="w-full h-[170px] object-cover relative z-[1] pointer-events-none"
            alt="video"
          />
        </router-link>

        <img
          v-if="!image"
          src="@/static/img/default.svg"
          class="w-full h-[170px] object-cover pointer-events-none"
          alt="video"
        />
        <icon
          v-if="videosData"
          class="absolute top-[50%] right-[50%] transform translate-x-[50%] translate-y-[-50%] z-[5]"
          name="play"
          @click="$emit('open')"
        />

        <icon
          v-if="image && !videosData"
          class="absolute top-[16px] left-[16px] z-[2]"
          name="gallery_photos"
        />
      </router-link>
      <router-link :to="slug">
        <div class="block content px-[20px] py-[24px] border-[#E0E5EC] bg-white">
          <!-- :style="`height:${contentHeight}  `" -->
          <div class="flex items-center justify-start mb-[6px]">
            <span class="font-medium text-[11px] leading-[145%] text-[#677B9E]">
              {{ $dayjs(date).format("DD") }}.{{ $t($dayjs(date).format("MM")) }}.{{
                $dayjs(date).format("YYYY")
              }}
              {{ $dayjs(date).format(" HH:MM") }}
            </span>
          </div>
          <div class="bg-[#E0E5EC] w-[55px] h-[1px] mt-[12px] mb-[12px]"></div>
          <h6
            class="font-bold text-[#1A2F53] minion text-[20rem] leading-[26px] line-clamp-2 min-h-[52px] -640:min-h-fit"
          >
            {{ title }}
          </h6>
          <div
            v-if="description"
            class="font-normal line-clamp-3 text-[12rem] leading-[140%] text-[#677B9E] mt-[6px]"
            v-html="description"
          ></div>
        </div>
      </router-link>
    </div>
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
    contentHeight: {
      type: String,
      default: "133rem",
    },
    description: {
      type: String,
      default: "",
    },
    videosData: {
      type: String,
    },
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
.video-box {
  position: relative;
}
.video-box {
  transition: all 0.25s ease;
  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    z-index: 2;
    background: #1a2f538f;
    transition: all 0.3s;
  }
  &:hover {
    &::before {
      //background: none;
      //content: none;
      opacity: 0;
    }
  }
}
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
    display: none !important;
  }
  .el-dialog__footer {
    display: none;
  }
  .el-dialog__headerbtn {
    display: none;
  }

  .el-dialog__body {
    padding: 0 !important;
  }

  .el-overlay {
    background: rgba(13, 24, 44, 0.9);
  }
}
</style>
