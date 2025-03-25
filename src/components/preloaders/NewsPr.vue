<template>
  <div class="bg-[#F5F6FA] py-[64px] sm:py-[24px]">
    <div class="container">
      <div class="grid grid-cols-12 gap-[12px]">
        <!-- main news -->
        <div class="col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12">
          <div
            href="news/1"
            class="group flex justify-end relative -1378:mt-[60px]"
          >
            <img
              class="h-[590px] sm:h-[430px] object-cover w-full"
              src="https://picsum.photos/1020/1000"
              alt="main-news"
            />
            <div class="absolute top-0 left-0 w-full">
              <div
                class="
                  h-[590px]
                  sm:h-[430px]
                  p-[32px]
                  sm:p-[20px]
                  flex flex-col
                  justify-end
                  _loading
                "
              >
                <h4
                  class="
                    not-italic
                    font-medium
                    text-[12rem]
                    uppercase
                    text-[#96A5BD]
                    duration-150
                    group-hover:text-[#78869c]
                    _loading
                  "
                >
                  MUHIM Yangiliklar
                </h4>
                <h2
                  class="
                    not-italic
                    font-bold
                    text-[24rem] text-white
                    mt-[4px]
                    line-clamp-2
                    _loading
                  "
                >
                  Ilmiy maktablar ochilishi haqida qonun kuchga kirdi
                </h2>
                <div class="flex items-center justify-between">
                  <p
                    class="
                      not-italic
                      font-medium
                      text-[12rem] text-[#96A5BD]
                      mt-[12px]
                      duration-150
                      group-hover:text-[#78869c]
                      _loading
                    "
                  >
                    Bugun 10:15
                  </p>

                  <icon
                    class="
                      opacity-0
                      duration-150
                      ml-[8px]
                      group-hover:translate-x-[-5px] group-hover:opacity-100
                    "
                    name="arrow_right_button"
                  />
                </div>
              </div>
            </div>
          </div>
          <router-link
            to="/news"
            class="learn-more-buttons w-[251px] mt-[24px] sm:hidden"
          >
            <Icon name="newspaper" />
            <p>{{ $t("all_news") }}</p>
            <Icon name="arrow_right_button" />
          </router-link>
        </div>
        <!-- news list -->
        <div
          class="
            col-span-4
            lg:col-span-6
            md:col-span-6
            sm:col-span-12 sm:mt-[24px] sm:ml-[0px]
            ml-[24px]
            grid
            gap-[20px]
            h-[590px]
            overflow-scroll
            blue-scroll
          "
        >
          <div v-for="(item, index) in news" :key="index" class="">
            <NewsSmall
              :img="item.img"
              :title="item.title"
              :date="item.date"
              :link="item.link"
            />
          </div>
        </div>
        <router-link
          to="/news"
          class="
            hidden
            sm:flex
            learn-more-buttons
            w-[251px]
            mt-[24px]
            :md:w-[231px]
          "
        >
          <Icon name="newspaper" />
          <p class="text-[15rem] _loading">{{ $t("all_news") }}</p>
          <Icon name="arrow_right_button" />
        </router-link>
        <!-- events -->
        <div class="col-span-4 lg:col-span-12 md:col-span-12">
          <h5
            class="
              minion
              not-italic
              font-bold
              text-[32rem]
              leading-[130%]
              text-[#1A2F53]
              _loading
            "
          >
            {{ $t("events") }}
          </h5>
          <div
            class="
              grid grid-cols-2
              sm:grid-cols-2
              gap-[25px]
              sm:gap-[16px]
              mt-[20px]
              min-h-[425px]
            "
          >
            <EventCard
              v-for="(item, index) in events"
              :key="index"
              :day="item.day"
              :month="item.month"
              :title="item.title"
              :link="item.link"
            />
          </div>

          <router-link
            to="/events "
            class="learn-more-buttons w-[251px] mt-[24px] :md:w-[231px]"
          >
            <Icon name="events_calendar" />
            <p class="text-[15rem]">{{ $t("all_events") }}</p>
            <Icon name="arrow_right_button" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewsSmall from "@/components/NewsSmall.vue";
export default {
  components: { NewsSmall },
  data() {
    return {
      news: [
        {
          title:
            "Professor-o‘qituvchilarimizning haftalik maqolalar daydjesti maqolalar daydjestimaqolalar daydjesti maqolalar daydjesti ",
          date: "16.03.2021 10:15",
          img: "https://picsum.photos/1000/1002",
          link: "dsdasdadas",
        },
        {
          title:
            "Professor-o‘qituvchilarimizning haftalik maqolalar daydjesti ",
          date: "16.03.2021 10:15",
          img: "https://picsum.photos/1000/1001",
          link: "dsdasdadas",
        },
        {
          title:
            "Professor-o‘qituvchilarimizning haftalik maqolalar daydjesti ",
          date: "16.03.2021 10:15",
          img: "https://picsum.photos/1000/1004",
          link: "dsdasdadas",
        },
        {
          title:
            "Professor-o‘qituvchilarimizning haftalik maqolalar daydjesti ",
          date: "16.03.2021 10:15",
          img: "https://picsum.photos/1000/1009",
          link: "dsdasdadas",
        },
        {
          title:
            "Professor-o‘qituvchilarimizning haftalik maqolalar daydjesti ",
          date: "16.03.2021 10:15",
          img: "https://picsum.photos/1000/1007",
          link: "dsdasdadas",
        },
        {
          title:
            "Professor-o‘qituvchilarimizning haftalik maqolalar daydjesti ",
          date: "16.03.2021 10:15",
          img: "https://picsum.photos/1000/1000",
          link: "dsdasdadas",
        },
      ],
      events: [
        {
          day: "20",
          month: "Mar",
          title: "Ilmiy maktablar ochilishi haqida qonun kuchga kirdi",
          link: "dsdsad-dsda-sdadasdsa1",
        },
        {
          day: "10",
          month: "Mar",
          title: "Ilmiy maktablar ochilishi haqida qonun kuchga kirdi",
          link: "dsdsad-dsda-sdadasdsa2",
        },
        {
          day: "10",
          month: "Mar",
          title: "Ilmiy maktablar ochilishi haqida qonun kuchga kirdi",
          link: "dsdsad-dsda-sdadasdsa3",
        },
        {
          day: "10",
          month: "Mar",
          title: "Ilmiy maktablar ochilishi haqida qonun kuchga kirdi",
          link: "dsdsad-dsda-sdadasdsa4",
        },
        {
          day: "10",
          month: "Mar",
          title: "Ilmiy maktablar ochilishi haqida qonun kuchga kirdi",
          link: "dsdsad-dsda-sdadasdsa5",
        },
        {
          day: "10",
          month: "Mar",
          title: "Ilmiy maktablar ochilishi haqida qonun kuchga kirdi",
          link: "dsdsad-dsda-sdadasdsa6",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.news-shadow {
  background: linear-gradient(
    180deg,
    rgba(24, 35, 54, 0) 0%,
    rgba(24, 35, 54, 0.88) 100%
  );
}

.blue-scroll {
  &::-webkit-scrollbar-track {
    background-color: #e0e5ec;
  }

  &::-webkit-scrollbar {
    width: 3px;
    height: 0px;
    background-color: #e0e5ec;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #677b9e;
    border: 3px solid #677b9e;
  }

  background: linear-gradient(180deg, rgba(245, 246, 250, 0) 0%, #f5f6fa 100%);

  //filter: blur(2px);
}
</style>
