<template>
  <div v-if="data" class="container mb-[104rem] mt-[32rem]">
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="w-full col-span-9 -1245:col-span-12">
        <page-title :title="data?.name" class="mb-[24rem]" />
      </div>
      <div class="w-full col-span-3 -1245:hidden"></div>
    </div>
    <div class="grid grid-cols-12 gap-[24rem]">
      <div v-if="data" class="col-span-9 lg:col-span-12">
        <div
          class="relative bg-[#F5F6FA] border-[1.6px] border-[#E0E5EC] py-[16rem] px-[23rem] flex items-start justify-between gap-[10px] sm:gap-[40px] sm:flex-col sm:items-center"
        >
          <div class="w-full max-w-[150px]">
            <h3
              class="text-[28rem] leading-[130%] min-h-[36px] font-bold text-[#1A2F53] mb-[12px] sm:text-center"
            >
              {{ data.duration }} {{ $t("years") }}
            </h3>
            <p class="text-[15rem] leading-[130%] font-normal text-[#677B9E]">{{ data.type }}</p>
          </div>
          <hr class="h-[105px] w-[1px] sm:w-full sm:h-[1px] my-auto bg-[#E0E5EC]" />
          <div class="w-full max-w-[150px] sm:text-center">
            <div class="min-h-[36px] flex-center mb-[12px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <g clip-path="url(#clip0_6571_61905)">
                  <path
                    d="M10.88 1.28027C10.0313 1.28027 9.21737 1.61742 8.61726 2.21753C8.01714 2.81765 7.68 3.63158 7.68 4.48027C7.68 5.32897 8.01714 6.1429 8.61726 6.74301C9.21737 7.34313 10.0313 7.68027 10.88 7.68027C11.7287 7.68027 12.5426 7.34313 13.1427 6.74301C13.7429 6.1429 14.08 5.32897 14.08 4.48027C14.08 3.63158 13.7429 2.81765 13.1427 2.21753C12.5426 1.61742 11.7287 1.28027 10.88 1.28027ZM20.992 1.28027C20.1433 1.28027 19.3294 1.61742 18.7293 2.21753C18.1291 2.81765 17.792 3.63158 17.792 4.48027C17.792 5.32897 18.1291 6.1429 18.7293 6.74301C19.3294 7.34313 20.1433 7.68027 20.992 7.68027C21.8407 7.68027 22.6546 7.34313 23.2547 6.74301C23.8549 6.1429 24.192 5.32897 24.192 4.48027C24.192 3.63158 23.8549 2.81765 23.2547 2.21753C22.6546 1.61742 21.8407 1.28027 20.992 1.28027ZM16.0173 12.8176C14.9988 12.8176 14.0221 13.2221 13.302 13.9423C12.5819 14.6624 12.1773 15.6391 12.1773 16.6576C12.1773 17.676 12.5819 18.6527 13.302 19.3728C14.0221 20.093 14.9988 20.4976 16.0173 20.4976C17.0357 20.4976 18.0124 20.093 18.7326 19.3728C19.4527 18.6527 19.8573 17.676 19.8573 16.6576C19.8573 15.6391 19.4527 14.6624 18.7326 13.9423C18.0124 13.2221 17.0357 12.8176 16.0173 12.8176ZM16.0173 30.7376C12.0774 30.7376 10.6618 29.7609 10.5133 29.6496C10.352 29.5292 10.2573 29.3392 10.2573 29.1376V26.8976C10.2573 23.7212 12.8416 21.1376 16.0173 21.1376C19.1936 21.1376 21.7773 23.7212 21.7773 26.8976V29.1376C21.7773 29.3385 21.6826 29.5286 21.5213 29.6496C21.3734 29.7609 19.9571 30.7376 16.0173 30.7376ZM11.3427 21.6483C10.7181 19.144 8.45504 17.2803 5.76 17.2803C2.58432 17.2803 0 19.864 0 23.0403V25.2803C0 25.4812 0.09472 25.6713 0.256 25.7923C0.40448 25.9036 1.82016 26.8803 5.76 26.8803C7.12512 26.8803 8.18112 26.7619 8.99264 26.6038C9.07392 24.6358 9.96416 22.8771 11.3427 21.6483ZM26.24 17.2803C23.5539 17.2803 21.2979 19.1312 20.6637 21.6227C22.0602 22.854 22.9626 24.6262 23.0432 26.6108C23.8502 26.7651 24.8947 26.8803 26.24 26.8803C30.1792 26.8803 31.5955 25.9036 31.744 25.7923C31.9053 25.672 32 25.4819 32 25.2803V23.0403C32 19.864 29.4163 17.2803 26.24 17.2803ZM26.2573 8.97755C25.2388 8.97755 24.2621 9.38212 23.542 10.1023C22.8218 10.8224 22.4173 11.7991 22.4173 12.8176C22.4173 13.836 22.8218 14.8127 23.542 15.5328C24.2621 16.253 25.2388 16.6576 26.2573 16.6576C27.2757 16.6576 28.2524 16.253 28.9726 15.5328C29.6927 14.8127 30.0973 13.836 30.0973 12.8176C30.0973 11.7991 29.6927 10.8224 28.9726 10.1023C28.2524 9.38212 27.2757 8.97755 26.2573 8.97755ZM5.77728 8.97755C4.75885 8.97755 3.78213 9.38212 3.06199 10.1023C2.34185 10.8224 1.93728 11.7991 1.93728 12.8176C1.93728 13.836 2.34185 14.8127 3.06199 15.5328C3.78213 16.253 4.75885 16.6576 5.77728 16.6576C6.79571 16.6576 7.77243 16.253 8.49257 15.5328C9.21271 14.8127 9.61728 13.836 9.61728 12.8176C9.61728 11.7991 9.21271 10.8224 8.49257 10.1023C7.77243 9.38212 6.79571 8.97755 5.77728 8.97755Z"
                    fill="#1A2F53"
                  />
                  <path
                    d="M21.1388 16.6576C21.1388 17.375 20.9897 18.0579 20.7222 18.6774C21.3462 17.887 22.134 17.2432 23.0262 16.783C21.8755 15.8435 21.1395 14.415 21.1395 12.8176C21.1395 11.2106 21.8851 9.77631 23.0467 8.83679C22.4348 8.51039 21.7443 8.32031 20.9936 8.32031C18.9206 8.32031 17.2086 9.69247 16.6864 11.5862C19.1939 11.9152 21.1388 14.0611 21.1388 16.6576ZM10.8988 12.8176C10.8988 14.4208 10.1564 15.8538 8.99867 16.7933C9.93051 17.2771 10.7446 17.9638 11.3782 18.8067C11.0736 18.1526 10.8988 17.4256 10.8988 16.6576C10.8988 14.1149 12.7638 12.0054 15.1958 11.6099C14.6819 9.70399 12.9635 8.32031 10.8816 8.32031C10.1699 8.32031 9.51004 8.48927 8.92188 8.78495C10.1225 9.72255 10.8988 11.1798 10.8988 12.8176Z"
                    fill="#1A2F53"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_6571_61905">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p class="text-[15rem] leading-[130%] font-normal text-[#677B9E]">
              {{ data.credits }} {{ $t("creditss") }}
            </p>
          </div>
          <hr class="h-[105px] w-[1px] sm:w-full sm:h-[1px] my-auto bg-[#E0E5EC]" />
          <div class="w-full max-w-[150px] sm:text-center text-center">
            <div class="mb-[12px] py-[8px] bg-[#fff] border-[1px] border-[#E0E5EC]">
              <h6 class="font-bold text-[15rem] leading-[20px] text-[#1A2F53]">
                {{ data.language }}
              </h6>
            </div>
            <p class="text-[15rem] leading-[130%] font-normal text-[#677B9E]">
              {{ $t("you_will_be_educated_on_these_langs") }}
            </p>
          </div>
          <hr class="h-[105px] w-[1px] sm:w-full sm:h-[1px] my-auto bg-[#E0E5EC]" />
          <div class="w-full max-w-[150px] sm:text-center">
            <div class="min-h-[36px] flex-center mb-[12px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M13.4415 19.2644C13.8895 19.2644 14.2095 19.5204 14.3375 19.9044C14.4015 19.969 14.4015 19.969 14.4655 19.969C14.614 19.8794 14.79 19.8321 14.9679 19.8321C15.1733 19.8321 15.382 19.8961 15.5535 20.0324C15.8735 20.2877 15.9375 20.6724 15.8095 21.057C15.8095 21.1217 15.8735 21.1217 15.8735 21.1844C16.2575 21.2484 16.5775 21.5684 16.6415 21.9524C16.7055 22.337 16.5135 22.7204 16.1935 22.9124C16.1935 22.977 16.1935 23.0404 16.1935 23.1044C16.3855 23.3604 16.4495 23.809 16.2575 24.129C16.0904 24.4081 15.7775 24.5898 15.446 24.5898C15.3967 24.5898 15.3468 24.5853 15.2975 24.577C15.2975 24.6417 15.2335 24.6417 15.1695 24.7044C15.1695 25.089 14.9775 25.409 14.5935 25.537C14.4655 25.6004 14.4015 25.6004 14.2735 25.6004C14.0175 25.6004 13.7615 25.4724 13.5695 25.2804C13.5055 25.2804 13.5055 25.2804 13.4415 25.2804C13.3775 25.2804 13.3775 25.2804 13.3135 25.2804C13.1266 25.4673 12.87 25.5869 12.596 25.5869C12.4956 25.5869 12.3925 25.5716 12.2895 25.537C11.9695 25.409 11.7135 25.089 11.7135 24.7044C11.7135 24.6404 11.6495 24.6404 11.5855 24.577C11.5356 24.5853 11.4863 24.5898 11.437 24.5898C11.1055 24.5898 10.7925 24.4081 10.6255 24.129C10.4335 23.809 10.4335 23.4244 10.6895 23.1044C10.6895 23.0404 10.6895 22.977 10.6895 22.9124C10.3695 22.7204 10.1775 22.337 10.2415 21.9524C10.3055 21.5677 10.6255 21.2477 11.0095 21.1844C11.0095 21.1204 11.0735 21.1204 11.0735 21.057C10.9455 20.6724 11.0095 20.289 11.3295 20.0324C11.501 19.8948 11.709 19.8321 11.9151 19.8321C12.093 19.8321 12.269 19.8794 12.4175 19.969C12.4815 19.9044 12.4815 19.9044 12.5455 19.9044C12.6735 19.5204 13.0575 19.2644 13.4415 19.2644ZM13.4415 17.9844C12.8892 17.9844 12.3631 18.1969 11.9624 18.5521C11.9464 18.5521 11.9311 18.5521 11.9151 18.5521C11.4095 18.5521 10.9173 18.7236 10.5295 19.034C10.0879 19.3873 9.82037 19.8737 9.74997 20.4093C9.34997 20.7434 9.06645 21.2157 8.97877 21.7418C8.89237 22.2596 8.99861 22.7831 9.25589 23.2228C9.14773 23.7437 9.23605 24.3005 9.52853 24.7863C9.79861 25.2375 10.2204 25.5729 10.7055 25.7425C10.9468 26.1777 11.3346 26.5309 11.814 26.7229C11.837 26.7325 11.8607 26.7409 11.8844 26.7492C12.1154 26.826 12.3548 26.865 12.596 26.865C12.8808 26.865 13.1644 26.8087 13.43 26.7037C13.7007 26.8189 13.988 26.8804 14.2735 26.8804C14.4949 26.8804 14.756 26.8669 15.085 26.7191C15.5784 26.5316 15.9663 26.1809 16.2005 25.7354C16.6767 25.562 17.0895 25.2305 17.3557 24.7869C17.6303 24.3306 17.7135 23.7719 17.6136 23.2458C17.8799 22.8023 17.9912 22.2692 17.9036 21.7431C17.8159 21.2157 17.5324 20.7434 17.1324 20.4093C17.0632 19.8724 16.7951 19.3853 16.3516 19.0333C15.965 18.7236 15.4728 18.5521 14.9672 18.5521C14.9576 18.5521 14.948 18.5521 14.9384 18.5521C14.5423 18.1917 14.0175 17.9844 13.4415 17.9844Z"
                  fill="#1A2F53"
                />
                <path
                  d="M15.9989 25.5996V30.7196L13.4389 28.7996L10.8789 30.7196V25.5996"
                  stroke="#1A2F53"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linejoin="round"
                />
                <path
                  d="M26.2411 2.55957H5.76109C5.40781 2.55957 5.12109 2.84629 5.12109 3.19957V28.7996C5.12109 29.1535 5.40781 29.4396 5.76109 29.4396H10.8811V28.1596V25.2559C10.0971 24.5525 9.60109 23.5356 9.60109 22.3996C9.60109 20.2793 11.3208 18.5596 13.4411 18.5596C15.5614 18.5596 17.2811 20.2799 17.2811 22.3996C17.2811 23.5343 16.7851 24.5525 16.0011 25.2559V28.1596V29.4396H26.2411C26.595 29.4396 26.8811 29.1535 26.8811 28.7996V3.19957C26.8811 2.84629 26.595 2.55957 26.2411 2.55957ZM22.4011 15.3596H9.60109V14.0796H22.4011V15.3596ZM22.4011 11.5196H9.60109V10.2396H22.4011V11.5196Z"
                  fill="#1A2F53"
                />
              </svg>
            </div>

            <p class="text-[15rem] leading-[130%] font-normal text-[#677B9E]">
              {{ $t("accridatsiya") }}
            </p>
          </div>
          <button
            class="absolute right-[20px] bottom-[-30px] learn-more-buttons text-[13rem] bg-[#1A2F53] text-[white] font-semibold hover:bg-[#fff] hover:text-[#1A2F53] hover:border-[#1A2F53]"
            @click="redirect"
          >
            {{ $t("syllabus") }}
          </button>
        </div>
        <div class="relative">
          <div
            class="opacity-[0.07] font-bold minion leading-[130%] text-[#1A2F53] text-[110px] left-[-40rem] top-[-32rem] sm:left-[-3rem] sm:top-[-26rem] sm:text-[60px] absolute"
          >
            {{ firstLetter }}
          </div>
          <div
            ref="textContent"
            class="!text-[15rem] leading-[160%] font-normal text-[#677B9E] mt-[70rem] content-styles regular-texts"
            v-html="data.content"
          ></div>
        </div>

        <div v-if="data?.collapses?.length" class="mt-[36rem]">
          <el-collapse v-model="accordionId" accordion class="questions mt-[12px]">
            <el-collapse-item v-for="item in data?.collapses" :key="item" :name="item">
              <template #title>
                <div class="w-full flex items-center justify-between gap-[10px]">
                  {{ item?.title }}
                  <Icon
                    name="modal_close_btn"
                    color="#1A2F53"
                    class="transition w-[18px] h-[18px] rotate-[45deg]"
                  />
                </div>
              </template>
              <div class="" v-html="item?.content"></div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <social-sharing class="mt-[44rem]" />
      </div>
      <div class="col-span-3 lg:col-span-12 lg:order-1 flex flex-col gap-[20px]">
        <SideBar />
      </div>
    </div>
    <div class="h-auto mb-[80px] mt-[20px]">
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
</template>
<script>
import SideBar from "@/components/side-bar/SideBar.vue";
export default {
  components: { SideBar },
  data() {
    return {
      data: undefined,
      pending: undefined,
      news: undefined,
      firstLetter: "",
      accordionId: 0,
    };
  },
  watch: {
    "$route.params.slug"() {
      this.getData();
    },
  },
  updated() {
    this.findFirstLetter();
  },
  created() {
    this.getData();
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  methods: {
    redirect() {
      this.$router.push(
        `/curricula/${this.$route.params.slug}/syllabus/${this.data?.name.split(" ").join("-")}`
      );
      this.$route.query = this.data?.name;
    },
    async getData() {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchProgramSingle", {
          slug: this.$route.params.slug,
        }),
      ])
        .then((res) => {
          this.data = res[0].value.data;
        })
        .finally(() => {
          this.pending = false;
        });
      await Promise.allSettled([
        this.$store.dispatch("fetchPost", {
          type: "news",
          limit: 8,
        }),
      ])
        .then((res) => {
          this.news = res[0].value.data.results;
        })
        .finally(() => {
          this.pending = false;
          this.$store.dispatch("setSlugTitle", this.data.name);
        });
    },
    returnUrl() {
      return (this.url = window.location.href);
    },
    findFirstLetter() {
      if (this.$refs.textContent) {
        let letter = this.$refs.textContent?.getElementsByTagName("p")[0]?.innerText;
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};«':\\|,".<>\/?~]/;
        this.char = 0;
        while (this.char < letter?.length) {
          if (specialChars?.test(letter?.charAt(this.char))) {
            this.char++;
          } else {
            this.firstLetter = letter?.charAt(this.char).toUpperCase();
            break;
          }
        }
      }
    },
  },
};
</script>
<style lang="scss">
.questions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: none;
  & .el-icon {
    display: none;
  }
  .el-collapse {
    display: flex;
    flex-direction: column;
    gap: 12px;
    &-item {
      //	border: 1.6px solid #E0E5EC;
      &.is-active {
        .rotate-\[45deg\] {
          transform: rotate(0deg);
          transition: all 0.35s ease-in-out;
        }
      }
    }
    &-item__wrap {
      border: none !important;
      & > div {
        padding: 12rem 24rem !important;
        font-size: 16rem;
        font-weight: 500;
        color: #677b9e;
      }
    }
    &-item__header {
      height: auto;
      background: #ffffff;
      font-weight: 500;
      font-size: 18rem;
      line-height: calc(22 / 18 * 100%);
      color: #1a2f53;
      padding: 12rem 24rem;
      border: none;
    }
  }
}

.content-styles {
  color: #1a2f53;

  h1 {
    font-weight: 600;
    font-size: 36rem;
    line-height: calc(44 / 36 * 100%);
    color: #1a2f53;
  }

  p {
    font-weight: 400;
    font-size: 15rem;
    line-height: 160%;
    color: #344666;
  }
}
</style>
<style scoped>
.el-collapse-item {
  border: 1.6px solid #e0e5ec !important;
}
</style>
