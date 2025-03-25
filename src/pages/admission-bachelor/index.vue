<template>
  <div class="container mb-[64rem]">
    <div class="grid grid-cols-12 gap-[24px] mt-[32px] mb-[32px]">
      <div class="w-full col-span-9 -1245:col-span-12">
        <page-title :title="$t('admission_bachelor')" class="mb-[32rem]" />
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

        <div class="flex justify-center w-full">
          <div class="flex justify-center mb-[32rem] w-[80%] text-[#344666] text-[17px]">
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

        <h3 v-if="employeeData" class="text-[#1A2F53] text-[24px] mb-20 font-bold">
          {{ $t("admissions_committee") }}
        </h3>
        <el-table v-if="employeeData" :data="[employeeData]" style="width: 100%">
          <template #empty>{{ $t("no_information") }}</template>
          <el-table-column align="center" label="№" width="8px" height="59px">
            <template #default="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" :label="$t('admissions_name')" width="50px" height="59px">
            <template #default="{ row: scope }">
              {{ scope.first_name + " " + scope.last_name }}
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            :label="$t('admissions_responsibility')"
            width="100%"
            min-width="200px"
          >
            <template #default="{ row: scope }">
              <p v-html="scope.duty"></p>
            </template>
          </el-table-column>
        </el-table>

        <h3 class="text-[#1A2F53] text-[24px] mt-[50px] mb-[15px] font-bold">
          {{ $t("related_documents_and_files") }}
        </h3>

        <div
          v-for="(index, id) in slug?.documents"
          :key="id"
          class="w-full flex flex-col mb-[10px]"
        >
          <a
            download
            target="_blank"
            :href="index.document"
            class="p-[16px] border border-[#e5e6e6] group hover:bg-[#f7f6f6] cursor-pointer"
          >
            <p class="text-[#1A2F53] text-[16px]">{{ index.title }}</p>
            <div class="flex gap-[10px] justify-start mt-[5px]">
              <p class="text-[#677B9E] text-[13px] group-hover:brightness-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g opacity="0.5">
                    <path
                      d="M11.6654 1.66663H3.33203V18.3333H16.6654V6.66663L11.6654 1.66663ZM13.2679 14.7483C13.067 15.2216 12.6662 15.4241 12.1987 15.2891C11.7979 15.1541 11.3295 14.8158 10.862 14.2758C10.3945 14.3433 9.9262 14.4783 9.4587 14.6133C8.9237 15.5591 8.38953 16.37 7.85453 16.5725C7.72036 16.64 7.58703 16.6666 7.45286 16.6666C7.18536 16.6666 6.98536 16.5725 6.8512 16.37C6.71786 16.1675 6.45036 15.7616 6.98453 15.1541C7.3187 14.7483 8.12036 14.3433 8.98953 14.0733C9.25703 13.5325 9.45703 12.9925 9.65786 12.3841C9.19036 11.5058 8.92286 10.56 8.98953 10.0191C9.05703 9.47746 9.40036 9.16663 9.8587 9.16663C10.317 9.16663 10.5937 9.47746 10.7279 9.95079C10.8612 10.4916 10.7279 11.37 10.3937 12.3833C10.5945 12.7891 10.8612 13.1941 11.1287 13.5991C11.9304 13.5316 12.5987 13.5316 13.0004 13.8016C13.3345 14.005 13.4012 14.3425 13.2679 14.7483ZM10.832 7.49996V2.91663L15.4154 7.49996H10.832Z"
                      fill="#1A2F53"
                    />
                  </g>
                </svg>
              </p>
              <p class="text-[#677B9E] text-[13px] group-hover:text-[#2B5E9B]">
                {{ index.file_size }} KB
              </p>
            </div>
          </a>
        </div>
        <SocialSharing :views="slug?.view_count" class="mt-[20rem]" :custom-css="`w-[302rem]`" />
      </div>
      <div class="w-full col-span-3 -1245:col-span-12">
        <SideBar />
      </div>
    </div>
  </div>
</template>
<script>
export default {
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
      employeeName: [],
      employeeData: undefined,
      employeeResponsibility: [],
    };
  },
  watch: {
    $route() {
      this.fetchSlug();
      this.created();
    },
    slug() {
      if (this.slug) {
        this.counterFinished = Date.parse(this.slug?.event_date) > Date.parse(new Date());
      }
    },
  },
  created() {
    this.fetchSlug();
    this.created();
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  updated() {
    this.findFirstLetter();
  },
  methods: {
    showGalleryModal(index) {
      this.activeImage = index;
      this.showBox = true;
    },
    closeModal() {
      this.showBox = false;
    },
    async fetchSlug() {
      this.currentSlug = this.$route.params.slug;
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchPost", {
          type: "event",
          limit: 4,
        }),

        this.$store.dispatch("fetchPostSingle", {
          slug: "admission-to-bachelor",
        }),
      ])
        .then((res) => {
          this.events = res[0]?.value?.data?.results;
          this.slug = res[1]?.value?.data;
          if (this.slug !== undefined) {
            for (let i = 0; i < this.slug?.images.length; i++) {
              if (this.slug?.images.length) {
                this.images.push(this.slug?.images[i]?.get_image?.middle);
              }
            }
          }
        })
        .finally(() => {
          this.pending = false;
          this.$store.dispatch("setSlugTitle", "admission_bachelor");
        });
    },
    async created() {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchEmployee", {
          category: "qabul-komissar",
        }),
      ])
        .then((res) => {
          this.employeeData = res[0].value.data.results[0];
          console.log(res[0].value);
        })
        .finally(() => {
          this.pending = false;
        });
    },
    // methods: {first},

    findFirstLetter() {
      if (this.$refs.textContent) {
        let letter = this.$refs?.textContent.getElementsByTagName("p")[0]?.innerText;
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};«':\\|,".<>\/?~]/;
        this.char = 0;
        while (this.char < letter?.length) {
          if (specialChars.test(letter?.charAt(this.char))) {
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
