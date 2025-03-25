<template>
  <router-link
    :to="`${link}`"
    class="faculty-stuffs h-auto -425:flex-center-center -425:mr-[16px] -425:ml-[16px] relative bg-[#F5F6FA] hover:!bg-[#fff] cursor-pointer border-[1.6px] w-full border-[#E0E5EC] p-[24rem] -425:p-[16px] flex items-center -425:block -425:h-full"
    :class="customClass"
    @click="clickable ? $router.push(link) : ''"
  >
    <template v-if="img">
      <img
        :src="img"
        class="!w-[151px] -425:!w-[153px] -425:!h-[160px] !h-[211px] -425:mb-[16rem] -425:ml-auto -425:mr-auto object-cover object-top-center mt-[-48px] mr-[28px]"
        alt="faculty-img"
        :class="{ '-425:!mt-0': slider }"
      />
    </template>
    <img
      v-else
      :class="{ '-425:!mt-0': slider }"
      class="!w-[151px] -425:!w-[153px] -425:!h-[160px] !h-[211px] -425:mb-[16rem] -425:ml-auto -425:mr-auto object-cover object-top-center mt-[-48px] mr-[28px]"
      src="@/static/img/footer-logo_white.png"
      alt="noava"
    />
    <div class>
      <h1
        v-if="fullName"
        class="not-italic font-bold text-[24rem] mb-[4rem] -425:text-[16rem] leading-[130%] minion text-[#1A2F53]"
      >
        {{ fullName }}
      </h1>
      <p
        v-if="desc"
        class="not-italic font-semibold -425:text-[12rem] text-[12rem] leading-[130%] mb-[20rem] text-[#677B9E]"
      >
        {{ desc }}
      </p>

      <hr v-if="phone?.length > 20 || mail" class="w-[50rem] h-[1.6px] !bg-[#2B5E9B] mb-[20rem]" />
      <div class="flex justify-between flex-wrap gap-[10px]">
        <div class="grid gap-[12rem]">
          <a
            v-if="phone !== null && phone !== '' && isPhoneNumber(phone)"
            :href="`tel:${phone}`"
            class="flex"
          >
            <Icon name="gray_phone" color="#8394B1" class="w-[20rem] h-[20rem] mr-[8px]" />
            <span
              class="not-italic font-medium -425:text-[12rem] text-[14rem] leading-[20rem] text-[#1A2F53]"
              >{{ phone }}</span
            >
          </a>

          <a v-if="mail" class="flex gap-[8rem] word-break">
            <Icon name="gray_mail" color="#8394B1" class="w-[20rem] h-[20rem]" />
            <span
              class="not-italic font-medium -425:text-[12rem] text-[14rem] leading-[20rem] text-[#1A2F53]"
              >{{ mail }}</span
            >
          </a>
        </div>
        <div class="management-card__soclinks flex items-end faculty_links z-[50]">
          <div class="flex items-center justify-end gap-[11rem] -616:gap-y-[12px]">
            <el-tooltip v-if="facebook" effect="dark" content="Facebook" placement="top">
              <a
                :href="facebook"
                target="_blank"
                class="w-[24rem] bg-[#8596b233] flex items-center justify-center h-[24rem] bg-[#E0E5EC] z-80 hover:!bg-[#2B5E9B] border-[0.4px]"
              >
                <Icon name="faceboook" color="#8596B2" class="w-[14rem] h-[14rem]" />
              </a>
            </el-tooltip>
            <el-tooltip v-if="linkedin" effect="dark" content="Linkedin" placement="top">
              <a
                :href="linkedin"
                class="w-[24rem] bg-[#8596b233] flex items-center justify-center h-[24rem] bg-[#E0E5EC] border-[0.4px] z-80 hover:!bg-[#2B5E9B]"
                target="_blank"
              >
                <Icon name="linkedin" color="#8596B2" class="w-[14rem] h-[14rem]" />
              </a>
            </el-tooltip>
            <el-tooltip v-if="gmail" effect="dark" content="Gmail" placement="top">
              <a
                :href="gmail"
                class="w-[24rem] bg-[#8596b233] flex items-center justify-center h-[24rem] bg-[#E0E5EC] border-[0.4px] z-80 hover:!bg-[#2B5E9B]"
                target="_blank"
              >
                <Icon name="google" color="#8596B2" class="w-[14rem] h-[14rem]" />
              </a>
            </el-tooltip>
            <el-tooltip v-if="telegram" effect="dark" content="Telegram" placement="top">
              <a
                :href="telegram"
                class="w-[24rem] bg-[#8596b233] flex items-center justify-center h-[24rem] bg-[#E0E5EC] border-[0.4px] z-80 hover:!bg-[#2B5E9B]"
                target="_blank"
              >
                <Icon name="telegram" color="#8596B2" class="w-[14rem] h-[14rem]" />
              </a>
            </el-tooltip>
            <el-tooltip v-if="instagram" effect="dark" content="Instagram" placement="top">
              <a
                :href="instagram"
                class="w-[24rem] bg-[#8596b233] flex items-center justify-center h-[24rem] bg-[#E0E5EC] border-[0.4px] z-80 hover:!bg-[#2B5E9B]"
                target="_blank"
              >
                <Icon name="instagram" color="#8596B2" class="w-[14rem] h-[14rem]" />
              </a>
            </el-tooltip>
            <el-tooltip v-if="twitter" effect="dark" content="Twitter" placement="top">
              <a
                :href="twitter"
                class="w-[24rem] bg-[#8596b233] flex items-center justify-center h-[24rem] bg-[#E0E5EC] border-[0.4px] z-80 hover:!bg-[#2B5E9B]"
                target="_blank"
              >
                <Icon name="twitter" color="#8596B2" class="w-[14rem] h-[14rem]" />
              </a>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    fullName: {
      type: String,
      default: "",
    },
    desc: {
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
    gmail: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
      default: "",
    },
    telegram: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      default: "",
    },
    customClass: {
      type: String,
      default: "",
    },
    clickable: {
      type: Boolean,
      default: true,
    },
    slider: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },

  methods: {
    isPhoneNumber(phone) {
      const phoneNumberPattern = /\d/;
      return phoneNumberPattern.test(phone);
    },
  },
};
</script>

<style lang="scss">
.faculty-stuffs {
  transition: all 0.3s;
  width: 100% !important;

  @media (max-width: 425px) {
    width: 100% !important;
  }

  &:hover {
    transition: all 0.3s;
  }
  &::after {
    content: url("@/static/img/stuffs.svg");
    position: absolute;
    bottom: 0%;
    right: 0%;
    transform: translate(0%, 0%);
    z-index: 1;
  }
}

.faculty_links {
  a {
    transition: all 0.3s;
    &:hover {
      transition: all 0.3s;

      svg path {
        transition: all 0.3s;
        fill: white !important;
        fill-opacity: 1;
      }
    }
  }
}
</style>
