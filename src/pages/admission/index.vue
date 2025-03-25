<template>
  <div class="container">
    <div v-if="admissionTopData && employeeData" class="grid grid-cols-12 gap-[24px] mb-[60px]">
      <div class="col-span-9 -1024:col-span-12">
        <page-title :title="admissionTopData.title" class="mb-[32rem]" />
        <router-link
          to="admission/tsul-afld-contest-2024-mamuriy-huquq-fanidan-otkazilayotgan-respublika-olimpiadasiga-royxatdan-otish-boshlandi"
        >
          <!--          <img src="https://picsum.photos/500" alt="" class="h-[523px] object-cover w-full" />-->
        </router-link>
        <div class="text-[16rem]" v-html="admissionTopData?.content"></div>
        <div class="my-[24px]">
          <p v-if="employeeData" class="text-[24px] font-bold font-minion my-[12rem]">
            {{ $t("admissions_committee") }}
          </p>
          <el-table v-if="employeeData" :data="[employeeData]" style="width: 100%">
            <template #empty>{{ $t("no_information") }}</template>
            <el-table-column align="center" label="№" width="8px" height="59px">
              <template #default="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" :label="$t('admissions_name')" width="50px" height="59px">
              <template #default="{ row: scope }">
                {{ scope.first_name + " " + scope.last_name }}
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              :label="$t('admissions_responsibility')"
              width="100%"
              min-width="200px"
            >
              <template #default="{ row: scope }">
                <p v-html="scope.duty"></p>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="col-span-3 -1024:col-span-12 bg-green-400">
        <SideBar />
      </div>
    </div>
    <div v-else>
      <NoData />
    </div>
  </div>
</template>

<script>
import { first } from "lodash-es";

export default {
  data() {
    return {
      admissionTopData: undefined,
      employeeName: [],
      employeeData: undefined,
      employeeResponsibility: [],
      firstName: "",
      lastName: "",
    };
  },
  beforeUnmount() {
    this.$store.dispatch("setSlugTitle", "");
  },
  async created() {
    this.pending = true;
    await Promise.allSettled([
      this.$store.dispatch("fetchSinglePages", { slug: "qabul" }),
      this.$store.dispatch("fetchEmployee", {
        category: "qabul-komissar",
      }),
    ])
      .then((res) => {
        console.log(res);
        this.admissionTopData = res[0].value.data;
        this.employeeData = res[1].value.data.results[0];
        this.$store.dispatch("setSlugTitle", this.admissionTopData.title);
      })
      .finally(() => {
        this.pending = false;
      });
  },
  methods: { first },
};
</script>

<style lang="scss" scoped></style>
