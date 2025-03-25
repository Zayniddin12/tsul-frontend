<template>
  <div class="container mb-[64rem]">
    <div>
      <div class="grid grid-cols-12 gap-[24px]">
        <div class="col-span-9 lg:col-span-12">
          <div class="mt-[32rem] mb-[32rem]">
            <page-title :title="$t('subjects_taught')" />
          </div>

          <div
            v-if="data && data.length"
            class="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-[24rem] mb-[24rem]"
          >
            <div v-for="(item, index) in data" :key="index">
              <subjects-card-pr v-if="pending" />
              <subjects-card
                v-else
                :slug="item.slug"
                :title="item.description" :tag="item.name"
              />
            </div>
          </div>
        </div>
        <div class="col-span-3 lg:col-span-12 mt-[119rem] lg:mt-[0]">
          <SideBar :show-current-news="false" :show-rector-appeal="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      options: {
        rewind: true,
        gap: "20rem",
        perPage: 6,
        arrows: false,
        pagination: false,
        type: "loop",
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
      data: undefined,
      pending: undefined,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.pending = true;
      await Promise.allSettled([
        this.$store.dispatch("fetchSubject", {
          type: "Subjects",
        }),
      ])
        .then((res) => {
          this.data = res[0].value.data.results
        })
        .finally(() => {
          this.pending = false;
        });
    },
  }
};
</script>

<style lang="scss"></style>
