<template>
  <div v-if="dataEducation" class="bg-white pt-[48px] pb-[64px] sm:py-[24px]">
    <div class="container">
      <page-title :title="$t('education_program')" />
      <div class="grid grid-cols-12 gap-[24px] mt-[44px] sm:mt-[20px]">
        <div
          v-for="(item, index) in education"
          :key="index"
          class="education col-span-3 lg:col-span-6 sm:col-span-12"
        >
          <el-tooltip
            v-if="index === 2"
            class="tooltip-copy"
            placement="top"
            trigger="hover"
            :content="$t('doctoranture')"
          >
            <router-link
              class="bg-[#1A2F53] group duration-150 hover:bg-[#2E4B7C] flex h-[52px] py-[12px] sm:py-[10px] px-[14px] items-center border border-[#4D6690] justify-between cursor-pointer"
              :to="item.url"
            >
              <div class="flex items-center">
                <icon :name="item.icon" />
                <p
                  class="ml-[12px] not-italic font-bold text-[20rem] leading-[28px] minion text-white line-clamp-1"
                >
                  {{ item.title }}
                </p>
              </div>
              <icon class="group-hover:translate-x-1 duration-150" name="arrow_right_button" />
            </router-link>
          </el-tooltip>
          <router-link
            v-else
            class="bg-[#1A2F53] group duration-150 hover:bg-[#2E4B7C] flex h-[52px] py-[12px] sm:py-[10px] px-[14px] items-center border border-[#4D6690] justify-between cursor-pointer"
            :to="item.url"
          >
            <div class="flex items-center">
              <icon :name="item.icon" />
              <p
                class="ml-[12px] not-italic font-bold text-[20rem] leading-[28px] minion text-white line-clamp-1"
              >
                {{ item.title }}
              </p>
            </div>
            <icon class="group-hover:translate-x-1 duration-150" name="arrow_right_button" />
          </router-link>
        </div>
      </div>

      <div class="bg-[#E0E5EC] h-[1.6px] w-full mx-auto mt-[32px] mb-[40px] -540:mb-[20px]"></div>

      <div
        v-if="
          dataEducation.statistic_global_rating ||
          dataEducation.statistic_total_student_number ||
          dataEducation.statistic_total_teacher_number ||
          dataEducation.statistic_educational_degree
        "
      >
        <div v-if="pending" class="grid grid-cols-4 gap-[24px] -1068:grid-cols-3 -855:grid-cols-2">
          <FacultyStaticPr v-for="item in 4" :key="item" />
        </div>

        <div
          v-else
          class="grid grid-cols-4 gap-[24px] -1068:grid-cols-3 -855:grid-cols-2 -500:gap-[12px]"
        >
          <FacultyStatic
            v-if="dataEducation.statistic_global_rating"
            class="!px-[24rem]"
            bg-color="!px-[24rem]"
            v-bind="{
              icon: 'gratis',
              count: dataEducation.statistic_global_rating,
              desc: $t('international_rating'),
              color: 'transparent',
              pending: pending,
              bgColor: 'bg-[#F5F6FA]',
            }"
          />
          <FacultyStatic
            v-if="dataEducation.statistic_total_student_number"
            class="!px-[24rem]"
            v-bind="{
              icon: 'bok',
              count: dataEducation.statistic_total_student_number,
              desc: $t('number_of_students'),
              color: 'transparent',
              pending: pending,
              bgColor: 'bg-[#F5F6FA]',
            }"
          />
          <FacultyStatic
            v-if="dataEducation.statistic_total_teacher_number"
            class="!px-[24rem]"
            v-bind="{
              icon: 'persons',
              count: dataEducation.statistic_total_teacher_number,
              desc: $t('total_workers'),
              color: 'transparent',
              pending: pending,
              bgColor: 'bg-[#F5F6FA]',
            }"
          />
          <FacultyStatic
            v-if="dataEducation.statistic_educational_degree"
            class="!px-[24rem]"
            v-bind="{
              icon: 'hat',
              count: dataEducation.statistic_educational_degree,
              desc: $t('scientific_potential'),
              color: 'transparent',
              pending: pending,
              bgColor: 'bg-[#F5F6FA]',
            }"
          />
        </div>
      </div>
      <a
        target="_blank"
        :href="link360 ? link360 : 'https://uzbekistan360.uz/ru/location/tashkentskij-gosudarstvennyj-yuridicheskij-universitetRIb' "
        class="mt-[40px] -540:mt-[24px] w-full h-[318px] sm:h-[250px] cursor-pointer rounded-sm overflow-hidden relative group block"
      >
        <img
          class="absolute inset-0 h-full w-full duration-150 object-cover group-hover:blur-[1px]"
          src="@/static/img/map-of-city.webp"
          alt="education"
        />
        <div class="absolute inset-0 bg-[#1a2f5350] bg-opacity-75"></div>
        <div class="flex flex-col h-full items-center justify-center relative">
          <icon name="deg_360" />
          <p
            class="not-italic font-medium text-[18rem] leading-[22px] text-white duration-300 group-hover:text-[20rem]"
          >
            {{ $t("to_virtual_tour") }}
          </p>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    dataEducation: {
      type: Array,
      default: () => [],
    },
    pending: {
      type: Boolean,
      deafult: false,
    },
    link360: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      establishedYear: this.$t("established_year"),
      totalStudents: 5820,
      totalWorkers: 158,
      education: [
        {
          title: this.$t("bachelor"),
          icon: "bachelor",
          url: "/curricula?degree=bachelor",
        },
        {
          title: this.$t("magister"),
          icon: "magister",
          url: "/curricula?degree=masters",
        },
        {
          title: this.$t("doctoranture"),
          icon: "doctoranture",
          url: "/curricula?degree=phd",
        },
        {
          title: this.$t("short_course"),
          icon: "education_programs",
          url: "/department/short-course",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-est-uni {
  background-image: url("@/static/img/bg-est-uni.png");
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: 100px;
}

.bg-student {
  background-image: url("@/static/img/bg-student.png");
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: 100px;
}

.bg-success {
  background-image: url("@/static/img/bg-success.png");
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: 100px;
}

.bg-worker {
  background-image: url("@/static/img/bg-worker.png");
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: 100px;
}

.bgd-blue {
  background-color: #1a2f5350;
}
</style>
