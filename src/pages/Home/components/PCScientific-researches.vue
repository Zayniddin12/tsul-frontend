<template>
      <div class="pt-[76px] sm:pt-[24px] pb-[64px] md:py-[24px]">
    <div class="container">
      <div class="mb-[32rem]">
        <page-title :title="$t('scientific_researches')" />
      </div>
      <div v-if="pending" class="grid grid-cols-4 sm:grid-cols-1 xl:grid-cols-2 gap-[24rem]">
        <div v-for="(item, index) in 4" :key="index">
          <news-card-pr :height="height" />
        </div>
      </div>
      <div v-else-if="dataScientificResearches && dataScientificResearches.length">
        <div class="grid grid-cols-4 sm:grid-cols-1 xl:grid-cols-2 gap-[24rem]">
          <div v-for="(item, index) in dataScientificResearches" :key="index">
            <news-card
              :is-news="false"
              :image="item?.get_image?.middle"
              :description="item.description"
              :tag="$t('scientific_researches')"
              :title="item.title"
              :date="item.publish_date"
              :slug="`/scientific-works/${item.slug}`"
              :height="height"
              :content-height="contentHeight"
            />
          </div>
        </div>
        <div class="w-[100%] flex justify-center md:justify-start">
          <router-link
            class="learn-more-buttons !h-[56px] w-[242px] mt-[32rem] :md:w-[231px]"
            to="/scientific-works"
          >
            <Icon name="researches_icon" />
            <p class="font-text-15px ml-[10px]">
              {{ $t("all_resarches") }}
            </p>
            <Icon name="arrow_right_button" />
          </router-link>
        </div>
      </div>
      <div v-else>
       <NoData />
      </div>
    </div>
  </div>
</template>

<script>
import NoData from '@/components/common/NoData.vue';
export default {
  components: { NoData },
  props: {
    dataScientificResearches : {
      type: Array,
      default: () => [],
    },
    pending : {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      height: "184rem",
      contentHeight: "124rem",
    };
  },

};
</script>

<style lang="scss" scoped></style>