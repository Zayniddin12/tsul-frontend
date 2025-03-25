<template>
  <div class="container mt-[32rem] grid grid-cols-12 gap-[24px]">
    <div class="col-span-9 lg:col-span-12">
      <ScientistCardPr v-if="pending" />
      <ScientistCard
        v-else
        class="my-[32rem]"
        v-bind="{
          mail: slug?.email,
          phone: slug?.phone_number,
          time: slug?.work_date,
          fullName: slug?.last_name + ' ' + slug?.first_name + ' ' + slug?.middle_name,
          position: slug?.description,
          img: slug?.get_image?.middle,
          quote: slug?.quote,
          telegram: slug?.telegram_link,
          twitter: slug?.twitter_link,
          facebook: slug?.facebook_link,
          instagram: slug?.instagram_link,
          linkedin: slug?.linkedin_link,
          slug: slug?.slug,
        }"
      />

      <div>
        <div class="max-w-[846px] mx-auto mt-[32px] px-[15px] news-cards-wrapper">
          <el-tabs v-model="activeName" class="demo-tabs department-tabs">
            <el-tab-pane
              v-if="slug?.biography && slug?.biography.length"
              :label="$t('inShort')"
              name="first"
            >
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
                <div v-else class="mb-[36rem] relative">
                  <div
                    class="opacity-[0.07] font-bold minion leading-[130%] text-[#1A2F53] text-[110px] top-[-32rem] absolute"
                  >
                    {{ firstLetter }}
                  </div>
                  <p ref="textContent" class="regular-texts" v-html="slug?.biography"></p>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane
              v-if="slug?.careers && slug?.careers.length"
              :label="$t('career')"
              name="second"
            >
              <div>
                <div>
                  <div v-for="(item, index) in slug?.careers" :key="index">
                    <div v-if="item.category === 'education'">
                      <h2
                        class="text-[32rem] leading-[130%] font-bold text-[#1A2F53] mb-[24px] font-minion minion"
                      >
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

                    <div v-if="item.category === 'career'" class="md:mt-0 mt-[40px]">
                      <h2
                        class="text-[32rem] leading-[130%] font-bold text-[#1A2F53] mb-[24px] font-minion minion"
                      >
                        {{ $t(item.category) }}
                      </h2>
                      <div class="grid gap-[0rem]">
                        <div class="flex items-start gap-[24rem] sm:flex-col timeline">
                          <h4
                            class="text-[24rem] leading-[130%] font-bold text-white bg-[#1A2F53] flex items-center justify-center max-w-[302px] w-full p-[11px] border-[1.6px] border-[#E0E5EC] flex-shrink-0 minion"
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
              </div>
            </el-tab-pane>
            <el-tab-pane
              v-if="slug?.duty && slug?.duty.length"
              :label="$t('functions')"
              name="third"
            >
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
                <div v-else class="mb-[36rem] relative">
                  <div
                    class="opacity-[0.07] font-bold minion leading-[130%] text-[#1A2F53] text-[110px] top-[-32rem] absolute"
                  >
                    {{ firstLetter }}
                  </div>
                  <p ref="textContent" class="regular-texts" v-html="slug?.duty"></p>
                </div>
              </div>
            </el-tab-pane>

            <el-tab-pane v-if="posts && posts.length" :label="$t('scientific_works')" name="fourth">
              <div class="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-[24rem] mb-[24rem]">
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
            </el-tab-pane>

            <!--            <el-tab-pane v-if="slug?.duty" :label="$t('tasks')" name="fourth">-->
            <!--              <div class="regular-texts" v-html="slug?.duty"></div>-->
            <!--            </el-tab-pane>-->

            <el-tab-pane
              v-if="videoLessons && videoLessons.length"
              :label="$t('video_tutorials')"
              name="fifth"
            >
              <div v-if="false" class="grid grid-cols-2 sm:grid-cols-1 gap-[24rem]">
                <video-cards-pr v-for="(item, index) in 2" :key="index" />
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-1 gap-[24rem]">
                <video-cards
                  v-for="(item, index) in videoLessons"
                  v-bind="{
                    height: item.height,
                    image: item.get_image?.origin,
                    tag: item.tag,
                    title: item.title,
                    date: item.publish_date,
                    description: item.description,
                    videosData: item.videosArray,
                    biography: item.biography,
                  }"
                  :key="index"
                  @click="openModal(item)"
                />
              </div>
              <light-box
                v-if="videoData"
                :videos="showModal"
                :video-arr="video"
                :title-light-box="videoData.title"
                @close-modal="showModal = false"
              />
              <button
                v-if="videoLessons.length > 4"
                type="button"
                class="text-[15rem] leading-[130%] font-semibold text-[#1A2F53] bg-[#E0E5EC] min-w-[210px] p-[16rem] mx-auto mt-[32rem] uppercase flex items-center justify-center gap-[10px]"
              >
                {{ $t("load_more") }}
                <Icon :class="pending ? 'load-more' : ''" name="load_more" />
              </button>
            </el-tab-pane>
          </el-tabs>
        </div>
        <light-box />
      </div>
    </div>

    <div class="col-span-3 lg:col-span-12">
      <SideBar />

      <div
        v-if="slug?.category.slug === 'prorector'"
        class="bg-[#F5F6FA] p-[20rem] mt-[24rem] relative prorector-apply"
      >
        <p class="text-[24rem] leading-[130%] font-bold text-[#1A2F53] minion mb-[16px]">
          {{ $t("apply_to_prorector") }}
        </p>
        <div>
          <router-link
            to="/apply"
            class="transiton inline-flex items-center gap-[8px] text-[15rem] leading-[140%] font-medium text-white bg-[#1A2F53] py-[12px] px-[20px]"
          >
            {{ $t("apply") }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="col-span-12 mb-[64rem]">
      <h3 class="text-[32rem] leading-[130%] font-bold text-[#1A2F53] mb-[28rem] minion">
        {{ $t("other_members") }}
      </h3>
      <div>
        <div v-if="pending" class="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          <YoungScientistsPr
            v-for="(item, index) in 4"
            :key="item"
            class="ml-[24rem]"
            :class="index === 0 ? '!ml-0' : ''"
          />
        </div>

        <div
          v-else
          class="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[24rem]"
        >
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
      videoData: [],
      showModal: false,
      video: "",
      // type: 'ilmiy-ishlar',
    };
  },
  computed: {
    ...mapState({
      anotherScientists: (state) => state.scientist,
      slug: (state) => state.employee.slug,
      videoLessons: (state) => state.videoLessons.videoLessons,
    }),
  },

  watch: {
    "$route.params.slug"() {
      this.getOtherHeads();
    },
    $route() {
      this.getOtherHeads();
    },
    slug() {
      if (this.slug?.id) {
        this.getVideoLessons(this.slug?.id);
      }
    },

    videoData() {
      this.video = this.videoData.video.replace("watch?v=", "embed/");
    },
  },
  // beforeUnmount() {
  //   this.$store.dispatch("setSlugTitle", "");
  // },
  created() {
    this.getOtherHeads();
  },
  updated() {
    this.findFirstLetter();
  },
  methods: {
    async getVideoLessons(id) {
      await Promise.allSettled([this.$store.dispatch("fetchVideoLessons", id)]);
    },
    renameFields(arr) {
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
        if (specialChars.test(letter?.charAt(this.char))) {
          this.char++;
          // this.findFirstLetter();
        } else {
          this.firstLetter = letter?.charAt(this.char);
          this.char = 0;
        }
      }
    },
    getScientificWorks() {
      if (this.slug) {
        this.pending = true;
        Promise.allSettled([
          this.$store
            .dispatch("fetchPost", {
              type: "scientific-works",
              author_id: this.slug.id,
            })
            .then((res) => {
              this.posts = res.data.results;
              this.videoArray = this.renameFields(res.data.results);
            }),
        ]).finally(() => {
          this.pending = false;
        });
      }
    },
    getOtherHeads() {
      this.pending = true;
      Promise.allSettled([
        this.$store.dispatch("fetchEmployeeSlug", {
          slug: this.$route.params.slug,
        }),
        this.$store
          .dispatch("fetchEmployeeRecommended", {
            slug: this.$route.params.slug,
            limit: 4,
            category: "head-of-department",
          })
          .then((res) => {
            this.array = res.data.results;
            this.pending = false;
            this.total = res[0].value.data.total_pages;
          }),
      ]).finally(() => {
        this.getScientificWorks();
        this.$store.dispatch("setSlugTitle", this.slug.first_name + " " + this.slug.last_name);
        this.pending = false;
      });
    },
    openModal(item) {
      this.videoData = item;
      this.showModal = true;
    },
  },
};
</script>

<style lang="scss">
.department-tabs {
  .el-tabs__item {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 15rem;
    line-height: 20px;
    color: #677b9e;
    white-space: initial;
    line-clamp: 1;

    text-align: center;
    &.is-active {
      color: #1a2f53;
    }
  }

  .el-tabs__active-bar {
    background-color: #1a2f53;
  }
}
.prorector-apply {
  background: url(/src/static/img/newsbg.png);
  background-color: #f5f6fa;
  background-repeat: no-repeat;
  background-position: bottom -20px right -20px;
  background-size: 96px 122px;
}
</style>
