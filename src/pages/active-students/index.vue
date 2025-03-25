<template>
  <div class="!mb-[46rem]">
    <!--workers  -->
    <div class="mt-[48rem]">
      <div v-if="employee && employee.length" class="container -425:!p-0 mt-[38px]">
        <PageTitle :title="$t('active-students')" />
        <div
          v-if="false"
          class="grid grid-cols-2 -856:grid-cols-1 mt-[56px] gap-x-[24px] gap-y-[56px]"
        >
          <FacultyStuffsPr v-for="(item, index) in 5" :key="index" class="" />
        </div>
        <div v-else class="grid grid-cols-2 -856:grid-cols-1 mt-[56px] gap-x-[24px] gap-y-[56px]">

          <FacultyStuffs
            v-for="(item, index) in employee"
            :key="index"
            class="-425:hidden"
            v-bind="{
              fullName: item.first_name + ' ' + item.last_name + ' ' + (item?.middle_name || ''),
              desc: item?.category?.name,
              phone: formatPhoneNumber(item.phone_number),
              mail: item?.email,
              gmail: item?.google_link,
              facebook: item?.facebook_link,
              linkedin: item?.linkedin_link,
              link: '/active-students/' + item?.slug,
              img: item?.get_image?.origin,
            }"
          />

          <div class="hidden -425:block">
            <Splide :options="options">
              <SplideSlide v-for="(item, index) in employee" :key="index">
                <FacultyStuffs
                  v-bind="{
                    fullName:
                      item.first_name + ' ' + item.last_name + ' ' + (item?.middle_name || ''),
                    desc: item?.category?.name,
                    phone: item?.phone_number,
                    mail: item?.email,
                    gmail: item?.google_link,
                    facebook: item?.facebook_link,
                    linkedin: item?.linkedin_link,
                    link: '/scientist/' + item?.slug,
                    img: item?.get_image?.origin,
                    slider: true,
                  }"
                />
              </SplideSlide>
            </Splide>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employee: [],
      pending: false,
    };
  },

  async created() {
    this.pending = true;
    await Promise.allSettled([
      this.$store.dispatch("fetchEmployee", {
        limit: 20,
        page: 1,
        category: "talaba",
      }),
    ])
      .then((res) => {
        this.employee = res[0]?.value.data.results;
        console.log(this.employee);
      })
      .finally(() => {
        this.pending = false;
        this.$store.dispatch("setSlugTitle", "active-students");
      });
  },
  methods: {
    formatPhoneNumber(number) {
      const format = number
        ?.replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
      return `+${format && format[1] ? format[1] : ""} (${format && format[2] ? format[2] : ""})

          ${format && format[3] ? format[3] : ""}-${format && format[4] ? format[4] : ""}-${
  format && format[5] ? format[5] : ""
}`;
    },
  },
};
</script>

<style lang="scss">
.scientific-schools-slider {
  .splide__arrow--prev {
    left: -15px;
  }

  .splide__arrow--next {
    right: -15px;
  }
}

.pagination-kafedra {
  .btn-prev {
    background: transparent is-first;
  }
  .btn-next {
    background: transparent !important;
  }
  .is-first {
    background: transparent !important;
  }
  .is-last {
    background: transparent !important;
  }

  .active {
    background: #fff !important;
    border: 1.6px solid #e0e5ec;
  }
  .number {
    :focus-visible {
      background: #fff !important;
      border: 1.6px solid #e0e5ec;
    }
  }
}

.table-kafedra {
  .el-table--border .el-table__cell {
    border-right: none !important;
  }
  tr {
    border: 1.6px solid red !important;
  }

  tr:nth-child(even) {
    background: #fff;
  }
  tr:nth-child(odd) {
    background: #f5f6fa;
  }
}
</style>
