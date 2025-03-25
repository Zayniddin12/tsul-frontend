<template>
  <div>
    <div class="container">
      <div class="grid grid-cols-12 gap-[24px]">
        <div class="col-span-9 md:col-span-12">
          <div class="mt-[32px]">
            <page-title :title="$t('encourage_social_activities')" />
          </div>
          <div class="mt-[24px]">
            <img src="@/static/img/main-slider.png" alt="student-image" />
          </div>

          <div class="mt-[-115px] md:mt-0">
            <div v-if="false">
              <NewsSingleHeadPr
                :tag="data.tag"
                :telegram="data.telegram"
                :twitter="data.twitter"
                :instagram="data.instagram"
                :facebook="data.facebook"
                :title="data.title"
              />
            </div>

            <div v-else>
              <NewsSingleHead
                :tag="data.tag"
                :telegram="data.telegram"
                :twitter="data.twitter"
                :instagram="data.instagram"
                :facebook="data.facebook"
                :title="data.title"
              />
            </div>
          </div>

          <div class="relative w-[80%] mx-auto">
            <div v-if="false">
              <h4
                class="_loading text-[#677B9E] font-normal text-[15rem] sm:text-[12rem] leading-[150%] mt-[24px]"
              >
                TDYUUda tashkil etiladigan tanlov va bayram tadbirlari hamda
              </h4>
              <h4
                class="_loading text-[#677B9E] font-normal text-[15rem] sm:text-[12rem] leading-[150%] mt-[12px]"
              >
                TDYUUda tashkil etiladigan tanlov va bayram tadbirlari hamda
              </h4>
            </div>
            <h4
              v-else
              class="text-[#677B9E] font-normal text-[15rem] sm:text-[12rem] leading-[150%] mt-[24px]"
            >
              TDYUUda tashkil etiladigan tanlov va bayram tadbirlari hamda muhim sanalarni tashkil
              etishda, universitet va talabalar hayoti bilan bevosita bog‘liq tadbirlarda ijtimoiy
              faollik ko‘rsatgan talabalarni hamda volontyor talabalarni tegishli va munosib
              rag‘batlantirish maxsus tashkil etilgan talabalarni rag‘batlantirish jamg‘armasi
              tomonidan maʼlum miqdordagi mul mukofotlari bilan taqdirlash orqali amalga oshiriladi.
            </h4>
            <div class="absolute w-[100px] h-[100px] top-[-4px] left-[-40px]">
              <img src="@/static/img/T-letter.png" alt="students-image" />
            </div>

            <img
              class="w-full object-cover mt-[24px]"
              src="@/static/img/ijtimiy-faoliyat.png"
              alt="students-image"
            />
          </div>

          <div class="mt-[16px]">
            <el-table :data="tableData" style="width: 100%">
              <template #empty> {{ $t("no_information") }} </template>

              <el-table-column type="index" align="center" width="70px" :index="indexMethod">
              </el-table-column>
              <el-table-column
                v-for="(item, index) in columns"
                :key="index"
                :width="item.width"
                :align="item.align"
                :prop="item.prop"
                :label="item.label"
              />
            </el-table>
          </div>

          <div class="my-[64px]">
            <!--            <social-sharing />-->
          </div>
        </div>

        <div class="col-span-3 lg:col-span-12">
          <SideBar />
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
      tableData: [
        {
          name: "13.00.00 ",
          responsibility:
            "Fuqarolik huquqi. Tadbirkorlik huquqi. Oila huquqi. Xalqaro xususiy huquq.",
        },
        {
          name: "32.00.00 ",
          responsibility:
            "Fuqarolik huquqi. Tadbirkorlik huquqi. Oila huquqi. Xalqaro xususiy huquq.",
        },
        {
          name: "12.00.00 ",
          responsibility:
            "Fuqarolik huquqi. Tadbirkorlik huquqi. Oila huquqi. Xalqaro xususiy huquq.",
        },
        {
          name: "42.00.00 ",
          responsibility:
            "Fuqarolik huquqi. Tadbirkorlik huquqi. Oila huquqi. Xalqaro xususiy huquq.",
        },
        {
          name: "13.00.00 ",
          responsibility:
            "Fuqarolik huquqi. Tadbirkorlik huquqi. Oila huquqi. Xalqaro xususiy huquq.",
        },
        {
          name: "32.00.00 ",
          responsibility:
            "Fuqarolik huquqi. Tadbirkorlik huquqi. Oila huquqi. Xalqaro xususiy huquq.",
        },
      ],
      columns: [
        {
          prop: "name",
          label: this.$t("time"),
          align: "center",
          width: "180px",
        },
        {
          prop: "responsibility",
          label: this.$t("admissions_responsibility"),
          align: "center",
          width: "680px",
        },
      ],
      data: {
        title:
          "Davlat rahbari Yuridik Universitetiga tashrifi davomida Rahbariyatga qator vazifalar yukladi va o‘z nazoratiga oldi",
        tag: "Dolzarb",
        telegram: "adsadada",
        twitter: "asdas",
        facebook: "asda",
        instagram: "asdsa",
      },
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state,
    }),
  },
  mounted() {
    this.$store.dispatch("setSlugTitle", "student_life");
    console.log(this.isLoading);
  },
};
</script>

<style lang="scss"></style>
