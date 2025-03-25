<template>
  <div class="grid gap-[2px] grid-cols-5 -768:grid-cols-3 relative">
    <div
      v-for="(item, index) in gallery"
      :key="index"
      class="cursor-pointer relative _loading"
      :class="{ big: index === 0 }"
      @click="$emit('show')"
    >
      <img
        v-if="index < showItem"
        :src="item"
        class="hover:opacity-[0.8] object-fill _loading -1245:object-cover transition"
        :class="{
          '!h-[180rem] !w-[302rem] -1245:!w-full -1245:!h-[180rem]': index === 0,
          '!h-[89rem] !w-[143rem] -1245:!w-full ': index !== 0,
        }"
        alt="gallery-image"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: 0,
      showItem: 7,
      gallery: [1, 2, 3, 4, 5, 56, 677, 213, 32],
    };
  },
  mounted() {
    this.width = window.innerWidth;

    if (this.width < 768 && this.width > 568) this.showItem = 6;
    if (this.width < 568 && this.width > 425) this.showItem = 3;
    if (this.width < 425 && this.width > 320) this.showItem = 1;
  },
};
</script>

<style lang="scss" scoped>
.big {
  grid-row: auto / span 2;
  grid-column: auto / span 2;

  @media (max-width: 425px) {
    grid-row: auto / span 12;
    grid-column: auto / span 12;
  }
}

.count {
  background: rgba(26, 47, 83, 0.7);
}

.redirect {
  background: linear-gradient(
    180deg,
    #182336f2 0%,
    rgba(24, 34, 54, 0.35) 72.4%,
    rgba(24, 35, 54, 0) 100%
  );
}
</style>
