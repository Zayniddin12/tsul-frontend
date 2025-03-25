<template>
  <div :class="{ _loading: pending }" class="container mb-[64rem]">
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="w-full col-span-9 -1245:col-span-12">
        <div v-if="pending" class="h-[500px]">
          <div class="w-full py-[16px] px-[20px] border-[#E0E5EC] border-[1.6px]">
            <h3 class="text-[#1A2F53] text-[22rem] leading-[30px] minion font-bold">
              {{ $t("popular_news") }}
            </h3>
          </div>
          <PagesPr />
        </div>
        <div v-if="!pending && !staticData">
          <no-data />
        </div>
        <div v-if="staticData">
          <div class="mt-[32px]">
            <div v-if="staticData?.title" class="w-full col-span-9 -1245:col-span-12">
              <PageTitle :title="$t(staticData?.title)" class="mb-[30px]" />
            </div>
            <div class="w-full col-span-3 -1245:hidden"></div>
          </div>

          <div class="relative" :class="{ 'mb-[100px]': staticData?.get_image?.middle }">
            <img
              v-if="staticData?.get_image?.middle"
              :src="staticData?.get_image?.middle"
              class="!w-full"
              alt="image"
            />
            <NewsSingleHead
              v-if="staticData?.description"
              class="absolute bottom-[-80px] -916:bottom-[-75px] left-[50%] translate-x-[-50%]"
              v-bind="{
                title: staticData?.description,
                tag: staticData?.status,
                telegram: '#',
                twitter: '#',
                facebook: '#',
                instagram: '#',
              }"
            />
          </div>
          <div class="relative mt-[24rem]">
            <div
              v-if="staticData?.content"
              class="regular-texts static-style mb-[36px] static-content"
            >
              <div
                class="opacity-[0.07] font-bold minion leading-[130%] text-[#1A2F53] text-[110px] left-[-40rem] top-[-32rem] sm:left-[-3rem] sm:top-[-26rem] sm:text-[60px] absolute"
              >
                {{ firstLetter }}
              </div>
              <div ref="textContent" v-html="staticData?.content"></div>
            </div>
          </div>
          <div v-if="staticData?.files && staticData?.files.length">
            <h3
              class="block mt-[44rem] mb-[12px] text-[24rem] leading-[130%] font-bold text-[#1A2F53]"
            >
              {{ $t("relevant_documents_and_files_") }}
            </h3>
            <div class="grid gap-[12px]">
              <a
                v-for="item in staticData?.files"
                :key="item"
                download
                href="@/static/img/favicon.svg"
                class="group bg-white border-[1px] border-[#E0E5EC] py-[12px] px-[16px] cursor-pointer transition hover:bg-[#F5F6FA]"
              >
                <h4 class="text-[16rem] leading-[125%] font-medium text-[#1A2F53] mb-[8px]">
                  Bakalavr bosqichi fakultetlari haqida ma’lumot.
                </h4>
                <div class="flex items-center gap-[8px]">
                  <Icon name="download" />
                  <span
                    class="text-[13rem] leading-[123%] font-normal text-[#677B9E] transition group-hover:text-[#2B5E9B]"
                    >{{ bytesToSize(item?.file_size) }}</span
                  >
                </div>
              </a>
            </div>
          </div>

          <SocialSharing :views="staticData?.view_count" class="!mt-[50px]" />
        </div>
      </div>
      <!--      <div v-else class="w-full col-span-9 -1245:col-span-12" :class="{ _loading: pending }" />-->
      <div class="w-full col-span-3 -1245:col-span-12 mt-[32px] sm:mt-0">
        <!-- <address-to-rector />
        <social-networks :links="social.links" class="mt-[16px]" /> -->
        <SideBar />
      </div>
    </div>

    <div class="mt-[32px]">
      <div class="h-auto mb-[80px]">
        <NewsCarousel
          :title="$t('news')"
          :btn-text="$t('all_news')"
          link="/news"
          :pending="pending"
          :list="news"
          height="230rem"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      staticData: undefined,
      staticSlug: undefined,
      firstLetter: undefined,
      events: [],
      social: [],
      pending: false,
      news: undefined,
    };
  },
  watch: {
    $route() {
      this.getData();
      this.findFirstLetter();
    },
  },
  mounted() {},
  async created() {
    this.getData();
    await Promise.allSettled([
      this.$store.dispatch("fetchPost", {
        type: "news",
        limit: 8,
      }),
    ])
      .then((res) => {
        this.news = res[0].value?.data.results;
      })
      .finally(() => {
        this.pending = false;
        this.$store.dispatch("setSlugTitle", this.staticData?.title);
      });
  },
  beforeCreate() {
    this.$store.dispatch("setSlugTitle", "");
  },
  methods: {
    bytesToSize(bytes) {
      let sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      if (bytes === 0) return "0 Byte";
      let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math?.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
    },
    getData() {
      this.pending = true;
      Promise.allSettled([
        this.$store.dispatch("fetchSinglePages", {
          slug: this.$route.params.slug,
        }),
        this.$store.dispatch("fetchFooter"),
      ])
        .then((res) => {
          this.staticData = res[0].value?.data;
          if (res[0].reason.response.status == 404) {
            this.$router.push("/error");
          }
          this.social = res[1]?.value?.data;
        })
        .finally(() => {
          this.findFirstLetter();
          this.pending = false;
          this.$store.dispatch("setSlugTitle", this.staticData?.title);
        });
    },
    findFirstLetter() {
      this.pending = true;
      if (this.$refs.textContent) {
        const letter = this.$refs.textContent.getElementsByTagName("p")[0]?.innerText;
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};«':\\|,".<>\/?~]/;
        if (specialChars.test(letter?.charAt(this.char))) {
          this.char++;
          // this.findFirstLetter();
        } else {
          this.firstLetter = letter?.charAt(this.char).toUpperCase();
          this.char = 0;
          this.pending = false;
        }
      }
    },
  },
};
</script>

<style lang="scss">
.static-content {
  p {
    margin-bottom: 12px;
  }
}
.static-style {
  overflow-y: auto;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Minion 3", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 24rem;
    line-height: 130%;
    color: #1a2f53;
    margin-bottom: 24rem;
  }

  p {
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 17rem;
    line-height: 24px;
    color: #344666;
  }

  table {
    margin-top: 32rem;

    td {
      padding: 24rem 12rem 20rem 12rem !important;
      font-family: "Inter", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 15rem;
      line-height: 20px;
      color: #1a2f53;
    }

    tr {
      &:first-child {
        td {
          color: #fff;
        }
      }
    }

    tbody {
      tr:first-child {
        background: #1a2f53 !important;
        font-family: "Inter", sans-serif !important;
        font-style: normal !important;
        font-weight: 500 !important;
        font-size: 15rem !important;
        line-height: 20px !important;
        padding: 17px 0 17px 0 !important;

        p {
          color: #ffffff !important;
        }
      }
    }
  }
}
</style>
