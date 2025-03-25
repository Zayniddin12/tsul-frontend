<template>
  <div class="container mt-[32rem] mb-[64rem]">
    <div class="grid grid-cols-12 mt-[32rem] gap-[24rem]">
      <div class="w-full col-span-9 -1245:col-span-12">
        <!--        <pre>{{ tableData }}</pre>-->
        <PageTitle :title="$t('education_program')" class="mb-[32px]" />
        <div v-if="pending" class="grid grid-cols-2 -750:grid-cols-1 gap-[45px] -750:gap-[30px]">
          <GoveringCardPr v-for="(item, index) in 2" :key="index" />
        </div>
        <div
          v-else-if="tableData && tableData.length"
          class="grid grid-cols-2 -750:grid-cols-1 gap-[45px] -750:gap-[30px]"
        >
          <GoveringCard
            v-for="(item, index) in tableData"
            :key="index"
            type="1"
            v-bind="{
              url: `/curricula/${item?.slug}`,
              title: item?.name,
              category: `${item?.name}`,
              fullName: item.category?.name,
            }"
          />
        </div>
        <NoData v-else />
      </div>
      <div class="col-span-3 lg:col-span-12 gap-[20px]">
        <side-bar :show-current-news="false" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pending: undefined,
      data: undefined,
      tableData: undefined,
      degree: this.$route.query.degree || "",
      active: this.$route.query.degree || "all",
      doctorantura: [],
      faculty: this.$route.query.faculty || "",
      bachelor: [],
      magister: [],
      items: [],
    };
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  async created() {
    this.pending = true;
    await Promise.allSettled([
      this.$store.dispatch("fetchEduProgramm", { degree: "", faculty: this.faculty }),
      // this.$store.dispatch("fetchEduProgramm", { degree: "phd", faculty: this.faculty }),
      this.$store.dispatch("fetchEduProgramm", { degree: "bachelor", faculty: this.faculty }),
      this.$store.dispatch("fetchEduProgramm", { degree: "master", faculty: this.faculty }),
    ])
      .then((res) => {
        this.tableData = res[0].value.data?.results?.filter(
          (item) => item.category?.name === "Тайёрлов курс" || item.category?.name === "Грант"
        );
        console.log(this.tableData);
      })
      .finally(() => {
        this.pending = false;
        this.$store.dispatch("setSlugTitle", this.$t("education_program"));
      });
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.router-link-exact-active {
  background: #2b5e9b;
  border: 1.6px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  transition: all 0.35s ease-in-out;
  i {
    position: relative;
    opacity: 1;
  }

  &:hover {
    opacity: 0.8;
  }
}
</style>
