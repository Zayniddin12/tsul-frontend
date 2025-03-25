<template>
  <div class="flex sm:flex-col gap-[24rem] w-full">
    <img
      v-if="img && isImage"
      class="w-[300px] h-[400px] object-cover sm:w-full"
      :src="img"
      alt="Scientic-card"
      @error="isImage = false"
    />
    <img
      v-else
      class="w-[300px] h-[400px] object-cover sm:w-full"
      src="@/static/img/default.svg"
      alt="Scientic-card"
    />
    <div class="py-[20rem] sm:px-[20rem]">
      <h3
        class="text-[28rem] leading-[130%] font-bold text-[#1A2F53] mb-[4px] line-clamp-2 minion lksdafj"
      >
        {{ fullName }}
      </h3>
      <span
        class="position block !text-blue-950 !text-[15rem] !font-normal !leading-snug opacity-100"
        v-html="position"
      ></span>
      <div class="text-slate-500 quote-text flex items-center mb-[12px]" v-html="quote"></div>
      <div class="flex items-start justify-between">
        <div v-if="phone || mail || time" class="flex flex-col gap-[10px]">
          <a
            v-if="phone"
            :href="`tel:${phone}`"
            class="text-[14rem] leading-[143%] font-medium text-[#1A2F53] flex items-center"
          >
            <Icon name="gray_phone" color="#8394B1" class="mr-[8px] w-[20px] h-[20px]" />
            {{ formatPhoneNumber(phone) }}
          </a>
          <a
            v-if="mail"
            :href="`mailto:${mail}`"
            class="text-[14rem] leading-[143%] font-medium text-[#1A2F53] flex items-center"
          >
            <Icon name="gray_mail" color="#8394B1" class="mr-[8px] w-[20px] h-[20px]" />{{ mail }}
          </a>
          <a
            v-if="time"
            class="text-[14rem] leading-[143%] font-medium text-[#1A2F53] flex items-center"
          >
            <Icon name="clock_grey" color="#8394B1" class="w-[20px] h-[20px] mr-[8px]" />{{ time }}
          </a>
        </div>
        <div class="flex items-center gap-[12px] mt-[32rem] user-social-links">
          <a v-if="telegram" :href="telegram" target="_blank" rel="noreferrer noopener">
            <Icon name="telegram" color="#8394B1" class="w-[16px] h-[16px]" />
          </a>
          <a v-if="twitter" :href="twitter" target="_blank" rel="noreferrer noopener">
            <Icon name="twitter" color="#8394B1" class="w-[16px] h-[16px]" />
          </a>
          <a v-if="instagram" :href="instagram" target="_blank" rel="noreferrer noopener">
            <Icon name="instagram" color="#8394B1" class="w-[16px] h-[16px]" />
          </a>
          <a v-if="linkedin" :href="linkedin" target="_blank" rel="noreferrer noopener">
            <Icon name="linkedin" color="#8394B1" class="w-[16px] h-[16px]" />
          </a>
          <a v-if="facebook" :href="facebook" target="_blank" rel="noreferrer noopener">
            <Icon name="faceboook" color="#8394B1" class="w-[16px] h-[16px]" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mail: String,
    phone: String,
    time: String,
    position: String,
    fullName: String,
    img: String,
    quote: String,
    telegram: String,
    twitter: String,
    facebook: String,
    instagram: String,
    linkedin: String,
    slug: String,
  },
  data() {
    return {
      isImage: true,
    };
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
.quote-text {
  span {
    span {
      font-size: 15rem !important;
    }
  }
}
.position span {
  background: transparent !important;
  color: #1a2f53 !important;
  font-size: 15rem !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: 150% !important;
}
.user-social-links a {
  &:hover {
    svg path {
      fill: rgb(26 47 83);
    }
  }
  svg path {
    transition: fill 0.5s;
  }
}
</style>
