<template>
<div>
    <div class="css-selector-demo" @click="play()">
        <div class="el"></div>
        <div class="el" ></div>
    </div>
    <div class="battery-log" @click="jsplay()">{"charged":"0%","cycles":120}</div>
    <div class="duration-demoel" @click="duringplay()"></div>
</div>
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
    duringplay(){
anime({
  targets: '.duration-demoel',
  translateX: 250,
  duration: 9000, //possting
  delay: 1000 //等
});
    },
    play(){
        anime({
  targets: '.css-selector-demo .el',
  translateX:200,
  left: '240px',
  backgroundColor: '#FFF',
  borderRadius: ['0%', '50%'],
  easing: 'easeInOutQuad'
});
    },
    jsplay(){
        var logEl = document.querySelector('.battery-log');

var battery = {
  charged: '0%',
  cycles: 120
}

anime({
  targets: battery,
  charged: '100%',
  cycles: 130,
  round: 1,
  easing: 'linear',
  update: function() {
    logEl.innerHTML = JSON.stringify(battery);
    console.log(JSON.stringify(battery));
  }
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
.css-selector-demo .el{
    width: 20px;
    height: 20px;
    background-color: red;
    margin: 10px;
}
.battery-log{
    width: 240px;
    height: 20px;
    background-color: red;
}
.duration-demoel{
    width: 20px;
    height: 20px;
    background-color: rgb(147, 248, 143);
}
</style>