<template>
  <el-dropdown
    class="header__language p-[4px] "
    :hide-timeout="0"
    trigger="click"
    @command="handleCommand"
  >
    <div class="flex-center cursor-pointer " @click="arrowActive = !arrowActive">
      <span class="header__label mr-[8px]">{{ lang?.label }}</span>
      <Icon
        :class="arrowActive ? 'rotate-[180deg]' : 'rotate-[0deg]'"
        class="lang_arrow transition-all duration-300"
        name="lang_arrow"
      />
    </div>
    <template #dropdown>

      <el-dropdown-menu  class="header__dropdown !w-[120px] !z-[999999999] ">
        <el-dropdown-item
          v-for="(item, index) in langs"
          :key="index"
          :command="item"
          class="border-b border-[#E0E5EC] last:border-none !pl-[12px]"
        >
          <div class="flex header__drop-item">
            <img
              v-if="$i18n.locale === item.value"
              src="/src/assets/image/dot.svg"
              alt="lang icon"
            />
            <span
              :class="$i18n.locale === item.value ? 'text-[#1A2F53]' : 'text-[#677B9E]'"
              class="!pl-[8px] "
              >{{ item.label }}
            </span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
export default {
  data() {
    return {
      lang: {},
      arrowActive: false,
      langs: [
        {
          label: "O‘zbekcha",
          value: "sr",
        },
        {
          label: "Ўзбекча",
          value: "uz",
        },
        {
          label: "Русский",
          value: "ru",
        },
        {
          label: "English",
          value: "en",
        },
        // {
        //   label: 'Қарақалпақша',
        //   value: 'kr'
        // }
      ],
    };
  },
  created() {
    const lang = this.langs.find((lang) => lang.value === this.$i18n.locale);
    this.lang = lang || this.langs[0];
  },
  methods: {
    handleCommand(command) {
      this.lang = command;
      this.$i18n.locale = command.value;
      localStorage.setItem("locale", command.value);
      this.$router.go();
      this.arrowActive = !this.arrowActive;
    },
  },
};
</script>

<style lang="scss">
.header__language {
  .lang_arrow svg {
    path {
      transition: 0.2s all;
    }
  }
  &:hover {
    .lang_arrow {
      svg {
        path {
          fill: #cecece !important;
        }
      }
    }
  }
}
.header {
  &__dropdown {
    .el-popper__arrow {
      display: none !important;
    }
  }
  .el-dropdown-menu {
    padding: 0 !important;
  }
  // .header__label
  &__label {
    font-weight: 600;
    font-size: 14rem;
    line-height: 17px;
    color: #ffffff;
  }
  // .header__drop-item
  &__drop-item {
    font-style: normal;
    font-weight: 600;
    font-size: 13rem;
    line-height: 20px;
    color: #677b9e;
  }
}
</style>
