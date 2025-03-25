<template>
  <router-link
    v-if="scientist && type === '0'"
    :to="{
      path: scientist.url ?? '/active-students/' + scientist.id,
    }"
    class="young-scientists block"
  >
    <div
      class="flex flex-col bg-gradient-to-t from-[#051838] from-10% to-70% to-[#03153300] justify-end absolute bottom-0 left-0 p-[16px] h-full w-full bg-transparent hover:bg-[#1A2F53B2] !cursor-pointer transition z-[2]"
    >
      <div class="young-scientists__name line-clamp-2 minion" v-html="scientist.name"></div>
      <hr />
      <div class="young-scientists__text line-clamp-3" v-html="scientist.text"></div>
    </div>
    <span class="young-scientists__overlay" />
    <img
      v-if="scientist.image && isImage"
      :src="scientist.image"
      :alt="scientist.name"
      class="object-cover"
      @error="isImage = false"
    />
    <img v-else src="@/static/img/default.svg" alt="" />
  </router-link>
  <router-link
    v-if="scientist && type === '1'"
    :to="{
      path: '/scientist/' + scientist.id,
    }"
    class="young-scientists block"
  >
    <div
      class="flex flex-col bg-gradient-to-t from-[#051838] from-10% to-70% to-[#03153300] justify-end absolute bottom-0 left-0 p-[16px] h-full w-full bg-transparent hover:bg-[#1A2F53B2] !cursor-pointer transition z-[2]"
    >
      <div
        class="young-scientists__name line-clamp-2 minion"
        :class="{ 'pb-[14px]': !scientist.text }"
        v-html="scientist.name"
      ></div>
      <hr v-if="scientist.text" />
      <div class="young-scientists__text line-clamp-3" v-html="scientist.text"></div>
    </div>
    <span class="young-scientists__overlay" />
    <img
      v-if="scientist.image && isImage"
      :src="scientist.image"
      :alt="scientist.name"
      class="object-cover"
      @error="isImage = false"
    />
    <img v-else src="@/static/img/default.svg" alt="" />
  </router-link>
  <router-link v-if="scientist && type === '4'" :to="scientist.slug" class="young-scientists block">
    <img
      v-if="scientist?.image && isImage"
      :src="scientist?.image"
      :alt="scientist.name"
      @error="isImage = false"
    />
    <img v-else src="@/static/img/default.svg" alt="" />
    <span class="young-scientists__overlay" />
    <div
      class="flex flex-col justify-end absolute bottom-0 left-0 p-[16px] h-full w-full hover:bg-[#1a2f53b3] bg-transparent cursor-pointer transition z-[2]"
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
  <router-link
    v-if="scientist && type === '2'"
    :to="
      scientist?.path ??
      `/${baseSlug ? baseSlug : 'all-employees'}/${scientist.slug}?category=${
        scientist.category ?? ''
      }`
    "
    class="young-scientists block"
  >
    <img
      v-if="scientist?.image && isImage"
      :src="scientist?.image"
      :alt="scientist.name"
      @error="isImage = false"
    />
    <img v-else src="@/static/img/default.svg" alt="" />
    <span class="young-scientists__overlay" />
    <div
      class="flex flex-col justify-end absolute bottom-0 left-0 p-[16px] h-full w-full hover:bg-[#1a2f53b3] bg-transparent cursor-pointer transition z-[2]"
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
  <router-link
    v-if="scientist && type === '3'"
    :to="{
      path: scientist?.path ?? `/${baseSlug ? baseSlug : 'heads-of-department'}/${scientist.slug}`,
    }"
    class="young-scientists block"
  >
    <img
      v-if="scientist?.image && isImage"
      :src="scientist?.image"
      :alt="scientist.name"
      @error="isImage = false"
    />
    <img v-else src="@/static/img/default.svg" alt="" />
    <span class="young-scientists__overlay" />
    <div
      class="flex flex-col justify-end absolute bottom-0 left-0 p-[16px] h-full w-full hover:bg-[#1a2f53b3] bg-transparent cursor-pointer transition z-[2]"
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
    type: {
      type: String,
      required: true,
    },
    baseSlug: String,
  },
  data() {
    return {
      isImage: true,
    };
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
    position: relative;
    z-index: 1;
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

  // .young-scientists__overlay
  &__overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    z-index: 1;
    background: linear-gradient(180deg, rgba(3, 21, 51, 0) 0%, rgba(5, 24, 56, 0.9) 100%);
  }
  &:hover .young-scientists__overlay {
    opacity: 1;
  }
}
</style>
