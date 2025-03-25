<template>
  <div class="interactive-cards-section interactive mb-[98rem]">
    <div class="bg-[#1A2F53] pt-[48rem] pb-[60rem] md:pt-[24rem] sm:pb-[40rem]">
      <page-title class="white-page-title" :title="$t('interactive_services')" />
    </div>
    <div class="mt-[-28rem]">
      <div class="interactive__top-btns">
        <div
          v-for="(item, index) in interactiveGroup"
          :key="item.name"
          class="interactive__btn"
          :class="{ 'active-tab': tab === index + 1 }"
          @click="tab = index + 1"
        >
          <p>{{ item.name }}</p>
          <icon class="active-underline" name="smallActiveUnderline" />
        </div>
      </div>
    </div>

    <Transition name="fade" mode="out-in">
      <div :key="tab">
        <div v-if="interactiveList?.length" class="interactive__cards">
          <a
            v-for="item in interactiveList"
            :key="item.slug"
            :href="correctUrl(item.url)"
            target="_blank"
            class="interactive__card"
          >
            <div class="interactive__card-header">
              <div class="flex w-full items-start">
                <icon name="ancett" />
                <p class="line-clamp-1 ml-[12px]">{{ item.title }}</p>
              </div>
              <icon class="arrow" name="arrow_right_button" />
            </div>

            <div class="interactive__card-body h-full">
              <p class="line-clamp-2">{{ item.subtitle }}</p>
            </div>
          </a>
        </div>
        <div v-else>
          <NoData class="!min-h-[auto]" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      interactiveGroup: [],
      interactiveItems: [],
      tab: 1,
      forApplicants: [],
      forStudents: [],
      forCitizens: [],
      iconName: "acceptance",
      tabsData: [
        {
          label: this.$t("for_applicants"),
          name: "third",
        },
        {
          label: this.$t("for_students"),
          name: "second",
        },
        {
          label: this.$t("for_citizens"),
          name: "first",
        },
      ],
    };
  },
  computed: {
    interactiveList() {
      switch (this.tab) {
        case 1:
          return this.forApplicants;
        case 2:
          return this.forStudents;
        default:
          return this.forCitizens;
      }
    },
  },
  created() {
    this.getData();
    this.correctUrl();
  },

  methods: {
    correctUrl(item) {
      const pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$", // fragment locator
        "i"
      );
      if (pattern.test(item)) {
        return item;
      } else {
        return `/${item}`;
      }
    },
    getData() {
      Promise.allSettled([
        this.$store.dispatch("fetchInteractiveGroup"),
        this.$store.dispatch("fetchInteractive", 3),
        this.$store.dispatch("fetchInteractive", 2),
        this.$store.dispatch("fetchInteractive", 1),
      ]).then((res) => {
        this.interactiveGroup = res[0].value.data.results;
        this.forApplicants = res[1].value.data.results;
        this.forStudents = res[2].value.data.results;
        this.forCitizens = res[3].value.data.results;
      });
    },
  },
};
</script>

<style lang="scss">
/* apply transition to moving elements */
.interactive-animation-enter-active,
.interactive-animation-leave-active {
  transition: all 0.9s linear;
}

.interactive-animation-leave-to {
  opacity: 0;
  max-height: 145px;
  overflow: hidden;
  .interactive__card {
    transform: translateY(250px);
    // transform: rotate(180deg);
  }
  // transform: scale(0.5);
  // transform: translateX(0);
  // transform: scale(0.6);
}

.interactive-animation-enter-from {
  opacity: 0;
  .interactive__card {
    transform: translateY(-250px);
    // transform: rotate(90deg);
  }
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.interactive-animation-leave-active {
  position: absolute;
}
.interactive {
  &__top-btns {
    display: flex;
    gap: 48px;
    justify-content: center;
    margin-bottom: 24px;
    .active-tab {
      background: #2b5e9b;
      border: 1.6px solid rgba(255, 255, 255, 0.2);
      color: white;
    }
    @media screen and (max-width: 768px) {
      gap: 12px;
    }
    @media screen and (max-width: 480px) {
      overflow: auto;
      justify-content: flex-start;
      margin-left: 16px;
      padding-right: 16px;
    }
    /* width */
    &::-webkit-scrollbar {
      width: 0px;
    }
  }

  // .interactive__btn
  &__btn {
    position: relative;
    padding: 16px 48px;
    background: #ffffff;
    border: 1.6px solid #e0e5ec;
    color: white;
    font-weight: 500;
    font-size: 15rem;
    line-height: 140%;
    color: #8c97a9;
    transition: all 0.3s ease;
    cursor: pointer;

    @media screen and (max-width: 768px) {
      padding: 8px;
      min-width: fit-content;
      text-align: center;
      font-size: 15rem;
    }

    svg {
      fill: #fff;
    }

    &:hover {
      background: #2b5e9b;
      border: 1.6px solid rgba(255, 255, 255, 0.2);
      color: white;
    }

    .active-underline {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  // .interactive__cards
  &__cards {
    display: grid;
    overflow: hidden;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 1fr;
    grid-column-gap: 21px;
    grid-row-gap: 21px;
    max-width: 1280px;
    margin: auto;
    margin-bottom: 60px;
    padding: 0 16px;
    min-height: 166px;
    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 500px) {
      grid-template-columns: repeat(1, 1fr);
    }
    // display: flex;
    // gap: 24px;
    // margin: 0 auto;
    // align-items: stretch;
    // justify-content: stretch;
  }

  // .interactive__card
  &__card {
    cursor: pointer;
    width: 100%;
    transition: 0.3s ease;

    // .interactive__card-header
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 20px 10px;
      background: #1a2f53;
      border: 1px solid rgba(255, 255, 255, 0.15);

      .arrow {
        width: 24px;
        height: 24px;
        path {
          transition: 0.3s ease;
        }
      }

      p {
        font-family: "Minion 3", sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 20rem;
        line-height: 28px;
        color: #ffffff;
      }
    }

    // .interactive__card-body
    &-body {
      padding: 16px;
      background: #e0e5ec;
      width: 95%;
      margin: auto;

      p {
        font-family: "Inter", sans-serif;
        font-weight: 400;
        font-size: 15rem;
        line-height: 140%;
        color: #8c97a9;
        transition: 0.3s ease;
      }
    }

    &:hover {
      .interactive__card-body {
        p {
          color: #1a2f53;
        }
      }
      .arrow {
        path {
          stroke: white;
        }
      }
    }
  }
}
.white-page-title {
  .section-titles {
    color: white !important;
  }

  i svg {
    path {
      fill: #fff;
    }
  }
}
</style>
