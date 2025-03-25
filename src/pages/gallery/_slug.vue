<template>
  <div class="container gallery-single news-cards-wrapper">
    <div class="grid grid-cols-12 gap-[24rem]">
      <div class="col-span-9 lg:col-span-12">
        <div
          v-if="pending"
          class="bg-[#F5F6FA] border-[1.6rem] border-[#E0E5EC] pt-[36rem] pb-[26rem] pl-[40rem] relative mt-[32rem] mb-[24rem] overflow-hidden"
        >
          <Icon class="absolute bg-pattern right-0 top-0 z-0" name="bg_pattern" />
          <div class="flex socials-share items-center">
            <Icon class="mr-[12rem] _loading" name="events_telegram" />
            <Icon class="mr-[12rem] _loading" name="events_twitter" />
            <Icon class="mr-[12rem] _loading" name="events_instagram" />
            <Icon class="mr-[12rem] _loading" name="events_facebook" />
          </div>
          <div class="w-[50rem] h-[2rem] bg-[#E6E8ED] mt-[16rem] mb-[12rem]"></div>
          <h1 class="section-titles text-[24rem] text-left block _loading w-[75%]"></h1>
        </div>
        <div
          v-else
          class="bg-[#F5F6FA] border-[1.6rem] border-[#E0E5EC] pt-[36rem] pb-[26rem] pl-[40rem] relative mt-[32rem] mb-[24rem] overflow-hidden"
        >
          <Icon class="absolute bg-pattern right-0 bottom-0 z-0" name="bg_pattern" />
          <div class="flex socials-share items-center">
            <ShareNetwork network="telegram" :url="url" :title="data.title">
              <Icon class="mr-[12rem]" name="events_telegram" />
            </ShareNetwork>
            <ShareNetwork network="twitter" :url="url" :title="data.title">
              <Icon class="mr-[12rem]" name="events_twitter" />
            </ShareNetwork>
            <ShareNetwork network="linkedin" :url="url" :title="data.title">
              <Icon class="mr-[12rem]" name="events_linkedin" />
            </ShareNetwork>
            <ShareNetwork network="facebook" :url="url" :title="data.title">
              <Icon class="mr-[12rem]" name="events_facebook" />
            </ShareNetwork>
            <ShareNetwork network="vk" :url="url" :title="data.title">
              <Icon name="events_vkontakte" />
            </ShareNetwork>
          </div>
          <div class="w-[50rem] h-[2rem] bg-[#E6E8ED] mt-[16rem] mb-[12rem]"></div>
          <h1 class="section-titles text-[24rem] text-left block line-clamp-3">
            {{ data.title }}
          </h1>
          <router-link
            v-if="data?.category?.slug !== 'video-lessons'"
            :to="`/${data?.category?.slug}/${data?.slug}`"
          >
            <button
              class="px-[40px] py-[16px] bg-[#1A2F53] text-white text-[15rem] leading-[130%] font-semibold mt-[12px] hover:bg-[#2E4B7C] transition-all duration-300"
            >
              {{ $t("more") }}
            </button>
          </router-link>
        </div>
        <div>
          <transition name="fade" mode="out-in">
            <div
              :key="pending"
              class="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-[24rem] mb-[24rem] -500:gap-[12px]"
            >
              <template v-if="pending">
                <gallery-single-card-pr v-for="index in 5" :key="index" height="250rem" />
              </template>
              <template v-else>
                <gallery-single-card
                  v-for="(item, index) in data?.images"
                  :key="index"
                  :image="item.get_image?.origin"
                  @click="openModal(index)"
                />
              </template>
            </div>
          </transition>
          <div v-if="data.video" class="mb-[50px] d-block h-[600px] sm:h-[300px]">
            <iframe
              id="iframe"
              ref="player"
              class="player"
              width="100%"
              height="100%"
              :src="videoUrl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
      <div class="w-full col-span-3 -1245:col-span-12 mt-[31rem]">
        <SideBar />
      </div>
    </div>
    <div v-if="data2?.length" class="mt-[64rem] mb-[40rem] display-none-print">
      <div class="flex items-center justify-between mb-[18rem]">
        <h2 class="section-titles text-[32rem]">{{ $t("other_materials") }}</h2>
        <router-link to="/gallery" class="learn-more-buttons">
          <p class="mr-[10rem] uppercase">
            {{ $t("all_materials") }}
          </p>
          <Icon name="arrow_right_button" />
        </router-link>
      </div>
      <div>
        <div
          v-if="pending"
          class="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[24rem] mb-[64rem]"
        >
          <video-cards-pr v-for="(item, index) in 4" :key="index" />
        </div>

        <div
          v-else
          class="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[24rem] mb-[72rem] -567:mb-[32rem]"
        >
          <div v-for="(item, index) in data2" :key="index">
            <video-cards
              :image="item?.get_image?.middle"
              :title="item.title"
              :date="item.publish_date"
              :height="heightRecommended"
              :videos-data="item.video"
              :content-height="contentHeight"
              :slug="`/gallery/${item.slug}`"
              @open="openVideoModal(item)"
            />
          </div>
        </div>
      </div>
    </div>
    <GalleryModal
      single
      :title="data.title"
      :is-modal="picturesModal"
      :active-slide="activeImage"
      :slides="data?.images"
      @modal-close="closeModal()"
    />
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
import { ShareNetwork } from "vue-social-sharing";

export default {
  components: {
    ShareNetwork,
  },
  data() {
    return {
      url: window.location.href,
      activeImage: -1,
      // heightGallery: "250px",
      contentHeight: "133rem",
      heightRecommended: "170px",
      picturesModal: false,
      showModal: false,
      videoData: undefined,
      data: {},
      loading: false,
      pending: true,
      data2: undefined,
    };
  },
  computed: {
    videoUrl() {
      return this.data.video?.replace("watch?v=", "embed/");
    },
  },
  watch: {
    "$route.params.slug"() {
      this.getData();
    },
    videoData() {
      this.video = this.videoData.video?.replace("watch?v=", "embed/");
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  methods: {
    closeModal() {
      this.picturesModal = false;
    },
    openModal(index) {
      this.picturesModal = true;
      this.activeImage = index;
    },

    openVideoModal(item) {
      this.videoData = item;
      this.showModal = true;
    },

    exitModal() {
      this.showModal = false;
      this.videoData = {};
    },
    async getData() {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchPostSingle", {
          slug: this.$route.params.slug,
        }),
        this.$store.dispatch("fetchPost", {
          limit: 4,
        }),
      ])
        .then((res) => {
          this.data = res[0].value.data;
          this.data2 = res[1].value.data.results;
        })
        .finally(() => {
          this.pending = false;
          this.$store.dispatch("setSlugTitle", this.data.title);
        });
    },
  },
};
</script>

<style lang="scss">
.gallery-single {
  .bg-pattern {
    svg path {
      fill: #1a2f530a;
      color: #acd5ff;
      fill-opacity: 1;
    }
  }

  .socials-share {
    svg {
      cursor: pointer;
      transition: 0.3s all;
      width: 16px;
      height: 16px;
      path {
        transition: 0.3s all;
      }
      &:hover {
        transform: translateY(-3rem);
        path {
          fill: #1a2f53 !important;
          fill-opacity: 1;
        }
      }
    }
  }

  button {
    svg {
      path {
        transition: 0.3s all;
      }
    }

    &:hover {
      svg {
        path {
          stroke: #fff;
        }
      }
    }
  }

  .gallery-single {
    .el-dialog {
      background-color: transparent !important;

      .el-dialog__body {
        background: transparent !important;
      }
    }
  }
}
</style>
