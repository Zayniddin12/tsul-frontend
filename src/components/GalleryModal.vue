<template>
  <transition name="fade">
    <div
      v-show="isModal"
      class="fixed w-full h-full top-0 left-0 z-[9999] flex items-center justify-center"
    >
      <div
        class="bg-[#0D182C] top-0 left-0 opacity-90 w-full h-full print-hidden"
        @click="$emit('modalClose')"
      />
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center h-screen max-h-screen w-[55%] -768:w-[75%]"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-white text-[16rem] font-medium leading-[19rem] flex items-center">
            <span class="shrink-0">{{ activeSlider + 1 }} / {{ slides?.length }}</span>
            <svg
              class="mx-[8px]"
              width="3"
              height="3"
              viewBox="0 0 3 3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="1.5" cy="1.5" r="1.5" fill="white" fill-opacity="0.4" />
            </svg>
            <span class="line-clamp-1">
              {{ title }}
            </span>
          </h2>

          <button
            class="group cursor-pointer ml-[20px] -768:ml-[4px] translate-x-full"
            @click="$emit('modalClose')"
          >
            <Icon
              class="cursor-pointer modal-btn-hover"
              name="modal_close_btn"
              @click="$emit('modalClose')"
            />
          </button>
        </div>
        <div class="thumb-example relative pt-20 z-10 w-full left-0">
          <div class="slider-box flex-center max-w-[1062px] relative">
            <swiper
              id="main-swiper"
              class="top-swiper !h-full relative swiper"
              :modules="modules"
              :space-between="8"
              :navigation="{
                nextEl: '.swiper-btn-next',
                prevEl: '.swiper-btn-prev',
              }"
              :thumbs="{ swiper: thumbsSwiper }"
              :effect="'fade'"
              @swiper="onSwiperInit"
              @slideChange="changaSlide"
            >
              <swiper-slide
                v-for="(item, index) in slides"
                :key="index"
                class="slide flex h-full justify-center !transition !duration-300 !opacity-0 !max-h-[598px]"
              >
                <div
                  v-if="item?.get_image ?? item?.origin"
                  class="relative w-full max-h-[100%] bg-white/70"
                >
                  <img
                    :src="item?.get_image?.origin ?? item?.origin"
                    class="!h-full !object-contain rounded-2xl pointer-events-none select-none"
                  />

                  <div
                    style="background: rgba(26, 47, 83, 0.8)"
                    class="absolute z-10 flex items-center bottom-0 right-0 p-[13px]"
                  >
                    <!--                    <div-->
                    <!--                      class="pr-[13px] cursor-pointer hover:brightness-50 active:brightness-0"-->
                    <!--                      @click="downloadClick(item?.get_image?.origin || item?.origin)"-->
                    <!--                    >-->
                    <!--                      <svg-->
                    <!--                        width="24"-->
                    <!--                        height="24"-->
                    <!--                        viewBox="0 0 24 24"-->
                    <!--                        fill="white"-->
                    <!--                        xmlns="http://www.w3.org/2000/svg"-->
                    <!--                      >-->
                    <!--                        <path-->
                    <!--                          d="M14.3996 11.4001C14.3996 12.3937 13.7545 13.2001 12.9596 13.2001H11.0396C10.2447 13.2001 9.59961 12.3937 9.59961 11.4001V5.4001C9.59961 4.4059 10.2447 3.6001 11.0396 3.6001H12.9596C13.7545 3.6001 14.3996 4.4059 14.3996 5.4001V11.4001Z"-->
                    <!--                          fill="white"-->
                    <!--                        />-->
                    <!--                        <path-->
                    <!--                          d="M13.3949 14.5752C12.0023 15.9436 12.0193 15.9399 10.6292 14.5752L6.48111 10.5008C5.71881 9.7496 5.89375 9.6001 6.78426 9.6001H17.2436C18.0476 9.6001 18.3072 9.7496 17.5443 10.5002L13.3949 14.5752Z"-->
                    <!--                          fill="white"-->
                    <!--                        />-->
                    <!--                        <path-->
                    <!--                          d="M18.0921 15.6001V17.6572C18.0921 17.9406 17.844 18.1715 17.5383 18.1715H6.46134C6.15562 18.1715 5.9075 17.9406 5.9075 17.6572V15.6001H4.7998V17.6572C4.7998 18.5089 5.54417 19.2001 6.46134 19.2001H17.5383C18.4554 19.2001 19.1998 18.5089 19.1998 17.6572V15.6001H18.0921Z"-->
                    <!--                          fill="white"-->
                    <!--                        />-->
                    <!--                      </svg>-->
                    <!--                    </div>-->
                    <a
                      :href="item?.get_image?.origin || item?.get_image?.middle"
                      download
                      target="_blank"
                      class="pr-[13px] cursor-pointer hover:brightness-50 active:brightness-0"
                      @click="downloadClick(item?.get_image?.origin)"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.3996 11.4001C14.3996 12.3937 13.7545 13.2001 12.9596 13.2001H11.0396C10.2447 13.2001 9.59961 12.3937 9.59961 11.4001V5.4001C9.59961 4.4059 10.2447 3.6001 11.0396 3.6001H12.9596C13.7545 3.6001 14.3996 4.4059 14.3996 5.4001V11.4001Z"
                          fill="white"
                        />
                        <path
                          d="M13.3949 14.5752C12.0023 15.9436 12.0193 15.9399 10.6292 14.5752L6.48111 10.5008C5.71881 9.7496 5.89375 9.6001 6.78426 9.6001H17.2436C18.0476 9.6001 18.3072 9.7496 17.5443 10.5002L13.3949 14.5752Z"
                          fill="white"
                        />
                        <path
                          d="M18.0921 15.6001V17.6572C18.0921 17.9406 17.844 18.1715 17.5383 18.1715H6.46134C6.15562 18.1715 5.9075 17.9406 5.9075 17.6572V15.6001H4.7998V17.6572C4.7998 18.5089 5.54417 19.2001 6.46134 19.2001H17.5383C18.4554 19.2001 19.1998 18.5089 19.1998 17.6572V15.6001H18.0921Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                    <span
                      id="imagee"
                      ref="imageElement"
                      class="cursor-pointer relative border-r border-l border-white px-[13px]"
                      @click="copyToClipboard(item?.get_image?.origin ?? item?.origin)"
                    >
                      <span
                        :class="{ 'opacity-100': visible, 'opacity-0': !visible }"
                        class="inline-flex text-white top-[-35px] bg-[#365879a2] rounded-[4px] px-[8px] py-[4px] left-[-45%] absolute duration-200"
                      >
                        <h5 class="text-[13rem]">
                          {{ $t("copied") }}
                        </h5>
                      </span>
                      <span class="hover:brightness-50 active:brightness-0">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 7.65685 16.3431 9 18 9Z"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C16.3431 15 15 16.3431 15 18C15 19.6569 16.3431 21 18 21Z"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.7002 13.2998L15.3002 16.6998M8.7002 10.6998L15.3002 7.2998L8.7002 10.6998Z"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </span>

                    <span
                      class="pl-[13px] cursor-pointer hover:brightness-50 active-brightness-0"
                      @click="printDiv(item.get_image.origin)"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 8H5C3.34 8 2 9.34 2 11V17H6V21H18V17H22V11C22 9.34 20.66 8 19 8ZM16 19H8V14H16V19ZM19 12C18.45 12 18 11.55 18 11C18 10.45 18.45 10 19 10C19.55 10 20 10.45 20 11C20 11.55 19.55 12 19 12ZM18 3H6V7H18V3Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
          <div class="relative">
            <swiper
              :modules="modules"
              :space-between="16"
              v-bind="options"
              :prevent-clicks="false"
              :prevent-clicks-propagation="false"
              class="thumbs-swiper display-none-print !pb-10 max-w-[1062px]"
              :watch-slides-progress="true"
              :slides-per-view="6"
              @swiper="setThumbsSwiper"
            >
              <swiper-slide
                v-for="(item, index) in slides"
                :key="index"
                class="slide relative cursor-pointer group rounded-md"
              >
                <img
                  v-if="item?.get_image ?? item?.middle"
                  :src="item?.get_image?.middle ?? item?.middle"
                  class="rounded-md h-[80px] !object-cover !object-center"
                  alt=""
                />
                <div class="gradient-background absolute top-0 left-0 w-full h-full rounded-md" />
              </swiper-slide>
            </swiper>

            <button
              class="md:hidden swiper-btn-prev absolute -left-[12px] top-1/2 -translate-y-1/2 -translate-x-full text-[20rem] cursor-pointer transition duration-300 modal-btn-hover"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.333 28H22.6663L14.6663 16L22.6663 4H17.333L9.33301 16L17.333 28Z"
                  fill="#818790"
                />
              </svg>
            </button>

            <button
              class="-768:hidden swiper-btn-next absolute -right-[12px] translate-x-full top-1/2 -translate-y-1/2 text-[20rem] rotate-180 cursor-pointer transition duration-300 modal-btn-hover"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.333 28H22.6663L14.6663 16L22.6663 4H17.333L9.33301 16L17.333 28Z"
                  fill="#818790"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import axios from "axios";

