<template>
  <div>
    <div class="container">
      <div class="grid grid-cols-12 gap-[24rem] mb-[64px]">
        <div class="col-span-9 lg:col-span-12">
          <div class="my-[32rem]">
            <page-title :title="$t('announcements')" />
          </div>
          <AnnouncementHeadPr v-if="pending" />
          <div v-if="dataMain" class="flex justify-between">
            <router-link
              :to="`/announcements/${dataMain?.slug}`"
              class="bg-[#F5F6FA] w-full border-[1.6px] group border-[#E0E5EC] border-r-[#fff] pt-[48rem] pb-[48rem] pl-[40rem] pr-[52rem] mb-[64rem] relative announcements-main-card h-[207rem] flex flex-col justify-between"
            >
              <h2
                class="line-clamp-2 minion font-bold text-[24rem] leading-[130%] text-[#1A2F53] w-[70%] lg:w-[90%] mb-[12rem]"
              >
                {{ dataMain?.title }}
              </h2>
              <div
                class="text-[12rem] font-normal leading-[140%] lg:w-[90%] text-[#677B9E] w-[70%] line-clamp-2"
                v-html="dataMain?.description"
              ></div>
              <router-link
                class="learn-more-buttons group-hover:bg-white bg-[#1A2F53] :md:w-[231px]"
                :to="`/announcements/${dataMain?.slug}`"
              >
                <p class="text-[#fff] font-text-15px group-hover:!text-[#1A2F53]">
                  {{ $t("more") }}
                </p>
              </router-link>
              <div
                v-if="dataMain?.event_date"
                class="w-[52rem] h-[100%] ml-[-1px] flex-shrink-0 absolute right-[-1px] top-[-1px]"
              >
                <div
                  class="bg-[#1A2F53] px-[10rem] w-[52px] h-[48px] py-[6rem] border-[#1A2F53] border-[1.6rem] border-solid text-[24rem] font-medium text-[#fff] date"
                >
                  {{ $dayjs(dataMain?.event_date ).format("DD") }}
                </div>
                <div
                  class="bg-[#fff] month border-[1.6rem] border-solid border-[#E0E5EC] text-[#1A2F53] font-medium leading-[140%] uppercase h-[77.9%] w-[52px] text-center relative"
                >
                  <h6
                    class="absolute left-1/2 -translate-x-1/2 rotate-[270deg] bottom-[50rem] text-[18rem]"
                  >
                    {{ $t($dayjs(dataMain?.event_date ).format("MMMM")) }}
                  </h6>
                </div>
              </div>
              <span class="inline-block w-[119px] absolute -top-[18px] left-[0px] z-[1]">
                <img
                  class="w-[100%] object-cover"
                  src="@/static/img/logo-decaration.png"
                  alt="logo-image"
                />
              </span>
            </router-link>
          </div>

          <div
            v-if="pending"
            class="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-[24rem] mb-[24rem]"
          >
            <div v-for="(item, index) in 4" :key="index">
              <announcements-card-pr />
            </div>
          </div>
          <div
            v-if="data?.length"
            class="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-[24rem] mb-[24rem]"
          >
            <div v-for="(item, index) in data.slice(1)" :key="index">
                <announcements-card
                :date="item?.event_date"
                :title="item.title"
                :description="item.description"
                :slug="item.slug"
                :bg="'#fff'"
                class="!h-full"
              />
            </div>
          </div>
          <NoData v-else />

          <Pagination :total="total" class="mt-[32px]" @current-page="page = $event" />
        </div>
        <div class="col-span-3 lg:col-span-12 mt-[32rem] sm:mt-0"><SideBar /></div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import AnnouncementHeadPr from "../../components/preloaders/AnnouncementHeadPr.vue";
export default {
  components: { AnnouncementHeadPr },
  data() {
    return {
      pending: undefined,
      data: undefined,
      dataMain: undefined,
      total: undefined,
      page: 1,
    };
  },
  watch: {
    async page() {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchPost", {
          type: "announcements",
          page: this.page,
          limit: 9,
        }),
      ])
        .then((res) => {
          this.dataMain = res[0].value.data.results[0];
          this.data = res[0].value.data.results;
          this.total = res[0].value.data.total_pages;
        })
        .finally(() => {
          this.pending = false;
        });

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  created() {
    this.getData();

    // this.pending = true;
    // Promise.allSettled([
    //   this.$store.dispatch("fetchPost", {
    //     type: "announcements",
    //     page: this.page,
    //   }),
    // ])
    //   .then((res) => {
    //     this.dataMain = res[0].value.data.results[0];
    //     this.data = res[0].value.data.results.splice(1, res[0].value.data.results.length);
    //     this.total = res[0].value.data.total_pages;
    //   })
    //   .finally(() => {
    //     this.pending = false;
    //   });
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  methods: {
    async getData() {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchPost", {
          type: "announcements",
          page: this.page,
          limit: 9,
        }),
      ])
        .then((res) => {
          this.dataMain = res[0].value.data.results[0];
          this.data = res[0].value.data.results;
          this.total = res[0].value.data.total_pages;
        })
        .finally(() => {
          this.pending = false;
          this.$store.dispatch("setSlugTitle", this.$t("breadcrumb.announcements"));
        });
    },
  },
};
</script>

<style lang="scss">
.announcements-main-card {
  .learn-more-buttons {
    position: absolute;
    width: 151rem;
    justify-content: center;
    bottom: -25px;
    z-index: 2;
    p {
      color: #fff;
      text-align: center;
    }
  }
}
</style>
