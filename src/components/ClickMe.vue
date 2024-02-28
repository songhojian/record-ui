<template>
<button id='runaway-btn'>Click Me &#129315;</button>
<!-- <div id='runaway-btn'>&#129315;</div> -->
</template>

<script>
//这里可以导入其它文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》from ‘《组件路径》';
import anime from "../plugins/lib/anime.es";
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
props: {},
data() {
//这里存放数据
return {

}
},
//计算属性 类似于data概念
computed: {},
//监控data中数据变化
watch: {},
//方法集合
methods: {
    play(){
        const button = document.getElementById("runaway-btn");

const animateMove = (element, prop, pixels) =>
  anime({
    targets: element,
    [prop]: `${pixels}px`,
    easing: "easeOutCirc"
  });

["mouseover", "click"].forEach(function (el) {
  button.addEventListener(el, function (event) {  
    const top = getRandomNumber(window.innerHeight - this.offsetHeight);
    const left = getRandomNumber(window.innerWidth - this.offsetWidth);

    animateMove(this, "left", left).play();
    animateMove(this, "top", top).play();
  });
});

const getRandomNumber = (num) => {
  return Math.floor(Math.random() * (num + 1));
};
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
      this.play();
},
//生命周期-创建之前
beforeCreated() {},
//生命周期-挂载之前
beforeMount() {},
//生命周期-更新之前
beforUpdate() {},
//生命周期-更新之后
updated() {},
//生命周期-销毁之前
beforeDestory() {},
//生命周期-销毁完成
destoryed() {},
//如果页面有keep-alive缓存功能，这个函数会触发
activated() {}
}
</script>
<style scoped>
/* @import url(); 引入css类 */
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  user-select: none;
}

body {
  background-color: rgb(31, 31, 31);
}

button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 4rem;
  width: 10rem;
  font-size: 1.5rem;
  border-radius: 5px;
  border: none;
  box-shadow: 1px 1px 5px black;
  background-color: white;
}

</style>