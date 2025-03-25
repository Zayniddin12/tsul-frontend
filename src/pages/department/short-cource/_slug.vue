<template>
  <div class="container mb-[64rem]">
    <div class="grid grid-cols-12 gap-[24px] mt-[32px] mb-[32px]">
      <div class="w-full col-span-9 -1245:col-span-12">
        <PageTitle :title="slug?.name" />
        <div v-if="pending" class="relative">
          <div class="_loading !w-full h-[441rem]"></div>
          <NewsSingleHeadPr
            class="absolute bottom-[-80px] -916:bottom-[-75px] left-[50%] translate-x-[-50%]"
          />
        </div>

        <div v-else class="relative mt-[16px]">
          <div>
            <img
              v-if="slug?.get_image?.middle"
              :src="slug?.get_image?.middle"
              class="!w-full h-[440px] object-cover"
              alt="governing-image"
            />
            <img
              v-else
              src="@/static/img/default.svg"
              class="!w-full h-[440px] object-cover"
              alt="governing-image"
            />
          </div>

          <NewsSingleHead
            class="absolute bottom-[-80px] -916:bottom-[-75px] left-[50%] translate-x-[-50%]"
            v-bind="{
              tag: slug?.category.name,
              title: slug?.description,
              telegram: slug?.telegram_link,
              twitter: slug?.twitter_link,
              instagram: slug?.instagram_link,
              facebook: slug?.facebook_link,
            }"
          />
        </div>

        <div class="relative mt-[107rem]">
          <p class="text-[15rem]" v-html="slug?.content"></p>
        </div>
        <div>
          <ScientistCardPr v-if="false" class="my-[32rem]" />

          <div v-else class="">
            <ScientistCard
              class="my-[32rem]"
              v-bind="{
                mail: slug?.head?.email,
                phone: slug?.head?.phone_number,
                fullName: `${slug?.head?.last_name} ${slug?.head?.first_name} ${slug?.head?.middle_name}`,
                position: slug?.head?.duty || '',
                img: slug?.head?.get_image?.middle,
                telegram: slug?.head?.telegram_link,
                twitter: slug?.head?.twitter_link,
                facebook: slug?.head?.facebook_link,
                instagram: slug?.head?.instagram_link,
              }"
            />
          </div>
        </div>

        <div class="mt-[32px]">
          <SocialSharing :views="slug?.view_count" />
        </div>
      </div>
      <div class="w-full col-span-3 -1245:hidden"><SideBar /></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      slug: undefined,
      pending: false,
      currentSlug: undefined,
    };
  },

  async created() {
    this.pending = true;
    await Promise.allSettled([
      this.$store.dispatch("fetchFoundationSlug", {
        slug: this.$route.params.slug,
      }),
    ])
      .then((res) => {
        this.slug = res[0]?.value?.data;
      })
      .finally(() => {
        this.pending = false;
      });
  },
};
</script>

<style lang="scss" scoped>
.visit {
  background: transparent;
  transition: all 0.3s ease-out;

  &:hover {
    background: #1a2f53;
    border: 1.6px solid #1a2f53;
    color: white !important;
    transition: all 0.3s ease;
    h6 {
      color: white;
    }

    .icon svg path {
      fill: white !important;
    }

    .arrow svg path {
      stroke: white !important;
      fill: none !important;
    }
  }
}
</style>
