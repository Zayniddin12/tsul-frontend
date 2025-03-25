<template>
  <div class="widget-outer "  @click="isWidgetOpen">
    <!--    <transition name="fade">-->
    <div v-if="isWidgetOpen"  class="widget" @click.stop >
      <div class="widget__overlay" @click="isWidgetOpen = false" />
      <div
class="container widget__window">
        <div class="special-box">
          <button
            class="special-box__button with-color"
            :class="active ? 'active' : ''"
            @click="settings.mode = 'with-color'"
          >
            <span>{{ $t("colorful") }}</span>
          </button>
          <button
            class="special-box__button with-color kontrast"
            :class="active3 ? 'active' : ''"
            @click="settings.mode = 'kontrast'"
          >
            <span>{{ $t("contrast") }}</span>
          </button>
          <button
            class="special-box__button without-color"
            :class="active1 ? 'active' : ''"
            @click="settings.mode = 'without-color'"
          >
            <span>{{ $t("without_color") }}</span>
          </button>
          <button
            class="special-box__button invert-color"
            :class="active2 ? 'active' : ''"
            @click="settings.mode = 'invert-color'"
          >
            <span>{{ $t("invert") }}</span>
          </button>
          <div class="special-box__col">
            <div class="special-box__checkboxes">
              <label>
                <el-checkbox v-model="settings.noImage" size="large">
                  {{ $t("without_image") }}
                </el-checkbox>
              </label>
              <label>
                <el-checkbox v-model="settings.reader" size="large">
                  {{ $t("screen_reader") }}
                </el-checkbox>
              </label>
            </div>
            <div class="special-box__range">
              <div class="flex items-center w-[64%]">
                <div class="small">Aa</div>
                {{ settings.fontSize }}
                <el-input
                  v-model="settings.fontSize"
                  type="range"
                  class="range"
                  min="0.5"
                  step="0.1"
                  max="1.2"
                />
                <div class="big">Aa</div>
              </div>
              <div>
                <button
                  class="ml-[8px] bg-[#fff] py-[12rem] px-[20rem] text-[12rem] text-[#1A2F53] font-semibold hover:opacity-60 transition-all duration-200"
                  @click="backToDefault()"
                >
                  {{ $t("default") }}
                </button>
              </div>
            </div>
          </div>
          <!-- <button class="special-box__close" @click="isWidgetOpen = false">
            {{ $t('close') }}
          </button>-->
        </div>
      </div>
    </div>
    <!--    </transition>-->
  </div>
