<template>
  <div>
    <PageTitle class="my-[32px]" :title="$t('council_members')" />
    <div class="container mb-[64px]">
      <div class="grid grid-cols-12 gap-[24px]">
        <div class="col-span-9 lg:col-span-12">
          <div class="container">
            <div v-if="pending" class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[26rem]">
              <YoungScientistsPr v-for="(item, index) in 6" :key="index" />
            </div>

            <div v-else class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[26rem]">
              <YoungScientists
                v-for="item in employee"
                :key="item"
                v-bind="{
                  type: '2',
                  scientist: {
                    id: item.id,
                    name:
                      item?.last_name + ' ' + item?.first_name + ' ' + (item?.middle_name || ''),
                    text: item.description,
                    image: item?.get_image?.middle,
                    slug: item.slug,
                  },
                }"
              />
            </div>
            <div v-if="employee && employee.length < 1 && !pending">
              <NoData />
            </div>
          </div>
          <Pagination class="mt-[24px]" :total="total" @current-page="page = $event" />
        </div>
        <div class="col-span-3 lg:col-span-12">
          <SideBar />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/common/PageTitle.vue";
import Pagination from "@/components/common/pagination.vue";
export default {
  components: { PageTitle, Pagination },
  data() {
    return {
      employee: [],
      total: undefined,
      page: 1,
      pending: false,
      employeeLevel: "all",
    };
  },
  watch: {
    async page() {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchEmployee", {
          page: this.page,
          limit: 9,
          foundation: this.$route.query.slug,
        }),
      ])
        .then((res) => {
          this.employee = res[0].value.data.results;
          this.total = res[0].value.data.total_pages;
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        })
        .finally(() => {
          this.pending = false;
        });

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  created() {
    this.getData();
  },

  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },

  methods: {
    async getData() {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchEmployee", {
          page: this.page,
          limit: 9,
          foundation: this.$route.query.slug,
        }),
      ])
        .then((res) => {
          this.employee = res[0].value.data.results;
          this.total = res[0].value?.data?.total_pages;
        })
        .finally(() => {
          this.pending = false;
        });
    },
  },
};
</script>
