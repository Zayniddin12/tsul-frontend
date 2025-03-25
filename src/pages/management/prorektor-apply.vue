<template>
  <div class="container grid grid-cols-12 gap-[24px] mt-[32px] mb-[141rem]">
    <div class="col-span-4 lg:col-span-12">
      <form
        class="bg-white border-[1.6px] border-[#E0E5EC] p-[24px] -500:p-[14px] !w-full"
        @submit.prevent="submit()"
      >
        <h2
          class="minion text-[32rem] leading-[130%] font-[700] text-[#1A2F53] mb-[22px] -500:text-[26rem]"
        >
          {{ $t("appeal_vice_rector") }}
        </h2>
        <div class="grid gap-[12px]">
          <Field
            v-model="form.name"
            :class-input="['reception-form-input-responsive']"
            :placeholder="$t('fullname_placeholder')"
            :error="v$.form.name.$error"
          />
          <Field
            v-model="form.phone"
            :class-input="['reception-form-input-responsive']"
            placeholder=""
            type="phone"
            :error="v$.form.phone.$error"
            @change="isPhone(form.phone)"
          />
          <Field
            v-model="form.topic"
            :placeholder="$t('subject_appeal')"
            :error="v$.form.topic.$error"
            :class-input="['reception-form-input-responsive']"
          />
          <Field
            v-model="form.message"
            :placeholder="$t('your_appeal')"
            type="textarea"
            class-input="!h-[280px]"
            :error="v$.form.message.$error"
            :class-input="['reception-form-input-responsive']"
          />
        </div>
        <!--    THIS KEY IS ONLY FOR TEST-->
        <VueRecaptcha
          class="mt-[24px] w-full"
          sitekey="6Lel4Z4UAAAAAOa8LO1Q9mqKRUiMYl_00o5mXJrR"
          :load-recaptcha-script="true"
          :class="v$.form.recaptchaError.$error ? 'recapthaError' : ''"
          @verify="form.recaptchaError = false"
        ></VueRecaptcha>
        <!--  <VueRecaptcha
          class="mt-[24px]"
          sitekey="siteKey"
          :load-recaptcha-script="true"
          @verify="recaptchError = false"
          @error=""
        ></VueRecaptcha>  -->

        <button
          type="submit"
          class="transition hover:opacity-[0.9] text-[18rem] leading-[122%] font-medium text-white w-full p-[19rem] bg-[#1A2F53] border-[1.6px] border-[#E0E5EC] mt-[24rem] -500:p-[12px]"
        >
          {{ $t("send") }}
        </button>
      </form>
    </div>
    <div class="col-span-8 lg:col-span-12">
      <div class="p-[24rem] bg-[#F5F6FA] border-[1.6px] border-[#e0e5ec26] -500:p-[12px]">
        <h2 class="text-[32rem] leading-[130%] font-bold text-[#1A2F53] mb-[6px] minion">FAQ</h2>
        <Questions v-if="false" class="mt-[36rem] -500:mt-[16px]" />
        <el-collapse v-model="accordion" accordion class="questions">
          <el-collapse-item v-for="(item, index) in questions" :key="index" :name="index">
            <template #title>
              <div class="w-full flex items-center justify-between gap-[10px] hover:bg-red">
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
<script>
import { useToast } from "vue-toastification";
import useVuelidate from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import { VueRecaptcha } from "vue-recaptcha";
import axios from "@/plugins/axios";
import parsePhoneNumber from "libphonenumber-js";

export default {
  components: { VueRecaptcha },
  setup() {
    const toast = useToast();
    return { v$: useVuelidate(), toast };
  },
  data() {
    return {
      category: "prorector",
      questions: [{ question: "ww", answer: "qq" }],
      accordion: "1",
      form: {
        name: "",
        phone: "",
        topic: "",
        message: "",
        recaptchaError: undefined,
      },
    };
  },
  validations() {
    return {
      form: {
        name: { required },
        phone: { required, minLength: minLength(9) },
        topic: { required },
        message: { required },
        recaptchaError: { required },
      },
    };
  },
  async created() {
    await Promise.allSettled([
      this.$store.dispatch("fetchFaq", {
        category: "prorector",
      }),
    ]).then((res) => {
      this.questions = res[0].value.data.results;
    });
  },

  methods: {
    isPhone(value) {
      if (!value.length) {
        return true;
      }
      const phoneNumber = parsePhoneNumber(value, "UZ");
      return phoneNumber?.isValid();
    },

    showToastSent() {
      this.toast.success(this.$t("sent_succesfully"), {
        position: "top-center",
        timeout: 2000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
      this.form.phone = "";
      this.form.topic = "";
      this.form.message = "";
      this.form.name = "";
      this.v$.form.$reset();
    },
    showToastError(val) {
      this.toast.error(this.$t(val), {
        position: "top-center",
        timeout: 2000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    },
    submit() {
      this.v$.form.$touch();
      if (!this.v$.form.$error) {
        axios
          .post(`/application`, {
            category: this.category,
            question_author_phone: `+998${this.form.phone}`,
            title: this.form.topic,
            question: this.form.message,
            question_author: this.form.name,
          })
          .then(() => {
            this.showToastSent();
          })
          .catch((error) => {
            let errorMsg = error.response.data.question_author_phone[0];
            this.showToastError(errorMsg);
          });
      }
    },
  },
};
</script>
<style lang=""></style>
