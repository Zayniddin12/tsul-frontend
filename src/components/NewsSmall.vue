<template>
  <router-link :to="link" class="flex items-center group w-[96%]">
    <div>
      <img
        v-if="img"
        v-lazy="{ src: img }"
        class="min-w-[86px] w-[88px] h-[88px] object-cover border border-[#E0E5EC]"
        :alt="title"
        @error="replaceByDefault"
      />
      <img v-else class="min-w-[86px] w-[88px] h-[88px]" src="@/static/img/default.svg" alt="" />
    </div>
    <div class="ml-[16px]">
      <h5
        v-if="status"
        class="not-italic font-medium text-[11px] text-[#677B9E] uppercase leading-[130%]"
      >
        {{ status }}
      </h5>
      <h5 v-else class="not-italic font-medium text-[11px] text-[#677B9E] uppercase leading-[130%]">
        {{ $t("news_title") }}
      </h5>

      <h4
        class="
          minion
          mt-[6px]
          not-italic
          font-bold
          text-[18rem] text-[#1A2F53]
          leading-[130%]
          duration-150
          group-hover:text-[#3353bb]
          line-clamp-2
        "
      >
        {{ title }}
      </h4>

      <h6
        v-if="date !== today"
        class="mt-[6px] not-italic font-medium leading-[16px] text-[11px] text-[#677B9E]"
      >
        {{ $dayjs(date).format("DD.MM.YYYY HH:MM") }}
      </h6>
      <h6 v-else class="mt-[6px] not-italic font-medium leading-[16px] text-[11px] text-[#677B9E]">
        {{ $t("today") }} {{ $dayjs(date).format("HH:MM") }}
      </h6>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
    },
    title: String,
    img: {
      type: String,
    },
    date: {
      type: String || Number,
    },
    status: {
      type: String,
    },
  },

  data() {
    return {
      today: new Date(),
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
