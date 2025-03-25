<template>
  <div
    class="relative overflow-hidden w-[628rem] -1300:block bg-[#2E4B7C] border-[1.6px] border-[#3E506F] py-[44rem] -600:py-[20rem] pr-[44rem] -600:pr-[20rem] pl-[78rem] -600:pl-[30rem]"
  >
    <h6
      class="not-italic leading-[130%] font-semibold text-[15rem] mb-[12rem] uppercase text-[#7082A0]"
    >
      {{ dean.category.name }}
    </h6>
    <hr class="mb-[24rem] h-[1px] w-[50px] bg-[#E6E8ED]" />

    <h1
      class="not-italic font-bold text-[32rem] minion -600:text-[25rem] leading-[130%] mb-[8rem] text-white"
    >
      {{ getFullName(dean) }}
    </h1>
    <p
      class="not-italic font-medium text-[15rem] mb-[24rem] text-[#7082A0]"
      v-html="dean.description"
    ></p>
    <div class="flex items-end justify-between space-x-[10px] -500:block">
      <div class="flex flex-col gap-[12px]">
        <a
          v-if="dean.work_date"
          class="text-[14rem] leading-[142%] font-normal !text-[#FFFFFF] flex items-center gap-[8px]"
        >
          <Icon name="clock_grey" color="#677B9E" class="w-[20px] h-[20px]" />{{ dean.work_date }}
        </a>
        <div class="flex items-center gap-[18px] -397:block flex-wrap">
          <a
            v-if="dean.phone_number"
            :href="`tel:${dean.phone_number}`"
            class="text-[14rem] cursor-pointer leading-[142%] font-normal text-[#FFFFFF] flex items-center"
          >
            <Icon name="gray_phone" color="#677B9E" class="w-[20px] h-[20px] mr-[8px]" />{{
              formatPhoneNumber(dean.phone_number)
            }}
          </a>
          <a
            v-if="dean.email"
            :href="`mailto:${dean.email}`"
            class="text-[14rem] cursor-pointer leading-[142%] font-normal text-[#FFFFFF] flex items-center -397:mt-[12rem]"
          >
            <Icon name="gray_mail" color="#677B9E" class="w-[20px] h-[20px] mr-[8px]" />{{
              dean.email
            }}
          </a>
        </div>
        <a
          href="/management/apply"
          class="mt-[24rem] w-[145rem] text-[15rem] cursor-pointer leading-[142%] text-[#1A2F53] bg-[#FFFFFF] py-[9.5rem] flex justify-center border-[1.6rem] border-solid border-[#E0E5EC] font-medium items-center -397:mt-[13rem]"
        >
          {{ $t("apply") }}
        </a>
      </div>
      <div class="flex items-center space-x-[12px] -500:mt-[10px] -500:justify-end">
        <a
          class="w-[24rem] !z-[50] h-[24rem] flex items-center justify-center bg-[#7082A0]"
          :href="dean.facebook_link"
          target="_blank"
        >
          <Icon name="faceboook" color="#fff" class="w-[14rem] h-[14rem]" />
        </a>
        <a
          class="w-[24rem] !z-[50] h-[24rem] flex items-center justify-center bg-[#7082A0]"
          :href="dean.linkedin_link"
          target="_blank"
        >
          <Icon name="linkedin" color="#fff" class="w-[14rem] h-[14rem]" />
        </a>
        <a
          class="w-[24rem] !z-[50] h-[24rem] flex items-center justify-center bg-[#7082A0]"
          :href="dean.google_link"
          target="_blank"
        >
          <Icon name="google" color="#fff" class="w-[14rem] h-[14rem]" />
        </a>
      </div>
    </div>
    <img
      src="@/static/img/business.png"
      class="absolute right-[-40px] bottom-[-30px]"
      alt="business-image"
    />
  </div>
</template>

<script>
export default {
  props: {
    dean: Object,
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

<style lang="scss" scoped></style>
