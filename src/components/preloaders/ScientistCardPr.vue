<template>
  <div
    class="
      bg-foto bg-[#F5F6FA]
      border-[1.6px] border-[#E0E5EC]
      flex
      sm:flex-col
      gap-[24rem]
      w-full
    "
  >
    <div class="_loading">
      <img
        class="w-[200px] h-[220px] object-cover sm:w-full"
        src="https://picsum.photos/500/500"
        alt="Raxmatov Sanjar"
      />
    </div>
    <div class="py-[20rem] sm:px-[20rem]">
      <h3
        class="
          text-[24rem]
          leading-[130%]
          font-bold
          text-[#1A2F53]
          mb-[4px]
          line-clamp-2
          _loading
        "
      >
        Raxmatov Sanjar
      </h3>
      <span
        class="
          block
          text-[12rem]
          leading-[130%]
          font-semibold
          text-[#677B9E]
          mb-[26rem]
          line-clamp-2
          _loading
        "
        >Javascript developer</span
      >
      <div class="flex flex-col gap-[12px]">
        <div
          class="
            text-[14rem]
            leading-[143%]
            font-medium
            text-[#1A2F53]
            flex
            items-center
            gap-[8px]
            _loading
          "
        >
          <Icon
            name="gray_phone"
            color="#8394B1"
            class="w-[20px] h-[20px] _loading"
          />(+998 71) 233-66-36
        </div>
        <a
          class="
            text-[14rem]
            leading-[143%]
            font-medium
            text-[#1A2F53]
            flex
            items-center
            gap-[8px]
            _loading
          "
        >
          <Icon
            name="gray_mail"
            color="#8394B1"
            class="w-[20px] h-[20px]"
          />info@tsul.uz
        </a>
      </div>
      <div class="flex items-center gap-[12px] mt-[32rem]">
        <a href="#" target="_blank">
          <Icon
            name="telegram"
            color="#8394B1"
            class="w-[16px] h-[16px] _loading"
          />
        </a>
        <a href="#" target="_blank">
          <Icon
            name="twitter"
            color="#8394B1"
            class="w-[16px] h-[16px] _loading"
          />
        </a>
        <a href="#" target="_blank">
          <Icon
            name="instagram"
            color="#8394B1"
            class="w-[16px] h-[16px] _loading"
          />
        </a>
        <a href="#" target="_blank">
          <Icon
            name="faceboook"
            color="#8394B1"
            class="w-[16px] h-[16px] _loading"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>