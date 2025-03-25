<template>
  <div
    :class="bgColor"
    class="pt-[20rem] relative pb-[24rem] px-[30rem] -425:px-[12rem] -425:pt-[10rem] -425:pb-[16rem] overflow-hidden"
  >
    <div
      class="flex items-center justify-center -425:!block -425:absolute -425:top-3 -425:-right-5 -425:opacity-[0.1]"
    >
      <icon :class="{ _loading: pending }" :name="icon" class="-425:w-[120px] -425:h-[120px]" />
    </div>
    <number
      id="count"
      ref="number1"
      class="count not-italic mt-[15px] text-center -425:text-[20rem] -425:m-0 -425:!text-left font-bold text-[32rem] leading-[39px] mb-[5px] text-gray-[#1A2F53] block"
      :class="{ _loading: pending }"
      :from="1"
      :to="count"
      :format="theFormat"
      :duration="duration()"
      :delay="2"
      easing="Power1.easeOut"
    />

    <p
      class="not-italic line-clamp-1 text-center text-[#2B5E9B] -425:text-[11px] font-normal -425:!text-left text-[13rem] leading-[20px]"
      :class="{ _loading: pending }"
    >
      {{ desc }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
    count: {
      type: Number,
    },
    bgColor: {
      type: String,
      default: "bg-[#fff]",
    },
    pending: Boolean,
  },
  methods: {
    counter(id, start, end, duration) {
      let obj = document.getElementById(id);
      let current = start;
      let range = end - start;
      let increment = end > start ? 1 : -1;
      let step = Math.abs(Math.floor(duration / range));
      let timer = setInterval(() => {
        current += increment;
        obj.textContent = current;
        if (current === end) {
          clearInterval(timer);
        }
      }, step);
    },
    duration() {
      if (this.count > 1000) {
        return 5;
      } else {
        return 2;
      }
    },
    // numbers animation
    theFormat(number) {
      return number.toFixed(0);
    },
    completed() {},
    playAnimation() {
      this.$refs.number2.play();
    },
  },
};
</script>

<style lang="scss" scoped></style>
