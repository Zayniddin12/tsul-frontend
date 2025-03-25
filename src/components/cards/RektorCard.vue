<template>
  <router-link :to="'/management/' + rektor?.slug" class="management-card">
    <img
      v-if="rektor.img"
      :src="rektor.img"
      alt=""
      class="min-w-[193px] h-[232px] object-cover mx-auto"
    />
    <img v-else src="@/static/img/default.svg" alt="management" class="mx-auto" />
    <div class="w-full p-[24px] md:p-[10px]">
      <h2 class="management-card__name line-clamp-1 minion">{{ rektor?.name }}</h2>
      <span class="management-card__work line-clamp-1" v-html="rektor?.work"></span>
      <hr />
      <div class="management-card__info">
        <span v-if="rektor?.time">
          <Icon name="clock_grey" color="#8394B1" class="w-[20px] h-[20px]" />
          {{ rektor?.time }}
        </span> 
        <span v-if="rektor?.phone">
          <Icon name="gray_phone" color="#8394B1" class="w-[20px] h-[20px]" />
          {{ formatPhoneNumber(rektor?.phone) }}
        </span>
        <span v-if="rektor?.email">
          <Icon name="gray_mail" color="#8394B1" class="w-[20px] h-[20px]" />
          {{ rektor?.email }}
        </span>
      </div>

      <div class="management-card__soclinks">
        <h6>{{ $t("functions_and_features") }}</h6>
        <div class="flex items-center gap-[12px]">
          <a :href="rektor?.facebook" rel="noopener noreferrer" target="_blank">
            <Icon name="faceboook" color="#8596B2" class="w-[14px] h-[14px]" />
          </a>
          <a :href="rektor?.linkedin" rel="noopener noreferrer" target="_blank">
            <Icon name="linkedin" color="#8596B2" class="w-[14px] h-[14px]" />
          </a>
          <a :href="rektor?.google" rel="noopener noreferrer" target="_blank">
            <Icon name="google" color="#8596B2" class="w-[14px] h-[14px]" />
          </a>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
interface Props {
  rektor: object;
}

withDefaults(defineProps<Props>(), {});

function formatPhoneNumber(number: string) {
  const format = number?.replace(/\D/g, "").match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
  return `+${format && format[1] ? format[1] : ""} (${format && format[2] ? format[2] : ""})

          ${format && format[3] ? format[3] : ""}-${format && format[4] ? format[4] : ""}-${
    format && format[5] ? format[5] : ""
  }`;
}
</script>

<style lang="scss">
.management-card {
  position: relative;
  background: #ffffff;
  border: 1.6px solid #e0e5ec;
  min-height: 224px;
  display: flex;
  margin: 22px;
  cursor: pointer;
  transition: all 0.35s ease-in-out;
  &::before {
    content: "";
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 122px;
    height: 154px;
    background-image: url("@/static/img/vector.svg");
    background-repeat: no-repeat;
    background-size: cover;
    pointer-events: none;
  }
  &:hover {
    background-color: #e0e5ec;
    .management-card__soclinks h6 {
      background: #1a2f53;
      color: #ffffff;
    }
    .management-card__soclinks a {
      background: #e0e5ec;
    }
  }
  @media (max-width: 600px) {
    flex-direction: column;
    margin: 12px 0px !important;
  }
  img {
    object-position: top center;
    transform: translateY(-12px) translateX(-22px);
    @media (max-width: 600px) {
      max-width: 100%;
      transform: translateY(0px) translateX(0px);
      width: 300px !important;
      height: 300px !important;
    }
  }
  hr {
    height: 1.5px;
    width: 40px;
    background: #e0e5ec;
    @apply my-[16px];
  }
  // .management-card__title
  &__name {
    font-weight: 700;
    font-size: 24rem;
    line-height: 130%;
    color: #1a2f53;
  }
  // .management-card__work
  &__work {
    font-family: "Inter", sans-serif !important;
    font-weight: 600 !important;
    font-size: 12rem !important;
    line-height: 130% !important;
    margin-top: 4px !important;
    color: #677b9e !important;
    span {
      font-size: 12rem !important;
      font-family: "Inter", sans-serif !important;
    }
  }
  // .management-card__info
  &__info {
    display: flex;
    align-items: center;
    gap: 28px;
    flex-wrap: wrap;
    @media (max-width: 768px) {
      gap: 10px;
    }
    span {
      font-weight: 500;
      font-size: 14rem;
      line-height: calc(20 / 14 * 100%);
      display: flex;
      align-items: center;
      gap: 8px;
      color: #1a2f53;
    }
  }
  // .management-card__soclinks
  &__soclinks {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    h6 {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 15rem;
      line-height: 130%;
      background: #e0e5ec;
      border: 1px solid rgba(133, 150, 178, 0.19);
      color: #8596b2;
      padding-top: 16px;
      padding-bottom: 16px;
      width: 100%;
      max-width: 270px;
      margin-top: 15px;
      text-transform: uppercase;
      transform: translateX(-60px);
      transition: all 0.35s ease-in-out;
      @media (max-width: 600px) {
        transform: translateX(0px);
      }
    }
    a {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #e0e5ec;
      border: 0.4px solid rgba(133, 150, 178, 0.2);
      transition: all 0.35s ease-in-out;
    }
  }
}
</style>
