<template>
  <div data-aos="fade-down"
       data-aos-easing="linear"
       data-aos-duration="1500"
       id="flipbook">
    <div class="hard"><img src="../../public/img/bookover.jpg"
           class="page1"> </div>
    <div class="hard"><img src="../../public/img/blockpage.jpg"
           class="page1"></div>
    <!--   <div><img src="../../public/album/pexels-min-an-1645823 .jpg"
           class="page1"></div>
    <div><img src="../../public/img/mm.gif"
           class="page1"></div>
    <div><img src="../../public/img/animal-animal-photography-cat-45201.jpg"
           class="page1"></div>
    <div><img src="../../public/img/pexels-valeriya-kobzar-7438498.jpg"
           class="page1"></div> -->
    <div class="hard"><img src="../../public/img/blockpage.jpg"
           class="page1"></div>
    <div class="hard"><img src="../../public/img/bookback.png"
           class="page1"></div>
  </div>
</template>

<script>

//这里可以导入其它文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）../../public/img/紫色调色海报.png
//例如：import 《组件名称》from ‘《组件路径》';
import * as turn from "../assets/js/turn";
import AOS from "aos"
export default {
  //import引入的组件需要注入到对象中才能使用

  components: {
    turn,
    AOS
  },
  props: {},
  data () {
    //这里存放数据
    return {
      page1: require('../assets/img/logo2.png'),
    }
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中数据变化
  watch: {},
  //方法集合
  methods: {
    init () {
      /* console.log(document.getElementsByClassName("page1")[0].src);
      document.getElementsByClassName("page1")[0].src="img/2.png";
      console.log(document.getElementsByClassName("page1")[0].src); */
      //this.$('#magazine').turn({gradients: true, acceleration: true}); 
      /* this.$("#flipbook").turn({
        width: 780,
        height: 485,
        autoCenter: true,
        duration: 1000,
        elevation: 0,
        page: 1,
        when: {
          turned: function (e, page) {
            if (page == 1) {
              console.log(page, e);
              let element = $("<div/>").html("loading...");
              //console.log(element);
              //$("#flipbook").turn("addPage",element,7);
            }
            if (page == 2) {
              console.log(page, e);
            }
          }
        }
        //gradients:'false'
        //direction:'rtl'
      }); */
      /* let element=this.$("<div/>").html("loading...")
             this.$("#flipbook").turn("addPage",element,7)
      console.log(this.$("#flipbook").children().length); */

    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    AOS.init();
    this.init();
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
#flipbook {
  top: 2039px;
  left: 37.6%;
}
.page1 {
  width: 390px;
  height: 485px;
}
#magazine .turn-page {
  background-color: #ccc;
}
.hard {
  display: none;
  background-color: blanchedalmond;
}
</style>