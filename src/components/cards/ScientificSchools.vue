<template>
  <div
    class="px-[28rem] py-[20rem] block bg-[#fff] border-[1.6px] border-[#E0E5EC] h-[152px] relative scientific-schools hover:bg-[#F5F6FA] transition duration-300"
    :class="{ _loading: pending }"
  >
    <div class="h-[100%] w-[100%] flex justify-between flex-col">
      <h2
        :class="{ _loading: pending }"
        class="text-[24rem] font-bold minion leading-[130%] text-[#1A2F53] line-clamp-2"
      >
        {{ title }}
      </h2>
      <div>
        <h5
          :class="{ _loading: pending }"
          class="mb-[2px] font-semibold text-[12rem] leading-[130%] text-[#677B9E] opacity-80 line-clamp-1"
        >
          {{ teacher }}
        </h5>
        <h6
          :class="{ _loading: pending }"
          class="font-normal !text-[12rem] leading-[130%] !text-[#677B9E] opacity-80 line-clamp-1 !list-none"
          v-html="duty"
        >

        </h6>
      </div>
      <img
        src="@/static/img/stuffs.svg"
        class="w-[145px] h-[135px] absolute right-0 bottom-0"
        alt="scientific-school"
      />
    </div>
  </div>
</template>

<script>
export default {
  link: {
    type: String,
    default: "",
  },
  props: {
    category: {
      type: String,
      default: "",
    },
    duty: {
      type: String,
      default: ""
    },
    link: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
    },
    fullName: {
      type: String,
    },
    title: {
      type: String,
    },
    teacher: {
      type: String,
    },
    pending: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.scientific-schools {
  .icon {
    height: 145px;
    svg {
      path {
        fill-opacity: 1 !important;
      }
    }
  }
}
</style>
