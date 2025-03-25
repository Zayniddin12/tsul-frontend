<template>
  <div
    class="header-main !z-[998] fixed h-screen w-full transition-all ease-in-out duration-300"
    :style="linksOpen ? 'background: rgba(12, 22, 39, 0.90);' : 'top: -100%;'"
  ></div>
  <div>
    <div v-if="data" class="overflow-hidden" :class="otherPagesHeader ? 'header-height' : ''">
      <div
        id="menu-active"
        ref="menu"
        class="menu fixed min-h-[100vh] h-full z-[1000] top-0 left-0 sm:w-full w-full !overflow-y-auto"
        :class="[
          isMenuOpen ? 'menu-active' : '',
          isWidgetOpen || linksOpen ? 'bg-[rgba(12,22,39,0.9)]' : 'bg-[#1A2F53F5] bg-opacity-35',
        ]"
      >
        <div class="container pt-[75rem] pb-[107rem]">
          <div class="flex flex-col mt-[48rem] sm:mt-0">
            <div class="hidden sm:block">
              <div
                v-for="(item, index) in data"
                :key="index"
                class="col-span-2 xl:col-span-3 lg:col-span-4 md:col-span-6"
                :class="{ hidden: !item.children?.length }"
              >
                <div
                  class="flex items-center justify-between cursor-pointer"
                  @click="openChildsMenu(item)"
                >
                  <h4
                    class="minion text-[18px] font-semibold font-[Inter] uppercase text-[#fff] leading-[130%]"
                  >
                    {{ item.title }}
                  </h4>
                  <icon name="down_array" />
                </div>
                <div class="bg-[#E6E8ED] w-[50px] h-[1px] opacity-40 mt-[12px] mb-[12px]"></div>

                <collapse-transition>
                  <div v-if="activeMenu === item.id">
                    <li
                      v-for="(items, indexes) in item.children"
                      :key="indexes"
                      class="company mb-[16rem] transition-all hover:opacity-60"
                    >
                      <router-link
                        class="font-normal text-[13px] leading-[20px] text-[#fff] flex items-start"
                        :to="`/${items.url}`"
                        @click="isMenuOpen = !isMenuOpen"
                      >
                        <Icon class="mr-[10rem] min-w-[8px] mt-[5px] rombs" name="gray_romb" />
                        <p>
                          {{ items.title }}
                        </p>
                      </router-link>
                    </li>
                  </div>
                </collapse-transition>
              </div>
            </div>
            <div class="sm:hidden">
              <div class="grid grid-cols-12 gap-[21rem] mt-[48rem]">
                <div
                  v-for="(item, index) in data"
                  :key="index"
                  class="col-span-2 xl:col-span-3 lg:col-span-4 md:col-span-6"
                  :class="{ hidden: !item.children?.length }"
                >
                  <div>
                    <h6 class="minion text-[14px] font-bold uppercase text-[#fff] leading-[19px]">
                      {{ item.title }}
                    </h6>
                    <div class="bg-[#E6E8ED] w-[50px] h-[1px] opacity-40 mt-[12px] mb-[12px]"></div>

                    <ul>
                      <li
                        v-for="(items, indexes) in item.children"
                        :key="indexes"
                        class="mb-[16rem] transition-all hover:opacity-60"
                      >
                        <router-link
                          class="font-normal text-[13px] leading-[20px] text-[#fff] flex items-start"
                          :to="`/${items.url}`"
                          @click="isMenuOpen = !isMenuOpen"
                        >
                          <Icon class="mr-[10rem] min-w-[8px] mt-[5px] rombs" name="gray_romb" />
                          <p>
                            {{ items.title }}
                          </p>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="gradient w-full h-[100%] transition-all duration-200 top-0"
        :class="
          isWidgetOpen || linksHovered ? 'z-[20] opacity-1 fixed' : 'z-[-1] opacity-0 absolute'
        "
        style="background: rgba(12, 22, 39, 0.9)"
        @click="isWidgetOpen = false"
      ></div>

      <div
        :class="[
          isMenuOpen ? 'on-full-menu-open bg-[#1B2D55] b-bottom sm:w-full w-full' : '',
          isScrolled || otherPagesHeader ? 'after-scroll' : 'before-scroll',
          isLoading ? '!top-[-50%] transition-all ease-in-out duration-100' : '!top-0',
        ]"
        class="fixed w-full z-[2003] top-0 transition-all duration-300 header-wrapper"
      >
        <div
          class="container md:h-[86rem] 2xl:h-[105rem] items-center justify-between flex lg:items-start -460:h-[56rem]"
          :class="[
            isMenuOpen ? 'logo-blue' : '',
            otherPagesHeader ? 'md:h-[85rem]' : '',
            isSearchActive ? 'md:h-[85rem] logo-white' : '',
          ]"
        >
          <div
            class="bg-[#1A2F53] w-[190rem] lg:mt-[-8px] z-[1] h-[106rem] flex-shrink-0 transition-all duration-200 lg:bg-[transparent] lg:absolute lg:right-[50%] lg:transform lg:translate-x-[50%] lg:top-[-8px] lg:h-[112rem]"
            :class="[
              isMenuOpen ? 'bg-[#fff]' : '',
              otherPagesHeader ? 'absolute bottom-0 h-[84rem] lg:bg-transparent' : '',
              isSearchActive ? 'logo-when-search-active' : '',
              { 'resposive-logo-replacer': isMenuOpen },
            ]"
            @click="defaultPosition()"
          >
            <router-link class="w-full h-[100%] flex items-center justify-center" to="/">
              <Icon
                :class="[isMenuOpen ? 'full-menu-header' : '']"
                class="logo -460:mb-[21rem] -470:mb-0 -460:w-[100rem]"
                :name="mainLogo"
              />
            </router-link>
          </div>

          <div
            v-if="isMenuOpen && isSearchActive === false"
            :class="{ 'resposive-lang-replacer': isMenuOpen }"
          >
            <header-lang />
          </div>

          <div class="w-full">
            <div
              class="header transition-all duration-200 lg:hidden"
              :class="
                isScrolled || otherPagesHeader
                  ? 'border-b-[#E0E5EC]'
                  : 'border-b-[rgba(224,229,236,0.1)]'
              "
            >
              <div :class="otherPagesHeader ? '' : 'pl-[24rem]'">
                <div class="flex justify-between items-center">
                  <div class="flex items-center pt-[12rem] pb-[11rem]">
                    <div
                      class="flex flex-col items-center mr-[36rem] lg:mr-0"
                      :class="isScrolled || otherPagesHeader ? 'lang-for-sticky' : ''"
                    >
                      <header-lang />
                    </div>
                    <a
                      :href="`tel:${data2?.phone}`"
                      class="font-semibold text-[14rem] leading-[17rem] text-[#A7AFBD] transition-all duration-200"
                      :class="[
                        isScrolled || otherPagesHeader
                          ? 'hover:text-[#1A2F53]'
                          : 'hover:text-[#fff]',
                        isMenuOpen ? 'hover:text-[#fff]' : '',
                      ]"
                      >{{ data2?.phone }}</a
                    >
                    <Icon class="mr-[6rem] ml-[6rem] sm:hidden" name="empty_gray_cyrcle" />
                    <a
                      href="tel:1050"
                      :class="[
                        isScrolled || otherPagesHeader
                          ? 'hover:text-[#1A2F53]'
                          : 'hover:text-[#fff]',
                        isMenuOpen ? 'hover:text-[#fff]' : '',
                      ]"
                      class="font-semibold text-[14rem] leading-[17rem] transition-all duration-200 text-[#A7AFBD] sm:hidden"
                      >1050</a
                    >
                  </div>
                  <div>
                    <ul class="flex items-center justify-between -1269:hidden">
                      <li
                        v-for="(item, index) in headerTop"
                        :key="index"
                        class="links relative z-[1] cursor-pointer"
                        @click="isMenuOpen = false"
                      >
                        <router-link
                          class="text-[#A7AFBD] pt-[12rem] pb-[11rem] leading-[130%] text-[14rem] font-semibold ml-[24rem] transition-all duration-200"
                          :class="[
                            isScrolled || otherPagesHeader
                              ? 'hover:text-[#1A2F53]'
                              : 'hover:text-[#fff]',
                            isMenuOpen ? 'hover:text-[#fff]' : '',
                          ]"
                          :to="item.url"
                          >{{ item.title }}</router-link
                        >
                        <div class="sub-links-top fixed top-0 bg-[#fff] ml-[24rem]">
                          <router-link
                            v-for="(subs, indexes) in item.children"
                            :key="indexes"
                            class="transition-all duration-200 cursor-pointer group"
                            :to="`/${subs?.url}`"
                          >
                            <p
                              class="text-[#677B9E] flex items-center transition-all duration-200 group-hover:text-[#1A2F53] leading-[20rem] text-[13rem] font-semibold"
                            >
                              <svg
                                class="mr-[8rem]"
                                xmlns="http://www.w3.org/2000/svg"
                                width="6"
                                height="6"
                                viewBox="0 0 6 7"
                                fill="none"
                              >
                                <path
                                  d="M3 0.599976L6 3.59998L3 6.59998L0 3.59998L3 0.599976Z"
                                  fill="#CBD3DE"
                                />
                              </svg>
                              {{ subs.title }}
                            </p>
                          </router-link>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="divider-line w-full h-[1px] absolute left-0 z-[-1] transition-all duration-200 -1024:hidden"
              :class="[
                isScrolled ? 'bg-[#E0E5EC]' : 'bg-[rgba(224,229,236,0.1)]',
                isMenuOpen ? 'bg-[#1A2F53]' : '',
                otherPagesHeader ? 'bg-[#E0E5EC]' : '',
              ]"
            ></div>

            <div class="lg:h-[73rem] lg:pt-[11rem] flex flex-col">
              <div class="pl-[24rem] lg:pl-[0]" :class="isSearchActive ? '!pl-0' : ''">
                <widget
                  :is-open-on-init="isWidgetOpen"
                  :class="{ '!bottom-[52%]': !otherPagesHeader }"
                />

                <transition name="fade" mode="out-in">
                  <div
                    v-if="!isRating"
                    class="flex justify-between items-center lg:pl-[0] relative sm:mt-[5px]"
                    :class="otherPagesHeader ? 'pl-[190rem]' : ''"
                  >
                    <div class="flex items-center w-full !h-full relative">
                      <Icon
                        :class="isMenuOpen ? 'opacity-0 white-svg' : ''"
                        class="toggle-btn cursor-pointer transition-all duration-200 mr-[16rem] lg:flex-shrink-0 toggle_menu"
                        name="toggle_menu"
                        @click="isMenuOpen = !isMenuOpen"
                      />
                      <Icon
                        :class="isMenuOpen ? '' : 'opacity-0 white-svg'"
                        class="cursor-pointer mr-[16rem] absolute left-[0px] transition-all lg:flex-shrink-0 duration-200 close_full_menu"
                        name="close_full_menu"
                        @click="isMenuOpen = !isMenuOpen"
                      />
                      <ul
                        v-if="data && data.length"
                        class="flex items-center -1269:hidden transform duration-200 transition-all ul-li-links"
                        :class="
                          isSearchActive || isMenuOpen
                            ? 'translate-x-[-200px] z-[-5] opacity-0'
                            : 'opacity-1'
                        "
                        @mouseenter="linksOpen = true"
                        @mouseleave="linksOpen = false"
                      >
                        <li
                          v-for="(item, index) in data"
                          :key="index"
                          class="helpers font-medium text-[12rem] leading-[130%] text-[#fff] sublinks-container-wrapper !h-full"
                        >
                          <router-link
                            v-if="item?.url"
                            class="uppercase pt-[17rem] pb-[18rem] pr-[14rem] pl-[14rem] router-links line-clamp-2"
                            :class="isScrolled || otherPagesHeader ? 'text-[#1A2F53]' : ''"
                            :to="item.children && item.children.length ? '' : `/${item.url}`"
                            @click="isMenuOpen = false"
                          >
                            {{ $t(item.title) }}
                          </router-link>

                          <div
                            v-if="item.children && item.children.length"
                            :class="item.children.length > 10 ? 'w-[965rem]' : 'w-[580rem]'"
                            class="grid grid-cols-4 text-[#677B9E] pareeent sublinks-container w-[965rem] bg-[#1A2F53] top-[50rem] absolute flex flex-wrap left-[0px]"
                          >
                            <div
                              v-for="(items, indexes) in item.children"
                              :key="indexes"
                              class="sublinks col-span-1 border-r-[1rem] border-r-solid border-r-[#2C3F60]"
                              @click="hideHeaderWhenLinkClick"
                            >
                              <router-link :to="`/${items.url}`" class="block h-full">
                                <div
                                  class="pt-[13rem] pb-[9rem] px-[22rem] flex flex-col justify-center gap-[12rem]"
                                >
                                  <p
                                    class="transition-all duration-200 line-clamp-2 hover-child text-[#FFF]"
                                  >
                                    {{ $t(items.title) }}
                                  </p>
                                  <Icon class="mini_pattern_lang" name="mini_pattern_lang" />
                                </div>
                              </router-link>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div
                      class="full-menu-header-search-field opacity-1 lg:right-none lg:left-none lg:pl-[0px] right-0 left-0 transition-all duration-200 transform absolute h-[100%] w-full"
                      :class="[
                        isSearchActive
                          ? 'translate-x-[0px] z-[0] opacity-1'
                          : 'translate-x-[100%] z-[-1] opacity-0 ',
                        otherPagesHeader ? 'w-[85%] -1024:w-[100%]' : '',
                      ]"
                    >
                      <div
                        :class="{ 'ml-[190px]  border border-[#E0E5EC]': otherPagesHeader }"
                        class="full-menu-header-search-field-inner relative -1024:!ml-0 h-[55rem]"
                      >
                        <div class="!bg-white/10 flex-center-between px-[12px]">
                          <Icon
                            class="search-btn-decoration z-[1] cursor-pointer"
                            name="header_search"
                            @click="searchFunc()"
                          />
                          <field
                            ref="searchInput"
                            v-model="searchInput"
                            class-input="!bg-transparent !pr-0 !pl-[12px]"
                            :search-func="searchFunc"
                            :placeholder="$t('search')"
                          />
                          <div class="flex-center gap-[12px]">
                            <span
                              class="clear-btn transition-all duration-200 hover:opacity-60 cursor-pointer top-[16px] px-[8px] py-[4px] rounded-[12px] text-center text-[12px] leading-[15px] font-normal"
                              :class="{ 'opacity-20': searchInput.length < 1 }"
                              @click="searchInput = ''"
                              >{{ $t("clear") }}</span
                            >
                            <Icon
                              class="search-x-btn cursor-pointer transition-all duration-200"
                              :class="[isSearchActive ? 'z-[1]' : 'opacity-0']"
                              name="search_x_btn"
                              @click="closeSearch"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      ref="widget"
                      class="flex items-center relative lg:flex-shrink-0"
                      :class="isSearchActive ? 'z-[-4]' : ''"
                    >
                      <div class="relative">
                        <Icon
                          class="mr-[16rem] search-btn cursor-pointer transition-all duration-200 w-[24rem] h-[24rem] lg:mr-0 z-[0]"
                          :class="[
                            isMenuOpen ? 'white-search-svg' : '',
                            isSearchActive ? 'opacity-0' : '',
                          ]"
                          name="header_search"
                          @click="searchActivate"
                        />
                      </div>
                      <router-link to="/pages/yuridik-klinika">
                        <Icon
                          class="mr-[16rem] cursor-pointer lg:flex-shrink-0 gerb lg:hidden relative"
                          :class="isSearchActive ? 'z-[-1]' : 'z-[0]'"
                          name="coat_uzb"
                        />
                      </router-link>
                      <div class="relative lg:hidden">
                        <div
                          class="w-[50px] h-[50px] bg-[#F7A600] flex items-center justify-center cursor-pointer qs-rate__button"
                        >
                          <img
                            class="!w-full !h-full object-cover"
                            :src="ratingList[0]?.image ?? ratingList[0]?.get_image?.middle"
                            :alt="ratingList[0]?.title"
                          />
                        </div>
                        <div
                          class="absolute text-center top-[53px] right-0 w-[236px] p-[20px] bg-[#FFF] z-[200] transition-all duration-200 qs-rate__content"
                        >
                          <h4
                            class="text-[#000000] uppercase text-[16px] leading-[20px] font-semibold"
                          >
                            {{ ratingList[0]?.title }}
                          </h4>
                          <a
                            :href="ratingList[0]?.link"
                            target="_blank"
                            class="flex items-center justify-center mt-[16px] duration-200 hover:scale-[1.05] cursor-pointer"
                          >
                            <img
                              class="max-w-[196px]"
                              :src="ratingList[0]?.stats ?? ratingList[0]?.get_stats?.middle"
                              :alt="ratingList[0]?.title"
                            />
                          </a>
                          <h4
                            class="text-[#000000] text-[16px] leading-[20px] font-medium mt-[16px]"
                          >
                            {{ ratingList[0]?.description }}
                          </h4>
                        </div>
                      </div>

                      <div>
                        <div
                          class="w-[50px] h-[50px] grid place-items-center cursor-pointer lg:hidden"
                          :class="[
                            isWidgetOpen ? 'bg-[#1A2F53]' : 'bg-[#4318BE]',
                            isSearchActive ? 'z-[-1]' : 'z-[0]',
                          ]"
                          @click="isWidgetOpen = !isWidgetOpen"
                          @onWidgetChange="toggleWidget"
                        >
                          <Icon
                            v-if="!isWidgetOpen"
                            name="man_in_cyrcle"
                            class="w-[30rem] h-[29rem]"
                          />
                          <Icon v-else name="close_modal" class="w-[30rem] h-[29rem]" />
                        </div>
                      </div>

                      <div
                        class="w-[50px] h-[50px] aspect-1 lg:hidden flex items-center justify-center bg-[#00AC60] cursor-pointer duration-300 hover:bg-green-500"
                        @click="isRating = !isRating"
                      >
                        <Icon name="ratings" class="block" />
                      </div>
                    </div>
                  </div>
                  <div
                    v-else
                    class="flex items-center lg:pl-[0] sm:mt-[5px] h-full gap-6 border"
                    :class="otherPagesHeader ? 'pl-[190rem]' : ''"
                  >
                    <div class="flex items-center gap-[24px]">
                      <div
                        class="flex-center gap-[4rem] group cursor-pointer"
                        @click="isRating = !isRating"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          @click="isRating = !isRating"
                        >
                          <path
                            d="M12.5 5L7.5 10L12.5 15"
                            stroke="#818DA1"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <p
                          class="text-[14px] font-semibold text-white duration-300 group-hover:!text-[#2B5E9B]"
                          :class="isScrolled || otherPagesHeader ? '!text-[#1A2F53]' : ''"
                        >
                          {{ $t("ratings") }}
                        </p>
                      </div>

                      <div class="!h-[54px] flex items-center">
                        <a
                          v-for="(rating, index) in ratingList"
                          :key="index"
                          :href="rating?.link"
                          target="_blank"
                          class="!h-full relative rating-btn"
                        >
                          <img
                            :src="rating?.get_image?.middle"
                            :alt="rating?.title"
                            class="max-w-[60px] max-h-[54px] !h-full object-cover cursor-pointer"
                          />

                          <div
                            class="absolute text-center top-[54px] left-0 right-0 w-[236px] p-[20px] bg-[#FFF] z-[200] transition-all duration-200 rating-content"
                          >
                            <h4
                              class="text-[#000000] uppercase text-[16px] leading-[20px] font-semibold"
                            >
                              {{ rating?.title }}
                            </h4>
                            <a
                              :href="rating?.link"
                              target="_blank"
                              class="flex items-center justify-center mt-[16px] duration-200 hover:scale-[1.05] cursor-pointer"
                            >
                              <img
                                class="max-w-[196px]"
                                :src="rating?.get_stats?.middle"
                                :alt="rating?.title"
                              />
                            </a>
                            <h4
                              class="text-[#000000] text-[16px] leading-[20px] font-medium mt-[16px]"
                            >
                              {{ rating?.description }}
                            </h4>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>

            <div
              class="divider-line w-full h-[1px] absolute left-0 bottom-0 z-[-1] transition-all duration-200 -1024:hidden"
              :class="[isScrolled ? 'bg-[#E0E5EC]' : 'bg-[none]', isMenuOpen ? 'bg-[#1A2F53]' : '']"
            ></div>
          </div>
        </div>
        <div
          v-if="otherPagesHeader"
          :class="isMenuOpen ? 'bg-[transparent]' : ''"
          class="bg-[#F5F6FA] z-[-1] transition-all duration-200 relative md:hidden"
        >
          <div class="breadcrumbs">
            <div class="container">
              <div
                :class="otherPagesHeader ? 'pl-[214rem]' : ''"
                class="flex items-center lg:pl-[0rem]"
              >
                <ul class="bread-crumbs capitalize">
                  <li>
                    <router-link to="/">
                      {{ $t("breadcrumb.dashboard") }}
                    </router-link>
                  </li>
                </ul>
                <ul v-for="(item, index) in navs" :key="index" class="bread-crumbs text-inherit">
                  <li v-if="item.title !== 'org'">
                    <span v-if="index + 1 === navs.length" class="line-clamp-1 max-w-[400px]">
                      {{ $t(item.title) }}</span
                    >
                    <router-link v-else :to="item.url" class="">
                      {{
                        $t(`breadcrumb.${item.title}`).includes("breadcrumb.")
                          ? formatHyphenatedString(item.title)
                          : $t(`breadcrumb.${item.title}`)
                      }}
                    </router-link>
                    <span v-if="index !== navs.length - 1"></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Icon from "@/components/common/Icon.vue";
