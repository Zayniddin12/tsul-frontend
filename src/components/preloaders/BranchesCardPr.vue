<template>
  <div
    class="relative overflow-hidden cursor-pointer bg-[#FFFFFF] grid gap-[16rem] border-[#E0E5EC] border-[1.6px] py-[20rem] px-[28rem]"
  >
    <div class>
      <h1
        class="minion not-italic font-bold text-[24rem] leading-[130%] mb-[4rem] text-[#1A2F53] _loading"
      >
        locationlocation
      </h1>
      <p class="not-italic font-semibold text-[12rem] text-[#677B9E] leading-[130%] _loading">
        whosewhosewhose
      </p>
    </div>
    <hr class="w-[50px] h-[1px] bg-[#E0E5EC]" />
    <div class="grid gap-[8rem]">
      <a href class="flex items-center gap-[6rem]">
        <icon name="clock" />
        <span class="not-italic font-medium text-[12rem] leading-[20px] text-[#1A2F53] _loading"
          >datedatedate</span
        >
      </a>
      <div class="flex items-center gap-[12rem]">
        <a href class="flex items-center gap-[6rem]">
          <icon name="gray_phone" class="w-[16rem] h-[16rem]" />
          <span class="not-italic font-medium text-[12rem] leading-[20px] text-[#1A2F53] _loading"
            >phonephone</span
          >
        </a>
        <a href class="flex items-center gap-[6rem]">
          <icon name="gray_mail" class="w-[16rem] h-[16rem]" />
          <span class="not-italic font-medium text-[12rem] leading-[20px] text-[#1A2F53] _loading"
            >mailmailmail</span
          >
        </a>
        <a href class="flex items-center gap-[6rem]">
          <icon name="globus" class="w-[16rem] h-[16rem]" />
          <span class="not-italic font-medium text-[12rem] leading-[20px] text-[#1A2F53] _loading"
            >sitesitesite</span
          >
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    location: {
      type: String,
      default: "",
    },
    whose: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    mail: {
      type: String,
      default: "",
    },
    site: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
.branches {
  transition: all 0.3s;
  &:hover {
    transition: all 0.3s;
  }
  &::after {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 1;
  }

  a {
    z-index: 5;
    transition: all 0.3s;
    &:hover {
      span {
        transition: all 0.3s;
        color: #2b5e9b;
      }

      .icon svg path {
        transition: all 0.3s;
        stroke: #2b5e9b;
      }
    }
  }
}
</style>
