<template>
  <div class="container grid grid-cols-12 mt-[32px] gap-[24px] mb-[88rem]">
    <div class="col-span-9 lg:col-span-12">
      <div class="grid grid-cols-12 gap-[24px]">
        <div
          v-if="pending"
          class="col-span-7 lg:col-span-12 p-[24px] bg-[#F5F6FA] border-[1.6px] border-[#e0e5ec26]"
        >
          <div class="grid gap-[24px]">
            <div>
              <h3
                class="minion text-[32rem] leading-[130%] font-bold text-[#1A2F53] mb-[6px] -500:text-[24rem]"
              >
                {{ $t("address") }}:
              </h3>
              <p class="text-[18rem] leading-[20px] font-[500] text-[#677B9E] _loading">
                {{ footer.address }}
              </p>
            </div>
            <div>
              <h3
                class="minion text-[32rem] leading-[130%] font-bold text-[#1A2F53] mb-[6px] -500:text-[24rem]"
              >
                {{ $t("phone_number") }}:
              </h3>
              <a
                :href="`tel: ${footer?.phone}`"
                class="text-[18rem] leading-[111%] font-[500] text-[#677B9E] _loading"
              >
                {{ formatPhoneNumber(footer?.phone) }}
              </a>
            </div>
            <div>
              <h3
                class="minion text-[32rem] leading-[130%] font-bold text-[#1A2F53] mb-[6px] -500:text-[24rem]"
              >
                {{ $t("email") }}:
              </h3>
              <a
                :href="`tel: ${footer?.email}`"
                class="text-[18rem] leading-[111%] font-[500] text-[#677B9E] _loading"
              >
                {{ footer?.email }}
              </a>
            </div>
          </div>
          <Questions class="mt-[36px]" />
        </div>
        <div
          v-else
          class="col-span-7 lg:col-span-12 p-[24px] bg-[#F5F6FA] border-[1.6px] border-[#e0e5ec26]"
        >
          <div class="grid gap-[24px]">
            <div>
              <h3
                class="minion text-[32rem] leading-[130%] font-bold text-[#1A2F53] mb-[6px] -500:text-[24rem]"
              >
                {{ $t("address") }}:
              </h3>
              <p class="text-[18rem] leading-[20px] font-[500] text-[#677B9E] -500:text-[16rem]">
                {{ footer?.address }}
              </p>
            </div>
            <div>
              <h3
                class="minion text-[32rem] leading-[130%] font-bold text-[#1A2F53] mb-[6px] -500:text-[24rem]"
              >
                {{ $t("phone_number") }}:
              </h3>
              <a
                :href="`tel: ${footer?.phone}`"
                class="text-[18rem] leading-[111%] font-[500] text-[#677B9E] -500:text-[16rem]"
                >{{ formatPhoneNumber(footer?.phone) }}
              </a>
            </div>
            <div>
              <h3
                class="minion text-[32rem] leading-[130%] font-bold text-[#1A2F53] mb-[6px] -500:text-[24rem]"
              >
                {{ $t("email") }}:
              </h3>
              <a
                :href="`mailto: ${footer?.email}`"
                class="text-[18rem] leading-[111%] font-[500] text-[#677B9E] -500:text-[16rem]"
                >{{ footer?.email }}</a
              >
            </div>
          </div>
          <Questions class="mt-[36px] -500:mt-[16px]" />
        </div>
        <div class="col-span-5 lg:col-span-12">
          <ReceptionForm :category="category" />
        </div>

        <div class="col-span-12">
          <div
            v-if="infos?.contacts.length"
            class="bg-foto border-[1.6px] border-[#E0E5EC] p-[24rem]"
          >
            <h3
              class="minion text-[32rem] leading-[130%] font-bold text-[#1A2F53] mb-[32rem] -500:text-[26rem] -500:mb-[18rem]"
            >
              {{ $t("internal_numbers") }}
            </h3>

            <div v-if="false" class="grid grid-cols-2 sm:grid-cols-1 gap-[24px]">
              <div v-for="item in 4" :key="item.phone">
                <h3
                  class="text-[18rem] leading-[130%] font-semibold text-[#1A2F53] mb-[8px] _loading"
                >
                  dsaasdsadsad
                </h3>

                <div class="flex items-center">
                  <Icon name="gray_dark_phone" />
                  <p
                    class="text-[18rem] ml-[8px] leading-[130%] font-semibold text-[#677B9E] _loading"
                  >
                    dsdasddsadsadasd
                  </p>
                </div>
              </div>
            </div>

            <div v-else class="grid grid-cols-2 sm:grid-cols-1 gap-[24px]">
              <div v-for="item in infos.contacts" :key="item.phone">
                <h3
                  class="text-[18rem] leading-[130%] font-semibold text-[#1A2F53] mb-[8px] -500:text-[16rem]"
                >
                  {{ item.employee }}
                </h3>

                <div class="flex items-center">
                  <Icon name="gray_dark_phone" />
                  <a
                    :href="`tel: ${item?.phone}`"
                    class="text-[18rem] ml-[8px] leading-[130%] font-semibold text-[#677B9E] -500:text-[16rem]"
                  >
                    {{ formatPhoneNumber(item.phone) }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="questions && questions.length"
          class="col-span-12 bg-[#F5F6FA] p-[24px] -500:py-[16px] -500:px-[16px] faq"
        >
          <h3
            class="minion text-[32rem] leading-[130%] font-bold text-[#1A2F53] mb-[32rem] uppercase -500:text-[26rem] -500:mb-[18rem]"
          >
            {{ $t("faq") }}
          </h3>
          <div>
            <el-collapse v-if="pending" v-model="accordion" accordion class="questions">
              <el-collapse-item v-for="item in data" :key="item" :name="`asdas`">
                <template #title>
                  <div class="w-full flex items-center justify-between gap-[10px] _loading">
                    Lorem, ipsum dolor.
                    <Icon
                      name="modal_close_btn"
                      color="#1A2F53"
                      class="transition w-[18px] h-[18px] rotate-[45deg]"
                    />
                  </div>
                </template>
                <div class="_loading">Lorem, ipsum dolor.</div>
              </el-collapse-item>
            </el-collapse>

            <el-collapse v-else v-model="accordion" accordion class="questions">
              <el-collapse-item v-for="(item, index) in questions" :key="index" :name="index">
                <template #title>
                  <div class="w-full flex items-center justify-between gap-[10px]">
                    <div class="-500:text-[18rem]" v-html="item.question" />
                    <Icon
                      name="modal_close_btn"
                      color="#1A2F53"
                      class="transition w-[18px] h-[18px] rotate-[45deg]"
                    />
                  </div>
                </template>
                <div class="-500:text-[16rem]" v-html="item.answer"></div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
    </div>
    <!-- SIDE BAR -->
    <div class="col-span-3 lg:col-span-12 flex flex-col gap-[20px]">
      <SideBar />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pending: undefined,
      footer: [],
      questions: [],
      accordion: "1",
      category: "virtual",
      infos: [],
    };
  },
  async created() {
    this.pending = true;
    await Promise.allSettled([
      this.$store.dispatch("fetchFooter"),
      this.$store.dispatch("fetchFaq", {
        degree: "",
        category: "contact",
      }),
      this.$store.dispatch("fetchAbout"),
    ])
      .then((res) => {
        this.footer = res[0].value.data;
        this.infos = res[2].value.data;
        this.questions = res[1].value.data.results;
      })
      .finally(() => {
        this.pending = false;
        this.$store.dispatch("setSlugTitle", this.$t("breadcrumb.contact"));
      });
  },
  methods: {
    formatPhoneNumber(number) {
      const format = number
        ?.replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
      return `+${format && format[1] ? format[1] : ""} ${format && format[2] ? format[2] : ""}

          ${format && format[3] ? format[3] : ""} ${format && format[4] ? format[4] : ""} ${
        format && format[5] ? format[5] : ""
      }`;
    },
  },
};
</script>

<style lang="scss">
.bg-foto {
  background-image: url("@/static/img/bg-vacancy.png");
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: 130px;
}

.questions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: none;

  & .el-icon {
    display: none;
  }

  .el-collapse {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &-item {
      //	border: 1.6px solid #E0E5EC;
      &.is-active {
        .rotate-\[45deg\] {
          transform: rotate(0deg);
          transition: all 0.35s ease-in-out;
        }
      }
    }

    &-item__wrap {
      border: none !important;

      & > div {
        padding: 12rem 24rem !important;
        font-size: 16rem;
        font-weight: 500;
        color: #677b9e;
      }
    }

    &-item__header {
      height: auto;
      background: #ffffff;
      font-weight: 500;
      font-size: 18rem;
      line-height: calc(22 / 18 * 100%);
      color: #1a2f53;
      padding: 12rem 24rem;
      border: none;
    }
  }
}
.faq {
  .el-collapse-item__header {
    @media screen and (max-width: 500px) {
      padding: 20rem;
    }
  }
}
</style>
