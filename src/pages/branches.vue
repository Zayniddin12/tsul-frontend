<template>
  <div class="container">
    <div class="grid grid-cols-12 gap-[24rem] mt-[32rem] mb-[67rem]">
      <div class="w-full col-span-9 -1245:col-span-12">
        <PageTitle :title="$t('branches')" class="mb-[32rem]" />

        <div
          v-if="pending"
          class="grid grid-cols-2 -700:grid-cols-1 gap-[24px] -960:gap-[18px] -700:gap-[12px]"
        >
          <BranchesCardPr v-for="(item, index) in 6" :key="index" />
        </div>
        <div
          v-else-if="!pending && branches.length"
          class="grid grid-cols-2 -700:grid-cols-1 gap-[24px] -960:gap-[18px] -700:gap-[12px]"
        >
          <BranchesCard
            v-for="(item, index) in branches"
            :key="index"
            v-bind="{
              location: item?.name,
              head: item.head,
              whose:
                item?.head?.first_name +
                ' ' +
                item?.head?.last_name +
                ' ' +
                item?.head?.middle_name,
              date: item?.work_date,
              phone: item?.phone_number,
              mail: item?.email,
              site: item?.web_site,
              url: item?.link,
            }"
          />
        </div>

        <NoData v-else />

        <Pagination
          v-if="total > 1"
          :total="total"
          class="mt-[32px]"
          @current-page="page = $event"
        />
      </div>
      <div class="w-full col-span-3 -1245:col-span-12">
        <SideBar />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NoData from "@/components/common/NoData.vue";
export default {
  components: { NoData },

  data() {
    return {
      pending: false,
      total: undefined,
      page: undefined,
      branches: [],
    };
  },
  computed: {
    ...mapState({
      branchData: (state) => state.branches.branches,
    }),
  },
  watch: {
    async page() {
      this.fetchBranches();

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },

  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  async created() {
    this.fetchBranches();
  },
  methods: {
    fetchBranches() {
      this.pending = true;
      this.$store
        .dispatch("fetchBranches", {
          page: this.page,
          limit: 8,
          type: "branchs",
        })
        .then(() => {
          this.branches = this.branchData.results;
          this.total = this.branchData.total_pages;
        })
        .finally(() => {
          this.pending = false;
          this.$store.dispatch("setSlugTitle", this.$t("branches"));
        });
    },
  },
};
</script>
