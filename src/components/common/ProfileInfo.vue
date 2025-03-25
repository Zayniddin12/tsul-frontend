<template>
  <div v-if="type === 1" class="management-single overflow-hidden w-full">
    <div class="w-full relative pb-[25px] z-10">
      <img v-if="profile?.image" :src="profile?.image" class="management-img" alt="iamge" />
      <img v-else src="@/static/img/default.svg" class="management-img" alt="iamge" />
      <div
        class="bg-image flex flex-col justify-between bg-[#F5F6FA] border-[1.6px] border-[#E0E5EC] py-[44rem] xs:py-[30rem] xs:px-[30rem] px-[78rem] pr-[44px] mt-[76rem] w-full max-w-[630px] -1200:mt-[-8px] -1200:mx-auto -1200:z-[2]"
      >
        <h2 class="uppercase text-[15rem] leading-[130%] font-semibold text-[#677B9E]">
          {{ $t("about_rector") }}
        </h2>
        <hr class="my-[16px] h-[0.5px] w-[50px] bg-[#E6E8ED]" />
        <h3 class="text-[32rem] leading-[130%] font-bold text-[#1A2F53] mb-[8px] minion">
          {{ profile?.name }}
        </h3>
        <span
          class="block text-[15rem] leading-[140%] font-medium text-[#677B9E] mb-[44rem]"
          v-html="profile?.work"
        ></span>
        <div class="flex items-end justify-between -640:flex-wrap space-x-[10px] -540:space-x-0">
          <div class="flex flex-col">
            <a
              v-if="profile.time"
              class="mb-[12px] text-[14rem] leading-[142%] font-medium text-[#677B9E] flex items-center"
            >
              <Icon name="clock_grey" color="#8394B1" class="w-[20px] h-[20px] mr-[8px]" />{{
                profile?.time
              }}
            </a>
            <div class="flex items-center flex-wrap gap-[10px]">
              <a
                v-if="profile.phone"
                :href="`tel: ${profile?.phone}`"
                class="mr-[18rem] -582:mb-0 text-[14rem] leading-[142%] font-medium text-[#677B9E] flex items-center"
              >
                <Icon name="gray_phone" color="#8394B1" class="w-[20px] h-[20px] mr-[8px]" />{{
                  formatPhoneNumber(profile?.phone)
                }}
              </a>
              <a
                v-if="profile.email"
                :href="`mailto: ${profile?.email}`"
                class="text-[14rem] leading-[142%] font-medium text-[#677B9E] flex items-center"
              >
                <Icon name="gray_mail" color="#8394B1" class="w-[20px] h-[20px] mr-[8px]" />{{
                  profile?.email
                }}
              </a>
            </div>
          </div>
          <div class="flex items-center space-x-[10px] -540:mt-[12px] mt-0">
            <a
              v-if="profile.facebook"
              :href="profile.facebook"
              target="_blank"
            >
              <Icon name="faceboook" color="#8596B2" class="w-[16px] h-[16px]" />
            </a>
            <a
              v-if="profile.telegram"
              :href="profile.telegram"
              target="_blank"
            >
              <Icon name="telegram" color="#8596B2" class="w-[16px] h-[16px]" />
            </a>
            <a
              v-if="profile.google"
              :href="profile.google"
              target="_blank"
            >
              <Icon name="google" color="#8596B2" class="w-[16px] h-[16px]" />
            </a>
            <a
              v-if="profile?.twitter"
              :href="profile.twitter"
              target="_blank"
            >
              <Icon name="twitter" color="#8596B2" class="w-[16px] h-[16px]" />
            </a>
            <a
              v-if="profile?.linkedin"
              :href="profile.linkedin"
              target="_blank"
            >
              <Icon name="linkedin" color="#8596B2" class="w-[16px] h-[16px]" />
            </a>
            <a
              v-if="profile?.instagram"
              :href="profile.instagram"
              target="_blank"
            >
              <Icon name="instagram" color="#8596B2" class="w-[16px] h-[16px]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  fucking rector-->
  <div v-else-if="type === 2">
    <div class="container">
      <div class="flex gap-[24rem] -540:gap-[0] mt-[32rem] sm:flex-col profile-info">
        <div class="shrink-0">
          <img
            v-if="profile.image"
            :src="profile.image"
            alt="single-foto"
            class="max-w-[300px] -640:mx-auto h-[400px] object-cover"
          />
          <img
            v-else
            src="/src/static/img/default.svg"
            alt="single-foto"
            class="w-[300px] h-[400px] -640:mx-auto object-cover"
          />
        </div>
        <div class="profile-info-inner w-full">
          <h1
            class="text-[28rem] -540:text-[24rem] leading-[130%] font-bold text-[#1A2F53] mb-[12px] minion"
          >
            {{ profile.name }}
          </h1>

          <span
            class="block text-[15rem] leading-[150%] font-normal text-[#1A2F53] mb-[20rem]"
            v-html="profile.work"
          ></span>
          <p
            v-if="profile?.quote"
            class="text-[15rem] text-[#677B9E] mt-[20px] -640:mt-[12[px] mb-[27px] -640:mb-[16px]"
            v-html="profile?.quote"
          />
          <div class="flex items-end justify-between gap-[10px] xs:flex-col xl:items-start">
            <div class="flex flex-col gap-[12px]">
              <a
                v-if="profile.time"
                class="flex items-center gap-[8px] text-[14rem] leading-[142%] font-medium text-[#1A2F53]"
              >
                <Icon name="clock_grey" />
                {{ profile.time }}</a
              >
              <a
                v-if="profile.phone"
                :href="`tel: ${profile.phone}`"
                class="flex items-center gap-[8px] text-[14rem] leading-[142%] font-medium text-[#1A2F53]"
              >
                <Icon name="gray_dark_phone" />
                {{ formatPhoneNumber(profile.phone) }}</a
              >
              <a
                v-if="profile.email"
                :href="`mailto: ${profile.email}`"
                class="flex items-center gap-[8px] text-[14rem] leading-[142%] font-medium text-[#1A2F53]"
              >
                <Icon name="gray_dark_mail" />
                {{ profile.email }}</a
              >
            </div>
            <div class="flex items-center gap-[12px]">
              <a
                v-if="profile.facebook"
                :href="profile.facebook"
                target="_blank"
              >
                <Icon name="faceboook" color="#8596B2" class="w-[16px] h-[16px]" />
              </a>
              <a
                v-if="profile.telegram"
                :href="profile.telegram"
                target="_blank"
              >
                <Icon name="telegram" color="#8596B2" class="w-[16px] h-[16px]" />
              </a>
              <a
                v-if="profile.google"
                :href="profile.google"
                target="_blank"
              >
                <Icon name="google" color="#8596B2" class="w-[16px] h-[16px]" />
              </a>
              <a
                v-if="profile?.twitter"
                :href="profile.twitter"
                target="_blank"
              >
                <Icon name="twitter" color="#8596B2" class="w-[16px] h-[16px]" />
              </a>
              <a
                v-if="profile?.linkedin"
                :href="profile.linkedin"
                target="_blank"
              >
                <Icon name="linkedin" color="#8596B2" class="w-[16px] h-[16px]" />
              </a>
              <a
                v-if="profile?.instagram"
                :href="profile.instagram"
                target="_blank"
              >
                <Icon name="instagram" color="#8596B2" class="w-[16px] h-[16px]" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex justify-end mt-[28px]">
        <div class="inline-flex items-center cursor-pointer print" @click="print()">
          <icon name="printer" class="flex-shrink-0" />
          <p class="font-medium text-[15rem] leading-[140%] text-[#677B9E] ml-[12rem]">
            {{ $t("print") }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <!--  fuckin rector ends-->
  <div v-else-if="type === 3">
    <div class="container !p-0">
      <div
        class="flex gap-[24rem] -540:gap-[0] mt-[32rem] sm:flex-col profile-info"
        :class="profileMain"
      >
        <img
          v-if="profile.image"
          :src="profile?.image"
          alt="single-foto"
          class="w-full max-w-[194px] object-cover -640:m-auto"
          :class="profileImage"
        />
        <img
          v-else
          alt="single-foto"
          src="@/static/img/default.svg"
          class="w-full max-w-[194px] object-cover -640:m-auto"
        />
        <div class="profile-info-inner w-full">
          <h1
            class="text-[28rem] leading-[130%] -540:text-[24rem] font-bold text-[#1A2F53] mb-[12px] minion"
          >
            {{ profile.name }}
          </h1>
          <span
            v-if="profile.work"
            class="block text-[15rem] leading-[150%] font-semibold text-[#677B9E] mb-[20rem] capitalize"
            v-html="profile.work"
          ></span>
          <div
            v-if="profile.description"
            class="text-[15rem] leading-[150%] font-normal text-[#677B9E] mb-[27rem] regular-text"
            v-html="profile.description"
          ></div>
          <div class="flex items-end justify-between gap-[10px] xs:flex-col xl:items-start">
            <div class="flex flex-col gap-[12px] flex-wrap">
              <a
                v-if="profile.time"
                class="flex items-center gap-[8px] text-[14rem] leading-[142%] font-medium text-[#1A2F53] whitespace-nowrap"
              >
                <Icon name="clock_grey" class="min-w-[20px]" />
                {{ profile.time }}</a
              >
              <div class="flex gap-[18px] flex-wrap">
                <a
                  v-if="profile.phone"
                  :href="`tel:${profile.phone}`"
                  class="flex items-center gap-[8px] text-[14rem] leading-[142%] font-medium text-[#1A2F53] whitespace-nowrap"
                >
                  <Icon name="gray_dark_phone" class="min-w-[20px]" />
                  {{ formatPhoneNumber(profile.phone) }}</a
                >
                <a
                  v-if="profile.email"
                  :href="`/'mailto:'  ${profile.email}`"
                  class="flex items-center gap-[8px] text-[14rem] leading-[142%] font-medium text-[#1A2F53] whitespace-nowrap"
                >
                  <Icon name="gray_dark_mail" class="min-w-[20px]" />
                  {{ profile.email }}</a
                >
              </div>
            </div>
          </div>
          <div class="flex items-center gap-[12px] mt-[28rem]">
            <a
              v-if="profile.telegram"
              class="w-[24px] h-[24px] flex items-center justify-center"
              :href="profile.telegram"
              target="_blank"
            >
              <Icon name="events_telegram" color="#8596B2" />
            </a>
            <a
              v-if="profile.twitter"
              class="w-[24px] h-[24px] flex items-center justify-center"
              :href="profile.twitter"
              target="_blank"
            >
              <Icon name="events_twitter" color="#8596B2" />
            </a>
            <a
              v-if="profile.instagram"
              class="w-[24px] h-[24px] flex items-center justify-center"
              :href="profile.instagram"
              target="_blank"
            >
              <Icon name="events_instagram" color="#8596B2" />
            </a>
            <a
              v-if="profile.facebook"
              class="w-[24px] h-[24px] flex items-center justify-center"
              :href="profile.facebook"
              target="_blank"
              default
            >
              <Icon name="events_facebook" color="#8596B2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="type === 4" class="management-single overflow-hidden w-full">
    <div class="w-full relative pb-[25px] z-10">
      <div v-if="profile?.image" class="management-img overflow-hidden">
        <img :src="profile?.image" class="!object-contain" alt="iamge" />
      </div>
      <img v-else src="@/static/img/default.svg" class="management-img" alt="iamge" />
      <div
        class="bg-image flex flex-col justify-between bg-[#2E4B7C] border-[1.6px] border-[#3E506F] py-[44rem] xs:py-[30rem] xs:px-[30rem] px-[78rem] pr-[44px] mt-[76rem] w-full max-w-[630px] -1200:mt-[-8px] -1200:mx-auto -1200:z-[2]"
      >
        <h2 class="uppercase text-[15rem] leading-[130%] font-semibold text-[#7082A0]">
          {{ $t("about_rector") }}
        </h2>
        <hr class="my-[16px] h-[0.5px] w-[50px] bg-[#E6E8ED]" />
        <h3 class="text-[32rem] leading-[130%] font-bold text-white mb-[8px] minion">
          {{ profile?.name }}
        </h3>
        <span class="block text-[15rem] leading-[140%] font-medium text-[#7082A0] mb-[44rem]"
          >Toshkent Davlat Yuridik Universiteti dekani</span
        >
        <div class="flex items-end justify-between -640:flex-wrap space-x-[10px] -540:space-x-0">
          <div class="flex flex-col">
            <a
              v-if="profile.time"
              class="mb-[12px] text-[14rem] leading-[142%] font-medium text-white flex items-center"
            >
              <Icon name="clock_grey" color="#7082A0" class="w-[20px] h-[20px] mr-[8px]" />{{
                profile?.time
              }}
            </a>
            <div class="flex items-center flex-wrap gap-[10px]">
              <a
                v-if="profile.phone"
                :href="`tel: ${profile?.phone}`"
                class="mr-[18rem] -582:mb-0 text-[14rem] leading-[142%] font-medium text-white flex items-center"
              >
                <Icon name="gray_phone" color="#7082A0" class="w-[20px] h-[20px] mr-[8px]" />{{
                  formatPhoneNumber(profile?.phone)
                }}
              </a>
              <a
                v-if="profile.email"
                :href="`mailto: ${profile?.email}`"
                class="text-[14rem] leading-[142%] font-medium text-white flex items-center"
              >
                <Icon name="gray_mail" color="#7082A0" class="w-[20px] h-[20px] mr-[8px]" />{{
                  profile?.email
                }}
              </a>
            </div>
          </div>
          <div class="flex items-center space-x-[10px] -540:mt-[12px] mt-0">
            <a
              v-if="profile.facebook"
              :href="profile.facebook"
              target="_blank"
            >
              <Icon name="faceboook" color="#8596B2" class="w-[16px] h-[16px]" />
            </a>
            <a
              v-if="profile.telegram"
              :href="profile.telegram"
              target="_blank"
            >
              <Icon name="telegram" color="#8596B2" class="w-[16px] h-[16px]" />
            </a>
            <a
              v-if="profile.google"
              :href="profile.google"
              target="_blank"
            >
              <Icon name="google" color="#8596B2" class="w-[16px] h-[16px]" />
            </a>
            <a
              v-if="profile?.twitter"
              :href="profile.twitter"
              target="_blank"
            >
              <Icon name="twitter" color="#8596B2" class="w-[16px] h-[16px]" />
            </a>
            <a
              v-if="profile?.linkedin"
              :href="profile.linkedin"
              target="_blank"
            >
              <Icon name="linkedin" color="#8596B2" class="w-[16px] h-[16px]" />
            </a>
            <a
              v-if="profile?.instagram"
              :href="profile.instagram"
              target="_blank"
            >
              <Icon name="instagram" color="#8596B2" class="w-[16px] h-[16px]" />
            </a>
          </div>
        </div>
        <router-link
          to="/management/prorektor-apply"
          class="learn-more-buttons mt-[24px] text-[#1A2F53] text-[15rem] font-medium max-w-[185px] !py-[10px] h-[40px] -460:mt-[15px]"
        >
          <p class="text-center mx-auto">Murojaat qilish</p>
        </router-link>
      </div>
      <img src="/quote.svg" alt="" class="absolute left-[15%] bottom-[5%]" />
      <div class="flex justify-end">
        <div
          v-html="profile?.quote"
          ref="text"
          class="w-2/3 -768:w-full quote-text text-white pt-[12%]"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: { type: Number, default: 1 },
  profile: { type: Object, default: () => ({}) },
  profileImage: { type: String },
  profileMain: { type: String },
});
function print() {
  window.print();
}
function formatPhoneNumber(number: string) {
  const format = number?.replace(/\D/g, "").match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
  return `+${format && format[1] ? format[1] : ""} (${format && format[2] ? format[2] : ""})

          ${format && format[3] ? format[3] : ""}-${format && format[4] ? format[4] : ""}-${
    format && format[5] ? format[5] : ""
  }`;
}
</script>

<style lang="scss">
.regular-text {
  p {
    margin-top: 10px;
  }
}

.management-single {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: baseline;
  width: 100%;

  & .management-img {
    // content: "";
    object-fit: cover !important;
    position: absolute;
    top: 32px;
    right: 0;
    width: 869rem;
    height: 482rem;
    z-index: -1;
    @media (max-width: 1200px) {
      position: static;
      @apply mx-auto;
      width: 100%;
      max-width: 630px;
      margin-top: 70rem;
    }
    @media (max-width: 540px) {
      margin-top: 0 !important;
    }
  }
}
.quote-text {
  p {
    span {
      font-size: 32px !important;
    }
  }
}
@media (max-width: 768px) {
  .quote-text {
    p {
      span {
        font-size: 22px !important;
      }
    }
  }
}
.bg-image {
  position: relative;
  &::before {
    // content: "";
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 142px;
    height: 179px;
    background: url("@/static/img/bg-image.png") right bottom no-repeat;
    background-size: cover;
    pointer-events: none;
  }
}
</style>
