<template>
  <div class="container mb-[64rem]">
    <div class="grid grid-cols-12 gap-[24px] mt-[32px] mb-[32px]">
      <div class="w-full col-span-9 -1245:col-span-12">
        <page-title :title="$t('opendays_title')" class="mb-[32px]" />
        <img
          v-if="!slug?.get_image?.origin"
          src="@/static/img/default.svg"
          class="w-[100%] object-cover h-[441rem] lg:h-[300rem]"
          alt=""
        />
        <img
          v-else
          :src="slug?.get_image?.origin"
          class="w-[100%] object-cover h-[441rem] lg:h-[300rem]"
          alt="news"
        />
        <NewsSingleHeadPr v-if="pending" is-event class="!mb-[32px] event-bg" />
        <NewsSingleHead
          v-else
          class="-translate-y-1/2"
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
        <div class="mx-[109rem] -1245:mx-[40rem] -600:mx-[0] relative bottom-[100px]">
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
              :gallery="slug?.images"
              class="mb-[40px]"
              @show="showGalleryModal"
            />
          </div>
          <GalleryModal
            single
            :title="slug?.title"
            :is-modal="showBox"
            :active-slide="activeImage"
            :slides="slug?.images"
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
  </div>
</template>

<script>
import InfoCard from "@/components/cards/InfoCard.vue";

export default {
  components: { InfoCard },
  data() {
    return {
      myCords: [41.319989, 69.23281],
      showBox: false,
      events: [],
      pending: false,
      slug: undefined,
      images: [],
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
      this.currentSlug = this.$route.params.slug;
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchPost", {
          type: "event",
          limit: 4,
        }),

        this.$store.dispatch("fetchPostSingle", {
          slug: "opendays",
        }),
      ])
        .then((res) => {
          this.events = res[0]?.value?.data?.results[0];
          // this.events = res[0]?.value?.data?.results[0];
          console.log(res[0]?.value?.data?.results);
          this.slug = res[1]?.value?.data;
          console.log(this.slug);
        })
        .finally(() => {
          this.pending = false;
          this.$store.dispatch("setSlugTitle", "opendays_title");
        });
    },

    findFirstLetter() {
      if (this.$refs.textContent) {
        let letter = this.$refs.textContent.getElementsByTagName("p")[0].innerText;
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};«':\\|,".<>\/?~]/;
        this.char = 0;
        while (this.char < letter.length) {
          if (specialChars.test(letter.charAt(this.char))) {
            this.char++;
          } else {
            this.firstLetter = letter.charAt(this.char).toUpperCase();
            break;
          }
        }
      }
    },
  },
};
</script>
