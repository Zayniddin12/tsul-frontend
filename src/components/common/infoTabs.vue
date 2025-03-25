<template>
  <el-tabs v-model="active" class="demo-tabs info-tabs">
    <el-tab-pane v-if="inShort && inShort.length" :label="$t('inShort')" name="inShort">
      <div
        v-html="inShort"
        class="regular-text text-[15rem] leading-[150%] font-normal text-[#677B9E]"
      ></div>
    </el-tab-pane>
    <el-tab-pane v-if="functions && functions.length" :label="$t('functions')" name="functions">
      <div
        v-html="functions"
        class="regular-text text-[15rem] leading-[150%] font-normal text-[#677B9E]"
      ></div>
    </el-tab-pane>

    <el-tab-pane v-if="biography && biography.length" :label="$t('biography')" name="biography">
      <div
        v-html="biography"
        class="regular-text text-[15rem] leading-[150%] font-normal text-[#677B9E]"
      ></div>
    </el-tab-pane>
    <!--    <el-tab-pane v-if="functions && functions.length" :label="$t('biography')" name="biography">-->
    <!--      <h2-->
    <!--        v-if="educationOfRector && educationOfRector.length"-->
    <!--        class="text-[32rem] leading-[130%] font-bold text-[#1A2F53] mb-[24px] font-minion minion"-->
    <!--      >-->
    <!--        {{ $t("education") }}-->
    <!--      </h2>-->
    <!--      <div>-->
    <!--        <div-->
    <!--          v-for="(item, index) in educationOfRector"-->
    <!--          :key="index"-->
    <!--          class="flex items-start gap-[24rem] sm:flex-col timeline"-->
    <!--        >-->
    <!--          <h4-->
    <!--            class="text-[24rem] leading-[130%] font-bold text-white bg-[#1A2F53] flex items-center justify-center max-w-[302px] w-full p-[11px] border-[1.6px] border-[#E0E5EC] minion"-->
    <!--          >-->
    <!--            {{ item.years }}-->
    <!--          </h4>-->
    <!--          <p-->
    <!--            v-html="item.content"-->
    <!--            class="text-[15rem] leading-[130%] font-normal text-[#677B9E] p-[20rem] bg-[#F5F6FA] border-[#E0E5EC] border-[1.6px] w-full"-->
    <!--          ></p>-->
    <!--        </div>-->
    <!--      </div>-->

    <!--      <h2-->
    <!--        v-if="careeraOfRector && careeraOfRector.length"-->
    <!--        class="mt-[44px] text-[32rem] leading-[130%] font-bold text-[#1A2F53] mb-[24px] font-minion minion"-->
    <!--      >-->
    <!--        {{ $t("career") }}-->
    <!--      </h2>-->
    <!--      <div-->
    <!--        v-for="(item, index) in careeraOfRector"-->
    <!--        :key="index"-->
    <!--        class="flex items-start gap-[24rem] sm:flex-col timeline"-->
    <!--      >-->
    <!--        <h4-->
    <!--          class="text-[24rem] leading-[130%] font-bold text-white bg-[#1A2F53] flex items-center justify-center max-w-[302px] w-full p-[11px] border-[1.6px] border-[#E0E5EC] minion"-->
    <!--        >-->
    <!--          {{ item.years }}-->
    <!--        </h4>-->
    <!--        <p-->
    <!--          v-html="item.content"-->
    <!--          class="text-[15rem] leading-[130%] font-normal text-[#677B9E] p-[20rem] bg-[#F5F6FA] border-[#E0E5EC] border-[1.6px] w-full"-->
    <!--        ></p>-->
    <!--      </div>-->
    <!--    </el-tab-pane>-->

    <!-- rector uchun  -->

    <el-tab-pane v-if="education.length || careera.length" :label="$t('career')" name="career">
      <h2
        v-if="education && education.length"
        class="text-[32rem] leading-[130%] font-bold text-[#1A2F53] mb-[24px] font-minion"
      >
        {{ $t("education") }}
      </h2>
      <div>
        <div
          v-for="(item, index) in education"
          :key="index"
          class="flex items-start gap-[24rem] sm:flex-col timeline"
        >
          <h4
            class="text-[24rem] leading-[130%] font-bold text-white bg-[#1A2F53] flex items-center justify-center min-w-[302px] max-w-[302px] p-[11px] border-[1.6px] border-[#E0E5EC] minion"
          >
            {{ item.years }}
          </h4>
          <p
            v-html="item.content"
            class="text-[15rem] leading-[130%] font-normal text-[#677B9E] p-[20rem] bg-[#F5F6FA] border-[#E0E5EC] border-[1.6px]"
          ></p>
        </div>
      </div>
      <h2
        v-if="careera && careera.length"
        class="mt-[44px] text-[32rem] leading-[130%] font-bold text-[#1A2F53] mb-[24px] font-minion"
      >
        {{ $t("career") }}
      </h2>
      <div>
        <div
          v-for="(item, index) in careera"
          :key="index"
          class="flex items-start gap-[24rem] sm:flex-col timeline"
        >
          <h4
            class="text-[24rem] leading-[130%] font-bold text-white bg-[#1A2F53] flex items-center justify-center max-w-[302px] w-full p-[11px] border-[1.6px] border-[#E0E5EC] minion"
          >
            {{ item.years }}
          </h4>
          <p
            v-html="item.content"
            class="text-[15rem] leading-[130%] font-normal text-[#677B9E] p-[20rem] bg-[#F5F6FA] border-[#E0E5EC] border-[1.6px] w-full"
          ></p>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane
      v-if="scentificWorks && scentificWorks.length"
      :label="$t('scentific_works')"
      name="scentificWorks"
    >
      <div v-if="false" class="grid grid-cols-2 sm:grid-cols-1 gap-[24rem]">
        <news-card-pr v-for="(item, index) in 2" :key="index" />
      </div>

      <div v-else class="grid grid-cols-2 sm:grid-cols-1 gap-[24rem]">
        <news-card
          v-for="item in scentificWorks"
          v-bind="{
            height: item.height,
            image: item?.get_image?.origin,
            tag: item.tag,
            title: item.title,
            date: item.publish_date,
            slug: '/scientific-works/' + item.slug,
            description: item.description,
            biography: item.biography,
            articles: item.articles,
          }"
          :key="item.title"
        />
      </div>

      <button
        v-if="scentificWorks.length > 4"
        @click="$emit('load-more-works')"
        type="button"
        class="text-[15rem] leading-[130%] font-semibold text-[#1A2F53] bg-[#E0E5EC] min-w-[210px] p-[16rem] mx-auto mt-[32rem] uppercase flex items-center justify-center gap-[10px]"
      >
        {{ $t("load_more") }}
        <Icon :class="pending ? 'load-more' : ''" name="load_more" />
      </button>
    </el-tab-pane>

    <el-tab-pane v-if="articles && articles.length" :label="$t('articles')" name="articles">
      <div class="grid grid-cols-2 sm:grid-cols-1 gap-[24rem]">
        <news-card
          v-for="item in articles"
          v-bind="{
            height: item.height,
            image: item?.get_image?.origin,
            tag: item.tag,
            title: item.title,
            date: item.publish_date,
            slug: '/scientific-works/' + item.slug,
            description: item.description,
            biography: item.biography,
            articles: item.articles,
          }"
          :key="item.title"
        />
      </div>

      <button
        v-if="articles.length > 4"
        @click="$emit('load-more-works')"
        type="button"
        class="text-[15rem] leading-[130%] font-semibold text-[#1A2F53] bg-[#E0E5EC] min-w-[210px] p-[16rem] mx-auto mt-[32rem] uppercase flex items-center justify-center gap-[10px]"
      >
        {{ $t("load_more") }}
        <Icon :class="pending ? 'load-more' : ''" name="load_more" />
      </button>
    </el-tab-pane>
    <el-tab-pane
      v-if="videoLessons && videoLessons.length"
      :label="$t('video_tutorials')"
      name="videoLessons"
    >
      <div v-if="false" class="grid grid-cols-2 sm:grid-cols-1 gap-[24rem]">
        <video-cards-pr v-for="(item, index) in 2" :key="index" />
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-1 gap-[24rem]">
        <video-cards
          v-for="(item, index) in videoLessons"
          v-bind="{
            height: item.height,
            image: item.image,
            tag: item.tag,
            title: item.title,
            date: item.publish_date,
            description: item.description,
            videosData: item.videosArray,
            biography: item.biography,
          }"
          :key="index"
          @click="openModal(item)"
        />
      </div>
      <light-box
        :videos="videosModal"
        :video-arr="modalka.videosData"
        :title-light-box="modalka.title"
        @closeModal="exitModal"
      />
      <button
        v-if="videoLessons.length > 4"
        type="button"
        class="text-[15rem] leading-[130%] font-semibold text-[#1A2F53] bg-[#E0E5EC] min-w-[210px] p-[16rem] mx-auto mt-[32rem] uppercase flex items-center justify-center gap-[10px]"
      >
        {{ $t("load_more") }}
        <Icon :class="pending ? 'load-more' : ''" name="load_more" />
      </button>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";

