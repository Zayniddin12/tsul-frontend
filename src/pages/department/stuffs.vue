<template>
  <div class="container mb-[64rem] mt-[20rem]">
    <div class="grid grid-cols-12 gap-[20rem]">
      <div class="col-span-9 lg:col-span-12">
        <PageTitle :title="$t('department_staff')" class="mt-[32rem] mb-[56rem]" />
        <div v-if="pending" class="">
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
            class="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-[26rem]"
        >
          <FacultyStuffs
              v-for="(item, index) in employee"
              :key="index"
              class="!w-full !my-[10rem]"
              v-bind="{
          fullName: item.first_name + ' ' + item.last_name + ' ' + (item?.middle_name || ''),
          desc: item?.category?.name,
          phone: item?.phone_number,
          mail: item?.email,
          gmail: item?.google_link,
          facebook: item?.facebook_link,
          linkedin: item?.linkedin_link,
          twitter: item?.twitter_link,
          instagram: item?.instagram_link,
          telegram: item?.telegram_link,
          link: `/department/${$route.params.id}/departmentStaff/` + item?.slug,
          img: item?.get_image?.origin,
          customClass: '-425:!m-0',
          clickable: false,
          slug: item?.slug,
        }"
          />
        </div>
        <NoData v-else />
        <div class="flex items-center justify-end mt-[24rem]">
          <Pagination :total="total" @current-page="page = $event" />
        </div>
      </div>
      <div class="col-span-3 lg:col-span-12">
        <SideBar/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CSideBar from '../../components/side-bar/SideBar.vue'

export default {
  data() {
    return {
      employee: [],
      total: undefined,
      page: 1,
      pending: false,
    };
  },

  computed: {
    ...mapState({
      faculty_emplyee: (state) => state.employee.employee,
    }),
  },
  watch: {
    async page() {
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
        })
        .catch((err) => {
          console.log(err);
        });

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },

  async created() {
    this.$store.dispatch("setSlugTitle", "departmentStaff");
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
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped></style>
