<template>
  <div class="news-cards overflow-hidden">
    <router-link :to="slug">
      <div>
        <div
          v-if="image"
          class="border-solid border-[1px] border-[#E0E5EC] w-[100%] min-w-[294px] bg-center bg-no-repeat bg-cover"
          :style="{
            'background-image': 'url(' + image + ')',
            height: height,
            width: width,
          }"
        >
          <img class="w-full h-full object-cover" :src="image" alt="image" />
        </div>

        <div
          v-else
          class="border-solid border-[1px] border-[#E0E5EC] w-[100%] bg-center bg-no-repeat bg-cover"
        >
          <img
            src="@/static/img/default.svg"
            class="w-full object-cover"
            alt=""
            :style="{
              height: height ? height : '184px',
            }"
          />
        </div>
      </div>

      <div
        class="px-[20px] pt-[20px] pb-[16px] border-t-0 border-solid border-[1.6px] border-[#E0E5EC]"
        :class="isNews ? 'h-[182rem] -500:h-auto' : ''"
        :style="`height:${contentHeight}`"
      >
        <div :class="isNews ? '' : 'mb-[6px]'" class="flex items-center justify-start">
          <p
            class="font-medium text-[11px] leading-[130%] uppercase text-[#677B9E] max-w-[150rem] whitespace-nowrap"
          >
            {{ tag }}
          </p>
          <div
            v-if="isNews && tag"
            class="bg-[#1A2F53] w-[4px] h-[4px] rounded-[50%] mr-[8px] ml-[8px]"
          />
          <span v-if="isNews && date" class="font-medium text-[11px] leading-[145%] text-[#677B9E]">
            {{ $dayjs(date).format("DD.MM.YYYY HH:MM") }}
          </span>
        </div>
        <div v-if="isNews" class="bg-[#E0E5EC] w-[55px] h-[1px] mt-[12px] mb-[12px]"></div>
        <div class="font-bold text-[#1A2F53] minion text-[18rem] leading-[130%] line-clamp-2">
          {{ $t(title) }}
        </div>
        <div
          v-if="isNews"
          class="font-normal text-[12rem] leading-[140%] text-[#677B9E] mt-[6px] line-clamp-3"
          v-html="description"
        ></div>
        <p
          v-if="isNews === false && date"
          class="font-medium text-[11px] leading-[145%] text-[#677B9E] mt-[6px]"
        >
          {{ $dayjs(date).format("DD") }}.{{ $dayjs(date).format("MM") }}.{{
            $dayjs(date).format("YYYY")
          }}
          {{ $dayjs(date).format(" HH:mm") }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "",
    },
    width: {
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
    contentHeight: {
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
    description: {
      type: String,
      default: "",
    },
    isNews: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss">
.news__title {
  overflow: hidden;
  display: block;
  font-size: 1rem;
  line-height: 1.5rem;
  height: 4.5rem;
}

.news__desc {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  overflow: hidden;
  width: 100%;
}

.news-cards {
  transition: 0.3s all;

  &:hover {
    background: #f5f6fa;
  }
}
</style>
