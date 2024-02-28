<template>
 <main>
  <div class="button">
    <div class="text">Submit</div>
  </div>
  <div class="progress-bar"></div>
  <svg x="0px" y="0px"
	 viewBox="0 0 25 30" style="enable-background:new 0 0 25 30;">
    <path class="check st0" d="M2,19.2C5.9,23.6,9.4,28,9.4,28L23,2"/>
  </svg>
  <button @click="re">ds</button>
</main>

</template>

<script>

//这里可以导入其它文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》from ‘《组件路径》';
import anime from "../plugins/lib/anime.es"
export default {
//import引入的组件需要注入到对象中才能使用
inject: ['reload'],
components: {anime},
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
    re(){
       this.reload();
    },
    
    iii(){
            var basicTimeline = anime.timeline({
            autoplay: false
            });

            var pathEls = $(".check");
            for (var i = 0; i < pathEls.length; i++) {
            var pathEl = pathEls[i];
            var offset = anime.setDashoffset(pathEl);
            pathEl.setAttribute("stroke-dashoffset", offset);
            }

            basicTimeline
            .add({
                targets: ".text",
                duration: 1,
                opacity: "0"
            })
            .add({
                targets: ".button",
                duration: 1300,
                height: 10,
                width: 300,
                backgroundColor: "#2B2D2F",
                border: "0",
                borderRadius: 100
            })
            .add({
                targets: ".progress-bar",
                duration: 2000,
                width: 300,
                easing: "linear"
            })
            .add({
                targets: ".button",
                width: 0,
                duration: 1
            })
            .add({
                targets: ".progress-bar",
                width: 80,
                height: 80,
                delay: 500,
                duration: 750,
                borderRadius: 80,
                backgroundColor: "#71DFBE"
            })
            .add({
                targets: pathEl,
                strokeDashoffset: [offset, 0],
                duration: 200,
                easing: "easeInOutSine"
            });

            $(".button").click(function() {
            basicTimeline.play();
            });

            $(".text").click(function() {
            basicTimeline.play();
            });
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
     this.iii();
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
body {
  background: #1D1F20;
}
main {
  height: 100vh;
  width: 100vw;
}

.button {
  background: #2B2D2F;
  height: 80px;
  width: 200px;
  text-align: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 4px;
}

.text {
  font: bold 1.25rem/1 poppins;
  color: #71DFBE;
  position: absolute;
  top: 50%;
  transform: translateY(-52%);
  left: 0;
  right: 0;
}

.progress-bar {
  position: absolute;
  height: 10px;
  width: 0;
  right: 0;
  top: 50%;
  left: 50%;
  border-radius: 200px;
  transform: translateY(-50%) translateX(-50%);
  background: rgb(194, 60, 247)
}

svg {
  width: 30px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  left: 50%;
  right: 0;
}

.check {
  fill: none;
  stroke: #FFFFFF;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

</style>