</template>
<script>
// import useClickOutside from "@/composables/useClickOutside"
export default {
  name: "WidgetComponent",
  props: {
    isOpenOnInit: {
      type: Boolean,
      default: false,
    },
    isOpenOnOuterit: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    settings: {
      mode: "with-color",
      fontSize: 1,
      noImage: false,
      reader: false,
    },
    isWidgetOpen: false,
    active: true,
    active1: false,
    active2: false,
    active3: false,
    isShowed: false,
  }),
  watch: {
    isOpenOnInit(val) {
      this.isWidgetOpen = val;
    },

    settings: {
      deep: true,
      handler() {
        localStorage.setItem("specialSettings", JSON.stringify(this.settings));
        const app = document.getElementById("app");
        if (app) {
          if (this.settings.mode === "without-color") {
            app.classList.add("blackAndWhite");
            app.classList.remove("blackAndWhiteInvert");
            app.classList.remove("kontrast");
            this.active1 = true;
            this.active = false;
            this.active2 = false;
            this.active3 = false;
          } else if (this.settings.mode === "invert-color") {
            app.classList.add("blackAndWhiteInvert");
            app.classList.remove("blackAndWhite");
            app.classList.remove("kontrast");

            this.active1 = false;
            this.active = false;
            this.active2 = true;
            this.active3 = false;
          } else if (this.settings.mode === "kontrast") {
            app.classList.add("kontrast");
            app.classList.remove("blackAndWhite");
            app.classList.remove("blackAndWhiteInvert");

            this.active1 = false;
            this.active = false;
            this.active2 = false;
            this.active3 = true;
          } else {
            app.classList.remove("blackAndWhite");
            app.classList.remove("blackAndWhiteInvert");
            app.classList.remove("kontrast");

            this.active1 = false;
            this.active = true;
            this.active2 = false;
            this.active3 = false;
          }
          document
            .querySelectorAll("img")
            .forEach(
              (imageItem) =>
                (imageItem.style.display = this.settings.noImage ? "none" : "")
            );
          document
            .querySelector("html")
            .style.setProperty(
              "font-size",
              `${this.settings.fontSize ? this.settings.fontSize : 1 }px`,
              "important"
            );
          if (this.settings.reader) {
            document.addEventListener("mouseup", this.speech);
          } else {
            document.removeEventListener("mouseup", this.speech);
          }
        }
      },
    },
  },
  created() {
    this.isWidgetOpen = this.isOpenOnInit;
  },
  mounted() {
    let responsiveVoice = document.createElement("script");


    document.head.appendChild(responsiveVoice);
    if (window.responsiveVoice) {
      window.responsiveVoice.cancel();
    }
    this.settings = JSON.parse(localStorage.getItem("specialSettings")) || {
      mode: "with-color",
      fontSize: 1,
      noImage: false,
      reader: false,
    };

    const app = document.getElementById("app");
    if (app) {
      if (this.settings.mode === "without-color") {
        app.classList.add("blackAndWhite");
      } else if (this.settings.mode === "invert-color") {
        app.classList.add("blackAndWhiteInvert");
      }

      document
        .querySelectorAll("img")
        .forEach(
          (imageItem) =>
            (imageItem.style.display = this.settings.noImage ? "none" : "")
        );

      document
        .querySelector("html")
        .style.setProperty(
          "font-size",
          `${this.settings.fontSize}px`,
          "important"
        );
      if (this.settings.reader) {
        document.addEventListener("mouseup", this.speech);
      }
    }
  },


  methods: {

    getSelectionText() {
      let text = "";
      if (window.getSelection) {
        text = window.getSelection().toString();
      } else if (document.selection && document.selection.type !== "Control") {
        text = document.selection.createRange().text;
      }
      return text;
    },
    speech() {
      const _this = this;
      setTimeout(function () {
        if (window.responsiveVoice) {
          window.responsiveVoice.cancel();
          window.responsiveVoice.speak(
            _this.getSelectionText(),
            "Russian Female"
          );
        }
      }, 1);
    },
    backToDefault() {
      this.settings.mode = "with-color";
      this.settings.fontSize = 1;
      this.settings.reader = false;
      this.settings.noImage = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.widget-outer {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  color: #12181e;
  bottom: 63%;
}

.widget {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 0;
  bottom: 0;

  &__window {
    position: absolute;
    top: 48px;
    //top: 50px;
    left: 50%;
    transform: translateX(-43.8%);
    z-index: 0;
  }
}

.special-box {
  background: #1a2f53;
  padding: 45px;
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 93.7%;
  right: 0;
  margin-top:2.5px;

  &__button {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    border: none;
    transition: 0.4s all;
    background-image: url("@/static/img/static_images_color-bg_with-color.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;
    width: 150px;
    height: 78px;

    span {
      background: #fdfdfd;
      padding: 6px 16px;
      font-weight: 700;
      font-size: 16px;
      line-height: 17px;
      text-transform: uppercase;
      color: #1a2f53;

      transform: translateX(-16px);
    }

    &:focus,
    &.active {
      outline: none;
      box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.1);
    }

    &.without-color {
      background-image: url("@/static/img/static_images_color-bg_without-color.png");
      background-color: #5b5b5b;

      span {
        color: #404040;
      }
    }

    &.invert-color {
      background-image: url("@/static/img/static_images_color-bg_invert-color.png");
      background-color: #080808;

      span {
        color: #fff;
        background-color: #000;
      }
    }
  }

  &__close {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    font-size: 0.688rem;
    color: #fff;
    opacity: 0.7;
    font-weight: bold;

    &:hover,
    &:focus {
      outline: none;
      opacity: 1;
      cursor: pointer;
    }

    &::after {
      content: "";
      width: 33px;
      height: 33px;
      display: block;
      background: url("/images/color-bg/static_images_icons_close-rounded-light.svg")
        no-repeat center center;
    }
  }

  &__col {
    display: flex;
    width: 25%;
    flex-direction: column;
    justify-content: space-between;
  }

  &__checkboxes {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    label {
      line-height: 1.2;
      margin-right: 10px;
      font-weight: 500;
      font-size: 16rem;
      line-height: 130%;
      color: #ffffff;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .heading {
    line-height: 1.2;
    margin-bottom: 10px;
  }

  &__range {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .range {
      margin: 0 10px;
    }
  }

  .small {
    color: #fff;
    font-family: "Minion 3";
    line-height: 1.2;
    font-size: 12px;
    font-weight: bold;
  }

  .big {
    color: #fff;
    font-family: "Minion 3";
    font-weight: bold;
    line-height: 1.2;
    font-size: 23rem;
  }
}

.range {
  $moonstone: #405679;
  $frost: #7d9aa7;
  $thumb-size: 2px;
  $track-size: calc($thumb-size / 4);

  appearance: none;
  width: 100%;
  margin: 0;
  outline: none;
  border: none;

  .el-input__inner {
    height: 2px !important;
  }

  & > * {
    outline: none;
  }

  &:focus {
    outline: none;
    border: none;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: $track-size;
    cursor: pointer;
    background-color: $moonstone;
  }

  &::-webkit-slider-thumb {
    box-shadow: 0px 2.096px 5.58933px rgba(0, 0, 0, 0.15),
      0px 0.698667px 0.698667px rgba(0, 0, 0, 0.16),
      0px 2.096px 0.698667px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    height: $thumb-size;
    width: $thumb-size;
    border-radius: 50%;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: calc(($track-size / 2) - ($thumb-size / 2));
  }

  &::-moz-range-track {
    width: 100%;
    height: $track-size;
    cursor: pointer;
    background-color: $moonstone;
    border-radius: calc($track-size / 2);
  }

  &::-moz-range-thumb {
    box-shadow: 0px 2.096px 5.58933px rgba(0, 0, 0, 0.15),
      0px 0.698667px 0.698667px rgba(0, 0, 0, 0.16),
      0px 2.096px 0.698667px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    height: $thumb-size;
    width: $thumb-size;
    border-radius: 50%;
    cursor: pointer;
    margin-top: calc(($track-size / 2) - ($thumb-size / 2));
  }

  &::-ms-track {
    width: 100%;
    height: $track-size;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
    border-width: $track-size 0;
  }

  &::-ms-fill-lower {
    background: $moonstone;
    border: none;
    border-radius: calc($track-size / 2);
  }

  &::-ms-fill-upper {
    background: $moonstone;
    border: none;
    border-radius: calc($track-size / 2);
  }

  &::-ms-thumb {
    height: $thumb-size;
    width: $thumb-size;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0px 2.096px 5.58933px rgba(0, 0, 0, 0.15),
      0px 0.698667px 0.698667px rgba(0, 0, 0, 0.16),
      0px 2.096px 0.698667px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
}

.special-box__range {
  position: relative;

  .range {
    position: relative;
    z-index: 2;

    .el-input__inner {
      height: 3px !important;
    }
  }

  .range-indicator {
    position: absolute;
    bottom: 12px;
    height: 3px;
    background: transparent;
    left: 21px;
    right: 34px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
