<template>
  <div class="mb-[104rem]">
    <div class="container">
      <div class="grid grid-cols-12 gap-[24rem] my-[32rem]">
        <div class="col-span-9 lg:col-span-12">
          <page-title :title="$t('gallery')" class="mb-[32rem]" />
          <div
            v-if="galleryPending"
            class="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-[24rem] mb-[24rem]"
          >
            <div v-for="(item, index) in 9" :key="index">
              <video-cards-pr :height="height" />
            </div>
          </div>
          <div
            v-else-if="data && data?.length"
            class="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-[24rem] mb-[24rem]"
          >
            <div v-for="(item, index) in data" :key="index"
            >
              <videoCards
                :image="item?.get_image?.middle"
                :tag="item.tag"
                :title="item.title"
                :date="item.publish_date"
                :slug="`/gallery/${item.slug}`"
                :height="height"
                :videos-data="item.video"
                @open="openModal(item)"
              />
              
            </div>
          </div>
          <no-data v-else />
          <Pagination :total="total"  class="mt-[32px]" @current-page="page = $event" />
          <div class="col-span-9 lg:col-span-12"></div>
        </div>
        <div class="col-span-3 lg:col-span-12"><SideBar /></div>
      </div>
      <div class="mt-[32px]">
        <div class="h-auto mb-[80px]">
          <NewsCarousel
            :title="$t('news')"
            :btn-text="$t('all_news')"
            link="/news"
            :pending="pending"
            :list="news"
            height="230rem"
          />
        </div>
      </div>
    </div>

    <light-box
      v-if="videoData?.video"
      :videos="showModal"
      :video-arr="video"
      :title-light-box="videoData.title"
      @close-modal="exitModal"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      pending: undefined,
      galleryPending: true,
      height: "170rem",
      data: undefined,
      news: undefined,
      total: 12,
      page: 1,
      videoData: undefined,
      showModal: false,
      video: "",
    };
  },

  watch: {
    videoData() {
      this.video = this.videoData.video?.replace("watch?v=", "embed/");
    },
    async page() {
      this.galleryPending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchPost", {
          limit: 12,
          page: this.page,
        }),
      ])
        .then((res) => {
          this.data = res[0].value.data.results;
        })
        .finally(() => {
          this.galleryPending = false;
        });

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },

  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.getData();
  },
  methods: {
    async getData() {
      this.pending = true;
      this.galleryPending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchPost", {
          limit: 12,
          page: this.page,
          has_images: true, 
        }),
      ])
        .then((res) => {
          this.data = res[0].value.data.results;

          // this.total = res[0].value.data.total_pages;
        })
        .finally(() => {
          this.galleryPending = false;
        });
      await Promise.allSettled([
        this.$store.dispatch("fetchPost", {
          type: "news",
          limit: 8,
        }),
      ])
        .then((res) => {
          this.news = res[0].value.data.results;
        })
        .finally(() => {
          this.pending = false;
          this.$store.dispatch("setSlugTitle", this.$t("gallery"));
        });
    },

    openModal(item) {
      this.videoData = item;
      this.showModal = true;
    },

    exitModal() {
      this.showModal = false;
      this.videoData = {};
    },
  },
};
</script>