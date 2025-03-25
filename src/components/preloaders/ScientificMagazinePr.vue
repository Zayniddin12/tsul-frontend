<template>
  <div
    class="
      h-[224px]
      border-[#E0E5EC] border-[1.6px]
      flex
      items-center
      md:flex-col
      gap-[32px]
      bg-white
      cursor-pointer
      group
      duration-[150ms]
      hover:bg-[#F5F6FA]
    "
  >
    <div class="relative md:hidden min-w-[170px] _loading">
      <img
        src=""
        class="
          w-full
          absolute
          lg:top-[-112px]
          top-[-144px]
          left-[24px]
          object-cover
          h-[224px]
          _loading
        "
        alt=""
      />
    </div>
    <div class="p-[16px]">
      <div class="flex items-center">
        <h4
          class="
            text-[#1A2F53]
            font-semibold
            minion
            text-[24rem]
            leading-[130%]
            line-clamp-2
            _loading
          "
        >
          namenamename
          <span
            class="
              bg-[#F5F6FA]
              px-[8px]
              py-[4px]
              uppercase
              inline-flex
              ml-[8px]
              text-[#2B5E9B]
              duration-[150ms]
              group-hover:bg-[#677B9E] group-hover:text-[#FFFFFF]
              leading-[130px]
              text-[12rem]
              font-semibold
              max-h-[24px]
              items-center
              _loading
            "
          >
            languagelanguage
          </span>
        </h4>
      </div>
      <p
        class="
          text-[#677B9E] text-[12rem]
          leading-[130%]
          font-semibold
          opacity-80
          mt-[12px]
          _loading
        "
      >
        language
      </p>
      <div class="h-[1.6px] w-[40px] bg-[#E0E5EC] mt-[20px]"></div>

      <a
        class="
          learn-more-buttons
          whitee
          w-[150px]
          mt-[24px]
          bg-[#E0E5EC]
          _loading
        "
        download
        href=""
      >
        <p class="uppercase">{{ $t("download") }}</p>
        <Icon name="download_gray" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
    },
    language: {
      type: String,
    },
    title: {
      type: String,
    },
    img: {
      type: String,
    },
  },
};
</script>

<style lang="scss">
.whitee:hover {
  svg path {
    fill: #ffffff !important;
  }
}
</style>