function downloadClick(imgUrl) {
  axios({
    url: imgUrl,
    method: "GET",
    responseType: "blob",
  })
    .then((response) => {
      console.log(response.data);
      var fileUrl = window.URL.createObjectURL(new Blob([response.data]));
      var fileLink = document.createElement("a");
      fileLink.href = fileUrl;

      fileLink.setAttribute("download", imgUrl);
      document.body.appendChild(fileLink);

      fileLink.click();
    })
    .catch((error) => {
      console.error("Error fetching image:", error);
    });
}

// download qilganda img link yani rasmni import qilivchi vosita linki yoq,
//  core error beryabti devops to'g'rilab berishi kerak ekan

import { ref, defineEmits, watch, defineProps } from "vue";
import { Navigation, Thumbs, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";

const visible = ref(false);

async function copyToClipboard(item) {
  try {
    await navigator.clipboard.writeText(item);
    visible.value = true;
    setTimeout(() => {
      visible.value = false;
    }, 2000);
  } catch (err) {}
}

function printDiv(item) {
  const url = item;
  const w = window.open("", "");
  w.document.write(`<html>
                      <head></head>
                      <body>
                        <img id="print-image-element" src="${url}" alt="" />
                      </body>

                   </html>`);
  w.window.print();
}

const thumbsSwiper = ref();
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

const activeSlider = ref(-1);
const props = defineProps({
  isModal: { type: Boolean, default: false },
  activeSlide: { type: Number },
  slides: { type: Array, default: null },
  title: {
    type: String,
    default: "",
  },
  single: {
    type: Boolean,
    default: false,
  },
});
const imageInput = ref();
const imageValue = ref();
function copyImageAdress(data) {
  imageValue.value = data;
  imageInput.value.focus();
  // named.focus()
  document.execCommand("copy");
}
const mainSwiper = ref();
const onSwiperInit = (e) => {
  mainSwiper.value = e;
};
const changaSlide = (e) => {
  activeSlider.value = e.activeIndex;
};
const emit = defineEmits(["modalClose"]);
function keyUp(event) {
  if (event.keyCode === 27) {
    emit("modalClose");
  } else if (event.keyCode === 39) {
    mainSwiper.value.slideNext(300);
  } else if (event.keyCode === 37) {
    mainSwiper.value.slidePrev(300);
  }
}

const options = {
  breakpoints: {
    320: {
      slidesPerView: 2,
    },
    620: {
      slidesPerView: 3,
    },
    780: {
      slidesPerView: 3.5,
    },
    1024: {
      slidesPerView: 4.5,
    },
    1280: {
      slidesPerView: 5.5,
    },
  },
};
watch(
  () => props.isModal,
  (newValue) => {
    if (newValue) {
      document.body.style.setProperty("overflow", "hidden", "important");
      document.body.style.paddingRight = "5px";
      document.addEventListener("keydown", keyUp);
      mainSwiper.value.slideTo(props.activeSlide, 100);
    } else {
      document.body.style.setProperty("overflow", "auto", "important");
      document.addEventListener("keydown", keyUp);
      document.body.style.paddingRight = "0px";
    }
  }
);
watch(
  () => props.activeSlide,
  (newValue) => {
    activeSlider.value = newValue;
  }
);

const modules = [Navigation, Thumbs, EffectFade];
</script>

<style>
.swiper-wrapper {
  max-height: 598px;
  object-fit: cover;
}

.modal-btn-hover svg path {
  transition: fill 0.5s;
}

.modal-btn-hover:hover svg path {
  fill: #fff;
}

.swiper-button-disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.swiper-slide-visible {
  opacity: 1 !important;
  transition: 0.3s ease-in-out;
}

.top-swiper .slide img,
.thumbs-swiper .slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.gradient-background {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)) !important;
  opacity: 0.6;
  transition: 0.3s ease-in-out;
}

.top-swiper {
  height: 100%;
  width: 100%;
}

.thumbs-swiper {
  height: 20%;
  box-sizing: border-box;
  margin: 16px 0;
}
.thumbs-swiper .swiper-slide {
  transition: 300ms all;
  height: 110px !important;
}

.thumbs-swiper .swiper-slide-thumb-active .gradient-background,
.thumbs-swiper .swiper-slide:hover .gradient-background {
  opacity: 0;
  transition: 0.3s ease-in-out;
}

@media screen and (max-height: 750px) {
  .slider-box {
    height: 350px;
  }
}

@media print {
}
</style>
