<template>
  <div>
    <div class="container">
      <div class="grid grid-cols-12 gap-[24px]">
        <div class="col-span-9 lg:col-span-12">
          <div class="mt-[32rem] mb-[32rem]">
            <page-title :title="$t('list_of_clubs_department')" />
          </div>
          <div class="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-[24rem] mb-[24rem]">
            <div v-for="(item, index) in data" :key="index">
              <scientific-schools-pre v-if="pending" />
              <router-link v-else :to="`/department/scientific-schools/${item.slug}`">
                <ScientificSchools
                  :title="item?.name"
                  :teacher="`${item?.head?.first_name ?? ''} ${item?.head?.last_name ?? ''}`"
                  :full-name="item?.name"
                />
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-span-3 lg:col-span-12 my-[32rem] lg:mt-[0]"><SideBar /></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: undefined,
      pending: undefined,
      options: {
        rewind: true,
        gap: "20rem",
        perPage: 6,
        arrows: false,
        pagination: false,
        // type: "loop",
        breakpoints: {
          1120: {
            perPage: 6,
            perMove: 1,
          },
          860: {
            perPage: 4,
            perMove: 1,
          },
          600: {
            perPage: 3,
            perMove: 1,
          },
          400: {
            perPage: 2,
            perMove: 1,
          },
        },
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchScientificSchools", {
          faculty: "",
        }),
      ])
        .then((res) => {
          this.data = res[0].value.data.results;
        })
        .finally(() => {
          this.pending = false;
          this.$store.dispatch("setSlugTitle", this.$t("scientific_schools"));
        });
    },
  },
};
</script>

<style lang="scss"></style>
