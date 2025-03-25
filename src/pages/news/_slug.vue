<template>
  <div class="container my-[32rem] sm:mt-[0]">
    <div class="grid grid-cols-12 gap-[24rem]">
      <div class="col-span-9 lg:col-span-12">
        <div v-if="pending">
          <div>
            <img src="" class="_loading" alt="news" />
          </div>
          <div>
            <img src="" class="w-[100%] object-cover h-[441rem] lg:h-[300rem] _loading" alt="" />
          </div>
        </div>
        <div v-else>
          <div>
            <img
              v-if="!data?.get_image?.origin"
              src="@/static/img/default.svg"
              class="w-[100%] object-cover h-[441rem] lg:h-[300rem]"
              alt=""
            />
            <img
              v-else
              :src="data?.get_image?.origin"
              class="w-[100%] object-cover h-[441rem] lg:h-[300rem]"
              alt="news"
            />
          </div>
        </div>
        <div class="mt-[-115rem] -768:mt-[-80rem] -500:mt-[-30rem]">
          <div v-if="pending">
            <NewsSingleHeadPr
              :tag="data?.post_status.name"
              :telegram="data?.telegram"
              :twitter="data?.twitter"
              :instagram="data?.instagram"
              :facebook="data?.facebook"
              :title="data?.title"
            />
          </div>
          <news-single-head
            v-else
            :tag="data?.post_status?.name"
            :title="data?.title"
            :description="data.description"
          />
        </div>
        <div class="px-[100rem] mt-[24rem] mb-[64rem] md:px-0 -500:mb-0">
          <div>
            <div v-if="pending" class="regular-texts mb-[36rem]">
              <p class="_loading">«Olmaliq KMK» AJ Metallurgiya xomashyosi bilan ta'minlash va</p>
              <p class="_loading mt-[12px]">
                «Olmaliq KMK» AJ Metallurgiya xomashyosi bilan ta'minlash va
              </p>
              <p class="_loading mt-[12px]">
                «Olmaliq KMK» AJ Metallurgiya xomashyosi bilan ta'minlash va
              </p>
              <p class="_loading mt-[12px]">
                «Olmaliq KMK» AJ Metallurgiya xomashyosi bilan ta'minlash va
              </p>
            </div>

            <div v-else class="mb-[36rem] relative">
              <div
                class="opacity-[0.07] font-bold minion leading-[130%] text-[#1A2F53] text-[110px] left-[-40rem] top-[-32rem] sm:left-[-3rem] sm:top-[-26rem] sm:text-[60px] absolute"
              >
                {{ firstLetter }}
              </div>
              <div ref="textContent" class="regular-texts" v-html="data?.content"></div>
              <div class="mt-[30px]">
                <PhotoGalleryPr v-if="pending" />
                <PhotoGallery
                  v-else
                  :key="$route?.params?.slug"
                  :link="$route.params.slug"
                  :gallery="data?.images"
                  class="mb-[40px]"
                  @show="showGalleryModal"
                />
              </div>
              <GalleryModal
                :title="data?.title"
                :is-modal="showBox"
                :active-slide="activeImage"
                :slides="data?.images"
                @modal-close="showBox = false"
              />
              <!--                <photo-modal :title="data.title" :activate="showBox" :list="images" @close-modal="closeModal()"/>-->
            </div>
          </div>
          <div class="display-none-print">
            <div v-if="pending && data?.documents" class="relative">
              <div class="flex flex-wrap justify-between">
                <div
                  v-for="(item, index) in data?.documents"
                  :key="index"
                  class="w-[306rem] -453:w-[100%] mb-[24rem] download-files"
                >
                  <a :href="item?.file">
                    <div class="flex items-center -453:justify-center">
                      <Icon name="document_text" />
                      <div>
                        <p class="line-clamp-1 text-[13rem] text-[#43424A] font-medium _loading">
                          dasdasdasdasd
                        </p>
                        <div class="flex">
                          <span
                            class="font-medium text-[11rem] text-[rgba(45,44,61,0.5)] _loading mt-[4px]"
                          >
                            dsahdoasdaasdiadqewsd
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div v-if="!pending && data?.documents" class="relative z-[9]">
              <div
                class="transition-height duration-300"
                :class="allFilesOpen ? '' : 'max-h-[105px] overflow-hidden'"
              >
                <div class="flex flex-wrap justify-between">
                  <div
                    v-for="(item, index) in data?.documents"
                    :key="index"
                    class="w-[306rem] -453:w-[100%] mb-[24rem] download-files"
                  >
                    <a :href="item?.document" :download="item?.document" target="_blank">
                      <div class="flex items-center -453:justify-center">
                        <Icon name="document_text" />
                        <div>
                          <p class="line-clamp-1 text-[13rem] text-[#43424A] font-medium">
                            {{ item?.title }}
                          </p>
                          <div class="flex">
                            <icon name="download_arrow" />
                            <span class="font-medium text-[11rem] text-[rgba(45,44,61,0.5)]">
                              <!-- {{ item.category }} {{ item.file_size }} -->
                              {{ niceBytes(item.file_size) }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  v-if="data.files?.length > 4"
                  class="white-gradient absolute bottom-[10px] -453:bottom-[0rem] z-[2]"
                  :class="allFilesOpen ? 'opacity-0' : ''"
                ></div>
                <div
                  v-if="data.files?.length > 4"
                  class="flex justify-center mt-[-50rem] relative z-[10] cursor-pointer"
                ></div>
              </div>
              <div v-if="data.files?.length > 4" class="flex justify-center">
                <div
                  :class="allFilesOpen ? 'hidden' : ''"
                  class="bg-[#fff] cursor-pointer transition-all duration-200 border-[1.6rem] border-[#E0E5EC] p-[12rem] flex items-center w-[170px] z-10"
                  @click="allFilesOpen = !allFilesOpen"
                >
                  <p class="font-medium text-[15rem] text-[#1A2F53]">
                    {{ $t("all_files") }}
                  </p>
                  <icon class="ml-[24rem]" name="chevron_donw" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="my-[52px] -500:mt-[32px]">
          <social-sharing :title="data.title" :views="data.view_count" />
        </div>
      </div>
      <div class="col-span-3 lg:col-span-12"><SideBar /></div>
    </div>



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
    <!-- <div class="mt-[20px] mb-[40px]">
      <div v-if="news && news.length" class="grid grid-cols-12 gap-[20px]">
          <NewsCard
              v-for="(item, index) in news"
              :key="index"
              class="col-span-3 lg:col-span-6 sm:col-span-12"
              is-news
              :image="item?.get_image?.middle"
              :description="item.description"
              :tag="item.status"
              :title="item.title"
              :date="item.publish_date"
              :slug="`/news/${item.slug}`"
              height="184px"
          />
        </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      pending: true,
      allFilesOpen: false,
      showBox: false,
      images: [],
      data: undefined,
      firstLetter: undefined,
      char: 0,
      news: [],
      activeImage: -1,
    };
  },
  watch: {
    $route() {
      this.fetchData();
    },
  },
  async created() {
    await this.fetchData();
    this.$store
      .dispatch("fetchPost", {
        type: "news",
        limit: 8,
        page: 1,
      })
      .then((res) => {
        this.news = res?.data.results;
      });
  },
  updated() {
    this.findFirstLetter();
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", this.$route.params?.slug);
  },
  methods: {
    closeModal() {
      this.showBox = false;
    },
    niceBytes(x) {
      const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      let l = 0,
        n = parseInt(x, 10) || 0;

      while (n >= 1024 && ++l) {
        n = n / 1024;
      }

      return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
    },
    showGalleryModal(index) {
      this.activeImage = index;
      this.showBox = true;
    },
    async fetchData() {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchPostSingle", {
          slug: this.$route.params.slug,
        }),
      ])
        .then((res) => {
          this.data = res[0].value.data;
          if (!this.$route?.path?.includes(this.data?.category?.slug)) {
            this.$router.push("/error");
          }
        })
        .finally(() => {
          this.$store.dispatch("setSlugTitle", this.data.title);

          setTimeout(() => {
            this.pending = false;
          }, 100);
        });
    },
    findFirstLetter() {
      if (this.$refs.textContent) {
        let letter = this.$refs.textContent.getElementsByTagName("p")[0]?.innerText;
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};«':\\|,".<>\/?~]/;
        if (specialChars.test(letter?.charAt(this.char))) {
          this.char++;
          this.findFirstLetter();
        } else {
          this.firstLetter = letter?.charAt(this.char);
          this.char = 0;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.white-gradient {
  transition: 0.3s all;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.7) 40.63%,
    #ffffff 100%
  );
  width: 100%;
  height: 72rem;
  pointer-events: none;
}

.download-files {
  transition: 0.3s all;

  &:hover {
    opacity: 0.6;
  }
}

.transition-height {
  transition: height 0.3s;
}
</style>
