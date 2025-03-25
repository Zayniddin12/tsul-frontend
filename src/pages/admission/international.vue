<template>
  <div class="container mb-[64rem]">
    <div class="grid grid-cols-12 gap-[24px] mt-[32px] mb-[32px]">
      <div class="w-full col-span-9 -1245:col-span-12">
        <page-title :title="$t('international_admission')" class="mb-[32px]" />
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
  created() {
    this.fetchSlug();
  },

  methods: {
    async fetchSlug() {
      this.currentSlug = this.$route.params.slug;
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchPost", {
          type: "event",
          limit: 4,
        }),

        this.$store.dispatch("fetchPostSingle", {
          slug: "xorijiy-talabalar-qabuli",
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
          this.$store.dispatch("setSlugTitle", "international_admission");
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
