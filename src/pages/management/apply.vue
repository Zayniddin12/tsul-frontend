<script>
export default {
  data() {
    return {
      category: "rector",
      questions: [{ question: "ww", answer: "qq" }],
      accordion: "1",
    };
  },

  async created() {
    this.$store.dispatch("setSlugTitle", this.$t("apply"));
    await Promise.allSettled([
      this.$store.dispatch("fetchFaq", {
        category: "rector",
      }),
    ]).then((res) => {
      this.questions = res[0].value.data.results;
    });
  },
};
</script>

<template>
  <div class="container grid grid-cols-12 gap-[24px] mt-[32px] mb-[141rem]">
    <div class="col-span-4 lg:col-span-12">
      <ReceptionForm :title="$t('address_to_vice_rector')" :category="category" />
    </div>
    <div class="col-span-8 lg:col-span-12">
      <div class="p-[24rem] bg-[#F5F6FA] border-[1.6px] border-[#e0e5ec26] -500:p-[12px]">
        <h2 class="text-[32rem] leading-[130%] font-bold text-[#1A2F53] mb-[6px] minion">FAQ</h2>
        <Questions v-if="false" class="mt-[36rem] -500:mt-[16px]" />
        <el-collapse v-model="accordion" accordion class="questions">
          <el-collapse-item v-for="(item, index) in questions" :key="index" :name="index">
            <template #title>
              <div class="w-full flex items-center justify-between gap-[10px]">
                <p class="-500:text-[18rem]" v-html="item.question"></p>
                <Icon
                  name="modal_close_btn"
                  color="#1A2F53"
                  class="transition w-[18px] h-[18px] rotate-[45deg]"
                />
              </div>
            </template>
            <div class="-500:text-[16rem]" v-html="item.answer"></div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<style lang=""></style>
