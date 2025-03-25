<template>
  <div class="container">
    <div class="grid grid-cols-12 gap-[24px] mb-[24px] my-[32rem]">
      <div class="col-span-9 lg:col-span-12">
        <div class="mb-[32px]">
          <page-title :title="$t('scientific_projects')" />
        </div>
        <div v-if="scientificPro && scientificPro.length">
          <div v-for="(item, index) in scientificPro" :key="index">
            <h4
              class="w-[80%] mt-[32px] mx-auto font-normal text-[#344666] text-[15rem] leading-[140%]"
            ></h4>
            <div class="w-full flex flex-wrap justify-between mt-[32px] items-center sm:mt-[12px]">
              <h5 class="text-[#1A2F53] font-bold text-[24rem] leading-[130%] minion">
                {{ item?.title }}
              </h5>
              <div class="relative">
                <input
                  v-model="search"
                  class="w-[300px] sm:w-[100%] pr-[45px] pl-[20px] py-[15px] h-[44px] border-[1.6px] border-solid text-[16rem] leading-[19px] duration-[150ms] focus:border-none text-[#1A2F53] placeholder:text-[#A7AFBD] border-[#E0E5EC]"
                  type="search"
                  :placeholder="$t('search_document')"
                />
                <icon
                  class="absolute right-[11px] top-[11px] sm:top-[12px] cursor-pointer"
                  name="header_search"
                />
              </div>
            </div>
            <div class="mt-[16px] overflow-y-auto">
              <el-table :data="item?.projects" class="table" style="width: 100%">
                <template #empty> {{ $t("no_information") }} </template>
                <el-table-column type="index" align="center" width="70px" label="#">
                </el-table-column>
                <el-table-column
                  v-slot="scope"
                  prop="shifr"
                  :label="$t('project_hash')"
                  align="left"
                  width="120px"
                >
                  {{ item?.projects[scope.$index]?.project_code }}
                </el-table-column>
                <el-table-column
                  v-slot="scope"
                  prop="name"
                  :label="$t('name_of_project')"
                  align="center"
                  width="490px"
                >
                  {{ item?.projects[scope.$index]?.project_name }}
                </el-table-column>
                <el-table-column
                  v-slot="scope"
                  prop="autor"
                  :label="$t('table_head_of_project')"
                  align="center"
                  width="205px"
                >
                  <div class="pr-[8px]">
                    {{ item.projects[scope.$index]?.project_author?.first_name }}
                    {{ item.projects[scope.$index]?.project_author?.last_name }}
                    {{ item.projects[scope.$index]?.project_author?.middle_name }}
                  </div>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div v-else>
          <no-data />
        </div>
      </div>

      <div class="col-span-3 lg:col-span-12">
        <SideBar />
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/common/PageTitle.vue";
export default {
  components: { PageTitle },
  data() {
    return {
      scientificProjectsTitle:
        "Samarqand Davlat universitetida ilmiy-tadqiqot ishlarini tashkil qilishda ularni davlat ilmiy-texnika dasturlariga mos kelishiga hamda ularning natijalari xalq xo‘jaligi, o‘quv jarayoniga qo‘llanilishiga asosiy e’tibor qaratilgan. Hozirgi vaqtda davlat ilmiy-texnika davlat dasturlari doirasida Respublika fan va texnologiyalarni rivojlanishning ustivor yo‘nalishlari bo‘yicha universitet olimlari tomonidan 17 ta fundamental, 2 ta amaliy va 1 ta innovatsion ilmiy loyihalari bajarilmoqda.",
      tableData: undefined,
      scientificPro: [],
      search: "",
      pending: false,
    };
  },

  watch: {
    search(key) {
      this.searchFunc(key);
    },
  },

  /// COMPUTED usulida v lyuvom sluchae

  // computed: {
  //   ...mapState({
  //     projects: (state) => state.scientificProjects.projects,
  //   }),
  // },

  async created() {
    this.getData();
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  methods: {
    async getData() {
      this.pending = true;
      await Promise.allSettled([this.$store.dispatch("fetchProjects", this.search)])
        .then((res) => {
          this.scientificPro = res[0].value.data;
        })
        .finally(() => {
          this.pending = false;
          this.$store.dispatch("setSlugTitle", this.$t("breadcrumb.scientific_projects"));
        });
    },
    searchFunc(key) {
      this.pending = true;
      Promise.allSettled([this.$store.dispatch("fetchProjects", key)])
        .then((res) => {
          this.scientificPro = res[0].value.data;
        })
        .finally(() => {
          this.pending = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
