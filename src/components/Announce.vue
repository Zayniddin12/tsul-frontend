<template>
  <div :class="`bg-[${bg}]`" class="md:py-[24px]">
    <div class="container">
      <page-title class="mb-[32rem]" :title="$t('announcements')" />
      <div v-if="pending" class="grid grid-cols-3 sm:grid-cols-1 xl:grid-cols-2 gap-[24rem]">
        <div v-for="(item, index) in 4" :key="index">
          <announcements-card-pr />
        </div>
      </div>
      <div v-else-if="announce">
        <div class="grid grid-cols-3 sm:grid-cols-1 xl:grid-cols-2 gap-[24rem]">
          <div v-for="(item, index) in announce" :key="index">
            <announcements-card
              :slug="item.slug"
              :date="item.event_date"
              :title="item.title"
              :description="item.description"
            />
          </div>
        </div>
        <div class="w-[100%] flex justify-center md:justify-start">
          <router-link
            class="learn-more-buttons w-[269px] :md:w-[231px] h-[56px] mt-[32rem]"
            to="/announcements"
          >
            <Icon name="notification" />
            <p class="font-text-15px">{{ $t("all_announcements") }}</p>
            <Icon name="arrow_right_button" />
          </router-link>
        </div>
      </div>

      <div v-else><no-data /></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bg: {
      type: String,
      default: "#F5F6FA",
    },
    announce: Array,
    pending: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
