<template>
  <div>
    <div class="bg-[#FFFFFF] border-[#E0E5EC] border-[1.6px]">
      <div class="w-full py-[16px] px-[20px] border-b-[#E0E5EC] border-b-[1.6px]">
        <h3 class="text-[#1A2F53] text-[22rem] leading-[30px] minion font-bold">
          {{ $t("anonce") }}
        </h3>
      </div>
      <div v-if="currentNews && currentNews.length">
        <div
            v-for="(item, index) in currentNews"
            :key="index"
            class="border-b-[1.6rem] boreder-[#E0E5EC] last:border-b-[0rem]"
        >
          <router-link
              :to="'/event/' + item?.slug"
              class="block hover:!bg-[#F5F6FA] px-[20rem] transition py-[16rem] min-h-[108px]"
          >
            <div class="flex items-center">
              <h5
                  class="
                uppercase
                max-w-[100rem]
                line-clamp-1
                text-[#677B9E] text-[12rem]
                leading-[140%]
                font-semibold
              "
              >
                {{ item?.status }}
              </h5>
              <div
                  v-if="item.status"
                  class="bg-[#1A2F53] rounded-full h-[4px] w-[4px] mx-[8px]"
              ></div>
              <h5 class="uppercase text-[#677B9E] text-[12rem] leading-[130%] font-semibold">
                {{ $dayjs(item?.publish_date).format("DD.MM.YYYY HH:MM") }}
              </h5>
            </div>

            <h3 class="text-[#1A2F53] font-bold text-[16rem] leading-[24px] mt-[8px] line-clamp-2">
              {{ item?.title }}
            </h3>
          </router-link>
        </div>
      </div>
    </div>
    <router-link
v-if="currentNews && currentNews.length"
                 to="/event"
                 class="
      all_articles
      flex
      items-center
      justify-between
      gap-[8rem]
      duration-150
      hover:bg-[#cfd3d7]
      cursor-pointer
      bg-[#EAF0F5]
      py-[14rem]
      px-[22rem]
      -420:py-[7rem] -420:px-[15rem]
    "
    >
    <span class="not-italic font-medium text-[14rem] leading-[16rem] uppercase text-[#1A2F53]">{{
        $t("all_events")
      }}</span>
      <icon name="arrow_right" />
    </router-link>
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
