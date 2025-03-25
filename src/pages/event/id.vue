<template>
  <div class="container mb-[64rem]">
    <div class="grid grid-cols-12 gap-[24px] mt-[32px] mb-[32px]">
      <div class="w-full col-span-9 -1245:col-span-12">
        <NewsSingleHeadPr v-if="pending" is-event class="!mb-[32px] event-bg" />
        <NewsSingleHead
          v-else
          v-bind="{
            telegram: slug?.title,
            tag: slug?.status,
            twitter: slug?.title,
            instagram: slug?.title,
            facebook: slug?.title,
            title: slug?.title,
            isEvent: true,
            date: slug?.event_date,
            place: slug?.address,
            bgPosition: true,
          }"
        />
        <div class="mx-[109rem] -1245:mx-[40rem] -600:mx-[0]">
          <div class="mt-[64px]">
            <Counter
              v-if="slug?.event_date && counterFinished"
              :link="slug?.event_link"
              :date="slug?.event_date"
              :button_text="slug?.button_text"
              :is-finished="counterFinished"
            />
          </div>
          <div class="mt-[60rem] mb-[24rem] relative">
            <div
              v-if="firstLetter"
              class="opacity-[0.07] font-bold minion leading-[130%] text-[#1A2F53] text-[110px] left-[-40rem] top-[-32rem] sm:left-[-3rem] sm:top-[-26rem] sm:text-[60px] absolute"
            >
              {{ firstLetter }}
            </div>
            <TextPr v-if="pending" :count="26" class="mb-[36rem]" />
            <div
              v-else
              ref="textContent"
              class="regular-texts mb-[12rem]"
              v-html="slug?.content"
            ></div>
          </div>
          <div class="mt-[30px]">
            <PhotoGalleryPr v-if="pending" />
            <PhotoGallery
              v-else
              :key="$route?.params?.slug"
              :link="$route.params.id"
              :gallery="images"
              :main-image="mainImage"
              class="mb-[40px]"
              @show="showGalleryModal"
            />
          </div>
          <GalleryModal
            single
            :title="slug?.title"
            :is-modal="showBox"
            :active-slide="activeImage"
            :slides="images"
            @modal-close="closeModal()"
          />
          <EventRegister
            v-bind="{
              address: slug?.address,
              link: slug?.event_link,
              phone: slug?.contact_number,
              date: slug?.event_date,
              buttonText: slug?.button_text,
              pending: pending,
              isFinished: counterFinished,
            }"
            class="mb-[40rem]"
          />
          <h3 class="text-[12rem]"></h3>
          <Map
            v-if="slug?.longitude && slug?.latitude"
            :coords="[slug?.longitude, slug?.latitude]"
            :map-link="slug?.location"
          />
        </div>
        <SocialSharing :views="slug?.view_count" class="mt-[20rem]" :custom-css="`w-[302rem]`" />
      </div>
      <div class="w-full col-span-3 -1245:col-span-12">
        <SideBar :show-sidebar="true" />
      </div>
    </div>

    <div v-if="events && events.length" class="display-none-print">
      <div class="flex items-center justify-between mb-[24px]">
        <h3 class="not-italic font-bold text-[32rem] leading-[130%] minion text-[#1A2F53]">
          {{ $t("another_events") }}
        </h3>
        <router-link
          to="/event"
          class="bg-[#EAF0F5] w-[223px] flex items-center justify-between py-[14px] px-[24px] :md:w-[231px] -500:py-[12rem]"
        >
          <p class="text-[#1A2F53] uppercase leading-[16px] text-[14rem] font-medium">
            {{ $t("all_events") }}
          </p>
          <Icon class="ml-[8px]" name="arrow_right_button" />
        </router-link>
      </div>
      <div v-if="pending" class="grid grid-cols-4 gap-[24px] -950:grid-cols-2 -400:grid-cols-1">
        <CalendarReminderPr v-for="(item, index) in 4" :key="index" />
      </div>
      <div v-else class="grid grid-cols-4 gap-[24px] -950:grid-cols-2 -400:grid-cols-1">
        <CalendarReminder
          v-for="(item, index) in events"
          :key="index"
          :title="item?.title"
          :link="item?.slug"
          :date="item?.event_date"
          class="-690:!h-[160rem] w-auto"
        />
      </div>
    </div>
    <!-- <photo-modal :title="slug.title" :activate="showBox" :list="slug?.images"  @close-modal="closeModal()"/> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      myCords: [41.319989, 69.23281],
      showBox: false,
      events: [],
      pending: false,
      slug: undefined,
      images: [],
      mainImage: "",
      counterFinished: false,
      activeImage: -1,
      firstLetter: undefined,
    };
  },
  watch: {
    $route() {
      this.fetchSlug();
    },
    slug() {
      if (this.slug) {
        this.counterFinished = Date.parse(this.slug?.event_date) > Date.parse(new Date());
      }
    },
  },
  created() {
    this.fetchSlug();
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  updated() {
    this.findFirstLetter();
  },
  methods: {
    showGalleryModal(index) {
      this.activeImage = index;
      this.showBox = true;
    },
    closeModal() {
      this.showBox = false;
    },
    // finish() {
    //   this.counterFinished = false;
    // },
    async fetchSlug() {
      this.currentSlug = this.$route.params.id;
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchPost", {
          type: "event",
          limit: 4,
        }),

        this.$store.dispatch("fetchPostSingle", {
          slug: this.currentSlug,
        }),
      ])
        .then((res) => {
          this.events = res[0]?.value?.data?.results?.filter(item =>item?.event_date);
          this.slug = res[1]?.value?.data;
          this.mainImage = res[1].value?.data?.get_image;
          const allImages =
            this.mainImage && this.mainImage?.middle !== this.slug?.images[0]?.get_image?.middle
              ? [{ ...this.mainImage }]
              : [];
          if (this.slug !== undefined) {
            for (let i = 0; i < this.slug?.images.length; i++) {
              if (this.slug?.images.length) {
                allImages.push(this.slug?.images[i]?.get_image);
              }
            }
          }
          this.images = allImages;
          if (!this.$route?.path?.includes(this.slug?.category?.slug)) {
            this.$router.push("/error");
          }
        })
        .finally(() => {
          this.pending = false;
          this.$store.dispatch("setSlugTitle", this.slug?.title);
        });
    },

    findFirstLetter() {
      if (this.$refs.textContent) {
        let letter = this.$refs.textContent?.getElementsByTagName("p")[0]?.innerText;
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};«':\\|,".<>\/?~]/;
        this.char = 0;
        while (this.char < letter?.length) {
          if (specialChars.test(letter?.charAt(this.char))) {
            this.char++;
          } else {
            this.firstLetter = letter?.charAt(this.char).toUpperCase();
            break;
          }
        }
      }
    },
  },
};
</script>
