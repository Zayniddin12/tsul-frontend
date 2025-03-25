<template>
  <a :href="link" :download="link" target="_blank" class="report-card group">
    <img v-if="img" :src="img" class="w-full h-[230rem] object-cover object-center" alt="report" />
    <img
      v-else
      src="@/static/img/default.svg"
      class="w-full h-[230rem] object-cover object-center"
      alt="report"
    />
    <div
      class="py-[24rem] px-[20rem] h-[167rem] bg-white border-x-[1.6px] border-b-[1.6px] transition group-hover:bg-[#F5F6FA] border-[#E0E5EC]"
    >
      <div class="flex items-center gap-[8rem] mb-[12rem]">
        <h6
          v-if="lang"
          class="not-italic line-clamp-1 max-w-[30rem] font-semibold text-[12rem] leading-[130%] uppercase text-[#2B5E9B] underline"
        >
          {{ lang.slice(0, 2) }}
        </h6>
        <div v-if="lang && file" class="!bg-[#1A2F53] rounded-full w-[4rem] h-[4rem]"></div>
        <a v-if="file" :href="file">
          <icon name="adobe" />
        </a>
        <div v-if="size" class="!bg-[#1A2F53] rounded-full w-[4rem] h-[4rem]"></div>
        <h6
          v-if="size"
          class="not-italic group-hover:text-[#2B5E9B] font-semibold text-[12rem] leading-[130%] uppercase text-[#677B9E]"
        >
          {{ bytesToSize(size) }}
        </h6>
      </div>

      <hr class="bg-[#E0E5EC] h-[1px] w-[55rem] mb-[12rem]" />
      <p
        class="not-italic minion font-bold text-[20rem] leading-[26rem] line-clamp-3 text-[#1A2F53]"
      >
        {{ title }}
      </p>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      default: "/",
    },
    title: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
    file: {
      type: String,
      default: "",
    },
    lang: {
      type: String,
    },
    img: {
      type: String,
    },
  },

  methods: {
    bytesToSize(bytes) {
      let sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      if (bytes == 0) return "0 Byte";
      let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
    },
  },
};
</script>

<style lang="scss">
.report-card {
  svg g {
    transition: all 0.3s;
  }
  &:hover {
    svg g {
      transition: all 0.3s;
      opacity: 1 !important;
    }
  }
}
</style>
