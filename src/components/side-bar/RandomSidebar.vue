<template>
  <section class="bg-white flex flex-col gap-[20px]">
    <Address-to-rector />
    <!-- <Address-to-rector v-if="randomSidebar.includes(1)" /> -->
    <!-- <subscribe v-if="randomSidebar.includes(2)" /> -->
  </section>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      randomSidebar: [],
    };
  },
  mounted() {
    this.random();
  },
  methods: {
    random() {
      this.randomSidebar = [1, 2, 3, 4].sort(() => 0.5 - Math.random()).slice(0, this.number);
    },
  },
};
</script>
