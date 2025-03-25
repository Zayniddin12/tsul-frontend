<template>
  <div class="px-[31rem] md:px-[0] w-full">
    <div
      class="bg-[#F5F6FA] border-[1.6rem] border-solid border-[#E0E5EC] py-[36rem] pr-[32rem] pl-[40rem] relative md:pr-[20rem] md:pl-[20rem] md:py-[16rem] -768:h-auto -500:h-auto news-single-head"
      :class="{ 'event-bg-position': bgPosition }"
    >
      <div
        class="flex items-center -543:flex-col flex-wrap -543:items-start sm:flex-col sm:justify-start sm:items-start sm:gap-[12px]"
      >
        <p
          :class="$route.path === '/report/:slug' ? 'hidden' : 'block'"
          class="font-semibold line-clamp-1 max-w-[450px] -836:max-w-[300px] md:max-w-[230px] sm:max-w-[80%] sm:line-clamp-2 -450:max-w-[70%] text-[12rem] leading-[130%] text-[#677B9E] uppercase"
        >
          {{ tag }}
        </p>
        <div
          v-if="tag"
          class="bg-[#1A2F53] rounded-[50%] w-[4rem] h-[4rem] ml-[8rem] sm:hidden"
        ></div>
        <div class="socials-news-single ml-[8rem] -425:bottom-[6rem] sm:ml-0 display-none-print">
          <ShareNetwork network="telegram" :url="url" :title="title">
            <Icon name="events_telegram" />
          </ShareNetwork>

          <ShareNetwork network="facebook" :url="url" :title="title">
            <Icon name="events_facebook" />
          </ShareNetwork>

          <ShareNetwork network="linkedin" :url="url" :title="title">
            <Icon name="events_linkedin" />
          </ShareNetwork>
          <ShareNetwork network="twitter" :url="url" :title="title">
            <Icon name="events_twitter" />
          </ShareNetwork>

          <ShareNetwork network="vk" :url="url" :title="title">
            <Icon name="events_vkontakte" />
          </ShareNetwork>
        </div>
      </div>
      <div class="w-[50rem] h-[2rem] bg-[#E6E8ED] mt-[12rem] mb-[12rem]"></div>
      <div
        class="font-bold minion text-[24rem] md:text-[18rem] leading-[130%] max-w-[600rem] -800:max-w-[440rem] -425:text-[20rem] -425:mt-[20rem] -425:mb-[10rem] text-[#1A2F53]"
        v-html="title"
      ></div>
      <!-- <img
        class="absolute pattern-img bottom-0 right-0 z-[0] h-full"
        src="@/static/img/newsbg.png"
        alt="news-image"
      /> -->
      <div
        v-if="isEvent && !clock"
        class="my-[6rem] flex items-center gap-[8rem] sm:flex-col sm:items-start"
      >
        <span
          class="not-italic font-normal text-[12rem] leading-[14rem] text-[#677B9E] whitespace-nowrap"
        >
          {{ $t("clock") }} {{ date?.length ? $dayjs(date).format(" HH:mm") : "" }}
        </span>
        <b class="min-w-[4rem] h-[4rem] bg-[#CBD3DE] rounded-full sm:hidden line"></b>
        <span
          class="not-italic font-normal text-[12rem] leading-[14rem] text-[#677B9E] line-clamp-2"
          >{{ place }}</span
        >
      </div>
      <div v-if="isEvent" class="absolute top-[-16rem] right-[32rem] -500:right-4">
        <div
          v-if="date && date.length"
          class="bg-[#1A2F53] relative -940:p-[14rem] p-[11 rem] h-[105rem] -600:p-[7rem] w-[100rem] grid place-items-center sm:h-[70rem]"
        >
          <h5
            class="not-italic font-bold text-[32rem] sm:text-[24rem] leading-[130%] uppercase text-white"
          >
            {{ $dayjs(date).format("DD") }}
          </h5>
          <span class="not-italic font-normal text-[16rem] leading-[130%] text-white text-center">{{
            $t($dayjs(date).format("MMMM"))
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ShareNetwork } from "vue-social-sharing";

export default {
  components: {
    ShareNetwork,
  },
  props: {
    bgPosition: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    isEvent: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
      default: "",
    },
    place: {
      type: String,
      default: "",
    },
    clock: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      url: "",
    };
  },

  created() {
    this.url = window.location.href;
  },
};
</script>

<style lang="scss" scoped>
.event-bg-position {
  background-position: bottom right !important;
}

.news-single-head {
  background: url("/src/static/img/newsbg.png");
  background-color: #f5f6fa;
  background-repeat: no-repeat;
  background-position: bottom -40px right;
  background-size: 140px;

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
