<template>

    <svg-icon :iconname="icon00" @mouseover="svg" class="line-drawing-demo"></svg-icon>

</template>

<script>
//这里可以导入其它文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》from ‘《组件路径》';
import anime from "../plugins/lib/anime.es"
import SvgIcon from '../components/SvgIcon.vue';
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    anime,
    SvgIcon
},
props: {},
data() {
//这里存放数据
return {
icon00:"icon-svgshuangzi",
}
},
//计算属性 类似于data概念
computed: {},
//监控data中数据变化
watch: {},
//方法集合
methods: {
    svg(){
        console.log("svg");
        anime({
  targets: '.line-drawing-demo .lines path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1500,
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',
  loop: true
});
    }

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

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
.svg-icon{
   font-size: 19px;
    color: rgb(68, 68, 68); 
  }
</style>