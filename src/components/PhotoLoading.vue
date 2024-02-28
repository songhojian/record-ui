<template>
<div>
    
    <p>loading ┄┄┄┄┄┄┄┄┄┄</p>
   <i class="el-icon-video-camera-solid">
        <i class="el-icon-video-camera-solid" id="change">
    </i>
    </i>
    <p class="per" :v-bind="number">┄┄┄┄┄┄┄┄┄┄ {{ number }}%</p>  
    
</div>
</template>

<script>
//这里可以导入其它文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》from ‘《组件路径》';
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
props: {},
data() {
//这里存放数据

return {
number:0
}
},
//计算属性 类似于data概念
computed: {},
//监控data中数据变化
watch: {},
//方法集合
methods: {
    add(){
        this.number++;
    },
    loadiii(){
        setTimeout(()=>{
            this.$router.push('/pppp');
            },4400)
    }

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
         setInterval(() => {
             if(this.number>=100) clearInterval(timer);            
         }, 10);/**/
         let timer=setInterval(this.add, 40); 
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
        this.loadiii();
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
.per{
    padding-left: 30px;
}
p{
    position: relative;
    display: inline;
    padding-right: 20px;
    font-size: 20px;
    font-family:  Arial;
    font-weight: lighter;
    top: -50px;
    color: white;
}
i{
    position: relative;
    font-size: 33px;
    color: rgb(255, 255, 255);
    overflow: hidden;
    padding-bottom: 44px;
}
#change{
    position:absolute;
    left: 0px;
    color: pink;
    height: 100%;
    /* width: 0%;
    transition:  1s; */
    animation: loading 6.5s 1;
    
}
div{
    width: 100%;
    height: 100%;
    margin: 270px 0;
}
/* i:hover #change{ 
width: 100%;
} */
@keyframes loading {
    0%{
       width: 0%;
    }
    100%{
        width: 100%;
    }
}
</style>