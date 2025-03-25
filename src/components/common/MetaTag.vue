<template>
  <teleport to="head">
    <title>{{ data?.title }}</title>
    <meta name="description" :content="data?.description" />
  </teleport>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
defineProps({
  data: {type: Object, default: ()=> {
    return {
      title: undefined,
      description: undefined,
    }
  }},

});
</script>
