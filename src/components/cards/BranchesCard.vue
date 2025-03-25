<template>
  <a
    :href="site"
    target="_blank"
    class="branches relative overflow-hidden hover:bg-[#F5F6FA] bg-[#FFFFFF] grid border-[#E0E5EC] border-[1.6px] py-[20rem] px-[28rem] min-h-[218px]"
  >
    <div>
      <h4
        v-if="location"
        class="minion not-italic font-bold text-[24rem] leading-[130%] mb-[4rem] text-[#1A2F53] -500:text-[20rem] line-clamp-1"
      >
        {{ location }}
      </h4>
      <p
        v-if="head"
        class="not-italic font-semibold text-[12rem] text-[#677B9E] leading-[130%] -500:text-[13rem]"
      >
        {{ whose }}
      </p>
    </div>
    <hr class="w-[50px] h-[1px] my-[16px] bg-[#E0E5EC]" />

    <div class="grid gap-[8rem]">
      <a v-if="date" class="flex items-center">
        <icon name="clock" class="mr-[6px] shrink-0" />
        <span class="not-italic font-medium text-[12rem] leading-[20px] text-[#1A2F53]">{{
          date
        }}</span>
      </a>
      <div class="flex items-center gap-[12rem]  flex-wrap ">
        <a v-if="phone" :href="`tel:${phone}`" class="flex items-center  gap-[4rem]">
          <icon name="gray_phone"  />
          <span
            class="not-italic font-medium text-[12rem] -467:text-[9rem] leading-[20px] text-[#1A2F53]"
            >{{ formatPhoneNumber(phone) }}</span
          >
        </a>
        <a v-if="mail" :href="`mailto:${mail}`" class="flex items-center gap-[4rem] ">
          <icon name="gray_mail" class="" />
          <span
            class="not-italic font-medium text-[12rem] -467:text-[9rem] leading-[20px] text-[#1A2F53]"
            >{{ mail }}</span
          >
        </a>
        <a
          v-if="site"
          :href="`${site}`"
          target="_blank"
          class="flex items-center text-xs gap-[4rem]"
        >
          <icon name="globus"  />
          <span
            class="not-italic font-medium  text-[12rem] -467:text-[9rem] leading-[20px] text-[#1A2F53]"
            >{{ site }}</span
          >
        </a>
      </div>
    </div>
  </a>
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
    head: {
      type: Object,
      default: () => {},
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
    url: {
      type: String,
      default: "",
    },
  },
  methods: {
    addProtocol(url) {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return "https://" + url;
      }
      return url;
    },
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
.branches {
  transition: all 0.3s;
  &:hover {
    transition: all 0.3s;
  }
  &::after {
    content: url("../../static/img/branch.svg");
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
