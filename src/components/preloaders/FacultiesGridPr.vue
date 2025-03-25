<template>
  <div
    class="container -600:hidden mt-[100rem] -768:mt-[50rem] -568:mt-[150rem] mb-[50rem] grid gap-[24px]"
    :class="{ 'overflow-hidden grid-cols-8 grid-rows-4': !width }"
  >
    <div
      v-for="(item, index) in 4"
      :key="index"
      class="faculty-grid__news"
      :class="[
        {
          'box row-start-1 row-span-2 col-start-1 col-span-5': index === 0 && width,
        },
        {
          'box row-start-1 row-span-2 col-start-1 col-span-5': index === 0 && !width,
        },
        {
          'box row-start-1 row-end-3 col-start-8 col-span-5': index === 1 && width,
        },
        {
          'box row-start-3 row-span-2 col-start-4 col-span-5': index === 1 && !width,
        },
        {
          'box row-start-3 row-span-2 col-start-3 col-span-5': index === 2 && width,
        },
        {
          hidden: index === 2 && !width,
        },
        {
          'box row-start-3 row-span-2 col-start-8 col-span-5': index === 3 && width,
        },
        {
          hidden: index === 3 && !width,
        },
      ]"
    >
      <ShortNewsPr />
    </div>

    <div
      v-for="(item, ind) in 3"
      :key="ind"
      :class="[
        {
          'box row-start-1 row-end-2 col-start-6 col-span-2': ind === 0 && width,
        },
        {
          'box row-start-1 row-span-1 col-start-6 col-span-3': ind === 0 && !width,
        },
        {
          'box row-start-2 row-end-3 col-start-6 col-span-2': ind === 1 && width,
        },
        {
          'box row-start-2 row-span-1 col-start-6 col-span-3': ind === 1 && !width,
        },
        {
          'box row-start-3 row-span-1 col-start-1 col-span-2': ind === 2 && width,
        },
        {
          'box row-start-3 row-span-1 col-start-1 col-span-3': ind === 2 && !width,
        },
      ]"
    >
      <CalendarReminderPr />
    </div>
    <div
      :class="{
        'box row-start-4 row-span-1 col-start-1 col-span-2 grid gap-[24px]': width,
        'box row-start-4 row-span-1 col-start-1 col-span-3': !width,
      }"
    >
      <div class="w-full _loading h-[78rem]"></div>
      <div class="w-full _loading h-[78rem]"></div>
    </div>
  </div>

  <div class="container mt-[130px] hidden -600:block">
    <div class="bg-[#1A2F53] flex items-center justify-center w-[124rem] h-[44rem]">
      <span class="not-italic font-bold text-[20rem] leading-[28rem] text-center text-white"
        >Yangiliklar</span
      >
    </div>
    <div class="w-full relative" @click="$router.push('/')">
      <div class="w-[100%] _loading h-[341px] object-cover object-top" alt="faculty-image" />
      <div class="short-news-effect h-full w-full"></div>

      <div class="absolute bottom-[20px] left-[20px]">
        <h5 class="not-italic _loading font-medium text-[11px] mb-[4px] uppercase text-[#96A5BD]">
          dolzarb
        </h5>
        <h4
          class="not-italic _loading max-w-[303rem] w-full line-clamp-2 font-bold text-[20rem] minion text-[#FFFFFF]"
        >
          news2news23news23news23news23news23news23 news23 news23 news23 news23 news233
        </h4>
        <span class="not-italic _loading font-medium text-[11px] mt-[12px] text-[#96A5BD]"
          >23.05.2023</span
        >
      </div>
    </div>

    <div class="grid my-[24px] gap-[16px]">
      <div v-for="(item, index) in 3" :key="index">
        <NewsSmallPr :img="item.img" :title="item.title" :date="item.date" :link="item.link" />
      </div>
    </div>
    <div class="w-[231rem] _loading h-[48rem]"></div>

    <h6 class="not-italic mt-[24rem] font-bold text-[26rem] minion mb-[16px] text-[#1A2F53]">
      Tadbirlar
    </h6>

    <div class="grid mb-[24px] gap-[16px] grid-cols-2">
      <CalendarReminderPr
        v-for="item in 4"
        :key="item"
        day="23"
        month="May"
        title="Hurmatli Olmazor va Shayxontohur tumani aholisi"
        link="/"
      />
    </div>

    <div class="w-[231rem] _loading h-[48rem] mb-[16rem]"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: false,
      newsSmall: [
        {
          title:
            "Professor-o‘qituvchilarimizning haftalik maqolalar daydjesti maqolalar daydjestimaqolalar daydjesti maqolalar daydjesti ",
          date: "16.03.2021 10:15",
          img: "https://picsum.photos/1000/1002",
          link: "dsdasdadas",
        },
        {
          title: "Professor-o‘qituvchilarimizning haftalik maqolalar daydjesti ",
          date: "16.03.2021 10:15",
          img: "https://picsum.photos/1000/1001",
          link: "dsdasdadas",
        },
        {
          title: "Professor-o‘qituvchilarimizning haftalik maqolalar daydjesti ",
          date: "16.03.2021 10:15",
          img: "https://picsum.photos/1000/1004",
          link: "dsdasdadas",
        },
        {
          title: "Professor-o‘qituvchilarimizning haftalik maqolalar daydjesti ",
          date: "16.03.2021 10:15",
          img: "https://picsum.photos/1000/1009",
          link: "dsdasdadas",
        },
        {
          title: "Professor-o‘qituvchilarimizning haftalik maqolalar daydjesti ",
          date: "16.03.2021 10:15",
          img: "https://picsum.photos/1000/1007",
          link: "dsdasdadas",
        },
        {
          title: "Professor-o‘qituvchilarimizning haftalik maqolalar daydjesti ",
          date: "16.03.2021 10:15",
          img: "https://picsum.photos/1000/1000",
          link: "dsdasdadas",
        },
      ],
    };
  },
  mounted() {
    this.width = window.innerWidth > 900;
  },
};
</script>

<style lang="scss" scoped>
.faculty-grid {
  @media (min-width: 1380px) {
    &__news {
      width: 519px;
    }
    &__reminder {
      width: 194px;
    }

    &__visit {
      width: 194px;
    }
  }
}

.short-news-effect {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
