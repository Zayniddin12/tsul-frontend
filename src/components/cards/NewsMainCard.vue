<template>
  <div>
    <div class="grid grid-cols-12 gap-[21rem]">
      <div class="col-span-4 sm:col-span-12 ">
        <div
v-if="image"
          class="w-full bg-center bg-no-repeat bg-cover"
          :style="{
            'background-image': 'url(' + image + ')',
            height: height,
          }"
        ></div>
        <div v-else class="w-full h-[230px]">
          <img class="h-full object-cover w-full" src="@/static/img/default.svg" alt="">
        </div>

      </div>
      <div class="col-span-8 sm:col-span-12 sm:mt-[-80rem]">
        <div
          class="bg-[#F5F6FA] px-[40rem] pt-[36rem] pb-[46rem] border-[1.6rem] border-[#E0E5EC] relative -600:px-[16px]"
          :style="{
            height: height,
          }"
        >
          <Icon
            class="absolute news-main-card-pattern bottom-0 right-0 z-0"
            name="bg_pattern"
          />
          <div class="flex items-center justify-start">
            <p
              class="font-medium text-[11rem] leading-[130%] uppercase text-[#677B9E]"
            >
              {{ tag }}
            </p>
            <div
              class="bg-[#1A2F53] w-[4rem] h-[4rem] rounded-[50%] mr-[8rem] ml-[8rem]"
            ></div>
            <span class="font-medium text-[11rem] leading-[145%] text-[#677B9E]">
              {{ $dayjs(date).format("DD") }}.{{ $t($dayjs(date).format("M")) }}.{{ $dayjs(date).format("YYYY") }}

            {{ $dayjs(date).format(" HH:mm") }}
            </span>
          </div>
          <div class="bg-[#E0E5EC] w-[55rem] h-[1rem] mt-[12rem] mb-[12rem]"></div>
          <h6
            class="mb-[12rem] font-bold text-[#1A2F53] minion text-[24rem] leading-[130%] line-clamp-2 -500:text-[18rem]"
          >
            {{ title }}
          </h6>
          <div
              class="font-normal line-clamp-2 text-[12rem] leading-[140%] text-[#677B9E] mt-[6rem]"
            v-html="description"
          >
          </div>
          <router-link
            class="bg-[#1A2F53] px-[40rem] py-[16rem] absolute bottom-[-30rem] left-[20rem] border-[1rem] border-[transparent] font-semibold text-[15rem] text-[#fff] uppercase transition-all duration-200 hover:bg-[#fff] hover:text-[#1A2F53] hover:border-[#1A2F53]"
            :to="slug"
          >
            {{ $t("more") }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      default: "",
    },
    tag: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
.news-main-card-pattern {
  svg {
    path {
      fill: #1a2f53;
    }
  }
}
</style>
