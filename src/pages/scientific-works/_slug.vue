<template>
  <div>
    <div v-if="data" class="container mt-[32rem] scientific-works-single">
      <div class="grid grid-cols-12 gap-[24rem]">
        <div class="col-span-9 lg:col-span-12">
          <div>
            <img
              v-if="data?.get_image?.origin"
              :src="data?.get_image?.origin"
              class="w-[100%] object-cover h-[441rem] lg:h-[300rem]"
              alt="news-image"
            />
            <img
              v-else
              class="w-[100%] object-cover h-[441rem] lg:h-[300rem]"
              src="@/static/img/default.svg"
              alt="news-image"
            />
          </div>
          <div
            v-if="data?.get_image?.middle ? 'mt-[0rem]' : 'mt-[-115rem]'"
            class="mt-[-115rem] -500:mt-[-90rem]"
          >
            <news-single-head-pr v-if="pending" />
            <news-single-head
              v-else
              :title="data?.title"
              :tag="data.author.first_name + ' ' + data.author.last_name"
            />
          </div>
          <div class="px-[100rem] mt-[24rem] mb-[64rem] -540:mb-[16rem] md:px-0">
            <div v-if="pending" class="regular-texts mb-[36px]">
              <p class="_loading mt-[7px]">Lorem ipsum dolor sit amet.</p>
              <p class="_loading mt-[7px]">Lorem ipsum dolor sit amet.</p>
              <p class="_loading mt-[7px]">Lorem ipsum dolor sit amet.</p>
              <p class="_loading mt-[7px]">Lorem ipsum dolor sit amet.</p>
              <p class="_loading mt-[7px]">Lorem ipsum dolor sit amet.</p>
              <p class="_loading mt-[7px]">Lorem ipsum dolor sit amet.</p>
            </div>
            <div v-else class="regular-texts mb-[36rem] -540:mb-[6rem]">
              <div class="regular-texts" v-html="data.content"></div>
            </div>
          </div>
          <div v-if="data.author" class="relative">
            <profile-info-pr
              v-if="pending"
              v-bind="{
                type: 2,
                profile: {
                  image: 'https://picsum.photos/1000/1000/',
                  name: 'Raxmatov Sanjar',
                  work: 'Html Developer',
                  description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                  time: '09:00 - 18:00',
                  phone: '+99897-9-9-9-9-9-9',
                  email: 'www@gmail.com',
                  facebook: '#',
                  linkedin: '#',
                  google: '#',
                },
              }"
            />

            <profile-info
              v-else
              profile-main="h-[217rem] -540:h-[100%]"
              class="relative z-[0]"
              profile-image="md:w-[193rem] md:h-[217rem] object-cover"
              v-bind="{
                type: 3,
                profile: {
                  image: data.author.photo,
                  name: data.author.first_name + ' ' + data.author.last_name,
                  work: data.author.category.name,
                  time: data.author.work_date,
                  phone: data.author.phone_number,
                  email: data.author.google_link,
                  facebook: data.author.facebook_link,
                  twitter: data.author.twitter_link,
                  instagram: data.author.instagram_link,
                  telegram: data.author.telegram_link,
                },
              }"
            />
            <Icon
              class="absolute pattern-img bottom-0 right-0 z-[0] -540:w-[100px]"
              name="bg_pattern"
            />
          </div>
          <div class="display-none-print mt-[32px] -540:mt-[16px]">
            <div v-if="pending && data.documents" class="relative">
              <div class="flex flex-wrap justify-between">
                <div
                  v-for="(item, index) in data.documents"
                  :key="index"
                  class="w-[306rem] -453:w-[100%] mb-[24rem] download-files"
                >
                  <a :href="item.document" :download="item.document" target="_blank">
                    <div class="flex items-center -453:justify-center">
                      <Icon name="document_text" />
                      <div>
                        <p class="line-clamp-1 text-[13rem] text-[#43424A] font-medium _loading">
                          dasdasdasdasd
                        </p>
                        <div class="flex">
                          <span
                            class="font-medium text-[11rem] text-[rgba(45,44,61,0.5)] _loading mt-[4px]"
                          >
                            dsahdoasdaasdiadqewsd
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div v-if="!pending && data.documents" class="relative z-[9]">
              <div
                class="transition-height duration-300"
                :class="allFilesOpen ? '' : 'max-h-[105px] overflow-hidden'"
              >
                <div class="flex flex-wrap justify-between">
                  <div
                    v-for="(item, index) in data.documents"
                    :key="index"
                    class="w-[306rem] -453:w-[100%] mb-[24rem] download-files"
                  >
                    <a
                      id="documentt"
                      :href="item.document"
                      target="_blank"
                      :download="item.document"
                    >
                      <div class="flex items-center -453:justify-center">
                        <Icon name="document_text" />
                        <div class="ml-[12px]">
                          <p class="line-clamp-1 text-[13rem] text-[#43424A] font-medium">
                            {{ item.title }}
                          </p>
                          <div class="flex">
                            <icon name="download_arrow" />
                            <span
                              class="uppercase font-medium text-[11rem] text-[rgba(45,44,61,0.5)]"
                            >
                              {{ getType(item.title) }}: {{ bytesToSize(item.file_size) }}
                              <!-- {{item?.title}} {{bytesToSize(item?.file_size)}} -->
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  v-if="data?.files?.length > 4"
                  class="white-gradient absolute bottom-[10px] -453:bottom-[0rem] z-[2]"
                  :class="allFilesOpen ? 'opacity-0' : ''"
                ></div>
                <div
                  v-if="data?.files?.length > 4"
                  class="flex justify-center mt-[-50rem] relative z-[10] cursor-pointer"
                ></div>
              </div>
              <div class="flex justify-center">
                <div
                  v-if="data?.files?.length > 4"
                  :class="allFilesOpen ? 'hidden' : ''"
                  class="bg-[#fff] cursor-pointer transition-all duration-200 border-[1.6rem] border-[#E0E5EC] p-[12rem] flex items-center w-[170px] z-10"
                  @click="allFilesOpen = !allFilesOpen"
                >
                  <p class="font-medium text-[15rem] text-[#1A2F53]">
                    {{ $t("all_files") }}
                  </p>
                  <icon class="ml-[24rem]" name="chevron_donw" />
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="flex items-center justify-end mt-[30px]">
            <a
              :href="data.get_report_file"
              download
              @click="downloadAllDocuments"
              v-if="data.documents.length > 0"
              class="
                bg-[#E3E8ED]
                group
                duration-150
                hover:bg-[#dce2f8]
                font-medium
                flex
                h-[52px]
                py-[12px]
                sm:py-[10px]
                px-[14px]
                items-center
                text-[15rem]
                leading-[140%]
                border border-[#8596B2]
                justify-between
                cursor-pointer
              "
            >
              <span class="flex items-center"> <Icon class="mr-[8px]" name="pdf_blue" /></span>
              {{ $t("total_download") }}
            </a>
          </div> -->
          <div class="mt-[52rem] -540:mt-[28px]">
            <social-sharing :views="data.view_count" />
          </div>
        </div>
        <div class="col-span-3 lg:col-span-12">
          <SideBar />
        </div>
      </div>
      <div class="mt-[64px] mb-[64px]">
        <div v-if="true" class="container">
          <div v-if="pending">
            <scientific-works-slider-pr
              v-bind="{
                works: data2,
              }"
            />
          </div>

          <div v-else>
            <scientific-works-slider :works="works" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allFilesOpen: false,
      works: [],
      options: {
        rewind: true,
        gap: "48rem",
        perPage: 4,
        arrows: false,
        pagination: false,
        // type: "loop",
        data2: undefined,
        breakpoints: {
          1120: {
            perPage: 3,
            perMove: 1,
          },
          860: {
            perPage: 3,
            perMove: 1,
          },
          600: {
            perPage: 2,
            perMove: 1,
          },
          400: {
            perPage: 1,
            perMove: 1,
          },
        },
      },
      data: undefined,
      data2: undefined,
      pending: undefined,
    };
  },
  watch: {
    "$route.params.slug"() {
      this.getData();
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.returnUrl();
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  methods: {
    getType(item) {
      return item?.split(".").pop();
    },
    downloadAllDocuments() {
      document.getElementById("documentt").click();
    },
    bytesToSize(bytes) {
      let sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      if (bytes == 0) return "0 Byte";
      let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
    },
    async getData() {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchPostSingle", { slug: this.$route.params.slug }),
        this.$store.dispatch("fetchPostRecommended", {
          slug: this.$route.params.slug,
          type: "scientific-works",
          page: this.page,
        }),
      ])
        .then((res) => {
          this.data = res[0].value.data;
          this.works = res[1]?.value.data?.results;
        })
        .finally(() => {
          this.pending = false;
          this.$store.dispatch("setSlugTitle", this.data.title);
        });

      await Promise.allSettled([this.$store.dispatch("fetchTopPost")])
        .then((res) => {
          this.data2 = res[0].value.data.results;
        })
        .finally(() => {
          this.pending = false;
        });
    },
    returnUrl() {
      return (this.url = window.location.href);
    },
  },
};
</script>

<style lang="scss">
.scientific-works-single {
  .white-gradient {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.7) 40.63%,
      #ffffff 100%
    );
    width: 100%;
    height: 72rem;
    pointer-events: none;
  }

  .download-files {
    transition: 0.3s all;

    &:hover {
      opacity: 0.6;
    }
  }

  .pattern-img {
    svg {
      path {
        fill: #1a2f53;
      }
    }
  }
}
.profile-info {
  min-height: 230px;
  background: #f5f6fa;
  border: 1.6px solid #e0e5ec;

  .profile-info-inner {
    width: 100%;
    padding: 20rem 20rem 20rem 0;

    @media screen and (max-width: 640px) {
      padding-left: 20rem;
    }

    p {
      display: none;
    }
  }
}
.transition-height {
  transition: height 0.3s;
}
</style>
