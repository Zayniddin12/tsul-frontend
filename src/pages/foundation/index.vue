<template>
  <div class="container my-[48rem]">
    <div class="grid grid-cols-12 gap-[24px] mb-[32px]">
      <div class="col-span-9 lg:col-span-12">
        <div v-if="tutor?.length" class="pb-[48rem]">
          <page-title class="mb-[32rem]" :title="$t('allCourses')" />
          <div class="grid grid-cols-12 gap-[24px] -580:gap-[14px]">
            <div
              v-for="(item, index) in tutor"
              :key="index"
              class="col-span-6 -580:col-span-12 cursor-pointer"
            >
              <router-link :to="`/foundation/${item?.slug}`">
                <scientific-schools
                  :slug="item?.slug"
                  :title="item?.name"
                  :teacher="
                    item?.head?.first_name +
                    ' ' +
                    item?.head?.last_name +
                    ' ' +
                    item?.head?.middle_name
                  "
                  :full-name="item?.fullName"
                  :duty="item?.head?.duty"
                />
              </router-link>
            </div>
          </div>

          <Pagination class="mt-[24px]" :total="total" @current-page="page = $event" />
        </div>
      </div>

      <div class="col-span-3 lg:col-span-12">
        <SideBar />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      tutor: [],
      total: 0,
      page: 1,
      limit: 14,
    };
  },

  computed: {
    ...mapState({
      foundation: (state) => state.foundation.foundation,
    }),
  },

  watch: {
    page() {
      this.$store
        .dispatch("fetchFoundation", {
          category: "tutors",
          limit: this.limit,
          page: this.page,
        })
        .then((res) => {
          this.tutor = res?.data?.results;
        });

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },

  async created() {
    await Promise.allSettled([
      this.$store.dispatch("fetchFoundation", {
        category: "tutors",
        limit: this.limit,
        page: this.page,
      }),
    ]).then((res) => {
      this.tutor = res[0]?.value?.data?.results;
      this.total = res[0]?.value?.data?.total_pages;
    }).finally(()=>{
      this.$store.dispatch("setSlugTitle", "foundation");
    })
  },
};
</script>
