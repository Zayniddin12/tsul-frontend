<template>
  <div class="container mt-[32rem]">
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-9 lg:col-span-12">
        <ScientistCardPr v-if="pending" />
        <div v-else>
          <ScientistCard
            class="my-[32rem]"
            v-bind="{
              mail: slug?.email,
              phone: slug?.phone_number,
              fullName: slug?.last_name + ' ' + slug?.first_name + ' ' + (slug?.middle_name || ''),
              position: slug?.category?.name,
              img: slug?.get_image?.origin,
              telegram: slug?.telegram_link,
              twitter: slug?.twitter_link,
              facebook: slug?.facebook_link,
              linkedin: slug?.linkedin_link,
              instagram: slug?.instagram_link,
              slug: slug?.slug,
            }"
          />
        </div>

        <div class="container mt-[32px] px-[140px] md:px-[15px] news-cards-wrapper">
          <div class="tabs w-full">
            <el-tabs v-model="activeName" class="demo-tabs info-tabs">
              <el-tab-pane :label="$t('inShort')" name="first">
                <div>
                  <div v-if="pending" class="regular-texts mb-[36rem]">
                    <p class="_loading">
                      «Olmaliq KMK» AJ Metallurgiya xomashyosi bilan ta'minlash va
                    </p>
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
                  <div
                    v-else-if="slug?.description && slug?.description?.length"
                    class="mb-[36rem] relative"
                  >
                    <div
                      class="opacity-[0.07] font-bold minion leading-[130%] text-[#1A2F53] text-[110px] top-[-32rem] absolute"
                    >
                      {{ firstLetter }}
                    </div>
                    <p ref="textContent" class="regular-texts" v-html="slug?.description"></p>
                  </div>
                  <NoData v-else />
                </div>
              </el-tab-pane>
              <el-tab-pane :label="$t('career')" name="second">
                <div v-if="slug?.careers?.length">
                  <div v-for="(item, index) in slug?.careers" :key="index">
                    <div v-if="item.category === 'education'">
                      <h2 class="text-[32rem] leading-[130%] font-bold text-[#1A2F53] mb-[24px] font-minion">
                        {{ $t(item.category) }}
                      </h2>
                      <div class="grid gap-[0rem]">
                        <div class="flex items-start gap-[24rem] sm:flex-col timeline">
                          <h4
                            class="minion text-[24rem] leading-[130%] font-bold text-white bg-[#1A2F53] flex items-center justify-center max-w-[302px] w-full p-[11px] border-[1.6px] border-[#E0E5EC] flex-shrink-0"
                          >
                            {{ item.years }}
                          </h4>
                          <div
                            class="text-[15rem] leading-[130%] font-normal text-[#677B9E] p-[20rem] bg-[#F5F6FA] border-[#E0E5EC] border-[1.6px]"
                            v-html="item.content"
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div v-if="item.category === 'career'">
                      <h2 class="text-[32rem] leading-[130%] font-bold text-[#1A2F53] mb-[24px] font-minion">
                        {{ $t(item.category) }}
                      </h2>
                      <div class="grid gap-[0rem]">
                        <div class="flex items-start gap-[24rem] sm:flex-col timeline">
                          <h4
                            class="minion text-[24rem] leading-[130%] font-bold text-white bg-[#1A2F53] flex items-center justify-center max-w-[302px] w-full p-[11px] border-[1.6px] border-[#E0E5EC] flex-shrink-0"
                          >
                            {{ item.years }}
                          </h4>
                          <div
                            class="text-[15rem] leading-[130%] font-normal text-[#677B9E] p-[20rem] bg-[#F5F6FA] border-[#E0E5EC] border-[1.6px]"
                            v-html="item.content"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <NoData v-else />
              </el-tab-pane>
              <el-tab-pane :label="$t('his_scientific_works')" name="third">
                <div
                  v-if="posts && posts.length"
                  class="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-[24rem] mb-[24rem]"
                >
                  <div v-for="(item, index) in posts" :key="index">
                    <news-card
                      :is-news="false"
                      :image="item?.get_image?.middle"
                      :description="item.description"
                      :tag="item.category.name"
                      :title="item.title"
                      :date="item.publish_date"
                      :slug="`/scientific-works/${item.slug}`"
                      :height="height"
                      :content-height="contentHeight"
                    />
                  </div>
                </div>
                <NoData v-else />
              </el-tab-pane>
              <el-tab-pane :label="$t('tasks')" name="fourth">
                <div v-if="slug?.duty" class="regular-texts" v-html="slug?.duty" />
                <NoData v-else />
              </el-tab-pane>
            </el-tabs>
          </div>
          <light-box />
        </div>
      </div>
      <div class="col-span-3 lg:col-span-12 mt-[32px] flex flex-col gap-[20px]">
        <SideBar />
      </div>
      <div v-if="array?.length" class="col-span-12 mb-[64rem]">
        <h3 class="text-[32rem] leading-[130%] font-bold text-[#1A2F53] mb-[28rem] minion">
          {{ $t("other_members") }}
        </h3>
        <div class="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[24rem]">
          <YoungScientists
            v-for="item in array"
            :key="item"
            v-bind="{
              type: '2',
              scientist: {
                id: item.id,
                name: item?.last_name + ' ' + item?.first_name + ' ' + item?.middle_name,
                text: item.description,
                image: item?.get_image?.middle,
                slug: `${item.slug}?faculty=${item.faculty?.slug}`,
                faculty: item.faculty?.slug,
              },
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      firstLetter: undefined,
      activeName: "first",
      posts: [],
      employee: [],
      height: "184rem",
      contentHeight: "124rem",
      array: [],
      total: undefined,
      page: 1,
      pending: true,
      currentSlug: undefined,
      videoArray: [],
      char: 0,
      // type: 'ilmiy-ishlar',
    };
  },
  computed: {
    ...mapState({
      anotherScientists: (state) => state.scientist,
      slug: (state) => state.employee.slug,
    }),
  },
  watch: {
    $route(to, from) {
      this.fetchData();
    },
    "$route.params.slug"() {
      this.fetchData();
    },
  },
  created() {
    this.fetchData();
  },
  updated() {
    this.findFirstLetter();
  },
  methods: {
    renameFeilds(arr) {
      return arr.map((item) => {
        return {
          image: item.photo,
          tag: item.category.name,
          title: item.title,
          date: item.publish_date,
          description: item.description,
          videosArray: item.video,
        };
      });
    },
    findFirstLetter() {
      if (this.$refs.textContent) {
        let letter = this.$refs.textContent?.innerText;
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};«':\\|,".<>\/?~]/;
        if (specialChars.test(letter?.charAt(this.char)) && typeof this.char == "Number") {
          this.char++;
          this.findFirstLetter();
        } else {
          this.firstLetter = letter?.charAt(this.char);
          this.char = 0;
        }
      }
    },
    async fetchData() {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchEmployeeSlug", { slug: this.$route.params.id }),
        this.$store
          .dispatch("fetchEmployee", {
            limit: 4,
            page: this.page,
            category: "yosh-olimlar",
          })
          // this.$store
          //   .dispatch("fetchEmployeeRecommended", {
          //     slug: this.$route.params.slug,
          //     faculty: this.$route.query.faculty,
          //     limit: 4,
          //     // category: "department_head",
          //   })
          .then(async (res) => {
            this.array = res.data.results;
            this.pending = false;
            this.total = res[0].value.data.total_pages;

            await this.$store
              .dispatch("fetchPost", {
                type: "scientific-works",
                author: this.data?.first_name,
              })
              .then((res) => {
                this.posts = res.data.results;
                this.videoArray = this.renameFeilds(res.data.results);
              });
          }),
      ]).finally(() => {
        this.pending = false;
        this.$store.dispatch("setSlugTitle", this.slug.first_name + " " + this.slug.last_name);
      });
    },
  },
};
</script>

<style lang="scss">
.info-tabs {
  .el-tabs__item {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 15rem;
    line-height: 20px;
    color: #677b9e;
    white-space: initial;
    text-align: center;
    &.is-active {
      color: #1a2f53;
    }
  }

  .el-tabs__content {
    overflow: inherit !important;
  }

  .el-tabs__active-bar {
    background-color: #1a2f53;
  }
}
</style>
