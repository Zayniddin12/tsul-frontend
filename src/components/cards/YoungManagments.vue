<template>
  <router-link
    :to="{
      path: '/management/' + scientist.slug,
      query: {
        category: scientist.category
      }
    }"
    class="young-scientists block"
  >
    <img v-if="scientist.image" :src="scientist.image" :alt="scientist.name" />
    <img v-else src="@/static/img/default.svg" alt="" />
    <div
      class="flex flex-col justify-end absolute bottom-0 left-0 p-[16px] h-full w-full !bg-[#1a2f53b3] hover:!bg-transparent cursor-pointer transition"
    >
      <div
        v-if="scientist.name"
        class="young-scientists__name line-clamp-2 minion"
        v-html="removeHTMLTags(scientist.name)"
      ></div>
      <hr v-if="scientist.text" />
      <div
        v-if="scientist.text"
        class="young-scientists__text line-clamp-3 !text-red"
        v-html="removeHTMLTags(scientist.text)"
      ></div>
    </div>
  </router-link>
</template>
<script>
import { removeHTMLTags } from "@/helpers/actions";

export default {
  props: {
    scientist: {
      type: Object,
      required: true,
    },
  },
  methods: { removeHTMLTags },
};
</script>

<style lang="scss">
.young-scientists {
  position: relative;
  height: 380px;

  hr {
    height: 1px;
    width: 45px;
    @apply my-[12px];
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }

  // .young-scientists__name
  &__name {
    font-weight: 700;
    font-size: 18rem;
    line-height: 130%;
    color: #ffffff;
  }

  // .young-scientists__text
  &__text {
    font-weight: 600 !important;
    font-size: 12rem !important;
    line-height: 130% !important;
    color: #ffffff !important;
    opacity: 0.8 !important;
  }
}
</style>
