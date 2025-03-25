<template>
  <div>
    <div
      class="container -600:hidden mt-[100rem] -768:mt-[50rem] -568:mt-[150rem] mb-[50rem] grid gap-[24rem] grid-cols-12"
      :class="{ 'overflow-hidden grid-cols-8 grid-rows-4': !width }"
    >
      <div v-if="news[0]" class="faculty-grid__news col-span-5 -1024:col-span-6 w-full order-1">
        <ShortNews
          v-for="(item, index) in news.slice(0, 1)"
          :key="index"
          v-bind="{
            index: index,
            type: item?.status,
            link: `/news/${item?.slug}`,
            date: item?.publish_date,
            title: item?.title,
            img: item?.get_image?.middle,
          }"
        />
      </div>

      <div
        v-if="events[0]"
        class="faculty-grid__reminder col-span-2 -1024:col-span-3 w-full order-2 -1024:order-3"
      >
        <div class="h-full flex flex-col !justify-between">
          <div v-if="events[0]">
            <CalendarReminder
              v-for="(item, ind) in events.slice(0, 1)"
              :key="ind"
              :title="item?.title"
              :link="item?.slug"
              :date="item?.publish_date"
              class="!w-auto"
            />
          </div>

          <div v-if="events[1]">
            <CalendarReminder
              v-for="(item, ind) in events.slice(1, 2)"
              :key="ind"
              :title="item?.title"
              :link="item?.slug"
              :date="item?.publish_date"
              class="!w-auto"
            />
          </div>
        </div>
      </div>

      <div
        v-if="news[1]"
        class="faculty-grid__news col-span-5 -1024:col-span-6 w-full order-3 -1024:order-2"
      >
        <ShortNews
          v-for="(item, index) in news.slice(1, 2)"
          :key="index"
          v-bind="{
            index: index,
            type: item?.status,
            link: `/news/${item?.slug}`,
            date: item?.publish_date,
            title: item?.title,
            img: item?.get_image?.middle,
          }"
        />
      </div>

      <div class="flex flex-col gap-[24rem] col-span-2 order-4 justify-end">
        <div
          v-if="events[2]"
          class="faculty-grid__reminder col-span-2 -1024:col-span-3 w-full order-2 -1024:order-3"
        >
          <div class="flex flex-col justify-between">
            <CalendarReminder
              v-for="(item, ind) in events.slice(2, 3)"
              :key="ind"
              :title="item?.title"
              :link="item?.slug"
              :date="item?.publish_date"
            />
          </div>
        </div>

        <div class="flex flex-col gap-[24rem]" :class="{ '!flex-row': news.length < 3 }">
          <VisitAll
            v-if="news?.length"
            class="faculty-grid__visit -1100:mt-[32px] -1100:h-[56px] w-[194px]"
            :title="$t('all_news')"
            icon="news28"
            :link="`/news`"
          />
          <VisitAll
            v-if="events?.length"
            class="faculty-grid__visit -1100:mt-[32px] -1100:h-[56px] w-[194px]"
            :title="$t('all_events')"
            icon="events_calendar"
            :link="`/faculties/${slug}/event`"
          />
        </div>
      </div>

      <ShortNews
        v-for="(item, index) in news?.slice(2)"
        :key="index"
        v-bind="{
          index: index,
          type: item?.status,
          link: `/news/${item?.slug}`,
          date: item?.publish_date,
          title: item?.title,
          img: item?.get_image?.middle,
        }"
        class="faculty-grid__news col-span-5 -1024:col-span-6 w-full order-5"
      />
    </div>

    <div class="container mt-[20px] hidden -600:block">
      <div
        v-if="news?.length"
        class="bg-[#1A2F53] flex items-center justify-center w-[124rem] h-[44rem]"
      >
        <span
          class="not-italic font-bold text-[20rem] sm:text-[14rem] leading-[28rem] text-center text-white"
          >{{ $t("news") }}
        </span>
      </div>
      <div v-if="news[0]" class="w-full relative">
        <img
          v-if="news[0]?.get_image?.middle"
          class="w-[100%] h-[341px] object-cover object-top"
          :src="news[0]?.get_image?.middle"
          alt="faculties-image"
        />
        <div class="short-news-effect h-full w-full"></div>

        <div class="absolute bottom-[20px] left-[20px]">
          <h5
            v-if="news[0]?.status"
            class="not-italic line-clamp-1 font-medium text-[11px] mb-[4px] uppercase text-[#96A5BD]"
          >
            {{ news[0]?.status }}
          </h5>
          <h4
            v-if="news[0]?.title"
            class="not-italic max-w-[303rem] w-full line-clamp-2 font-bold text-[20rem] minion text-[#FFFFFF]"
          >
            {{ news[0]?.title }}
          </h4>
          <span
            v-if="news[0]?.publish_date !== today"
            class="not-italic font-medium text-[11px] mt-[12px] text-[#96A5BD]"
          >
            {{ $dayjs(news[0]?.publish_date).format("DD.MM.YYYY HH:MM") }}
          </span>
          <span v-else class="not-italic font-medium text-[11px] mt-[12px] text-[#96A5BD]">
            {{ $t("today") }} {{ $dayjs(news[0]?.publish_date).format("HH:MM") }}
          </span>
        </div>
      </div>

      <div v-if="news?.length" class="grid my-[24px] gap-[16px]">
        <div v-for="(item, index) in news" :key="index">
          <NewsSmall
            v-if="index !== 0"
            :img="item?.get_image?.middle"
            :title="item?.title"
            :date="item.publish_date"
            :link="item.slug"
          />
        </div>
      </div>
      <VisitAll
        v-if="news?.length"
        class="mb-[24px] -476:!w-full"
        v-bind="{
          customCss: 'w-[231px] -476:!w-full !gap-[0px] h-[48px] !p-[13px]',
          title: $t('all_news'),
          icon: 'news28',
          link: '/news',
          iconSize: 'w-[24px] h-[24px]',
        }"
      />

      <h6
        v-if="events?.length"
        class="not-italic font-bold text-[26rem] minion mb-[16px] text-[#1A2F53]"
      >
        {{ $t("events") }}
      </h6>

      <div v-if="events?.length" class="grid mb-[24px] gap-[16px] grid-cols-2 -476:grid-cols-1">
        <CalendarReminder
          v-for="item in events"
          :key="item"
          :title="item?.title"
          :link="item?.slug"
          :date="item?.publish_date"
        />
      </div>

      <VisitAll
        v-if="events?.length"
        class="mb-[24px] -476:!w-full"
        v-bind="{
          customCss: 'w-[231px] -476:!w-full !gap-[0px] h-[48px] !p-[13px]',
          title: $t('all_events'),
          icon: 'events_calendar',
          link: '/event',
          iconSize: 'w-[24px] h-[24px]',
        }"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    news: {
      type: Array,
      default: () => [],
    },
    events: {
      type: Array,
      default: () => [],
    },
    pending: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      width: false,
      today: new Date(),
      slug: "",
    };
  },
  mounted() {
    this.slug = this.$route.params.id;
    this.width = window.innerWidth > 900;
    window.addEventListener("resize", () => {
      this.width = window.innerWidth > 900;
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", () => {
      return false;
    });
  },
};
</script>

<style lang="scss" scoped>
.container {
  // padding: 0 !important;

  @media screen and (max-width: 1378px) {
    // padding: 0 15px !important;
  }
}

.faculty-grid {
  @media (min-width: 1380px) {
    &__news {
      max-width: 500px;
    }
    &__reminder {
      max-width: 194px;
    }

    &__visit {
      width: 194px;
    }
  }
}

.short-news-effect {
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(180deg, rgba(24, 35, 54, 0) 0%, rgba(24, 35, 54, 0.88) 100%);
}
</style>
