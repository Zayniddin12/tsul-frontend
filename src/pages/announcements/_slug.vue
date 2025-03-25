<template>
  <div class="container">
    <div class="grid grid-cols-12 gap-[24px] mt-[32px] mb-[32px]">
      <div class="w-full col-span-9 -1245:col-span-12">
        <NewsSingleHeadPr v-if="pending" :is-event="true" class="mb-[32px] md:mb-0" />
        <div v-else>
          <NewsSingleHead
            class="mb-[32px] md:mb-0 !px-0"
            v-bind="{
              tag: data.status,
              title: data?.title,
              isEvent: true,
              clock: true,
              date: data?.event_date,
            }"
          />
        </div>
        <div class="mx-auto max-w-[736px] -1245:mx-auto -768:mx-0">
          <div class="relative mt-[56rem] mb-[24rem]">
            <div v-if="pending" class="mb-[40rem]">
              <div>
                <img src="" class="_loading" alt="news" />
              </div>
              <div>
                <img
                  src=""
                  class="w-[100%] object-cover h-[441rem] lg:h-[300rem] _loading"
                  alt=""
                />
              </div>
            </div>
            <div v-else>
              <div
                class="opacity-[0.07] font-bold minion leading-[130%] text-[#1A2F53] text-[110px] left-[-40rem] top-[-32rem] sm:left-[-3rem] sm:top-[-26rem] sm:text-[60px] absolute"
              >
                {{ firstLetter }}
              </div>
              <div ref="textContent" class="regular-texts mb-[36px]" v-html="data.content"></div>
            </div>
            <PhotoGalleryPr v-if="pending" />
            <PhotoGallery
              v-if="data?.images?.length"
              :key="$route?.params?.slug"
              :link="$route.params.slug"
              :gallery="data?.images"
              class="mb-[40px]"
              @show="showGalleryModal"
            />
            <gallery-modal
              :title="data?.title"
              :is-modal="showBox"
              :active-slide="activeImage"
              :slides="data?.images"
              @modal-close="showBox = false"
            />
          </div>
          <EventRegister
            :phone="data?.contact_number"
            :link="data?.event_link"
            :address="data?.address"
            :date="data?.event_date"
            :button-text="data?.button_text"
            class="mb-[40rem]"
            :is-finished="Date.parse(data?.event_date) > Date.parse(new Date())"
          />
          <Map
            v-if="coords && coords.length"
            :coords="[data?.latitude, data?.longitude]"
            :map-link="data?.location"
          />
          <div v-if="pending && data?.documents" class="">
            <div class="flex flex-wrap justify-between">
              <div
                v-for="(item, index) in data.documents"
                :key="index"
                class="w-[306rem] -453:w-[100%] mb-[24rem] download-files"
              >
                <a :href="item.file">
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
          <div v-if="!pending && data?.documents" class="">
            <div
              class="transition-height duration-300"
              :class="allFilesOpen ? '' : 'max-h-[105px] overflow-hidden'"
            >
              <div class="flex flex-wrap justify-between my-[16px]">
                <div
                  v-for="(item, index) in data.documents"
                  :key="index"
                  class="w-[306rem] -453:w-[100%] mb-[24rem] download-files"
                >
                  <a :href="item.document" :download="item.document" target="_blank">
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
                v-if="data?.documents.length > 4"
                class="white-gradient absolute bottom-[10px] -453:bottom-[0rem] z-[2]"
                :class="allFilesOpen ? 'opacity-0' : ''"
              ></div>
              <div
                v-if="data?.documents.length > 4"
                class="flex justify-center mt-[-50rem] relative z-[10] cursor-pointer"
              ></div>
            </div>
            <div v-if="data?.documents.length > 4" class="flex justify-center">
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
          <SocialSharing
            no-print-text
            :title="data?.title"
            :views="data?.view_count"
            class="mt-[20rem]"
          />
        </div>
      </div>
      <div class="w-full col-span-3 -1245:col-span-12"><Side-bar /></div>
    </div>
    <div class="mb-[64rem] announcements-carusel display-none-print">
      <Carusel
        v-if="pending || data2?.length"
        v-bind="{
          pending: pending,
          list: data2,
          type: 'announcement',
          title: $t('other_announcements'),
          btnText: $t('all_announcements'),
          link: '/announcements',
          height: '230rem',
        }"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showBox: false,
      pending: true,
      data: undefined,
      data2: undefined,
      allFilesOpen: false,
      coords: [],
      images: [],
      firstLetter: undefined,
      char: 0,
    };
  },
  watch: {
    "$route.params.slug"() {
      this.getData();
    },
  },

  created() {
    this.getData();
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.returnUrl();
  },

  updated() {
    this.findFirstLetter();
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  methods: {
    showGalleryModal(index) {
      this.activeImage = index;
      this.showBox = true;
    },
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
    async getData() {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchPostSingle", {
          slug: this.$route.params.slug,
        }),
      ])
        .then((res) => {
          this.data = res[0].value.data;
          for (let i = 0; i < this.data.images.length; i++) {
            if (this.data.images.length) {
              this.images.push(this.data.images[i].get_image.origin);
            }
          }
          if (!this.$route?.path?.includes(this.data?.category?.slug)) {
            this.$router.push("/error");
          }
          if (this.data.longitude && this.data.latitude) {
            this.coords.push(this.data.longitude);
            this.coords.push(this.data.latitude);
          }
        })
        .finally(() => {
          this.$store.dispatch("setSlugTitle", this.data.title);

          setTimeout(() => (this.pending = false), 100);
        });

      await Promise.allSettled([
        this.$store.dispatch("fetchPostRecommended", {
          slug: this.$route.params.slug,
          type: "announcements",
        }),
      ]).then((res) => {
        this.data2 = res[0].value.data.results.slice(0, 9);
      });
    },
    returnUrl() {
      return (this.url = window.location.href);
    },
    findFirstLetter() {
      if (this.$refs.textContent) {
        let letter = this.$refs.textContent.getElementsByTagName("p")[0]?.innerText;
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':\\|,".<>\/?~]/;
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

<style lang="scss">
.announcements-carusel {
  .slider .splide__pagination {
    top: 108%;
  }
}
</style>
