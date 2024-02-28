<template>
<div id="animateMess"></div>
</template>

<script>
//这里可以导入其它文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》from ‘《组件路径》';
import anime from "../plugins/lib/anime.es";
import Letterize from "../../node_modules/letterizejs/lib/letterize";
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
        
const test = new Letterize({
      targets: "#animateMess"
    });
   var animation = anime.timeline({
      targets: test.listAll,
      delay: anime.stagger(50),
      //loop: true
    });

    animation
      .add({
      opacity:0
      })
      .add({
      opacity:1
      });
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
div {
        background-color: rgb(241 237 243);
        color: rgb(54 55 55);
        font-weight: 800;
        font-size: 1vw;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-family: "Khula", sans-serif;
        height: 100vh;
        box-sizing: border-box;
        margin: 0;
       
      }

      span {
        display: inline-block; 
      }
      i{
        font-size: 25px;
      }

</style>