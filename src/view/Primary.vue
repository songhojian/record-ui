<template>
  <div id="app">
    <header>
      <!-- router-link 定义点击后导航到哪个路径下 -->

      <router-link :to="path"
                   id="load"></router-link>

    </header>
    <!-- 对应的组件内容渲染到router-view中 -->
    <!-- <transition 
    name="custom-classes-transition"
    leave-active-class="animated slideOutLeft"
    :duration="500">
    
    </transition> -->
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
 
<script>
//这里可以导入其它文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》from ‘《组件路径》';
export default {
  //import引入的组件需要注入到对象中才能使用
  provide () {
    return {
      reload: this.reload
    }
  },
  components: {
  },
  props: {},
  data () {
    //这里存放数据
    return {
      path: "/",
      isRouterAlive: true
    }
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中数据变化
  watch: {},
  //方法集合
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    //this.loadiii();
  },
  //生命周期-创建之前
  beforeCreated () { },
  //生命周期-挂载之前
  beforeMount () { },
  //生命周期-更新之前
  beforUpdate () { },
  //生命周期-更新之后
  updated () { },
  //生命周期-销毁之前
  beforeDestory () { },
  //生命周期-销毁完成
  destoryed () {
    this.path = "/";
  },
  //如果页面有keep-alive缓存功能，这个函数会触发
  activated () { }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
#load {
  width: 100%;
  height: 100%;
}
</style>