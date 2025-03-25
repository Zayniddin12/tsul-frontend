<template>
  <section class="bg-white flex flex-col gap-[20px]">
    <div v-if="galleryPending" class="h-[500px]">
      <div class="w-full py-[16px] px-[20px] border-[#E0E5EC] border-[1.6px]">
        <h3 class="text-[#1A2F53] text-[22rem] leading-[30px] minion font-bold">
          {{ $t("popular_news") }}
        </h3>
      </div>
      <popular-news-pr :height="'250px'"/>
     </div>
    <div v-else>
      <PCPopularNews :current-news="newsState" />
    </div>
      <CurrentNews :current-news="anonsState" />
     <Social-networks :links="footer" :is-pending="pending" />
  </section>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "SideBar",
  props: {
    isSearchResults: {
      type: Boolean,
    },
    showCurrentNews: {
      type: Boolean,
      default: true,
    },
    showRectorAppeal: {
      type: Boolean,
      default: true,
    },
    showTelegram: {
      type: Boolean,
      default: true,
    },
    showSidebar: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      defaultActive: "",
      currentActiveSidebar: "",
      activeNames: 1,
      telegramText: this.$t("join_to_telegram"),
      subscribe: this.$t("subscribe"),
      shuffleArray: ["news", "telegram", "social", "appeal"],
      currentShow: undefined,
      pending: false,
      footer: undefined,
      telegramLink: undefined,
      menu: [],
      currentPath: [],
      filteredMenu: undefined,
      currentUrl: undefined,
      galleryPending: true,

    };
  },

  computed: {
    computedMenu() {
      return this.menu.filter((item) => {
        return item.children.length > 0;
      });
    },
    ...mapState({
      newsState: (state) => state.post.sidebarNews,
      anonsState: (state) => state.post.sidebarAnons,
    }),
  },

  async created() {
    this.galleryPending = true;
    this.currentPath = this.$route.path.split("/");
    this.currentPath = this.currentPath.filter((el) => {
      return el !== "" && el !== "org";
    });

    for (let i = 0; i < this.currentPath.length; i++) {
      if (i !== 0) {
        this.currentPath[i] = "/" + this.currentPath[i];
      }
    }

    this.currentUrl = this.currentPath.toString().replace(/,/g, "");
    if (this.$route.fullPath.includes("org")) {
      this.currentUrl = "org/" + this.currentUrl;
    }

    this.currentShow = this.shuffleArray[Math.floor(Math.random() * this.shuffleArray.length)];
    this.pending = true;
    await Promise.allSettled([
      this.$store.dispatch("fetchSidebarPost", {
        type: "news",
        limit: 4,
        post_status: "actual",
      }),
      this.$store.dispatch("fetchTopPost"),
      this.$store.dispatch("fetchFooter"),
      this.$store.dispatch("fetchMenu"),
      this.$store.dispatch("fetchSidebarPost", {
        type: "event",
        limit: 4,
      }),
    ])
      .then((res) => {
        this.footer = res[2]?.value?.data?.links;
        this.telegramLink = res[3]?.value?.data?.links?.find((item) => item.title === "Telegram");
        this.menu = res[3]?.value?.data;
        setTimeout(() => {
          let allPanels = document.querySelectorAll(".panel-link");
          allPanels.forEach((panel) => {
            if (panel.classList.contains("router-link-exact-active")) {
              this.currentActiveSidebar = Number(
                panel.parentElement.parentElement.querySelector("div").id
              );
              let item = document.getElementById(`${this.currentActiveSidebar}-main`);
              let allItems = document.querySelectorAll(".accordion-panel");
              allItems.forEach((item) => {
                item.style.height = 0;
              });
              let itemHelper = document.getElementById(`${this.currentActiveSidebar}-helper`);
              item.style.height = itemHelper.clientHeight + "px";
              return;
            }
          });
        }, 100);
      })
      .finally(() => {
        this.pending = false;
        this.galleryPending = false;
      });

    for (let i = 0; i < this.menu.length; i++) {
      for (let k = 0; k < this.currentPath.length; k++) {
        for (let j = 0; j < this.menu[i].children.length; j++) {
          if (this.menu[i].children[j].url == this.currentUrl) {
            this.filteredMenu = this.menu[i];
          } else if (this.menu[i].url == this.currentPath[k]) {
            this.filteredMenu = this.menu[i];
          }
        }
      }
    }
  },
  methods: {
    handleToggle(id) {
      let item = document.getElementById(`${id}-main`);
      let allItems = document.querySelectorAll(".accordion-panel");
      allItems.forEach((item) => {
        item.style.height = 0;
      });
      if (this.currentActiveSidebar !== id) {
        let itemHelper = document.getElementById(`${id}-helper`);
        this.currentActiveSidebar = id;
        item.style.height = itemHelper.clientHeight + "px";
      } else {
        this.currentActiveSidebar = -1;
        item.style.height = 0;
      }
    },
  },
};
</script>
<style lang="scss">
.accordion-panel {
  height: 0px;
  transition: 0.5s linear;
  overflow: hidden;
  // &.active {
  //   height: 200px;
  // }
}

.collapse-arrow {
  transition: 0.3s ease-in-out;
}
.router-l.router-link-active {
  background: #1a2f53;
  span {
    color: #fff !important;
  }
}

.sidebar-items {
  position: relative;
  &:hover {
    svg path {
      // fill: #e0e5ec !important;
    }
    &::after {
      content: url("../../static/img/sidebar-pattern.svg");
      position: absolute;
      bottom: -47px;
      right: 0;
    }
  }
}
</style>