const active = ref("inShort");
const props = defineProps({
  functions: { type: String, default: "" },
  articles: { type: Array, default: () => [] },
  biography: { type: String, default: "" },
  activeTab: { type: String, default: "" },
  // for rector
  inShort: { type: String, default: "" },
  careera: { type: Array, default: () => [] },
  scentificWorks: { type: Array, default: () => [] },
  videoLessons: { type: Array, default: () => [] },
  education: { type: Array, default: () => [] },
  educationOfRector: { type: Array, default: () => [] },
  careeraOfRector: { type: Array, default: () => [] },
  pending: { type: Boolean, default: () => false },
});
// const active = computed({
//   return props.functions ? props.functions : 'inShort'
// });

watch(
  () => props.activeTab,
  (val) => {
    active.value = val;
  },
  { immediate: true }
);
const openModal = function (item: Object) {
  this.modalka.videosData = item?.video;
  this.modalka.title = item?.title;
  this.videosModal = !this.videosModal;
};
function exitModal() {
  videosModal.value = false;
}
const modalka = ref({
  videosData: "",
  title: "",
});
const videosModal = ref(false);
</script>
<style lang="scss">
.regular-text {
  p {
    margin-top: 10px;
  }
}

.info-tabs {
  .el-tabs__item {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 15rem;
    line-height: 20px;
    color: #677b9e;
    white-space: initial;
    text-align: center;
    &.is-active {
      color: #1a2f53;
    }
  }

  .el-tabs__active-bar {
    background-color: #1a2f53;
  }
}

@import "@/assets/styles/mixins";

.load-more {
  animation: load 1s ease-in 0s 1000000 normal none;
}

@keyframes load {
  from {
    transform: rotateZ(0deg);
  }

  to {
    transform: rotateZ(-360deg);
  }
}

.el-tabs__item {
  font-weight: 600;
  font-size: 15rem;
  line-height: calc(20 / 15 * 100%);
  color: #677b9e;
  transition: all 0.35s ease-in-out;

  &:hover {
    color: #677b9e;
  }

  &.is-active {
    color: #1a2f53;
  }
}

.el-tabs__active-bar {
  background-color: #1a2f53;
}

.timeline:not(:last-child) {
  position: relative;
  padding-bottom: 32rem;

  &:not(:last-child)::before {
    content: "";
    position: absolute;
    top: 0;
    left: 18%;
    width: 1px;
    height: 100%;
    background-color: #cbd3de;
    z-index: -1;

    @media (max-width: 850px) {
      @include adaptiv(left, 200, 20);
    }

    @media (max-width: 640px) {
      display: none;
    }
  }
}
</style>
