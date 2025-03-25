<template>
  <div class="bg-white border-[1.6px] border-solid border-[#E0E5EC] mb-[20px]">
    <div class="py-[16px] px-[20px]">
      <h2
        v-if="isPending"
        class="text-[22rem] leading-[30px] font-[700] text-[#1A2F53] minion _loading"
      >
        hea as dlas daasdas
      </h2>
      <h2 v-else class="text-[22rem] leading-[30px] font-[700] text-[#1A2F53] minion">
        {{ $t("we_social_networks") }}
      </h2>
    </div>
    <div class="w-full h-[1.6px] bg-[#E0E5EC]"></div>

    <ul v-if="isPending" class="nav-list px-[20px] py-[16px] flex flex-col">
      <li
        v-for="i in 6"
        :key="i"
        class="nav-list__item cursor-pointer transition py-[17px] group flex items-center justify-between border-solid border-b-[1.6px] border-[#E0E5EC] last-border"
      >
        <a class="flex items-center social-link gap-[16px]" rel="noopener noreferrer"
          ><img
            class="grayscale-[100%] transition group-hover:!grayscale-[0%] max-w-[24px] _loading"
            src=""
          />
          <span class="inline-block text-[15rem] leading-[20px] font-[500] text-[#1A2F53] _loading"
            >asdas dasda sdas</span
          >
        </a>
        <span class="inline-block text-[15rem] leading-[20px] font-[700] text-[#A4B0C5] _loading"
          >7 850</span
        >
      </li>
    </ul>
    <ul v-else class="nav-list px-[20px] grid grid-cols-2">
      <li
        v-for="(item, index) in links"
        :key="index"
        class="nav-list__item cursor-pointer transition  group flex items-center py-[16px] justify-between"
        :class="{ hidden: !item.url }"
      >
        <a
          v-if="item.url"
          :class="{ hidden: !item.url }"
          class="flex items-center social-link gap-[16px]"
          rel="noopener noreferrer"
          :href="`https://${item?.url}`"
          target="_blank"
          ><img
            class="grayscale-[40%] transition max-w-[24px] group-hover:brightness-50"
            :src="item?.logo_sidebar_url"
            alt="grayscale image"
          />
          <span
            class="inline-block text-[15rem] leading-[20px] font-[500] text-[#1A2F53] group-hover:font-bold group-hover:translate-x-[3px] transition-all duration-300"
            >{{ item?.title }}</span
          >
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { formatNum } from "../../helpers/modules";
import { numberWithSpaces } from "../../helpers/modules";
export default {
  name: "SocialNetworks",
  props: {
    links: Array,
    isPending: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    formatNum,
    numberWithSpaces,
  },
};
</script>

<style scoped lang="scss">

.social-link {
  svg path {
    transition: 0.3s ease-in-out;
  }
}
.nav-list {
  &__item {
    border-bottom: 1.5px solid #e0e5ec;
    transition: 0.3s ease-in-out;
    &:first-child {
      padding-top: 16px;
    }
    &:nth-child(7){
      border: none;
    }
    &:last-child {
      border-bottom: none;
      // padding-bottom: 0;
    }
    & > span {
      transition: 0.3s ease-in-out;
    }

    &:hover {
      & > span {
        color: #677b9e;
      }
    }
    &:nth-child(1):hover {
      .social-link svg path {
        fill: #1877f2;
        fill-opacity: 1;
      }
    }
    &:nth-child(2):hover {
      .social-link svg path {
        fill: #1d9bf0;
        fill-opacity: 1;
      }
    }
    &:nth-child(3):hover {
      .social-link svg path {
        fill: url(#bones-gradient);
        fill-opacity: 1;
      }
    }
    &:nth-child(4):hover {
      .social-link svg path {
        fill: #30a3e6;
        fill-opacity: 1;
      }
    }
    &:nth-child(5):hover {
      .social-link svg path {
        fill: #2c64bc;
        fill-opacity: 1;
      }
    }
  }
}
</style>
