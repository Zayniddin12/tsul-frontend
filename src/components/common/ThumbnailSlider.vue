<template>
  <div id="modalSlider" ref="root" class="root">
    <div ref="main" class="splide mb-[16px]">
      <slot name="main-before-track"></slot>

      <div class="splide__track">
        <ul class="splide__list">
          <slot type="main"></slot>
        </ul>
      </div>

      <slot name="main-after-track"></slot>
    </div>
    <div ref="thumbnail" class="splide small-slider">
      <slot name="thumbnail-before-track"></slot>
      <div class="splide__track">
        <ul class="splide__list">
          <slot type="thumbnail"></slot>
        </ul>
      </div>

      <slot name="thumbnail-after-track"></slot>
    </div>
  </div>
</template>

<script>
import { Splide } from "@splidejs/splide";
const EVENTS = [
  "mounted",
  "ready",
  "move",
  "moved",
  "shifted",
  "click",
  "active",
  "inactive",
  "visible",
  "hidden",
  "slide:keydown",
  "refresh",
  "updated",
  "resize",
  "resized",
  "repositioned",
  "drag",
  "dragging",
  "dragged",
  "scroll",
  "scrolled",
  "destroy",
  "arrows:mounted",
  "arrows:updated",
  "pagination:mounted",
  "pagination:updated",
  "navigation:mounted",
  "autoplay:play",
  "autoplay:playing",
  "autoplay:pause",
  "lazyload:loaded"
]

export default {
  props: {
    mainSettings: {
      type: Object,
      default: () => ({}),
    },
    thumbnailSettings: {
      type: Object,
      default: () => ({}),
    }
  },
  data: () => ({
    main: undefined,
    thumbnail: undefined,
  }),
  mounted() {
    if (this.$refs.main && this.$refs.thumbnail) {
      this.main = new Splide(this.$refs.main, this.mainSettings);
      this.bind(this.main);
      this.thumbnail = new Splide(this.$refs.thumbnail, this.thumbnailSettings);
      this.bind(this.thumbnail);
      this.main.sync(this.thumbnail)
      this.main.mount();
      this.thumbnail.mount();

      if (this.$refs.root) {
        document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowRight') {
            this.thumbnail.go('>')
          }
          if (e.key === 'ArrowLeft') {
            this.thumbnail.go('<')
          }
        })}
    }
  },
  beforeUnmount() {
    this.main?.destroy()
    this.thumbnail?.destroy()
    // clear event listeners
    this.$listeners = {}
  },
  methods: {
    bind(splide) {
      EVENTS.forEach( event => {
        splide.on( event, ( ...args ) => {
          this.$emit( `splide:${ event }`, splide, ...args );
        } );
      } );
    },
  },
}
</script>

<style>
.root {
  width: 100%;
}
</style>
