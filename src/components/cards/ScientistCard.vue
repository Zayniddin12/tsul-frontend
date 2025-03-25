<template>
  <div
    class="bg-foto bg-[#F5F6FA] border-[1.6px] border-[#E0E5EC] flex sm:flex-col gap-[24rem] w-full relative"
  >
    <div
      class="max-w-[300px] sm:max-w-full sm:h-[500px] w-full h-full bg-red-600 overflow-hidden flex-shrink-0"
      :class="imageClass"
    >
      <img
        v-if="img && isImage"
        class="sm:w-full object-cover w-full sm:h-full"
        :src="img"
        alt="Scientic-card"
        @error="isImage = false"
      />
      <img
        v-else
        class="w-[300px] h-[400px] object-cover sm:w-full"
        :class="imageClass"
        src="@/static/img/default.svg"
        alt="Scientic-card"
      />
    </div>
    <div class="pr-[20px] pb-[20px] pt-[20px] sm:p-[20px]">
      <router-link :to="link ? /all-employees/ + link : ''">
        <h3
          class="text-[24rem] leading-[130%] font-bold text-[#1A2F53] mb-[4px] line-clamp-2 minion lksdafj"
        >
          {{ fullName }}
        </h3>
      </router-link>
      <span
        class="block !text-blue-950 !text-[15rem] !font-normal !leading-snug opacity-80"
        v-html="position"
      ></span>
      <div
        class="text-slate-500 text-[15rem] font-normal leading-snug flex items-center gap-[10px] my-[16px]"
        v-html="quote"
      ></div>
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

      <div class="flex items-center gap-[12px] mt-[15rem] user-social-links">
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
    <div class="absolute right-0 bottom-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="122"
        height="182"
        viewBox="0 0 122 182"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15.9967 37.3427V48.4713H0C0 41.2654 0 34.0604 0 26.8549C0 25.7011 0.953749 24.7565 2.11881 24.7565C24.9797 24.7565 47.8412 24.7565 70.7021 24.7565C71.8681 24.7565 72.8214 25.7011 72.8214 26.8549C72.8214 84.5698 72.8214 142.285 72.8214 200C32.1914 196.614 0 162.643 0 121.586C0 100.611 0 80.1072 0 58.9605H15.9967V64.8638C15.9967 77.2173 26.2076 87.3254 38.6868 87.3254C39.4649 87.3254 40.1398 87.5657 40.6957 88.116C41.1854 88.6059 41.4943 89.2806 41.4943 90.0165V94.6637C41.4943 95.4001 41.1835 96.0748 40.6933 96.5624C40.2026 97.0514 39.5211 97.3544 38.7734 97.3544H9.55272C11.7286 104.365 15.9739 109.662 21.2418 113.184C27.4507 117.334 35.0874 119.028 42.4504 118.173C47.9382 117.534 52.6218 115.369 56.9284 112.334V37.3432H15.9967V37.3427ZM56.9284 190.505V128.572C52.4272 130.08 47.499 131.009 42.0173 131.132C32.3342 131.349 23.5691 128.54 15.9967 122.689V131.769C15.9967 158.486 33.059 181.446 56.9284 190.505ZM88.2979 24.7565C111.159 24.7565 134.02 24.7565 156.881 24.7565C158.047 24.7565 159 25.703 159 26.8549C159 34.0604 159 41.2654 159 48.4713H143.003V37.3427H102.073V77.1264C110.194 74.6624 118.196 74.5107 126.57 76.2986C132.972 77.6687 137.758 79.9169 143.003 83.9455V58.9601H159V121.586C159 162.643 126.81 196.614 86.1796 200C86.1796 142.285 86.1796 84.5698 86.1796 26.8544C86.1796 25.7006 87.1329 24.756 88.2979 24.756V24.7565ZM102.073 94.4791V190.505C120.383 183.554 134.689 168.421 140.356 149.688C145.252 133.495 137.887 119.304 120.313 119.304C119.566 119.304 118.884 118.999 118.392 118.513C117.901 118.028 117.594 117.354 117.594 116.612V111.965C117.594 111.224 117.901 110.548 118.392 110.064C118.888 109.577 119.567 109.274 120.313 109.274H149.516C147.378 102.456 143.279 97.2653 138.188 93.7596C132.183 89.6241 124.787 87.8253 117.584 88.4514C111.842 88.9508 106.812 91.2259 102.073 94.4791ZM79.4995 20.162C70.0306 14.0703 67.6234 12.5853 56.0618 12.5853C38.0709 12.5853 20.0811 12.5853 2.09025 12.5853C0.946134 12.5853 0 11.6416 0 10.4883V2.09747C0 0.944145 0.941375 0 2.09025 0C20.7992 0 39.5092 0 58.2182 0C68.5695 0 70.6145 1.07465 79.638 5.88724C88.6587 1.07465 90.4305 0 100.781 0C119.491 0 138.2 0 156.91 0C158.058 0 159 0.947443 159 2.09747V10.4883C159 11.6374 158.054 12.5853 156.91 12.5853C138.919 12.5853 120.929 12.5853 102.938 12.5853C91.3766 12.5853 88.9694 14.0703 79.4995 20.162Z"
          fill="#1A2F53"
          fill-opacity="0.04"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageClass: String,
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
    link: String,
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
.user-social-links a {
  &:hover {
    svg path {
      fill: rgb(26 47 83 / var(--tw-bg-opacity));
    }
  }
  svg path {
    transition: fill 0.5s;
  }
}
</style>
