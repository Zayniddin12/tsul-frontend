<template>
  <div class="px-[31rem] news-single-head w-full h-[174rem] md:h-[124rem]">
    <div
      class="bg-[#F5F6FA] border-[1.6rem] border-solid border-[#E0E5EC] py-[36rem] pr-[32rem] pl-[40rem] relative md:pr-[16rem] md:pl-[20rem] md:py-[10rem]"
    >
      <div class="flex items-center">
        <p class="font-semibold text-[12rem] leading-[130%] text-[#677B9E] uppercase _loading">
          Lenta
        </p>
        <div class="rounded-[50%] w-[4rem] h-[4rem] ml-[8rem] -425:hidden _loading"></div>
        <div
          class="socials-news-single ml-[18rem]"
          :class="[
            {
              '-425:absolute -425:bottom-[10rem] -375:bottom-[5rem] -425:right-[10rem]': isEvent,
            },
          ]"
        >
          <a target="_blank">
            <Icon class="w-[16rem] h-[16rem] _loading" name="events_telegram" />
          </a>
          <a target="_blank">
            <Icon class="w-[16rem] h-[16rem] _loading" name="events_twitter" />
          </a>
          <a target="_blank">
            <Icon class="w-[16rem] h-[16rem] _loading" name="events_instagram" />
          </a>
          <a target="_blank">
            <Icon class="w-[16rem] h-[16rem] _loading" name="events_facebook" />
          </a>
        </div>
      </div>
      <div class="w-[50rem] h-[2rem] bg-[#E6E8ED] mt-[12rem] mb-[12rem]"></div>
      <h1
        class="_loading !w-[70%] font-bold minion text-[24rem] leading-[130%] line-clamp-2 -810:w-[600rem] -700:w-[500rem] -425:text-[16rem] -425:mt-[20rem] -425:mb-[10rem] -526:w-[400rem] -425:w-[350rem] -370:w-[300rem] text-[#1A2F53]"
      >
        Tsul tsul tsul tsul tsul tsul tsul tsul
      </h1>
      <Icon class="absolute pattern-img bottom-0 right-0 z-[0]" name="newsbg" />
      <div v-if="isEvent" class="my-[6rem] flex items-center gap-[8rem]">
        <span class="not-italic _loading font-normal text-[12rem] leading-[14rem] text-[#677B9E]"
          >Soat 19:00</span
        >
        <b class="w-[4rem] _loading h-[4rem] bg-[#CBD3DE] rounded-full"></b>
        <span class="not-italic _loading font-normal text-[12rem] leading-[14rem] text-[#677B9E]"
          >TSUL anjumanlar zali</span
        >
      </div>

      <div v-if="isEvent" class="absolute top-[-16rem] right-[32rem]">
        <div class="relative _loading -940:p-[14rem] p-[24rem] w-[80rem] grid place-items-center">
          <h5 class="not-italic font-bold text-[32rem] leading-[130%] uppercase text-white">5</h5>
          <span class="not-italic font-normal text-[16rem] leading-[130%] mt-[5rem] text-white"
            >May</span
          >
          <Icon class="absolute top-0 right-0 z-[0]" name="eventbg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: "",
    },
    title: {
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
    facebook: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    isEvent: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.news-single-head {
  .pattern-img {
    svg {
      path {
        fill: #1a2f53;
      }
    }
  }

  .socials-news-single {
    i {
      margin-left: 6rem;
      margin-right: 6rem;
      width: 16rem;
      svg {
        path {
          transition: 0.3s all;
        }
        &:hover {
          path {
            fill: #1a2f53;
          }
        }
      }
    }
  }
}
</style>
