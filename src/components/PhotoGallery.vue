<template>
  <div class="grid gap-[2px] grid-cols-5 -768:grid-cols-3 relative">
    <div
      v-for="(item, index) in gallery"
      :key="index"
      class="cursor-pointer relative xl:w-auto overflow-hidden"
      :class="{ big: index === 0 }"
    >
      <img
        v-if="(index < showItem && item?.get_image) || item.middle"
        class="hover:opacity-[0.8] h-full w-full object-cover -1245:object-cover transition"
        :src="item?.get_image?.middle ?? item.middle"
        :class="{
          ' !w-full -1245:!w-full -1245:!h-[180rem]': index === 0,
          'h-[89rem] w-full -1245:!w-full ': index !== 0,
        }"
        alt="gallery-image"
        @click="$emit('show', index)"
      />
      <div
        v-if="index === showItem - 1 && gallery.length > showItem"
        class="bg-[#1a2f53b3] hover:opacity-[0.8] transition absolute top-0 left-0 w-full h-full flex items-center cursor-pointer justify-center"
        @click="$emit('show', index)"
      >
        <h5 class="not-italic font-medium text-[18rem] leading-[130%] text-center text-white">
          +{{ gallery.length - showItem }} {{ $t("images") }}
        </h5>
      </div>

      <router-link
        v-if="index === 0 && item"
        :to="`/gallery/${link}`"
        class="redirect flex cursor-pointer gap-[4px] absolute top-0 pt-[8px] pl-[8px] left-0 h-[80rem] w-full"
      >
        <span class="not-italic font-medium text-[14rem] leading-[135%] text-justify text-white">
          {{ $t("fotogalereya") }}
        </span>
        <icon name="redirect" class="w-[15px] h-[15px]" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gallery: {
      type: Array,
      default: () => [],
    },
    link: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      width: 0,
      showItem: 7,
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
