<template>
  <div class="hello">
    <h1 @mousemove="showAnimate = !showAnimate">使用Animate.css动画库:</h1>
    <button >Toggle render</button>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated bounceInLeft"
      leave-active-class="animated bounceInRight"
    >
      <p v-if="showAnimate">hello</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      showAnimate: true,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>

