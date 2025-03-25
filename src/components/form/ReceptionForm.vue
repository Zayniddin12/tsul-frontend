<template>
  <form
    class="bg-white border-[1.6px] border-[#E0E5EC] p-[24px] -500:p-[14px]"
    @submit.prevent="submit()"
  >
    <h2
      class="minion text-[32rem] leading-[130%] font-[700] text-[#1A2F53] mb-[22px] -500:text-[26rem]"
    >
      {{ title ? title : $t("virtual_reception") }}
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
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { VueRecaptcha } from "vue-recaptcha";
import axios from "@/plugins/axios";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import { useToast } from "vue-toastification";
export default {
  components: { VueRecaptcha },
  props: {
    category: String,
    title: String,
  },
  setup() {
    const toast = useToast();
    return { v$: useVuelidate(), toast };
  },
  data() {
    return {
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

  methods: {
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

<style lang="scss">
.reception-form-input-responsive {
  @media screen and (max-width: 500px) {
    padding: 16px;
    font-size: 16rem;

    &::placeholder {
      font-size: 16rem !important;
    }
  }
}
</style>
