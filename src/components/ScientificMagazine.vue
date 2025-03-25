<template>
  <a
    target="_blank"
    :href="source"
    class="h-[224px] border-[#E0E5EC] border-[1.6px] flex items-center md:flex-col gap-[32px] bg-white cursor-pointer group duration-[150ms] hover:bg-[#F5F6FA] sm:py-[16px]"
  >
    <div class="relative md:hidden min-w-[170px]">
      <img
        v-if="img"
        :src="img"
        class="w-full absolute top-[-144px] left-[24px] object-cover h-[224px] -1024:top-[-130px]"
        alt="scientific-magazine-image"
      />
      <img
        v-else
        src="@/static/img/default-white.svg"
        class="w-full absolute lg:top-[-112px] top-[-144px] left-[24px] object-cover h-[224px]"
        alt=""
      />
    </div>
    <div class="px-[16px]">
      <div class="flex items-center">
        <h4
          class="text-[#1A2F53] font-semibold minion text-[24rem] leading-[130%] line-clamp-2 flex items-center"
        >
          {{ name }}
          <span
            v-if="language"
            class="bg-[#F5F6FA] px-[8px] py-[4px] -translate-y-[3px] uppercase inline-flex ml-[8px] text-[#2B5E9B] duration-[150ms] group-hover:bg-[#677B9E] group-hover:text-[#FFFFFF] leading-[130px] text-[12rem] font-semibold max-h-[24px] items-center"
          >
            {{ language }}
          </span>
        </h4>
      </div>
      <p
        class="text-[#677B9E] text-[12rem] leading-[130%] font-semibold opacity-80 mt-[12px] line-clamp-2"
        v-html="title"
      ></p>
      <div class="h-[1.6px] w-[40px] bg-[#E0E5EC] mt-[20px]"></div>

      <a
        v-if="source"
        class="learn-more-buttons whitee w-[150px] mt-[24px] bg-[#E0E5EC] group-hover:!bg-[#1a2f53]"
        download
        target="_blank"
        :href="source"
      >
        <p class="uppercase group-hover:text-white">{{ $t("download") }}</p>
        <Icon name="download_gray" />
      </a>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
    },
    language: {
      type: String,
    },
    title: {
      type: String,
    },
    img: {
      type: String,
    },
    source: {
      type: String,
    },
  },
};
</script>

<style lang="scss">
.group:hover .whitee {
  svg path {
    fill: #ffffff !important;
  }
}
</style>
