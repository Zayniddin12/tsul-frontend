<template>
  <div class="flex justify-between">
    <div
      class="bg-[#F5F6FA] _loading w-full border-[1.6px] border-[#E0E5EC] border-r-[#fff] pt-[48rem] pb-[48rem] pl-[40rem] pr-[52rem] mb-[64rem] relative announcements-main-card h-[207rem] flex flex-col justify-between"
    >
      <h2
        class="line-clamp-2 _loading minion font-bold text-[24rem] leading-[130%] text-[#1A2F53] w-[70%] lg:w-[90%] mb-[12rem]"
      >
        dsad daskj djaks kdljasljlk djask jklasjdkjasls
      </h2>
      <p
        class="text-[12rem] _loading font-normal leading-[140%] lg:w-[90%] text-[#677B9E] w-[70%] line-clamp-2"
      >
        <!-- {{ dataMain?.description }} -->
        daskdka sdlkja kljdk hjashdjk hjashd hajksd hjkahdj hajsdh jkahsdjkd asdj lasjdj aklsdjlasjd
        jasd
        <br />
        dasd klasjkd
      </p>
      <router-link
        class="_loading learn-more-buttons !bg-transparent :md:w-[231px]"
        :to="`/announcements/${dataMain?.slug}`"
      >
        <p class="text-[#fff] font-text-15px">
          {{ $t("more") }}
        </p>
      </router-link>
      <div
        class="w-[52rem] h-[100%] _loading ml-[-1px] flex-shrink-0 absolute right-[-1px] top-[-1px]"
      >
        <div
          class="px-[10rem] w-[52px] h-[48px] py-[6rem] border-[1.6rem] border-solid text-[24rem] font-medium text-[#fff] date"
        >
          {{ $dayjs(date).format("DD") }}
        </div>
        <div
          class="month border-[1.6rem] _loading border-solid text-[#1A2F53] font-medium leading-[140%] uppercase h-[77.9%] w-[52px] text-center relative"
        >
          <h6 class="absolute left-1/2 -translate-x-1/2 rotate-[270deg] bottom-[50rem] text-[18rem]">
            {{ $t($dayjs(dataMain?.publish_date).format("MMMM")) }}
          </h6>
        </div>
      </div>
      <span class="inline-block w-[119px] absolute -top-[18px] left-[0px] z-[1]">
        <img
          class="w-[100%] object-cover"
          src="@/static/img/logo-decaration.png"
          alt="logo-image"
        />
      </span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
