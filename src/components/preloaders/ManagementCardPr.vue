<script setup lang="ts">
defineProps({
  management: { type: Object, default: () => ({}) },
});
</script>

<template>
  <div class="management-card _loading flex items-center">
    <img src="" alt="management" class="basis-1/5"/>
    <div class="w-full p-[24px] md:p-[10px] basis-auto">
      <h2 class="management-card__name line-clamp-1 _loading">dasdasdasdasdasd</h2>
      <span class="management-card__work line-clamp-1 _loading">dsdsadasdsads</span>
      <hr />
      <div class="management-card__soclinks">
        <h5 class="_loading">vazifa va funksiyalari</h5>
        <div class="flex items-center gap-[12px]">
          <a href="#" target="_blank _loading" class="">
            <Icon name="faceboook" color="#8596B2" class="w-[14px] h-[14px]" />
          </a>
          <a href="#" target="_blank _loading">
            <Icon name="linkedin" color="#8596B2" class="w-[14px] h-[14px]" />
          </a>
          <a href="#" target="_blank _loading">
            <Icon name="google" color="#8596B2" class="w-[14px] h-[14px]" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

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

  &:hover {
    background-color: #e0e5ec;
    .management-card__soclinks h6 {
      color: #ffffff;
    }
    .management-card__soclinks a {
      background: #e0e5ec;
    }
  }
  @media (max-width: 600px) {
    flex-direction: column;
  }
  img {
    max-width: 193px;
    object-fit: cover;
    object-position: top center;
    transform: translateY(-12px) translateX(-22px);
    @media (max-width: 600px) {
      max-width: 100%;
      transform: translateY(0px) translateX(0px);
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
    a {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #e0e5ec;
      transition: all 0.35s ease-in-out;
    }
  }
}
</style>
