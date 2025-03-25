<template>
  <div class="short-news w-full max-w-[519rem] relative cursor-pointer">
    <router-link :to="link">
      <img
        v-if="img"
        class="w-full h-[248px] object-cover object-center"
        :src="img"
        alt="news-image"
      />
      <img
        v-else
        class="w-full h-[248px] object-cover object-center"
        src="/src/static/img/default.svg"
      />
      <div
        class="w-[100%] !h-[157rem] z-50 py-[24px] px-[28px] bg-[#FFFFFF] border-[1.6px] border-[#E0E5EC]"
      >
        <h5
          class="not-italic line-clamp-1 font-medium text-[12rem] mb-[4px] uppercase text-[#677B9E]"
        >
          {{ type }}
        </h5>
        <h4
          class="not-italic line-clamp-2 font-bold text-[24rem] minion text-[#1A2F53] leading-[130%]"
        >
          {{ title }}
        </h4>
        <span
          v-if="date == today"
          class="not-italic font-medium text-[12rem] mt-[12px] text-[#677B9E] block"
        >
          {{ $t("today") }} {{ $dayjs(date).format("HH:mm") }}</span
        >
        <span v-else class="not-italic font-medium text-[12rem] mt-[12px] text-[#677B9E] block">
          {{ $dayjs(date).format("DD") }}
          -
          {{ $t($dayjs(date).format("MMMM")) }}
          {{ $dayjs(date).format(" HH:mm") }}
        </span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      default: "",
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {
      width: false,
      today: new Date(),
    };
  },
  mounted() {
    this.width = window.innerWidth > 1100;
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/mixins";
.short-news {
  transition: all 0.3s ease-out;

  img {
    &:hover ~ div {
      background: #1a2f53;
      border: 1.6px solid #1a2f53;
      color: white !important;
      transition: all 0.3s ease-in;
      h5 {
        color: white;
      }
      h4 {
        color: white;
      }
      span {
        color: white;
      }
    }
  }

  div:hover {
    border: 1.6px solid #1a2f53;
    background: #1a2f53;
    color: white !important;
    transition: all 0.3s ease-in;
    h5 {
      color: white;
    }
    h4 {
      color: white;
    }
    span {
      color: white;
    }
  }
}
</style>
