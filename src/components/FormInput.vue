<template>
  <form
    class="flex items-center justify-between -470:flex-col-reverse -470:gap-y-[12px] -670:!flex-col z-lower w-full"
    @submit.prevent=""
  >
    <div class="flex items-center gap-[20px] -470:w-full -768:flex-col !z-[2]">
      <!--      <pre>wdwd</pre> --------------------------------->
      <!--      <el-select-->
      <!--        v-if="isScientificWorks"-->
      <!--        v-model="filterResults.level"-->
      <!--        filterable-->
      <!--        :placeholder="$t('all_authors')"-->
      <!--        class="text-[15rem] -470:w-full !z-[2]"-->
      <!--      >-->
      <!--        <el-option :label="$t('all')" value=""> </el-option>-->
      <!--        <el-option-->
      <!--          v-for="(item, index) in levelOptions"-->
      <!--          :key="index"-->
      <!--          :label="item.first_name + ' ' + item.last_name"-->
      <!--          :value="item.slug"-->
      <!--        >-->
      <!--        </el-option>-->
      <!--        <div ref="observerTarget" style="overflow: hidden"></div>-->
      <!--      </el-select>-->
      <!--      <el-select-->
      <!--        v-if="isScientificWorks"-->
      <!--        v-model="filterResults.level"-->
      <!--        filterable-->
      <!--        :placeholder="$t('all_authors')"-->
      <!--        class="text-[15rem] -470:w-full !z-[2]"-->
      <!--      >-->
      <!--        <el-option :label="$t('all')" value=""> </el-option>-->
      <!--        <el-option-->
      <!--          v-for="(item, index) in levelOptions"-->
      <!--          :key="index"-->
      <!--          :label="item.first_name + ' ' + item.last_name"-->
      <!--          :value="item.slug"-->
      <!--        >-->
      <!--        </el-option>-->
      <!--      </el-select>-->
      <!--      <Pagination total="22" active-page="2"/>-->

      <el-select
        v-if="!isScientificWorks"
        v-model="filterResults.level"
        :placeholder="inputPlaceholder.selectInput"
        class="text-[15rem] -470:w-full w-[300px]"
      >
        <el-option v-if="levelOptions" :label="inputPlaceholder.name" value=""> </el-option>
        <el-option
          v-for="item in levelOptions"
          :key="item.id"
          :label="item.name"
          :value="item.slug"
        >
        </el-option>
      </el-select>
      <!--      <el-select-->
      <!--        v-if="!isScientificWorks"-->
      <!--        v-model="filterResults.faculty"-->
      <!--        :placeholder="inputPlaceholder.selectInput"-->
      <!--        class="text-[15rem] -470:w-full"-->
      <!--      >-->
      <!--        <el-option v-if="facultyOption" :label="$t('faculty')" value=""> </el-option>-->
      <!--        <el-option-->
      <!--          v-for="item in facultyOption"-->
      <!--          :key="item.id"-->
      <!--          :label="item.name"-->
      <!--          :value="item.slug"-->
      <!--        >-->
      <!--        </el-option>-->
      <!--      </el-select>-->
      <el-select
        v-if="isHaveCourse"
        v-model="filterResults.course"
        :placeholder="inputPlaceholder.group"
        class="text-[15rem] -470:w-full"
      >
        <el-option :label="$t('course')" value=""> </el-option>
        <el-option
          v-for="(item, index) in courseOptions"
          :key="index"
          :label="item.name"
          :value="item.slug"
        >
        </el-option>
      </el-select>
      <slot name="course"></slot>
    </div>
    <div
      class="flex-center-between focus:!ring-0 border-[#E0E5EC] focus-within:border-blue-600 focus:border-blue-600 -768:w-full h-[44px] border-[1.6px] transition-all"
    >
      <input
        v-model="filterResults.search"
        class="w-full h-full pl-[12px] leading-[19px] border-none font-[500] text-[#1A2F53] text-[14rem] placeholder:text-[#A7AFBD]"
        type="search"
        :placeholder="inputPlaceholder.search"
        autocomplete="on"
      />
      <icon class="pr-[12px]" name="header_search" />
    </div>
  </form>
</template>

<script>
import Pagination from "@/components/common/pagination.vue";
export default {
  name: "FormInput",
  components: { Pagination },
  props: {
    inputPlaceholder: Object,
    levelOptions: Array,
    courseOptions: Array,
    facultyOption: Array,
    filterResults: {
      level: String,
      course: String,
      search: String,
      faculty: String,
    },
    isScientificWorks: {
      type: Boolean,
      default: false,
    },
    isHaveCourse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
input[type="search"]:focus {
  --tw-ring-color: transparent;
  outline: none;
}
</style>

<!--<style lang="scss">-->
<!--.el-select {-->
<!--  .el-input {-->
<!--    &__inner {-->
<!--      background: #ffffff;-->
<!--      border: 1.6px solid #e0e5ec;-->
<!--      box-sizing: border-box;-->
<!--      padding: 12px;-->
<!--      height: 44px;-->
<!--      font-family: "Inter";-->
<!--      font-style: normal;-->
<!--      font-weight: 600;-->
<!--      font-size: 15rem;-->
<!--      line-height: 20px;-->
<!--      color: #1a2f53;-->
<!--      opacity: 1;-->
<!--      &:focus {-->
<!--        box-shadow: 0 0 0 1px steelblue inset !important;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--#el-id-5744-7 {-->
<!--  z-index: 2 !important;-->
<!--}-->
<!--</style>-->
