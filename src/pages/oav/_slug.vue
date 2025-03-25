<template>
  <div>
    <div class="container mt-[32rem]">
      <div v-if="data" class="grid grid-cols-12 gap-[24rem]">
        <div class="col-span-9 lg:col-span-12">
          <div>
            <div v-if="pending" class="_loading">
              <img src="@/static/img/news-single-ex.png" class="" alt="news" />
            </div>
            <img
              v-if="!pending && data?.get_image?.middle"
              :src="data?.get_image?.middle"
              class="w-[100%] object-cover h-[441rem] lg:h-[300rem]"
              alt="news"
            />
          </div>
          <div class="">
            <div v-if="pending === true">
              <NewsSingleHeadPr :tag="data.tag" :title="data.title" />
            </div>
            <news-single-head
              v-else
              :tag="data.category.name"
              :title="data.title"
              :description="data.description"
            />
          </div>
          <div class="px-[100rem] mt-[24rem] mb-[64rem] md:px-0">
            <div>
              <div v-if="pending === true" class="regular-texts mb-[36rem]">
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

              <div v-else class="mb-[36rem]">
                <div class="regular-texts" v-html="data.content"></div>
                <!--                <div class="flex items-start mt-[56rem] mb-[36rem]">-->
                <!--                  <icon name="quote" class="mr-[16rem]" />-->
                <!--                  <div>-->
                <!--                    <h6 class="font-bold minion text-[20rem] text-[#1A2F53]">-->
                <!--                      Yoshlarni o‘qishdan tashqari majburiy mehnatga jalb qilgan-->
                <!--                      rahbarni shaxsan o‘zim vakolatidan ozod qilaman.-->
                <!--                    </h6>-->

                <!--                    <p-->
                <!--                      class="mt-[12rem] font-normal text-[15rem] text-[#677B9E]"-->
                <!--                    >-->
                <!--                      <span class="font-semibold">Sh. Mirziyoyev</span>-->
                <!--                      O‘zbekiston Respublikasi Prezidenti-->
                <!--                    </p>-->
                <!--                  </div>-->
                <!--                </div>-->
              </div>
            </div>
          </div>
          <div class="my-[52px]">
            <social-sharing :title="data.title" :views="data.view_count" />
          </div>
        </div>
        <div class="col-span-3 lg:col-span-12"><SideBar /></div>
      </div>
      <NoData v-else />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pending: undefined,
      allFilesOpen: false,
      data: undefined,
      currentSlug: "",
    };
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  async created() {
    this.pending = true;
    this.currentSlug = this.$route.params.slug;
    await Promise.allSettled([
      this.$store.dispatch("fetchPostSingle", {
        type: "oav-performances",
        slug: this.currentSlug,
      }),
    ])
      .then((res) => {
        this.data = res[0]?.value?.data;
      })
      .finally(() => {
        this.pending = false;
        this.$store.dispatch("setSlugTitle", this.data.title);
      });
  },

  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
