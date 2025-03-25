<template>
  <div>
    <div class="container my-[32rem] sm:mt-[0]">
      <div v-if="singleSubject" class="grid grid-cols-12 gap-[24rem]">
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
                v-if="!singleSubject?.get_image?.origin"
                src="@/static/img/default.svg"
                class="w-[100%] object-cover h-[441rem] lg:h-[300rem]"
                alt=""
              />
              <img
                v-else
                :src="singleSubject?.get_image?.origin"
                class="w-[100%] object-cover h-[441rem] lg:h-[300rem]"
                alt="news"
              />
            </div>
          </div>
          <div class="mt-[-115rem] -768:mt-[-80rem] -500:mt-[-30rem]">
            <div v-if="pending">
              <NewsSingleHeadPr
                :tag="singleSubject?.post_status?.name"
                :telegram="singleSubject?.head?.telegram_link"
                :twitter="singleSubject?.head?.twitter_link"
                :instagram="singleSubject?.head?.instagram_link"
                :facebook="singleSubject?.head?.facebook_link"
                :title="singleSubject?.name"
              />
            </div>
            <news-single-head
              v-else
              :tag="singleSubject?.post_status?.name"
              :title="singleSubject?.name"
              :description="singleSubject?.description"
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
                <div
                  ref="textContent"
                  class="regular-texts"
                  v-html="singleSubject?.description"
                ></div>
                <div class="regular-texts" v-html="singleSubject?.content"></div>
              </div>
            </div>
            <div class="display-none-print">
              <div v-if="pending && singleSubject?.files" class="relative">
                <div class="flex flex-wrap justify-between">
                  <div
                    v-for="(item, index) in singleSubject?.files"
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
              <div v-if="!pending && singleSubject?.files" class="relative z-[9]">
                <div
                  class="transition-height duration-300"
                  :class="allFilesOpen ? '' : 'max-h-[105px] overflow-hidden'"
                >
                  <div class="flex flex-wrap justify-between">
                    <div
                      v-for="(item, index) in singleSubject?.files"
                      :key="index"
                      class="w-[306rem] -453:w-[100%] mb-[24rem] download-files"
                    >
                      <a :href="item?.file" :download="item?.file" target="_blank">
                        <div class="flex items-center -453:justify-center">
                          <Icon name="document_text" />
                          <div>
                            <p class="line-clamp-1 text-[13rem] text-[#43424A] font-medium">
                              {{ item?.title }}
                            </p>
                            <div class="flex">
                              <icon name="download_arrow" />
                              <span class="font-medium text-[11rem] text-[rgba(45,44,61,0.5)]">
                                {{ niceBytes(item?.file_size) }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div
                    v-if="singleSubject.files?.length > 4"
                    class="white-gradient absolute bottom-[10px] -453:bottom-[0rem] z-[2]"
                    :class="allFilesOpen ? 'opacity-0' : ''"
                  ></div>
                  <div
                    v-if="singleSubject.files?.length > 4"
                    class="flex justify-center mt-[-50rem] relative z-[10] cursor-pointer"
                  ></div>
                </div>
                <div v-if="singleSubject.files?.length > 4" class="flex justify-center">
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
            <ScientistCard
                v-if="singleSubject.teacher"
              class="my-[32rem]"
              v-bind="{
                mail: singleSubject.teacher?.email,
                phone: singleSubject.teacher?.phone_number,
                fullName:
                  singleSubject.teacher?.last_name +
                  ' ' +
                  singleSubject.teacher?.first_name +
                  ' ' +
                  (singleSubject.teacher?.middle_name || ''),
                position: slug?.category?.name,
                img: singleSubject.teacher?.photo,
                telegram: singleSubject.teacher?.telegram_link,
                twitter: singleSubject.teacher?.twitter_link,
                facebook: singleSubject.teacher?.facebook_link,
                linkedin: singleSubject.teacher?.linkedin_link,
                instagram: singleSubject.teacher?.instagram_link,
                slug: singleSubject.teacher?.slug,
              }"
            />
            <social-sharing :title="singleSubject?.name" :views="singleSubject?.view_count" />
          </div>
        </div>
        <div class="col-span-3 lg:col-span-12"><SideBar /></div>
      </div>
      <div v-if="!singleSubject">
        <NoData/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      reload: false,
      pending: undefined,
      allFilesOpen: false,
      showBox: false,
      images: [],
      data: undefined,
      firstLetter: undefined,
      char: 0,
      activeImage: -1,
    };
  },
  computed: {
    ...mapState({
      singleSubject: (state) => state.subject.singleSubject,
    }),
  },
  watch: {
    $route() {
      this.fetchData();
    },
  },

  async created() {
    this.pending = true;
    await Promise.allSettled([
      this.$store.dispatch("fetchSubjectSingle", {
        slug: this.$route.params.slug,
      }),
    ]).then((res) => {
      this.$store.dispatch("setSlugTitle", res[0].value?.data?.name);
    }).finally(() => (this.pending = false));
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
