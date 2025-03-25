<!-- eslint-disable -->
<template>
  <div class="photo-modal">
    <el-dialog v-model="activate" class="bg-[transparent]" @close="$emit('closeModal')">
      <div class="flex items-center justify-center flex-col">
        <div class="flex justify-between items-center w-full">
          <h2 class="text-[#fff] text-[16rem] pl-[30px] font-medium leading-[19rem]">
            {{ title }}
          </h2>
          <Icon class="cursor-pointer" name="modal_close_btn" @click="$emit('closeModal')"/>
        </div>

        <ThumbnailSlider :main-settings="mainOptions" :thumbnail-settings="thumbs">
          <template #default="{ type }">
            <SplideSlide v-for="(slide, index) in list" :key="index">
              <img
                v-if="type === 'main'"
                class="h-full object-cover w-full"
                :src="slide.get_image?.origin || slide"
                :alt="index"
              />
              <img
                v-if="type === 'thumbnail'"
                class="h-full w-full cursor-pointer object-cover"
                :src="slide.get_image?.origin || slide"
                :alt="index"
              />
            </SplideSlide>
          </template>
        </ThumbnailSlider>
        
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";

import ThumbnailSlider from "@/components/common/ThumbnailSlider.vue";

export default {
  components: {
    SplideSlide,
    ThumbnailSlider,
  },
  props: {
    activate: {
      type: Boolean,
    },

    list: {
      type: Array,
    },

    currentImg: {
      type: Number,
    },

    title: {
      type: String,
    },
  },

  data() {
    return {
      mainOptions: {
        type: "fade",
        perPage: 1,
        perMove: 1,
        rewind: true,
        fixedHeight: "530rem",
        pagination: false,
        arrows: false,
        cover: true,
        1440: {
          fixedHeight: "480px",
        },
        860: {},
        600: {
          fixedHeight: "300px",
        },
      },

      thumbs: {
        rewind: true,
        fixedWidth: "180rem",
        fixedHeight: "110rem",
        isNavigation: true,
        gap: 10,
        focus: "center",
        pagination: false,
        cover: true,
        dragMinThreshold: {
          mouse: 4,
          touch: 10,
        },
      },
    };
  },


};
</script>

<style lang="scss">
.photo-modal {
  .el-overlay {
    background: rgba(13, 24, 44, 0.9) !important;
  }
  .el-dialog__headerbtn {
    display: none !important;
  }
  .el-dialog__header {
    display: none !important  ;
  }
  
  .el-dialog__body {
    padding: 0 !important;
  }
}

.splide__track--fade .splide__list .splide__slide {
  width: 100% !important;
  background-size: cover !important;

  @media screen and (max-width: 768px) {
    height: 200px !important;
  }
    
}


.thumbnail {
  .splide__slide {
    opacity: 0.6 !important;
    height: 200px;
  }

  .splide__slide.is-active {
    opacity: 1 !important;
    height: 200px;
  }
  .splide__arrows {
    .splide__arrow--prev {
      top: 111%;
      left: 39%;

      &::before {
        content: url("../../static/img/arrow-left.svg");
      }

      svg {
        display: none;
      }
    }

    .splide__arrow--next {
      top: 111%;
      right: 39%;

      &::after {
        content: url("../../static/img/arrow-right.svg");
      }

      svg {
        display: none;
      }
    }

    .splide__pagination {
      margin-top: 50px;
    }
  }

  .splide__pagination {
    top: 107%;
    gap: 14px;

    .splide__pagination__page {
      background: white;
      border: 1px solid rgba(26, 47, 83, 0.45);
      width: 10px;
      height: 10px;
    }

    .is-active {
      background: #1a2f53 !important;
      border: 2px solid white !important;
      opacity: 1;
      outline: 2px solid #1a2f53 !important;
    }
  }
}

.photo-modal {
  .el-dialog {
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
      --el-dialog-width: 80%;
    }
  }
}
</style>
