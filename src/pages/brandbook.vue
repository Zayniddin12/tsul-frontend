<template>
  <div class="container">
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-9 lg:col-span-12">
        <PageTitle :title="$t('brandbook')" class="my-[32px]" />

        <div class="flex justify-center md:flex-wrap gap-[24px]">
          <div class="w-1/3 md:w-full">
            <img class="w-full" src="@/static/img/cyrcle-dark.png" alt="brandbook" />
            <h4 class="minion font-bold text-[20rem] leading-[26px] mt-[22px] text-[#1A2F53]">
              {{ $t("cyrcle_logo") }}
            </h4>

            <div class="flex items-center gap-[12px] mt-[10px]">
              <a
                target="_blank"
                :href="brand[0]?.get_circle_dark_svg"
                class="bg-[#F5F6FA] text-[#2B5E9B] px-[8px] cursor-pointer py-[4px] uppercase inline-flex duration-[150ms] hover:bg-[#1A2F53] hover:text-[#FFFFFF] leading-[130%] text-[12rem] font-semibold max-h-[24px] items-center"
                @click="downloadPdf(brand[0])"
              >
                .svg
              </a>

              <a
                v-if="brand[0]?.get_circle_dark_png"
                target="_blank"
                :href="brand[0]?.get_circle_dark_png"
                download
                class="bg-[#F5F6FA] text-[#2B5E9B] px-[8px] cursor-pointer py-[4px] uppercase inline-flex duration-[150ms] hover:bg-[#1A2F53] hover:text-[#FFFFFF] leading-[130%] text-[12rem] font-semibold max-h-[24px] items-center"
              >
                .png
              </a>

              <a
                v-if="brand[0]?.get_circle_dark_jpeg"
                target="_blank"
                :href="brand[0]?.get_circle_dark_jpeg"
                download
                class="bg-[#F5F6FA] text-[#2B5E9B] px-[8px] py-[4px] cursor-pointer uppercase inline-flex duration-[150ms] hover:bg-[#1A2F53] hover:text-[#FFFFFF] leading-[130%] text-[12rem] font-semibold max-h-[24px] items-center"
              >
                .jpeg
              </a>
            </div>
          </div>
          <div class="w-1/3 md:w-full">
            <img class="w-full" src="/src/static/img/horizontal-dark.png" alt="brandbook" />
            <h4 class="minion font-bold text-[20rem] leading-[26px] mt-[22px] text-[#1A2F53]">
              {{ $t("horizontal_logo") }}
            </h4>
            <div class="flex items-center gap-[12px] mt-[10px]">
              <a
                v-if="brand[0]?.get_horizontal_dark_svg"
                target="_blank"
                :href="brand[0]?.get_horizontal_dark_svg"
                download

                class="bg-[#F5F6FA] text-[#2B5E9B] px-[8px] py-[4px] uppercase inline-flex duration-[150ms] hover:bg-[#1A2F53] hover:text-[#FFFFFF] leading-[130%] text-[12rem] font-semibold max-h-[24px] items-center"
              >
                .svg
              </a>

              <a
                v-if="brand[0]?.get_horizontal_dark_png"
                target="_blank"
                :href="brand[0]?.get_horizontal_dark_png"
                download
                class="bg-[#F5F6FA] text-[#2B5E9B] px-[8px] py-[4px] uppercase inline-flex duration-[150ms] hover:bg-[#1A2F53] hover:text-[#FFFFFF] leading-[130%] text-[12rem] font-semibold max-h-[24px] items-center"
              >
                .png
              </a>
            </div>
          </div>
          <div class="w-1/3 md:w-full">
            <img class="w-full" src="@/static/img/white-brands.png" alt="brandbook" />
            <h4 class="minion font-bold text-[20rem] leading-[26px] mt-[22px] text-[#1A2F53]">
              {{ $t("dark_logo") }}
            </h4>
            <div class="flex items-center gap-[12px] mt-[10px]">
              <a
                v-if="brand[0]?.get_horizontal_white_svg"
                target="_blank"
                :href="brand[0]?.get_horizontal_white_svg"
                download
                class="bg-[#F5F6FA] text-[#2B5E9B] px-[8px] py-[4px] uppercase inline-flex duration-[150ms] hover:bg-[#1A2F53] hover:text-[#FFFFFF] leading-[130%] text-[12rem] font-semibold max-h-[24px] items-center"
              >
                .svg
              </a>

              <a
                v-if="brand[0]?.get_horizontal_white_png"
                target="_blank"
                :href="brand[0]?.get_horizontal_white_png"
                download
                class="bg-[#F5F6FA] text-[#2B5E9B] px-[8px] py-[4px] uppercase inline-flex duration-[150ms] hover:bg-[#1A2F53] hover:text-[#FFFFFF] leading-[130%] text-[12rem] font-semibold max-h-[24px] items-center"
              >
                .png
              </a>
            </div>
          </div>
        </div>
        <div
          class="w-[80%] mx-auto border-b-[#E0E5EC] border-b-[1px] mt-[32px] pb-[24px] -600:mx-[12px]"
        >
          <div v-if="false">
            <h4 class="text-[#344666] text-[15rem] leading-[140%] font-normal _loading">
              «Olmaliq KMK» AJ Metallurgiya xomashyosi bilan ta'minlash va sotish
            </h4>
            <h4 class="text-[#344666] text-[15rem] leading-[140%] font-normal _loading mt-[8px]">
              «Olmaliq KMK» AJ Metallurgiya xomashyosi bilan ta'minlash va sotish
            </h4>
            <h4 class="text-[#344666] text-[15rem] leading-[140%] font-normal _loading mt-[8px]">
              «Olmaliq KMK» AJ Metallurgiya xomashyosi bilan ta'minlash va sotish
            </h4>
          </div>

          <div
            v-else
            class="reg-texts text-[#344666] text-[15rem] leading-[140%] font-normal"
            v-html="brand[0]?.content"
          ></div>
        </div>

        <a
          v-if="brand[0]?.get_all_brands"
          target="_blank"
          class="learn-more-buttons w-[269px] mx-auto mt-[24px]"
          :href="brand[0]?.get_all_brands"
        >
          <Icon name="brandbook" />
          <p>{{ $t("download_brandbook") }}</p>
          <Icon name="arrow_right_button" />
        </a>
      </div>
      <div class="col-span-3 lg:col-span-12 my-[32px]">
        <SideBar />
      </div>
    </div>
    <div class="grid grid-cols-12">
      <div class="col-span-12 mt-[64rem] mb-[104rem]">
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
  </div>
