<template>
  <div class="container my-[32rem] sm:mt-[0]">
    <div class="grid grid-cols-12 gap-[24rem]">
      <div class="col-span-9 lg:col-span-12 ">
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
            :title="singleData?.name"
            :description="singleData?.name"
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
              <div ref="textContent" class="regular-texts" v-html="singleData?.content"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-3 lg:col-span-12"><SideBar /></div>
    </div>

    <div class="mt-[20px] mb-[40px]">
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

      <!-- <div v-if="news && news.length" class="grid grid-cols-12 gap-[20px]">
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
        </div> -->
    </div>
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
      singleData: undefined,
    };
  },
  watch: {
    $route() {
      this.fetchData();
    },
  },

  async created() {
    this.$store.dispatch("fetchFacultiesSlug", { slug: this.$route.params.id }).then((res) => {
      this.singleData = res.data;
    });
    await this.fetchData();
    this.$store
      .dispatch("fetchPost", {
        type: "news",
        limit: 8,
      })
      .then((res) => {
        this.news = res?.data.results;
      });
  },
  updated() {
    this.findFirstLetter();
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
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