import vClickOutside from "v-click-outside";
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";
import { useMediaQuery } from "@vueuse/core";

export default {
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    Icon,
    CollapseTransition,
  },
  data() {
    return {
      showRate: false,
      mainLogo: "logo_uz",
      pending: undefined,
      data2: undefined,
      searchInput: "",
      linksOpen: false,
      isSearchActive: false,
      isScrolled: false,
      isMenuOpen: false,
      otherPagesHeader: false,
      scrollTop: 0,
      linksHovered: false,
      heightDevice: 0,
      data: undefined,
      isRating: false,
      headerTop: [],
      linksTop: [
        {
          title: this.$t("for_applicants"),
          url: "",
          subLinks: [
            { title: this.$t("admission_bachelor"), link: "/pages/admission-to-bachelor" },
            { title: this.$t("admission_magister"), link: "/pages/admission-to-magister" },
            { title: this.$t("education_program"), link: "/curricula" },
          ],
        },
        {
          title: this.$t("for_students"),
          url: "",
          subLinks: [
            { title: this.$t("life_of_students"), link: "/pages/social-activity-motivation" },
            { title: this.$t("class_schedule"), link: "/class-schedule" },
            { title: this.$t("facultys"), link: "/faculties" },
            { title: this.$t("department_kafedra"), link: "/department" },
          ],
        },
        {
          title: this.$t("for_citizens"),
          url: "",
          subLinks: [
            { title: this.$t("reception_of_citizens"), link: "/pages/reception-foreign" },
            { title: this.$t("shopping"), link: "/purchase" },
            { title: this.$t("vacancies"), link: "/vacancy" },
            { title: this.$t("gallery"), link: "/gallery" },
          ],
        },
      ],
      isWidgetOpen: false,
      breadcrumbs: [],
      navs: [],
      filterParams: [],
      activeMenu: undefined,
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.isLoading,
      slugTitle: (state) => state.breadcrumb.slugTitle,
      ratingList: (state) => state.menu.ratingList,
      menu: (state) => state.menu,
    }),
    isMobile: useMediaQuery("(max-width: 1024px)"),
  },
  watch: {
    slugTitle: {
      handler() {
        this.updateBreadcrumb();
      },
      immediate: true,
    },
    $route: {
      handler() {
        this.closeSearch();
        this.updateBreadcrumb();
        this.isSearchActive = false;
      },
      immediate: true,
      deep: true,
    },
    searchInput: function (key) {
      if (key === "") {
        this.searchResults = [];
      }
    },

    "$route.fullPath": {
      handler(a) {
        this.otherPagesHeader = a !== "/";
        this.updateBreadcrumb();
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      immediate: true,
      deep: true,
    },

    isMenuOpen(a) {
      if (a === true) {
        document.body.classList.toggle("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    },
  },

  created() {
    if (this.$i18n.locale === "en") {
      this.mainLogo = "logo_en";
    }
    if (this.$i18n.locale === "ru") {
      this.mainLogo = "logo_ru";
    }
    if (this.$i18n.locale === "uz") {
      this.mainLogo = "logo_uzc";
    }

    this.heightDevice = window.innerHeight;
    window.addEventListener("scroll", this.handleScroll, true);
    this.getData();
    Promise.allSettled([this.$store.dispatch("fetchRatingList")]);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll, false);
  },

  methods: {
    closeSearch() {
      this.isSearchActive = false;
      this.searchInput = "";
    },
    openChildsMenu(item) {
      this.activeMenu = item.id === this.activeMenu ? undefined : item.id;
    },
    hideHeaderWhenLinkClick() {
      console.log("hide header");
      let container = document.querySelector(
        ".sublinks-container-wrapper:hover .sublinks-container"
      );
      container?.classList.add("!hidden");
      setTimeout(() => {
        container.classList.remove("!hidden");
      }, 1000);
      this.linksOpen = false;
    },
    defaultPosition() {
      (this.isMenuOpen = false), window.scrollTo({ top: 0, behavior: "smooth" });
    },
    searchActivate() {
      this.isSearchActive = !this.isSearchActive;
      let searchField = document.querySelector(".form-input");

      if (searchField) {
        searchField.focus();
      }
    },
    toggleWidget() {
      this.isWidgetOpen = false;
    },
    handleScroll() {
      this.scrollTop = window.pageYOffset;

      this.isScrolled = this.scrollTop > 100;
    },
    updateBreadcrumb() {
      this.navs = [];
      this.filterParams = [];
      let title;
      const route = this.$route;
      if (route.params.slug !== undefined) this.filterParams.push(route.params.slug);
      if (route.params.id !== undefined) this.filterParams.push(route.params.id);
      const Fullpath = route.fullPath
        .replace("/sr/", "")
        .replace("/pages/", "")
        .replace("/department/", "")
        .replace("/uz/", "")
        .replace("/ru/", "")
        .replace("/en/", "")
        .replace(/([?]).*$/i, "")
        .split("/");

      if (this.slugTitle) {
        Fullpath[Fullpath.length - 1] = this.slugTitle;
      }

      for (let i = 0; i < Fullpath?.length; i++) {
        if (this.filterParams && this.filterParams.length) {
          for (let j = 0; j < this.filterParams.length; j++) {
            if (Fullpath[i] === this.filterParams[j]) {
              title = Fullpath[i];
            } else if (typeof Fullpath[i] === "string" && Fullpath[i].includes("-")) {
              title = Fullpath[i].split("_").join("-");
            } else if (typeof Fullpath[i] === "object") {
              title = Fullpath[i].name;
            } else {
              title = Fullpath[i];
            }
          }
        } else if (typeof Fullpath[i] === "string" && Fullpath[i].includes("-")) {
          title = this.$t(Fullpath[i].split("_").join("-"));
        } else if (typeof Fullpath[i] === "object") {
          title = Fullpath[i].name;
        } else {
          title = Fullpath[i];
        }
        if (title === "universitysubjects") {
          title = this.$t("subjects_taught");
        }
        const filtered = Fullpath.slice(0, i + 1);
        const url = filtered.join("/").toLowerCase();
        const nav = {
          title,
          url,
        };
        if (nav.title !== "" && nav.title !== "static" && nav.title !== "breadcrumb.") {
          if (typeof nav.title === "string" && !nav.title.toLowerCase().includes("none")) {
            this.navs.push(nav);
          }
        }
      }
    },

    getData() {
      this.pending = true;
      Promise.allSettled([
        this.$store.dispatch("fetchMenu"),
        this.$store.dispatch("fetchPost", {
          type: "news",
          limit: 8,
        }),
      ]).then((res) => {
        this.data = res[0]?.value.data;
      });
      Promise.allSettled([this.$store.dispatch("fetchHeaderTop")]).then((res) => {
        this.headerTop = res[0]?.value.data;
      });
      Promise.allSettled([this.$store.dispatch("fetchFooter")])
        .then((res) => {
          this.data2 = res[0]?.value.data;
        })
        .finally(() => {
          this.pending = false;
        });
    },
    searchFunc() {
      this.$store.commit("SET_VALUE", this.searchInput);
      this.$router.push(`/search`);
      this.isSearchActive = false;
      this.isMenuOpen = false;
      this.searchInput = "";
    },

    formatHyphenatedString(inputString) {
      const words = inputString.split("-");

      const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

      const formattedString = capitalizedWords.join(" ");

      return formattedString;
    },
  },
};
</script>

<style lang="scss">
.group {
  transition: all 0.25s ease-in-out;
  &:hover {
    svg {
      path {
        stroke: #2b5e9b;
      }
    }
  }
}

.el-dropdown__popper.el-popper {
  z-index: 99999999 !important;
  border-radius: 0;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.resposive-logo-replacer {
  @media screen and (max-width: 1024px) {
    display: none !important;
  }
}

.resposive-lang-replacer {
  // text-center absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] z-50
  @media screen and (min-width: 1024px) {
    display: none !important;
  }
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    top: 10px;
    transform: translate(-50%, 0);
  }
}

.b-bottom {
  border-bottom: 0.6px solid #3f5780 !important;
}

.header-height {
  min-height: 138rem;
  @media (max-width: 768px) {
    min-height: 75rem;
  }
}

.only-print-logo {
  display: none;

  @media print {
    display: inline-block;
  }
}

.before-scroll {
  .toggle-btn {
    svg {
      path {
        stroke: #fff;
      }
    }
  }

  .search-btn {
    svg {
      path {
        stroke: #fff;
      }
    }
  }
}

.lang-for-sticky {
  .header__label {
    color: #1a2f53;
  }

  i svg {
    path {
      fill: #1a2f53;
    }
  }
}

.on-full-menu-open.after-scroll {
  .sublinks-container-wrapper a {
    color: #fff !important;
  }

  .divider-line {
    background: #3f5780;
  }
}

.after-scroll {
  background: #fff;
  filter: drop-shadow(0rem 2rem 6rem rgba(0, 0, 0, 0.11))
    drop-shadow(0rem -8rem 54rem rgba(0, 0, 0, 0.15));

  .sublinks-container-wrapper {
    &:hover {
      .router-links {
        color: #fff;
      }
    }
  }

  .divider-line {
    background: #e0e5ec;
  }
  @media (max-width: 1024px) {
    .logo {
      svg {
        path {
          fill: #1a2f53;
        }
      }
    }
  }
}

.sub-links-top {
  box-shadow: 0 2rem 6rem rgba(0, 0, 0, 0.11), 0rem -8rem 54rem rgba(0, 0, 0, 0.15);
  transform: translateY(20%);
  transition-delay: 200s;
  transition: 0.3s all;
  display: flex;
  flex-direction: column;
  min-width: 220px !important;
  max-width: 320px !important;
  opacity: 0;
  z-index: -5;
  visibility: hidden;
  a {
    transform: translateY(-1rem);
    padding: 16px !important;
    border-bottom: solid 1.6px #e0e5ec;
    &:last-child {
      border-bottom: none !important;
    }

    svg path {
      transition: 0.2s all;
    }

    &:hover {
      svg path {
        fill: #1a2f53 !important;
      }
    }
  }
}

.links:hover {
  .sub-links-top {
    transform: translateY(48rem);
    opacity: 1;
    transition-delay: 0.2s;
    z-index: 546;
    visibility: visible;
  }
}

.menu {
  transform: translateX(-100%);
  transition: 0.3s all;

  &::-webkit-scrollbar {
    width: 5px;
    height: 0;
    cursor: pointer;
    background-color: rgb(1, 1, 167);
  }

  &::-webkit-scrollbar-thumb {
    background-color: #677b9e;
    border: 3px solid #677b9e;
  }

  .rombs {
    svg {
      path {
        fill: #2b5e9b;
      }
    }
  }
}

.menu-active {
  transform: translateY(0);
}

.pareeent {
  &:hover .hover-child {
    color: #677b9e;
  }
}

.sublinks {
  height: 65rem;
  i {
    opacity: 0;
    transition: 0.2s all;
    transform: translateY(-6rem);
    svg path {
      fill: #677b9e;
    }
  }

  &:hover {
    i {
      opacity: 0.6;
    }

    background: rgba(255, 255, 255, 0.04);
  }
}

.sublinks-container {
  transition: 0.2s all;
  visibility: hidden;
  opacity: 0;
  transform: translatey(20%);
  transition-delay: 0.2s;
  width: 52.4%;

  .sublinks:hover p {
    color: #fff;
  }

  .mini_pattern_lang {
    svg {
      width: 20rem;
    }
  }
}

.sublinks-container-wrapper {
  transition: 0.2s all;
  &:hover {
    .sublinks-container {
      visibility: visible;
      opacity: 1;
      transform: translate(0%);
      z-index: 999999;

      @media (min-width: 1280px) and (max-width: 1553px) {
        max-width: 996px;
      }

      @media (min-width: 1270px) and (max-width: 1280px) {
        max-width: 986px;
      }
    }
  }

  .router-links {
    transition: 0.2s all;
  }

  &:hover {
    .router-links {
      background: #1a2f53;
    }
  }
}

.on-full-menu-open {
  @media (max-width: 1024px) {
    .logo {
      svg {
        path {
          fill: #fff !important;
        }
      }
    }
  }
}

.breadcrumbs {
  background: #f5f6fa;
  transition: 0.2s all;
}

.bread-crumbs {
  padding: 8rem 0;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  li {
    font-weight: 400;
    font-size: 12rem;
    line-height: 14rem;
    letter-spacing: 0.12em;
    color: #677b9e;
    display: inline-flex;
    transition: 0.2s all;

    a {
      font-weight: 400;
      font-size: 12rem;
      line-height: 14rem;
      letter-spacing: 0.12em;
      color: #1a2f53;
      position: relative;
      padding-right: 20rem;
      display: flex;
      align-items: center;
      transition: 0.2s all;
      transition: 0.3s all;
      i {
        margin-right: 8rem;
      }
      &:after {
        content: " • ";
        display: block;
        position: absolute;
        color: #cbd3de;
        right: 8rem;
        top: 0;
      }

      &:hover {
        color: #000;
      }
    }
  }
}

.qs-rate__content {
  opacity: 0;
  visibility: hidden;
}

.qs-rate__button:hover + .qs-rate__content,
.qs-rate__content:hover {
  opacity: 1;
  visibility: visible;
}

.rating-btn {
  .rating-content {
    opacity: 0;
    visibility: hidden;
  }
}

.rating-btn:hover .rating-content {
  opacity: 1;
  visibility: visible;
}
</style>
