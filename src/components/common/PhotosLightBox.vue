<template>
  <div class="photos-light-box">
    <el-dialog v-model="activate" class="bg-[transparent]">
      <div class="flex justify-between items-center absolute top-[-35px] w-[103%]">
        <h2
          class="text-[#fff] text-[16rem] font-medium leading-[19rem]"
        >{{ current }}/{{ list.length }} {{ title }}</h2>
        <Icon
          class="cursor-pointer w-[32rem]"
          name="modal_close_btn"
          @click="$emit('openPhotos')"
        />
      </div>
      <div class="slider flex flex-col-reverse items-center gap-[16rem]">
        <div class="slider1 relative flex items-center justify-center">
          <button class="slider1__arrow absolute left-[-34px]" @click="prev()">
            <Icon name="prevBtnVideos" />
          </button>
          <div class="relative flex items-center justify-center overflow-hidden w-full h-full">
            <div v-if="list && list.length"  ref="inner" class="inner flex gap-[16rem]" :style="innerStyles">
              <div
                v-for="(item, index) in list"
                :key="index"
                class="card flex items-center justify-center"
                :class="current === index ? '_active' : ''"
                @click="getIndex(index)"
              >
                <img :src="item" alt="light-box-photos" />
              </div>
            </div>
          </div>
          <button class="slider1__arrow absolute right-[-34px]" @click="next()">
            <Icon name="nextBtnVideos" />
          </button>
        </div>
        <div class="slider2 overflow-hidden">
          <div ref="inner2" class="inner flex">
            <div class="card2">
              <img v-if="firstSliderIndex" :src="list[firstSliderIndex]" alt="light-box-photo" />
              <img v-else :src="list[current]" alt="light-box-photo" />
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
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
      indexImgs: 0,
      innerStyles: {},
      innerStyles2: {},
      step: '',
      current: null,
      currentItem: null,
      firstSliderIndex: '',
    };
  },
  mounted() {
    this.resetTranslatePrev()
    this.resetTranslateNext()
    this.currentSlide()
  },
  methods: {
    openPhotos() {
      this.activate = !this.activate
    },
    getIndex(index) {
      this.firstSliderIndex = this.current = index
    },

    next() {
      this.moveLeft()
      this.afterTransition(() => {
        const card = this.list.shift()
        this.list.push(card)
        this.resetTranslateNext()
      })
    },
    prev() {
      this.moveRight()
      this.afterTransition(() => {
        const card = this.list.pop()
        this.list.unshift(card)
        this.resetTranslatePrev()
      })
    },
    currentSlide() {
      const half = Math.floor(this.list.length / 2)
      this.current = half + 1
    },
    moveLeft() {
      this.innerStyles = {
        transform: `translateX(-0px)`,
        transition: '0.3s all'

      }
    },
    moveRight() {
      this.innerStyles = {
        transform: `translateX(0px)`,
        transition: '0.3s all'
      }
    },
    afterTransition(callback) {
      const listener = () => {
        callback()
        this.$refs.inner.removeEventListener('transitionend', listener)
      }
      this.$refs.inner.addEventListener('transitionend', listener)
    },

    resetTranslatePrev() {
      this.innerStyles = {
        transition: 'none',
        transform: `translateX(176px)`,
      }
    },
    resetTranslateNext() {
      this.innerStyles = {
        transition: 'none',
        transform: `translateX(-176px)`,
      }
    },
  },
};
</script>

<style lang="scss" >
.slider1 {
  width: 1068px;
  height: 100%;
  &__arrow {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }
}
.inner {
  white-space: nowrap;
  transition: 0.3s all;
}
.card {
  // width: 124px;
  // height: 80px;
  width: 180px;
  height: 110px;
  display: inline-flex;
  background: rgba(13, 24, 44, 0.7);
  transition: 0.3s all;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    z-index: -1;
  }
}
.card2 {
  width: 1062px;
  height: 598px;
  display: inline-flex;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
._active {
  background: transparent;
  transition: 0.3s all;
}
.photos-light-box {
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
