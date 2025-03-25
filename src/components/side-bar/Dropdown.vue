<template>
  <div>
    <!-- Header -->
    <router-link to="/" class="flex items-center bg-[#1A2F53] mb-[20rem]">
      <svg
        width="57"
        height="54"
        viewBox="0 0 57 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="57" height="54" fill="#E0E5EC" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19.164 17.6014V19.2707H16.7729C16.7729 18.1898 16.7729 17.1091 16.7729 16.0282C16.7729 15.8552 16.9155 15.7135 17.0897 15.7135C20.5068 15.7135 23.924 15.7135 27.3411 15.7135C27.5154 15.7135 27.6578 15.8552 27.6578 16.0282C27.6578 24.6855 27.6578 33.3427 27.6578 42C21.5847 41.4921 16.7729 36.3965 16.7729 30.2379C16.7729 27.0916 16.7729 24.0161 16.7729 20.8441H19.164V21.7296C19.164 23.5826 20.6903 25.0988 22.5556 25.0988C22.6719 25.0988 22.7728 25.1349 22.8559 25.2174C22.9291 25.2909 22.9753 25.3921 22.9753 25.5025V26.1996C22.9753 26.31 22.9288 26.4112 22.8555 26.4844C22.7822 26.5577 22.6803 26.6032 22.5686 26.6032H18.2008C18.5261 27.6547 19.1606 28.4493 19.948 28.9777C20.8761 29.6 22.0176 29.8542 23.1182 29.726C23.9385 29.6301 24.6385 29.3054 25.2823 28.8501V17.6015L19.164 17.6014ZM25.2823 40.5758V31.2858C24.6094 31.5119 23.8728 31.6513 23.0534 31.6698C21.6061 31.7024 20.2959 31.281 19.164 30.4034V31.7654C19.164 35.7729 21.7144 39.217 25.2823 40.5758ZM29.9712 15.7135C33.3883 15.7135 36.8055 15.7135 40.2226 15.7135C40.3968 15.7135 40.5393 15.8554 40.5393 16.0282C40.5393 17.1091 40.5393 18.1898 40.5393 19.2707H38.1482V17.6014H32.0301V23.569C33.244 23.1994 34.4402 23.1766 35.6918 23.4448C36.6488 23.6503 37.3642 23.9875 38.1482 24.5918V20.844H40.5393V30.2378C40.5393 36.3964 35.7277 41.492 29.6545 41.9999C29.6545 33.3427 29.6545 24.6855 29.6545 16.0282C29.6545 15.8551 29.797 15.7135 29.9712 15.7135ZM32.0301 26.1719V40.5757C34.7671 39.5331 36.9054 37.2632 37.7525 34.4533C38.4843 32.0243 37.3835 29.8956 34.7566 29.8956C34.6449 29.8956 34.543 29.8498 34.4694 29.777C34.3961 29.7041 34.3502 29.6031 34.3502 29.4918V28.7947C34.3502 28.6837 34.3961 28.5822 34.4694 28.5095C34.5436 28.4365 34.6452 28.3911 34.7566 28.3911H39.1217C38.8022 27.3684 38.1894 26.5898 37.4284 26.0639C36.5308 25.4436 35.4253 25.1738 34.3487 25.2677C33.4904 25.3426 32.7385 25.6839 32.0301 26.1719ZM28.656 15.0243C27.2407 14.1105 26.8809 13.8878 25.1527 13.8878C22.4636 13.8878 19.7745 13.8878 17.0854 13.8878C16.9144 13.8878 16.7729 13.7462 16.7729 13.5732V12.3146C16.7729 12.1416 16.9137 12 17.0854 12C19.8819 12 22.6785 12 25.475 12C27.0223 12 27.328 12.1612 28.6767 12.8831C30.0251 12.1612 30.2899 12 31.8371 12C34.6337 12 37.4302 12 40.2269 12C40.3984 12 40.5393 12.1421 40.5393 12.3146V13.5732C40.5393 13.7456 40.3979 13.8878 40.2269 13.8878C37.5377 13.8878 34.8487 13.8878 32.1595 13.8878C30.4314 13.8878 30.0716 14.1105 28.656 15.0243Z"
          fill="#1A2F53"
        />
      </svg>
      <h2 class="text-[18rem] text-white py-[12rem] pl-[16rem]">
        {{ $t("univercity") }}
      </h2>
    </router-link>

    <!-- Body -->
    <div class="sidebar-menu sidebar-style">
      <el-collapse v-model="activeNames" @change="handleChange">
        <div v-for="(item, index) in menus" :key="index">
          <el-collapse-item
            v-if="item.children"
            :title="item.title"
            :name="index"
            :class="{ active: index === activeParent }"
          >
            <router-link
              v-for="(el, idx) in item.children"
              :key="idx"
              :to="`/${el.url}`"
              class="!bg-[#F5F6FA] py-[20px] px-[38px] el-collapse-item__header transition hover:!bg-[#E0E5EC]"
              :class="{ active: activeId === el.id }"
            >
              <h5>{{ el.title }}</h5>
            </router-link>
          </el-collapse-item>
          <div v-else class="py-[20px] px-[38px] el-collapse-item__header">
            <h5>{{ item.title }}</h5>
          </div>
        </div>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      filteredMenu: {},
      menu: [
        {
          id: 15332,
          title: "Life of students",
          url: "/life-of-students",
          child: [
            {
              id: 15333,
              title: "Life of students 1",
              url: "university/charter",
              is_static: false,
              child: [
                {
                  id: 15334,
                  title: "Life of students 1 1",
                  url: "university/documents",
                  is_static: false,
                },
                {
                  id: 15335,
                  title: "Life of students 1 2",
                  url: "structure/management",
                  is_static: false,
                },
              ],
            },
            {
              id: 15334,
              title: "Life of students 2",
              url: "university/documents",
              is_static: false,
            },
            {
              id: 15335,
              title: "Life of students 3",
              url: "structure/management",
              is_static: false,
            },
            {
              id: 15336,
              title: "Life of students 4",
              url: "university/structure",
              is_static: false,
              child: [
                {
                  id: 15334,
                  title: "Documents",
                  url: "university/documents",
                  is_static: false,
                },
                {
                  id: 15335,
                  title: "Leadership",
                  url: "structure/management",
                  is_static: false,
                },
              ],
            },
          ],
        },
        {
          id: 15332,
          title: "Ta'lim",
          url: "/education",
          child: [
            {
              id: 15333,
              title: "Education 1",
              url: "university/charter",
              is_static: false,
              child: [
                {
                  id: 15334,
                  title: "Education 1 1",
                  url: "university/documents",
                  is_static: false,
                },
                {
                  id: 15335,
                  title: "Education 1 2",
                  url: "structure/management",
                  is_static: false,
                },
              ],
            },
            {
              id: 15334,
              title: "Education 2",
              url: "university/documents",
              is_static: false,
            },
            {
              id: 15335,
              title: "Education 3",
              url: "structure/management",
              is_static: false,
            },
            {
              id: 15336,
              title: "Education 4",
              url: "university/structure",
              is_static: false,
              child: [
                {
                  id: 15334,
                  title: "Education 4 1",
                  url: "university/documents",
                  is_static: false,
                },
                {
                  id: 15335,
                  title: "Education 4 2",
                  url: "structure/management",
                  is_static: false,
                },
              ],
            },
          ],
        },
      ],
      activeNames: 0,
      activeId: -1,
      activeParent: -1,
    };
  },
  computed: {
    ...mapState({
      menus: (state) => state.menu.menu,
    }),
  },
  watch: {
    activeParent(val) {
      if (val) {
        this.activeNames = val;
      }
    },
    "$route.path"() {
      this.findChildren();
    },
  },
  mounted() {
    this.filterMenu();
    this.findChildren();
  },
  methods: {
    filterMenu() {
      const route = this.$route.path;
      this.filteredMenu = this.menu.filter((el) => el.url === route)[0];
    },

    findChildren() {
      this.menus.forEach((item, index) => {
        item.children.forEach((el) => {
          if ("/" + el.url === this.$route.path) {
            this.activeId = el.id;
            this.activeParent = index;
          }
        });
      });
    },
  },
};
</script>

<style>
.el-collapse-item__content {
  padding-bottom: 0 !important;
}

.el-collapse-item__header.active {
  background: #1a2f53 !important;
  position: relative;
  color: white !important;
}

.el-collapse-item.active > div > div {
  background: #e0e5ec !important;
  border-bottom: 2px solid #d2d2d2 !important;
}
</style>
