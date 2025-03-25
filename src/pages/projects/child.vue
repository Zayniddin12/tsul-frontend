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

        <div class="relative mt-[107rem] regular-texts">
          <div
              class="opacity-[0.07] font-bold minion leading-[130%] text-[#1A2F53] text-[110px] left-[-40rem] top-[-32rem] sm:left-[-3rem] sm:top-[-26rem] sm:text-[60px] absolute"
          >
            {{ firstLetter }}
          </div>
          <p class="text-[15rem]" v-html="slug?.content"></p>
        </div>

        <div class="flex items-center justify-end mt-[24rem]">
          <div class="bg-[#EAF0F5] w-[274rem] h-[44rem]">
            <router-link
                :to="`/org/${$route.params.slug}`"
                class="visit flex items-center cursor-pointer hover:transition-all justify-between py-[18rem] px-[16rem] h-full border-[#E0E5EC] border-[1.6px]"
            >
              <h6
                  v-if="$route.params.slug === 'projects'"
                  class="not-italic font-medium text-[14rem] leading-[140%] text-justify text-[#1A2F53]"
              >
                {{ $t("all_projects") }}
              </h6>
              <h6
                  v-if="$route.params.slug === 'tutors'"
                  class="not-italic font-medium text-[14rem] leading-[140%] text-justify text-[#1A2F53]"
              >
                {{ $t("courses") }}
              </h6>
              <h6
                  v-if="$route.params.slug === 'clubs'"
                  class="not-italic font-medium text-[14rem] leading-[140%] text-justify text-[#1A2F53]"
              >
                {{ $t("all_clubs") }}
              </h6>
              <h6
                  v-if="$route.params.slug === 'ilmiy-maktablar'"
                  class="not-italic font-medium text-[14rem] leading-[140%] text-justify text-[#1A2F53]"
              >
                {{ $t("all_scientific_works") }}
              </h6>
              <h6
                  v-if="$route.params.slug === 'festivals'"
                  class="not-italic font-medium text-[14rem] leading-[140%] text-justify text-[#1A2F53]"
              >
                {{ $t("all_festivals") }}
              </h6>
              <icon name="gray_arrow32" class="arrow w-[32rem] h-[32rem]" />
            </router-link>
          </div>
        </div>
        <div>
          <ScientistCardPr v-if="false" class="my-[32rem]" />

          <div v-else-if="slug?.head" class="">
            <ScientistCard
                class="my-[32rem]"
                v-bind="{
                mail: slug?.head?.email,
                phone: slug?.head?.phone_number,
                fullName: `${slug?.head?.last_name ?? ''} ${slug?.head?.first_name ?? ''} ${
                  slug?.head?.middle_name ?? ''
                }`,
                position: singleSubject.head?.description,
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
import {mapState} from "vuex";

export default {
  data() {
    return {
      data: {},
      slug: undefined,
      pending: false,
      currentSlug: undefined,
    };
  },
  computed: {
    ...mapState({
      singleSubject: (state) => state.foundation.slug,
    }),
    // Compute the first letter of singleSubject?.content
    firstLetter() {
      // Check if singleSubject?.content is defined
      if (this.singleSubject && this.singleSubject.content) {
        // Remove HTML tags from the content
        const textContent = this.singleSubject.content.replace(/<[^>]*>/g, '');
        // Get the first character of the text content
        return textContent.charAt(0);
      } else {
        return ''; // Return an empty string if content is not defined
      }
    }
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
