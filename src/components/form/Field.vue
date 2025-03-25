<script>
import Icon from "@/helpers/icons.js"

export default {
  components: {
    Icon
  },
  props: {
    modelValue: undefined, // any type can be used
    // select options
    list: { type: Array, default: () => [{ id: 1, name: "sanjar" }] },
    selectName: { type: String, default: "name" },
    selectValue: { type: String, default: "id" },
    multiple: Boolean,
    filterable: Boolean,
    // ---
    mask: String,
    iconLeft: String,
    iconRight: String,
    disabled: Boolean,
    error: Boolean,
    label: String,
    classInput: [String, Array],
    classLabel: [String, Array],
    maxlength: { type: [String, Number], default: 100 },
    placeholder: [String, Number],
    // field types
    type: String, // mask, number, textarea, phone, money, select, password
    searchFunc: {
      type: Function
    }
  },
  emits: { "update:modelValue": null },
  data() {
    return {
      passwordVisible: true,
      paddintInputRight: "",
      paddintInputLeft: "",
    };
  },
  computed: {
    setPadding() {
      const padding = [];
      if (this.$slots.left || this.type === "phone" || this.iconLeft) {
        padding.push(`padding-left: ${this.paddintInputLeft + 15}px;`);
      }
      if (this.$slots.right || this.type === "password" || this.iconRight) {
        padding.push(`padding-right: ${this.paddintInputRight + 15}px;`);
      }
      return padding.join("");
    },
    setAttributes() {
      return {
        id: "input" + this._.uid,
        placeholder: this.placeholder,
        maxlength: this.maxlength,
        disabled: this.disabled,
        class: ["form-input", this.classInput, { _error: this.error }],
        style: this.setPadding,
      };
    },
    updateValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  mounted() {
    this.paddintInputRight = document?.querySelector(".addright")?.clientWidth;
    this.paddintInputLeft = document?.querySelector(".addleft")?.clientWidth;
  },
};
</script>

<template>
  <label
    v-if="label && !$slots.extra"
    :class="classLabel"
    :for="'input' + _.uid"
    class="form-label mb-8"
  >
    {{ label }}
  </label>
  <div
    v-else-if="label"
    class="flex items-center justify-between gap-[32px] mb-[32px]"
  >
    <label :class="classLabel" :for="'input' + _.uid" class="form-label">
      {{ label }}
    </label>
    <slot name="extra"></slot>
  </div>
  <div class="relative w-full">
    <div v-if="$slots.left || type === 'phone' || iconLeft" class="addleft">
      <slot name="left">
        <span
          v-if="type === 'phone'"
          class="text-[18rem] font-normal text-[#1a2f53]"
          >+998</span
        >
        <Icon v-else-if="iconLeft" :name="iconLeft" />
      </slot>
    </div>
    <div
      v-if="$slots.right || type === 'password' || iconRight"
      class="addright"
    >
      <slot name="right">
        <Icon
          v-if="type === 'password'"
          name="eye"
          class="cursor-pointer"
          onclick="this.classList.toggle('active')"
          @click="passwordVisible = !passwordVisible"
        />
        <Icon v-else-if="iconRight" :name="iconRight" />
      </slot>
    </div>
    <textarea
      v-if="type === 'textarea'"
      v-model="updateValue"
      style="color: #0c1930;"
      v-bind="setAttributes"
      type="text"
      class="resize-none h-full"
    />
    <el-select
      v-else-if="type === 'select'"
      v-model="updateValue"
      class="form-select"
      :disabled="disabled"
      :placeholder="placeholder"
      :class="{ _error: error }"
      :multiple="multiple"
      :filterable="filterable"
    >
      <el-option
        v-for="(item, index) in list"
        :key="index"
        :label="item[selectName]"
        :value="item[selectValue]"
      />
    </el-select>
    <input
      v-else-if="type === 'phone'"
      v-bind="setAttributes"
      v-model="updateValue"
      v-maska="'## ### ## ##'"
      type="text"
    />
    <input
      v-else-if="type === 'money'"
      v-bind="setAttributes"
      v-model="updateValue"
      v-maska="'#'"
      type="text"
    />
    <input
      v-else-if="type === 'password'"
      v-bind="setAttributes"
      v-model="updateValue"
      :type="passwordVisible ? 'password' : 'text'"
    />
    <input
      v-else-if="type === 'number'"
      v-bind="setAttributes"
      v-model="updateValue"
      type="number"
    />
    <input
      v-else-if="type === 'mask'"
      v-bind="setAttributes"
      v-model="updateValue"
      v-maska="mask"
      type="text"
    />
    <input v-else v-bind="setAttributes" v-model="updateValue" type="text" @keyup.enter="searchFunc" />
  </div>
</template>

<style lang="scss">
.form-label {
  display: inline-block;
  font-weight: 500;
  font-size: 14rem;
  line-height: calc(17 / 14 * 100%);
  color: black;
}
.form-input,
.form-select .el-input__inner {
  font-family: "Inter";
  background: white;
  padding: 12px;
  width: 100%;
  height: 46px;
  font-weight: normal;
  font-size: 18rem;
  line-height: normal;
  color: #1a2f53;
  border: 1.6px solid #e0e5ec;
  outline: none !important;
  box-shadow: none !important;
  transition: all 0.35s ease-in-out;
  &._error,
  &._error:focus {
    border: 1.6px solid red;
  }
  &:focus {
    border: 1.6px solid #1a2f53;
  }
  &::placeholder {
    font-weight: normal;
    font-size: 18rem;
    color: #677b9e;
    line-height: normal;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
  }
}
.form-select {
  width: 100%;
  .el-input__inner {
    --el-input-hover-border-color: transparent !important;
    --el-select-input-focus-border-color: transparent !important;
  }
}
.addright {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  height: auto;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.addleft {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  height: auto;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
