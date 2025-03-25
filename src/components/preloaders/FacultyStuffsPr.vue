<template>
  <div
    
    class="
      faculty-stuffs
      -425:flex-center-center
      mx-auto
      relative
      bg-[#F5F6FA]
      cursor-pointer
      border-[1.6px]
      w-full
      border-[#E0E5EC]
      p-[24rem]
      -425:p-[16px]
      flex
      items-center
      -425:block
      gap-[28rem]
    "
    :class="customClass"
  >
    <img
      :src="img"
      class="
        w-full
        _loading
        h-full
        max-w-[151px]
        -425:w-[153px] -425:h-[160px]
        max-h-[211px]
        -425:ml-auto -425:mr-auto
        object-cover object-top-center
        translate-y-[-48px]
        -425:translate-y-[-24px]
      "
      alt="random-img"
    />
    <div class>
      <h1
        class="
          not-italic
          !mb-[5rem]
          _loading
          font-bold
          text-[24rem]
          -425:text-[16rem]
          leading-[130%]
          minion
          text-[#1A2F53]
        "
      >
        hi
      </h1>
      <p
        class="
          not-italic
          font-semibold
          _loading
          -425:text-[12rem]
          text-[12rem]
          leading-[130%]
          text-[#677B9E]
        "
      >
        da's;d'a;s'd
      </p>
      <p
        class="
          not-italic
          font-semibold
          _loading
          -425:text-[12rem]
          text-[12rem]
          mt-[5rem]
          w-[60%]
          leading-[130%]
          mb-[20rem]
          text-[#677B9E]
        "
      >
        da's;d'a;s'd
      </p>
      <hr class="w-[50rem] h-[1px] _loading bg-[#2B5E9B] mb-[20rem]" />
      <div class="flex justify-between">
        <div class="grid gap-[12rem]">
          <a class="flex gap-[8rem]">
            <Icon
              name="gray_phone"
              color="#8394B1"
              class="_loading w-[20rem] h-[20rem]"
            />
            <span
              class="
                not-italic
                font-medium
                _loading
                -425:text-[12rem]
                text-[14rem]
                leading-[20rem]
                text-[#1A2F53]
              "
              >{{ phone }}</span
            >
          </a>
          <a class="flex gap-[8rem] word-break">
            <Icon
              name="gray_mail"
              color="#8394B1"
              class="w-[20rem] _loading h-[20rem]"
            />
            <span
              class="
                not-italic
                font-medium
                -425:text-[12rem]
                text-[14rem]
                _loading
                leading-[20rem]
                text-[#1A2F53]
              "
              >{{ mail }}</span
            >
          </a>
        </div>
        <div
          class="management-card__soclinks flex items-end faculty_links z-[50]"
        >
          <div class="flex items-center justify-end gap-[12rem]">
            <a
              :href="facebook"
              target="_blank"
              class="
                w-[24rem]
                bg-[#8596b233]
                flex
                items-center
                justify-center
                _loading
                h-[24rem]
                bg-[#E0E5EC]
                z-80
                hover:!bg-[#2B5E9B]
                border-[0.4px]
              "
            >
              <Icon
                name="faceboook"
                color="#8596B2"
                class="w-[14rem] h-[14rem] _loading"
              />
            </a>
            <a
              :href="linkedin"
              class="
                w-[24rem]
                bg-[#8596b233]
                flex
                items-center
                justify-center
                h-[24rem]
                _loading
                bg-[#E0E5EC]
                border-[0.4px]
                z-80
                hover:!bg-[#2B5E9B]
              "
              target="_blank"
            >
              <Icon
                name="linkedin"
                color="#8596B2"
                class="w-[14rem] h-[14rem] _loading"
              />
            </a>
            <a
              :href="gmail"
              class="
                w-[24rem]
                _loading
                bg-[#8596b233]
                flex
                items-center
                justify-center
                h-[24rem]
                bg-[#E0E5EC]
                border-[0.4px]
                z-80
                hover:!bg-[#2B5E9B]
              "
              target="_blank"
            >
              <Icon
                name="google"
                color="#8596B2"
                class="_loading w-[14rem] h-[14rem]"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fullName: {
      type: String,
      default: "dasd",
    },
    desc: {
      type: String,
      default: "dasdasdasdasdasdasdasdasd",
    },
    phone: {
      type: String,
      default: "dasdasdasdasd",
    },
    mail: {
      type: String,
      default: "asdasda",
    },
    gmail: {
      type: String,
      default: "dasdasdasd",
    },
    facebook: {
      type: String,
      default: "dasdasdsaasdasdasdasdasdasdasd",
    },
    linkedin: {
      type: String,
      default: "dasdsadasdasdasdasdsadasdasdasd",
    },
    link: {
      type: String,
      default: "dasdasdasdasdasdasdasdasd",
    },
    img: {
      type: String,
      default: "",
    },
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
.faculty-stuffs {
  transition: all 0.3s;
  width: 100% !important;

  @media (max-width: 425px) {
    // width: calc(100% - 36px) !important;
  }

  &:hover {
    transition: all 0.3s;
  }
  &::after {
    content: url("@/static/img/stuffs.svg");
    position: absolute;
    bottom: 0%;
    right: 0%;
    transform: translate(0%, 0%);
    z-index: 1;
  }
}

.faculty_links {
  a {
    transition: all 0.3s;
    &:hover {
      transition: all 0.3s;

      svg path {
        transition: all 0.3s;
        fill: white !important;
        fill-opacity: 1;
      }
    }
  }
}
</style>
