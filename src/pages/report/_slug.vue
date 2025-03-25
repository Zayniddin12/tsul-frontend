<template>
  <div>
    <div class="container my-[32rem] sm:mt-[0]">
      <div v-if="news" class="grid grid-cols-12 gap-[24rem]">
        <div class="col-span-9 lg:col-span-12">
          <div v-if="pending">
            <div class="">
              <img src="" class="_loading" alt="news" />
            </div>
            <div>
              <img src="" class="w-[100%] object-cover h-[441rem] lg:h-[300rem] _loading" alt="" />
            </div>
          </div>
          <div v-else>
            <div>
              <img
                v-if="!news?.get_image?.origin"
                src="@/static/img/default.svg"
                class="w-[100%] object-cover h-[441rem] lg:h-[300rem]"
                alt=""
              />
              <img
                v-else
                :src="news?.get_image?.origin"
                class="w-[100%] object-cover h-[441rem] lg:h-[300rem]"
                alt="news"
              />
            </div>
          </div>
          <div class="mt-[-115rem] -768:mt-[-80rem] -500:mt-[-30rem]">
            <div v-if="pending">
              <NewsSingleHeadPr
                :tag="news.post_status?.name"
                :telegram="news.author.telegram"
                :twitter="news.author.twitter"
                :instagram="news.author.instagram"
                :facebook="news.author.facebook"
                :title="news.title"
              />
            </div>
            <news-single-head
              v-else
              :tag="news?.post_status?.name"
              :title="news.title"
              :description="news.description"
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
                <div ref="textContent" class="regular-texts" v-html="news.content"></div>
                <div class="mt-[30px]">
                  <PhotoGalleryPr v-if="pending" />
                  <PhotoGallery
                    v-else
                    :gallery="images"
                    class="mb-[40px]"
                    @show="showGalleryModal"
                  />
                </div>
                <gallery-modal
                  :title="news.title"
                  :is-modal="showBox"
                  :active-slide="activeImage"
                  :slides="images"
                  @modal-close="showBox = false"
                />
              </div>
            </div>
          </div>
          <div class="my-[52px] -500:mt-[32px]">
            <social-sharing :title="news.title" :views="news.view_count" />
          </div>
        </div>
        <div class="col-span-3 lg:col-span-12"><SideBar /></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      news: [],
      pending: true,
    };
  },
  async created() {
    this.pending = true;
    await Promise.allSettled([
      await this.$store.dispatch("fetchPostSingle", {
        slug: this.$route.params.slug,
      }),
    ])
      .then((res) => {
        this.news = res[0].value.data;
        this.pending = false;
      })
      .finally(() => {
        this.pending = false;
        this.$store.dispatch("setSlugTitle", this.$t("breadcrumb.report"));
      });
  },
};
</script>
