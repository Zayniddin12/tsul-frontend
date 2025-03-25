<template>
  <div>
    <div class="grid grid-cols-12 gap-[21rem]">
      <div class="col-span-4 sm:col-span-12">
        <div
          class="w-full bg-center bg-no-repeat bg-cover _loading border-[1px] border-[#E0E5EC]"
          :style="{
            backgroundImage: '@img/horizontal-dark.png', 
            height: height,
          }"
        ></div>
      </div>
      <div class="col-span-8 sm:col-span-12">
        <div
          class="bg-[#F5F6FA] px-[40rem] pt-[36rem] pb-[46rem] border-[1.6rem] border-[#E0E5EC] relative"
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
              class="font-medium text-[11rem] leading-[130%] uppercase text-[#677B9E] _loading"
            >
              asdasda
            </p>
            <div
              class="bg-[#1A2F53] w-[4rem] h-[4rem] rounded-[50%] mr-[8rem] ml-[8rem] _loading"
            ></div>
            <span class="font-medium text-[11rem] leading-[145%] text-[#677B9E] _loading">
              asdasdasdas
            </span>
          </div>
          <div class="bg-[#E0E5EC] w-[55rem] h-[1rem] mt-[12rem] mb-[12rem]"></div>
          <h6
            class="mb-[12rem] font-bold text-[#1A2F53] minion text-[24rem] leading-[130%] line-clamp-2 _loading"
          >
            asdasdsada
          </h6>
          <p
            class="font-normal line-clamp-2 text-[12rem] leading-[140%] text-[#677B9E] mt-[6rem] _loading"
          >
           asdasasd
          </p>
          <router-link
            class="bg-[#1A2F53] px-[40rem] py-[16rem] absolute bottom-[-30rem] border-[1rem] border-[transparent] _loading font-semibold text-[15rem] text-[#fff] uppercase transition-all duration-200 hover:bg-[#fff] hover:text-[#1A2F53] hover:border-[#1A2F53]"
            to=""
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
