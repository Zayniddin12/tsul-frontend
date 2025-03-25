<template>
  <div class="bg-[#FFFFFF] border-[#E0E5EC] border-[1.6px]">
    <div class="w-full py-[16px] px-[20px] border-b-[#E0E5EC] border-b-[1.6px]">
      <h3 class="text-[#1A2F53] text-[22rem] leading-[30px] minion font-bold">
        {{ $t("popular_news") }}
      </h3>
    </div>

    <div class="relative">
      <div v-if="currentNews[0]?.get_image?.middle" class="w-full h-[277px]">
        <img :src="currentNews[0]?.get_image?.middle" class="w-full h-full object-cover" alt="" />
      </div>
      <div v-else class="w-full h-[277px]">
        <img src="@/static/img/default.svg" alt="Default image" class="w-full h-full object-cover" />
      </div>
      <div
        class="absolute bottom-[20rem] left-[20rem] right-[20rem] w-full h-full flex flex-col  justify-end z-[3]"
      >
        <div class="flex-center items-center">
          <p
            v-if="currentNews[0]?.category.name"
            class="text-[12rem] text-white font-semibold mr-[8rem] border-b border-solid border-[#E0E5EC66] pb-[12rem]"
          >
            {{ currentNews[0]?.category.name }}
          </p>
          <div
            v-if="currentNews[0]?.category.name"
            class="w-[4px] h-[4px] mr-[8rem] bg-white rounded-full mb-[12rem]"
          />
          <p class="text-[12rem] text-white font-semibold pb-[12rem]">
            {{ $dayjs(currentNews[0]?.publish_date).format("DD.MM.YYYY HH:MM") }}
          </p>
        </div>

        <a
          :href="`/news/${currentNews[0]?.slug}`"
           class="text-[20rem] hover:text-opacity-80 transition-all duration-300 font-bold text-white leading-[140%] max-w-[262px] mt-[12rem] line-clamp-2 -560:mt-[4rem] -560:text-[16rem] font-minion"
         >
            {{ currentNews[0]?.title }}
        </a>
      </div>

      <div class="bg_blue_shadow w-full h-full absolute inset-0" />
    </div>
    <div v-if="currentNews">
      <div
        v-for="(item, index) in currentNews.slice(1, 5)"
        :key="index"
        class="border-b-[1.6rem] border-[#E0E5EC] last:border-b-[0rem]"
      >
        <a
          :href="`/news/${item?.slug}`"
          class="hover:!bg-[#F5F6FA] px-[20rem] transition py-[16rem] min-h-[108px] flex"
        >
          <div class="w-[82px] h-[58px] shrink-0 mr-[12rem]">
            <img
              v-if="item?.get_image?.small"
              :src="item?.get_image?.small"
              class="w-full h-full object-cover"
              alt=""
            />
            <img
              v-else
              src="https://tsul.uicgroup.tech/files/cache/98/53/9853e7a1fe0564ee975c72e7929fd958.jpg"
              class="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div>
            <h3 class="text-[#1A2F53] font-bold text-[14rem] leading-130 mb-[8px] line-clamp-3">
              {{ item?.title }}
            </h3>

            <h5 class="uppercase text-[#677B9E] text-[12rem] leading-[130%] font-semibold">
              {{ $dayjs(item?.publish_date).format("DD.MM.YYYY HH:MM") }}
            </h5>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentNews: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.bg_blue_shadow {
  background: linear-gradient(180deg, rgba(26, 47, 83, 0.51) 0%, #1a2f53 100%);
}
</style>
