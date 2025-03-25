<template>
  <div
    class="
      bg-[#F5F6FA]
      quote-rector
      overflow-hidden
      relative
      border-[1.6px] border-[#E0E5EC]
      py-[24rem]
      px-[32rem]
      flex
      gap-[16rem]
    "
  >
    <div class>
      <h6
        class="
          minion
          not-italic
          font-bold
          text-[20rem]
          leading-[130%]
          text-[#1A2F53]
          _loading
        "
      >
        Parvardigori olam doimo yo‘limizni ham, yuzimizni ham yorug‘ qilsin!
        Yurtimizni, elimizni turli balo-qazolardan O‘zi asrasin! Ramazon hayiti
        barchamizga muborak bo‘lsin!
      </h6>

      <div class="flex gap-[8rem] -425:block items-center mt-[12rem]">
        <h5
          class="
            not-italic
            font-semibold
            text-[15rem]
            leading-[130%]
            text-[#677B9E]
            _loading
          "
        >
          Tashkulov A. J.
        </h5>
        <span
          class="
            not-italic
            font-normal
            text-[12rem] text-[#677B9E]
            leading-[130%]
            _loading
          "
          >Toshkent Davlat Yuridik Universiteti rektori</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.quote-rector {
  &::after {
    content: url("/src/static/img/faculties.png");
    position: absolute;
    bottom: -65px;
    right: 0;
  }
}
</style>