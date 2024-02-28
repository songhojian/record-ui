<template>
  <div id="app">
    <!-- 
    
    <tran-cricle></tran-cricle>
    <my-loading></my-loading>
    <cross></cross> 
    
    <click-me></click-me>
    
    <my-tree></my-tree>
    <myfont></myfont>
    <photo-loading id="photoloading"></photo-loading>
    <my-dyfont class="mydyfont"></my-dyfont>
    <test-anime-01></test-anime-01>
    <slider-wapper></slider-wapper>
    <h1 @click="ioi()">5555555555</h1>
    <mmtree></mmtree>-->
    <primary></primary>
    <!-- <router-view ></router-view> -->

  </div>
</template>

<script>
import SliderWapper from './components/SliderWapper.vue'
import PhotoLoading from './components/PhotoLoading.vue'
import TranCricle from './components/TranCricle.vue'
import MyLoading from './components/MyLoading.vue'
import Cross from './components/Cross.vue'
import Myfont from './components/Myfont.vue'
import ClickMe from './components/ClickMe.vue'
import MyTree from './components/MyTree.vue'
import MyDyfont from './components/MyDyfont.vue'
import TestAnime01 from './components/TsetAnime01.vue'
import Primary from './view/Primary.vue'
import { MorphSVGPlugin } from 'gsap/all'

export default {
  name: 'app',
  components: {
    SliderWapper,
    PhotoLoading,
    TranCricle,
    MyLoading,
    Cross,
    Myfont,
    ClickMe,
    MyTree,
    MyDyfont,
    TestAnime01,
    Primary,
  },
  provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。                                             
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true                    //控制视图是否显示的变量
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false;            //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true;         //再打开
      })
    }

  }
}

</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  position: absolute;
  width: 100%;
}
/* .mydyfont div{
  height: 50px;
  background-color: pink;
  font-size: -5vw;
} */
#photoloading {
  color: white;
}
body {
  background-color: rgb(58, 1, 46);
  width: 1074px;
}
</style>
