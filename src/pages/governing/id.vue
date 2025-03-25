<template>
  <div class="container">
    <div class="grid grid-cols-12 gap-[24px] mt-[32px] mb-[32px]">
      <div class="w-full col-span-9 -1245:col-span-12">
        <PageTitle :title="$t('governing_bodies')" />
      </div>
      <div class="w-full col-span-3 -1245:hidden"></div>
    </div>
    <div class="grid grid-cols-12 gap-[24px] mt-[32px] mb-[32px]">
      <div class="w-full col-span-9 -1245:col-span-12">
        <div>
          <div v-if="pending" class="relative">
            <div class="_loading !w-full h-[441rem]"></div>
            <NewsSingleHeadPr
              class="absolute bottom-[-80px] -916:bottom-[-75px] left-[50%] translate-x-[-50%]"
            />
          </div>
          <div v-else-if="!slug">
            <NoData />
          </div>

          <div v-else class="relative">
            <img
              :src="slug?.get_image?.origin"
              class="!w-full h-[441rem] object-fill"
              alt="governing-image"
            />
            <NewsSingleHead
              class="absolute bottom-[-80px] -916:bottom-[-75px] left-[50%] translate-x-[-50%]"
              v-bind="{
                tag: slug?.status,
                title: slug?.description,
                telegram: data.telegram,
                twitter: data.twitter,
                instagram: data.instagram,
                facebook: data.facebook,
              }"
            />
          </div>
        </div>
        <TextPr v-if="pending" class="relative mt-[107rem]" />
        <div v-else class="relative mt-[107rem]">
          <p class="text-[15rem]" v-html="slug?.content"></p>
        </div>
        <div>
          <ScientistCardPr v-if="pending" class="my-[32rem]" />
          <div v-else class="">
            <ScientistCard
              class="my-[32rem]"
              v-bind="{
                mail: slug.head?.email,
                phone: slug.head?.phone_number,
                fullName: `${slug.head?.first_name ?? ''} ${slug.head?.last_name ?? ''} ${
                  slug.head?.middle_name ?? ''
                }`,
                time: slug.head?.work_date,
                position: slug.head?.category?.name,
                img: slug.head?.get_image?.middle,
                telegram: slug.head?.telegram_link,
                twitter: slug.head?.twitter_link,
                facebook: slug.head?.facebook_link,
                instagram: slug.head?.instagram_link,
                linkedin: slug.head?.linkedin_link,
                slug: slug.head?.slug,
              }"
            />
          </div>
        </div>
        <div class="mb-[32px]">
          <SocialSharing :views="slug?.view_count" />
        </div>
      </div>
      <div class="w-full col-span-3 -1245:col-span-12"><SideBar /></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        title:
          "Davlat rahbari Yuridik Universitetiga tashrifi davomida Rahbariyatga qator vazifalar yukladi va o‘z nazoratiga oldi",
        tag: "Dolzarb",
        telegram: "adsadada",
        twitter: "asdas",
        facebook: "asda",
        instagram: "asdsa",
      },

      currentSlug: undefined,
      slug: undefined,
      pending: false,
      foundation: [],
    };
  },

  watch: {
    $route() {
      this.getData();
    },
  },

  async created() {
    this.getData();
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },

  methods: {
    getData() {
      this.currentSlug = this.$route.params.id;
      this.pending = true;
      Promise.allSettled([
        this.$store.dispatch("fetchFoundationSlug", {
          slug: this.currentSlug,
        }),

        this.$store.dispatch("fetchEmployee", {
          foundation: this.currentSlug,
          limit: 1,
        }),
      ])
        .then((res) => {
          this.slug = res[0].value.data;
          this.foundation = res[1].value.data.results;
        })
        .finally(() => {
          this.pending = false;
          this.$store.dispatch("setSlugTitle", this.slug.description);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