</template>

<script>
import PageTitle from "@/components/common/PageTitle.vue";
import { mapState } from "vuex";
export default {
  components: { PageTitle },
  data() {
    return {
      news: [],
      brand: [],
      pending: undefined,
    };
  },
  computed: {
    ...mapState({
      news: (state) => state.post.allNews,
    }),
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  async created() {
    this.getData();
  },

  methods: {
    getData() {
      this.pending = true;
      Promise.allSettled([
        this.$store.dispatch("fetchPost", {
          type: "news",
          limit: 8,
        }),
        this.$store.dispatch("fetchBrand"),
      ])
        .then((res) => {
          this.news = res[0].value.data.results;
          this.brand = res[1].value.data.results;
        })
        .finally(() => {
          this.pending = false;
          this.$store.dispatch("setSlugTitle", this.$t("breadcrumb.brandbook"));
        });
    },
    downloadPdf(brand) {
      const link = document.createElement('a');
      const name = brand.get_circle_dark_svg.split("/basefile/")[1]
      link.href = brand?.get_circle_dark_svg
      link.target = '_blank';
      link.download = name;

      // Simulate a click on the element <a>
      document.body.appendChild(link);
      link.click();
      link.remove();
      document.body.removeChild(link);
    },
    addParams(key, val) {
      this.$router.push({
        query: {
          [key]: val ? val : "all",
        },
      });
    },
    async fetchCurrent(id) {
      let temp = this.tabs.filter((item) => item.name == id);
      this.degree = temp[0].name == "all" ? "" : temp[0].id;
      this.addParams("degree", this.degree);
      await this.$store
        .dispatch("fetchFaculties", {
          degree: this.degree,
          category: "faculty",
        })
        .finally(() => {
          this.pending = false;
        });
      this.data = this.faculty;
    },
  },
};
</script>

<style lang="scss" scoped></style>

