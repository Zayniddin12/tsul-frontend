<template>
  <div class="container mb-[64rem] menegment">
    <div class="grid grid-cols-12 gap-[5px]">
      <div v-if="pending" class="col-span-9 lg:col-span-12 lg:order-2 grid gap-[26px]">
        <management-card-pr v-for="item in 6" :key="item" />
      </div>
      <div class="col-span-9 lg:col-span-12">
        <page-title :title="$t('management')" class="my-[32px]" />
        <div v-if="!pending && management && management.length">
          <management-card
            v-for="item in management"
            :key="item"
            v-bind="{
              user:item,
              management: {
                id: item.id,
                img: item?.get_image?.middle,
                name: item.first_name + ' ' + item.last_name + ' ' + (item.middle_name ?? ''),
                work: item.description,
                time: item.work_date,
                phone: item.phone_number,
                email: item.email,
                slug: item?.slug,
                category: item.category.slug,
                facebook: item.facebook_link,
                linkedin: item.linkedin_link,
                google: item.google_link,
              },
            }"
          />
        </div>
        <div v-else>
          <no-data />
        </div>

        <Pagination class="mt-[24px]" :total="total" @current-page="page = $event" />
      </div>
      <!-- side bar starts -->
      <div class="col-span-3 lg:col-span-12 my-[32px]">
        <SideBar />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/common/pagination.vue";
export default {
  components: { Pagination },
  data() {
    return {
      page: this.$route.query.page || 1,
      pending: true,
      management: [],
      total: undefined,
    };
  },

  watch: {
    async page() {
      this.pending = true;
      this.$router.push({
        path: this.$route.path,
        query: {
          page: this.page
        }
      })
      await Promise.allSettled([
        this.$store.dispatch("fetchEmployee", {
          category: "001,002",
          ordering: "category__id",
          limit: 6,
          page: this.page,
        }),
      ])
        .then((res) => {
          this.management = res[0]?.value?.data?.results;
        })
        .finally(() => (this.pending = false));
      this.scrollToTop();
    },
  },

  mounted() {
    this.getData();
    this.scrollToTop();
  },

  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },

  methods: {
    async getData() {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchEmployee", {
          category: "001,002",
          ordering: "category__id",
          limit: 6,
          page: this.page,
        }),
      ])
        .then((res) => {
          this.management = res[0]?.value?.data?.results;
          this.total = res[0]?.value?.data?.total_pages;
        })
        .finally(() => {
          this.$store.dispatch("setSlugTitle", this.$t("breadcrumb.management"));
          setTimeout(() => (this.pending = false), 100);
        });
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style lang="scss"></style>
