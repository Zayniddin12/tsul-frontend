<template>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
    },
  },
  data() {
    return {
      innerStyles: {},
      innerStyles2: {},
      step: '',
      transitioning: false,
      current: null,
      currentItem: null,
      firstSliderIndex: '',
    }
  },

  mounted() {
    this.setStep()
    this.resetTranslate()
    this.currentSlide()
  },

  methods: {
    getIndex(index) {
      this.firstSliderIndex = index
    },

    setStep() {
      const innerHeight = this.$refs.inner.scrollHeight
      const totalCards = this.list.length
      this.step = `${innerHeight / totalCards}px`
    },
    next() {
      if (this.transitioning) return
      this.transitioning = true
      this.moveLeft()
      this.afterTransition(() => {
        const card = this.list.shift()
        this.list.push(card)
        this.resetTranslate()
        this.transitioning = false
      })
    },
    prev() {
      if (this.transitioning) return
      this.transitioning = true
      this.moveRight()
      this.afterTransition(() => {
        const card = this.list.pop()
        this.list.unshift(card)
        this.resetTranslate()
        this.transitioning = false
      })
    },
    currentSlide() {
      const half = Math.floor(this.list.length / 2)
      this.current = half + 1
    },
    moveLeft() {
      this.innerStyles = {
        transform: `translateX(-176px)`,
        transition: '0.3s all'

      }
    },
    moveRight() {
      this.innerStyles = {
        transform: `translateX(176px)`,
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

    resetTranslate() {
      this.innerStyles = {
        transition: 'none',
        transform: `translateX(-176px)`,
      }
    },
  },
}
</script>
<style lang="scss" scoped>
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
</style>
