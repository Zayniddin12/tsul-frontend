<template>
  <div class="display-none-print">
    <div
      class="flex social-sharing-component items-center md:justify-around justify-between py-[13rem] border-t-[1px] border-t-solid border-t-[#E0E5EC] border-b-[1px] border-b-[#E0E5EC] md:flex-wrap gap-[20rem]"
    >
      <!-- flex-wrap-reverse commented because it makes mess -->
      <div class="flex -734:w-full items-center flex-wrap gap-[24px] -734:!justify-center">
        <div class="flex items-center content-between">
          <Icon name="views" />
          <span class="ml-[10rem] text-[#677B9E] font-medium text-[15rem] leading-[140%]">
            {{ views }}
          </span>
        </div>
        <div class="group inline-flex items-center cursor-pointer print" @click="print()">
          <icon name="printer" class="flex-shrink-0" />
          <p
            v-if="!noPrintText"
            class="font-medium text-[15rem] leading-[140%] text-[#677B9E] ml-[12rem]"
          >
            {{ $t("print") }}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-[20px] flex-wrap -734:!justify-center">
        <div class="inline-flex items-center socials">
          <p class="font-medium text-[15rem] leading-[140%] text-[#677B9E] mr-[7rem]">
            {{ $t("share") }}:
          </p>
          <ShareNetwork network="telegram" :title="title" :url="url">
            <Icon name="telegram" />
          </ShareNetwork>
          <ShareNetwork network="Facebook" :title="title" :url="url">
            <Icon name="faceboook" />
          </ShareNetwork>
          <ShareNetwork network="Linkedin" :title="title" :url="url">
            <Icon name="events_linkedin" />
          </ShareNetwork>
          <ShareNetwork network="twitter" :title="title" :url="url">
            <Icon name="twitter" />
          </ShareNetwork>
          <ShareNetwork network="vk" :title="title" :url="url">
            <Icon name="vk" />
          </ShareNetwork>
        </div>
        <div
          class="inline-flex max-w-[302px] items-center bg-[#E3E8ED] border-[1rem] border-[rgba(133,150,178,0.2)] px-[12rem] py-[8rem]"
          :class="customCss"
        >
          <p
            class="font-normal text-[16rem] leading-[130%] whitespace-nowrap text-[#09204D] mr-[20rem] line-clamp-1 max-w-[290rem] main__share"
          >
            {{ returnUrl(url) }}
          </p>
          <el-tooltip class="tooltip-copy" placement="top" trigger="click">
            <template #content> {{ $t("copied") }} </template>
            <div
              class="transition-all duration-150 bg-[#09204D] px-[8rem] hover:bg-[#133475] pt-[8rem] pb-[6rem] cursor-pointer flex-shrink-0"
              @click="copyUrl"
            >
              <Icon name="copy_link" class="max-w-[24px]" />
            </div>
          </el-tooltip>
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
    title: {
      type: String,
      default: "Toshkent Davlat Yuridik Universiteti",
    },
    views: {
      type: Number,
      default: 0,
    },
    noPrintText: {
      type: Boolean,
      default: true,
    },
    customCss: String,
  },
  data() {
    return {
      url: "",
    };
  },
  methods: {
    print() {
      window.print();
    },

    returnUrl() {
      return (this.url = window.location.href);
    },

    copyUrl() {
      if (this.url !== "") {
        navigator.clipboard.writeText(this.url);
      } else {
      }
    },
  },
};
</script>

<style lang="scss">
//.tooltip-copy{
//  .el-popper.is-dark{
//    z-index: 2 !important;
//  }
//}

.social-sharing-component {
  .socials {
    i svg {
      width: 24rem;
      height: 24rem;
      margin-left: 5rem;
      margin-right: 5rem;
      transition: 0.3s all;
      cursor: pointer;

      path {
        fill-opacity: 1;
        fill: #83878b;
        transition: 0.3s all;
      }

      &:hover {
        transform: translatey(-3rem);
        path {
          fill: #09204d;
        }
      }
    }
  }

  .print {
    p {
      transition: 0.3s all;
    }

    svg {
      path {
        transition: 0.3s all;
      }
    }

    &:hover {
      p {
        color: #09204d;
      }

      svg {
        path {
          fill: #09204d;
        }
      }
    }
  }
}
.main__share {
  position: relative;
}
.main__share:before {
  content: "...";
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 12px;
  background: #e3e8ed;
}
</style>
