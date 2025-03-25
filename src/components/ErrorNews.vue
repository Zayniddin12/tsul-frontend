<template>
  <a rel="noreferrer noopener" :href="link" class="flex items-center group">
    <img
v-if="img"
      :src="img"
      class="min-w-[138px] w-[138px] h-[88px] object-cover border border-[#E0E5EC]"
      alt="error-news-image"
    />

    <img
v-else
      src="@/static/img/default.svg"
      class="min-w-[138px] w-[138px] h-[88px] object-cover border border-[#E0E5EC]"
    />
    <div class="ml-[16px] flex flex-col justify-between h-[80px]">
      <h5 class="not-italic font-medium text-[11px] text-[#677B9E] uppercase">
        {{ $t("news_title") }}
      </h5>

      <h4
        class="
          line-clamp-1
          minion
          mt-[6px]
          not-italic
          font-bold
          text-[18rem] text-[#1A2F53]
          leading-[130%]
          duration-150
          group-hover:text-[#3353bb]
        "
      >
        {{ title }}
      </h4>
      <h6 class="mt-[6px] not-italic font-medium leading-[16px] text-[11px] text-[#677B9E]">
        {{ $dayjs(date).format("DD.MM.YYYY HH:MM") }}
      </h6>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
    },
    title: {
      type: String,
    },
    img: {
      type: String,
    },
    date: {
      type: String || Number,
    },
  },
};
</script>

<style lang="scss" scoped></style>
