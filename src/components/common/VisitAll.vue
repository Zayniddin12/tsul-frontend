<template>
  <div class>
      <router-link
        :to="link"
        class="visit flex items-center cursor-pointer hover:transition-all justify-between py-[18rem] px-[16rem] h-full border-[#E0E5EC] border-[1.6px]"
        :class="customCss"
      >
        <icon v-if="icon" class="mr-[12px]" :name="icon" :class="iconSize" />

        <h6 class="not-italic font-medium text-[14rem] leading-[140%] text-justify text-[#1A2F53]">
          {{ title }}
        </h6>
        <icon name="gray_arrow32" class="arrow w-[32rem] h-[32rem]" />
      </router-link>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    customCss: {
      type: String,
      default: "",
    },
    iconSize: {
      type: String,
      default: "",
    },
  },
  computed: {
    adjustedLink() {
      // Split the link by '/' to get each part of the route
      const parts = this.link.split('/');
      // Check if there are more than one part (more than just the base route)
      if (parts.length > 2) {
        // Remove the second-to-last part (breadcrumb)
        parts.splice(-2, 1);
      }
      // Join the parts back together
      return parts.join('/');
    }
  }
};
</script>

<style lang="scss">
.visit {
  background: transparent;
  transition: all 0.3s ease-out;

  &:hover {
    background: #1a2f53;
    border: 1.6px solid #1a2f53;
    color: white !important;
    transition: all 0.3s ease;
    h6 {
      color: white;
    }

    .icon svg path {
      fill: white !important;
    }

    .arrow svg path {
      stroke: white !important;
      fill: none !important;
    }
  }
}
</style>
