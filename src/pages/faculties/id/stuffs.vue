<template>
  <div class="container mb-[64rem]">
    <PageTitle :title="$t('faculty_staff')" class="mt-[32rem] mb-[56rem]" />

    <div v-if="pending" class="grid grid-cols-2 -926:grid-cols-1 gap-x-[24rem] gap-y-[56rem]">
      <FacultyStuffsPr
        v-for="(item, index) in 5"
        :key="index"
        class="!w-full"
        v-bind="{
          fullName: 'ASADBEK ESHBOEV SHAVKATOVICH',
          desc: 'Toshkent davlat yuridik universitetining moliya-iqtisod ishlari bo‘yicha prorektori vazifasini bajaruvchi',
          phone: '(+998 99) 022-24-13',
          mail: 'a.eshboev@tsul.uz',
          gmail: 'https://google.com',
          facebook: 'https://google.com',
          linkedin: 'https://google.com',
          link: '/',
          img: '',
          customClass: '-425:!m-0',
        }"
      />
    </div>

    <div
      v-else-if="employee && employee.length"
      class="grid grid-cols-2 -926:grid-cols-1 gap-x-[24rem] gap-y-[56rem]"
    >
      <FacultyStuffs
        v-for="(item, index) in employee"
        :key="index"
        class="!w-full"
        v-bind="{
          fullName: getFullName(item),
          desc: item?.category?.name,
          phone: item?.phone_number,
          mail: item?.email,
          gmail: item?.google_link,
          facebook: item?.facebook_link,
          linkedin: item?.linkedin_link,
          link: `/faculties/${$route.params?.id}/${item?.slug}`,
          img: item?.get_image?.origin,
          customClass: '-425:!m-0',
          clickable: false,
        }"
      />
    </div>

    <NoData v-else />
    <div class="flex items-center justify-end mt-[24rem]">
      <Pagination :total="total" @current-page="page = $event" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      employee: [],
      total: undefined,
      page: 1,
      pending: false,
      count: false,
    };
  },
  computed: {
    ...mapState({
      faculty_emplyee: (state) => state.employee.employee,
    }),
  },
  watch: {
    async page() {
      if (this.count) {
        this.pending = true;
        await this.$store
          .dispatch("fetchEmployee", {
            faculty: this.$route.params.id,
            limit: "",
            page: this.page,
            category: "",
          })
          .then(() => {
            this.employee = this.faculty_emplyee;
          })
          .finally(() => {
            this.pending = false;
          });

        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
  },
  async created() {
    this.$store.dispatch("setSlugTitle", "stuffs");
    this.count = true;
    this.pending = true;
    await Promise.allSettled([
      this.$store.dispatch("fetchEmployee", {
        faculty: this.$route.params.id,
        limit: "",
        page: this.page,
        category: "",
      }),
    ])
      .then((res) => {
        this.employee = res[0].value.data.results;
        this.total = res[0].value.data.total_pages;
      })
      .finally(() => {
        this.pending = false;
      });
  },
  methods: {
    getLink(category, slug) {
      if (
        category == "fakultet-dekani" ||
        category == "Kafedra  rahbari" ||
        category == "Kafedra rahbari"
      ) {
        return `/management/${slug}`;
      } else if (category === "yosh") {
        return `/scientist/${slug}`;
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
