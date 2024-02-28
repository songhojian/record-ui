<template>
  <div>
    <el-container>

      <el-container>
        <el-link icon="el-icon-s-custom"
                 class="login"
                 :underline="false"
                 @click="toLogin()">登录</el-link>
        <el-link class="register"
                 :underline="false">注册</el-link>
        <el-header>
          <my-dyfont></my-dyfont>

        </el-header>
        <el-main>
          <el-image :src="urlback"
                    :fit="fits"
                    class="back"></el-image>

          <!-- <el-image      
      :src="url"
      :fit="fits"
      class="bandceimg"
      @mouseover.native="sketchOver()"
      @mouseleave.native="sketchLeave()"
      ></el-image>  -->
          <div class="sketchclass animated fadeInRight"
               :duration="5000">
            <p class="TitleSketch web-font">Winter</p>
            <p class="web-font">Outside the window, snowflakes were flying like hundreds of butterflies, rushing towards the window glass, bumping skinningly on the glass, and flying to one side.</p>
          </div>
          <div data-aos="fade-down"
               data-aos-easing="linear"
               data-aos-duration="1500"
               class="summerclass">
            <p class="TitleSketch web-font">Spring</p>
            <p class="web-font">S pring is the best season of the year.The weather gets warmer,and the days get longer. Our beloved teacher, you are the spring shower that moistens our hearts. The love and care you have given us will encourage us to go through a long and arduous journey.</p>
          </div>
          <div data-aos="flip-left"
               data-aos-easing="ease-out-cubic"
               data-aos-duration="2000"
               class="autumnclass">
            <p class="TitleSketch web-font">Summer</p>
            <p class="web-font">Summer is the second season in a year. it is between spring and autumn. the sun of summer is the hottest; the water of summer is the warmest.Summer is a lovely season.In summer the sun is shining brightly in the sky and the trees and crops are growing fast.</p>
          </div>
          <div data-aos="zoom-in-left"
               class="winterclass">
            <p class="TitleSketch web-font">Autumn</p>
            <p class="web-font">Autumn, in a tense after harvest, suddenly everything faded, boundless land pale yellow bare.The autumn wind, cool breeze, flowers and trees, like a loving mother is humming a lullaby to put their children into the sweet dreams.</p>
          </div>
          <!-- 
      <div data-aos="zoom-in-up" data-aos-mirror="true">
        <svg-icon iconname="icon-svgyinliao" data-aos="zoom-in-up" data-aos-mirror="true" ></svg-icon>
      </div>
      
    <div class="ip" data-aos="zoom-in-up" data-aos-mirror="true"></div>-->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//这里可以导入其它文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》from ‘《组件路径》';
import MyDyfont from './MyDyfont'
import TextSketch from './TextSketch'
import anime from "../plugins/lib/anime.es"
import AOS from "aos"
import ClickMe from './ClickMe.vue'


export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    MyDyfont,
    TextSketch,
    ClickMe
  },
  props: {},
  data () {
    //这里存放数据
    return {
      fits: 'fill',
      url: require('../assets/img/sketch.jpg'),
      urlback: require('../assets/img/season.jpg')
    }
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中数据变化
  watch: {},
  //方法集合
  methods: {
    toLogin () {
      this.$(".yzm").css("display", "none");
      this.$router.push('/login');
      //window.location.href="../static/login.html";
    },
    sketchLeave () {
      anime({
        targets: '.bandceimg',
        translateY: 10,
        duration: 2000,
      })
    },
    sketchOver () {
      anime({
        targets: '.bandceimg',
        translateY: -10,
        duration: 2000,
      })
    },
    playimgbandce () {
      anime({
        targets: '.bandceimg',
        translateX: 600,
        //direction: 'alternate',
        //loop: true,
        easing: 'spring(10, 40, 10, 1)'
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.playimgbandce();
    AOS.init();

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
  destoryed () { },
  //如果页面有keep-alive缓存功能，这个函数会触发
  activated () { }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.el-header,
.el-footer {
  background-color: #71a9f3;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  padding: 0px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-container {
  height: 100%;
}
.bandceimg {
  width: 28%;
  height: 12%;
  right: 1585px;
  position: absolute;
  top: 60px;
  -webkit-filter: drop-shadow(
    10px 10px 10px rgba(0, 0, 0, 0.5)
  ); /*考虑浏览器兼容性：兼容 Chrome, Safari, Opera */
  filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));
  /**
    h-shadow：设置阴影的水平方向偏移量；允许负值，负值会使阴影出现在元素左边。

    v-shadow：设置阴影的垂直方向偏移量；允许负值，负值会使阴影出现在元素上方。

    blur：设置阴影的模糊度，值越大，越模糊，阴影也就会变得更大更淡；不允许负值，若未设定，默认是0 (阴影的边界很锐利)。

    spread：设置阴影的尺寸，正值会使阴影扩张和变大，负值会是阴影缩小；若未设定，默认是0 (阴影会与元素一样大小)。
    注：在Webkit以及其他一些浏览器中不支持spread，如果加了也不会渲染。

    color：设置阴影颜色；若未设定，颜色值基于浏览器，建议设置颜色。
     */
}
.el-header {
  padding: 0 0px;
}
.sketchclass {
  width: 500px;
  height: 191px;
  background-color: rgb(246 238 238, 0.2);
  position: absolute;
  top: 190px;
  left: 679px;
}
.summerclass {
  width: 500px;
  height: 191px;
  background-color: rgb(246 238 238, 0.2);
  position: absolute;
  top: 1200px;
  left: 679px;
}
.autumnclass {
  width: 500px;
  height: 191px;
  background-color: rgb(246 238 238, 0.2);
  position: absolute;
  top: 2500px;
  left: 679px;
  color: white;
}
.winterclass {
  width: 500px;
  height: 191px;
  background-color: rgb(246 238 238, 0.2);
  position: absolute;
  top: 3500px;
  left: 679px;
  color: white;
}

div {
  width: 100%;
  height: 100%;
}
.animated {
  animation-duration: 5s;
}
.ip {
  width: 600px;
  height: 100px;
  background-color: black;
}
.el-icon-allhaibian {
  font-size: 60px;
}
p {
  width: 100%;
  line-height: 36px;
}
@font-face {
  font-family: "webfont";
  font-display: swap;
  src: url("//at.alicdn.com/t/webfont_81fm1di3bmm.eot"); /* IE9*/
  src: url("//at.alicdn.com/t/webfont_81fm1di3bmm.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("//at.alicdn.com/t/webfont_81fm1di3bmm.woff2")
      format("woff2"),
    url("//at.alicdn.com/t/webfont_81fm1di3bmm.woff") format("woff"),
    /* chrome、firefox */ url("//at.alicdn.com/t/webfont_81fm1di3bmm.ttf")
      format("truetype"),
    /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
      url("//at.alicdn.com/t/webfont_81fm1di3bmm.svg#杨任东竹石体-Bold")
      format("svg"); /* iOS 4.1- */
}
.web-font {
  font-family: "webfont" !important;
  font-size: 25px;
}
.TitleSketch {
  font-family: Arial;
  font-size: 40px;
}
.el-image-inner .back {
  width: 100%;
  position: relative;
}
.login {
  position: absolute;
  top: 18px;
  right: 87px;
  color: black;
}
.register {
  position: absolute;
  top: 19px;
  right: 48px;
  color: black;
}
</style>