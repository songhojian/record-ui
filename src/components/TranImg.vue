<template>
  <div>
    <section class="page-wrapper"
             id="coidea">

      <div class="slider">

        <ul class="slider-list">

          <li class="slider-list__item slider-list__item_active"
              @mousemove="movesketch()"
              @mouseout="oversketch()">
            <span class="back__element">
              <img src="../assets/img/back_apple_002.png" />
            </span>
            <span class="main__element">
              <img class="sketch_tran"
                   src="/img/3.png" />
            </span>
            <span class="front__element">
              <img src="../assets/img/front_apple_002.png" />
            </span>
            <span class="title__element">
              <span class="title">sketch</span>
            </span>
            <span class="more__element">
              <span class="content">
                <span class="headline">sketch</span>
                <span class="excerpt">素描：Preliminary drawing for later elaboration, a brief literary description. short descriptive summary .</span>
                <span class="link">
                  <div class="fill"></div>
                  <a href="#">Open catalog</a>
                </span>
              </span>
            </span>
          </li>

          <li class="slider-list__item"
              @mousemove="movesharpen()"
              @mouseout="oversharpen()">
            <span class="back__element">
              <img src="../assets/img/back_grapes_001.png" />
            </span>
            <span class="main__element">
              <img class="sharpen_tran"
                   src="../assets/img/bottle_grapes_001.png" />
            </span>
            <span class="front__element">
              <img src="../assets/img/front_grapes_001.png" />
            </span>
            <span class="title__element">
              <span class="title">sharpen</span>
            </span>
            <span class="more__element">
              <span class="content">
                <span class="headline">sharpen</span>
                <span class="excerpt">锐化：Make sharp or sharper, make crisp or more crisp and precise.</span>
                <span class="link">
                  <div class="fill fill-dark"></div>
                  <a href="#">Open catalog</a>
                </span>
              </span>
            </span>
          </li>

          <li class="slider-list__item"
              @mousemove="moverilievo()"
              @mouseout="overrilievo()">
            <span class="back__element">
              <img src="../assets/img/back_strawberry_003.png" />
            </span>
            <span class="main__element">
              <img class="rilievo_tran"
                   src="../assets/img/bottle_strawberry_003.png" />
            </span>
            <span class="front__element">
              <img src="../assets/img/front_strawberry_003.png" />
            </span>
            <span class="title__element">
              <span class="title">rilievo</span>
            </span>
            <span class="more__element">
              <span class="content">
                <span class="headline">rilievo</span>
                <span class="excerpt">浮雕：Sculpture consisting of shapes carved on a surface so as to stand out from the surrounding background.</span>
                <span class="link">
                  <div class="fill"></div>
                  <a href="#">Open catalog</a>
                </span>
              </span>
            </span>
          </li>

        </ul>

        <div class="slider__nav-bar">
          <a class="nav-control"></a>
          <a class="nav-control"></a>
          <a class="nav-control"></a>
        </div>

        <div class="slider__controls">
          <a class="slider__arrow slider__arrow_prev"></a>
          <a class="slider__arrow slider__arrow_next"></a>
        </div>
        <div @click="ttfun">
          <el-tooltip content="体验功能区"
                      placement="bottom"
                      effect="light">
            <svg-icon :iconname="svggofun"
                      class="gofun"></svg-icon>
          </el-tooltip>
        </div>

      </div>

    </section>
  </div>
</template>

<script>
//这里可以导入其它文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》from ‘《组件路径》';
import anime from "../plugins/lib/anime.es"
import SvgIcon from '../components/SvgIcon.vue'
class Slider {
  constructor(props) {
    this.rootElement = props.element;
    console.log(props);
    this.slides = Array.from(
      this.rootElement.querySelectorAll(".slider-list__item")
    );
    this.slidesLength = this.slides.length;
    this.current = 0;
    this.isAnimating = false;
    this.direction = 1; // -1
    this.baseAnimeSettings = {
      rotation: 45,
      duration: 750,
      easing: 'easeInOutCirc'
    };
    this.baseAnimeSettingsBack = {
      rotation: 45,
      duration: 1850,
      elasticity: function (el, i, l) {
        return (200 + i * 200);
      }
    };
    this.baseAnimeSettingsFront = {
      rotation: 45,
      duration: 2250,
      elasticity: function (el, i, l) {
        return (200 + i * 200);
      }
    };
    this.baseAnimeSettingsTitle = {
      rotation: 45,
      duration: 1750,
      elasticity: function (el, i, l) {
        return (200 + i * 200);
      }
    };

    this.navBar = this.rootElement.querySelector(".slider__nav-bar");
    this.thumbs = Array.from(this.rootElement.querySelectorAll(".nav-control"));
    this.prevButton = this.rootElement.querySelector(".slider__arrow_prev");
    this.nextButton = this.rootElement.querySelector(".slider__arrow_next");

    this.slides[this.current].classList.add("slider-list__item_active");
    this.thumbs[this.current].classList.add("nav-control_active");

    this._bindEvents();
  }

  goTo (index, dir) {
    if (this.isAnimating) return;
    var self = this;
    let prevSlide = this.slides[this.current];
    let nextSlide = this.slides[index];

    self.isAnimating = true;
    self.current = index;
    nextSlide.classList.add("slider-list__item_active");

    anime(Object.assign({}, self.baseAnimeSettings, {
      targets: nextSlide,
      rotate: [90 * dir + 'deg', 0],
      translateX: [90 * dir + '%', 0]
    }));

    anime(Object.assign({}, self.baseAnimeSettingsBack, {
      targets: nextSlide.querySelectorAll('.back__element'),
      rotate: [90 * dir + 'deg', 0],
      translateX: [90 * dir + '%', 0]
    }));

    anime(Object.assign({}, self.baseAnimeSettingsFront, {
      targets: nextSlide.querySelectorAll('.front__element'),
      rotate: [90 * dir + 'deg', 0],
      translateX: [90 * dir + '%', 0]
    }));

    anime(Object.assign({}, self.baseAnimeSettingsTitle, {
      targets: nextSlide.querySelectorAll('.title__element'),
      rotate: [90 * dir + 'deg', 0],
      translateX: [90 * dir + '%', 0]
    }));

    anime(Object.assign({}, self.baseAnimeSettings, {
      targets: prevSlide,
      rotate: [0, -90 * dir + 'deg'],
      translateX: [0, -100 * dir + '%'],
      complete: function (anim) {
        self.isAnimating = false;
        prevSlide.classList.remove("slider-list__item_active");
        self.thumbs.forEach((item, index) => {
          var action = index === self.current ? "add" : "remove";
          item.classList[action]("nav-control_active");
        });
      }
    }))

    anime(Object.assign({}, self.baseAnimeSettingsBack, {
      targets: prevSlide.querySelectorAll('.back__element'),
      rotate: [0, -90 * dir + 'deg'],
      translateX: [0, -100 * dir + '%']
    }));

    anime(Object.assign({}, self.baseAnimeSettingsFront, {
      targets: prevSlide.querySelectorAll('.front__element'),
      rotate: [0, -90 * dir + 'deg'],
      translateX: [0, -100 * dir + '%']
    }));

    anime(Object.assign({}, self.baseAnimeSettingsTitle, {
      targets: prevSlide.querySelectorAll('.title__element'),
      rotate: [0, -90 * dir + 'deg'],
      translateX: [0, -100 * dir + '%']
    }));

  }

  goStep (dir) {
    let index = this.current + dir;
    let len = this.slidesLength;
    let currentIndex = (index + len) % len;
    this.goTo(currentIndex, dir);
  }

  goNext () {
    this.goStep(1);
  }

  goPrev () {
    this.goStep(-1);
  }

  _navClickHandler (e) {
    var self = this;
    if (self.isAnimating) return;
    let target = e.target.closest(".nav-control");
    if (!target) return;
    let index = self.thumbs.indexOf(target);
    if (index === self.current) return;
    let direction = index > self.current ? 1 : -1;
    self.goTo(index, direction);
  }

  _bindEvents () {
    var self = this;
    ["goNext", "goPrev", "_navClickHandler"].forEach(method => {
      self[method] = self[method].bind(self);
    });
    self.nextButton.addEventListener("click", self.goNext);
    self.prevButton.addEventListener("click", self.goPrev);
    self.navBar.addEventListener("click", self._navClickHandler);
  }
}
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    anime,
    SvgIcon
  },
  props: {},
  data () {
    //这里存放数据
    return {
      svggofun: 'icon-svgpicture'
    }
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中数据变化
  watch: {},
  //方法集合
  methods: {
    ttfun () {
      console.log("tofun");
      this.$router.push("/functionpart");
    },
    movesketch () {

      document.querySelector(".sketch_tran").src = "img/2.png"

    },
    oversketch () {
      document.querySelector(".sketch_tran").src = "img/3.png"
    },
    movesharpen () {
      document.querySelector(".sharpen_tran").src = "img/bottle_grapes_001_sharpen.png"

    },
    oversharpen () {
      document.querySelector(".sharpen_tran").src = "img/bottle_grapes_001.png"
    },
    moverilievo () {
      document.querySelector(".rilievo_tran").src = "img/bottle_strawberry_003_rilievo.png"

    },
    overrilievo () {
      document.querySelector(".rilievo_tran").src = "img/bottle_strawberry_003.png"
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    let slider = new Slider({
      element: document.querySelector(".slider")
    });
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
.gofun {
  font-size: 30px;
  position: absolute;
  top: 20px;
  right: 73px;
}
#coidea {
  font-family: "Open Sans Condensed", sans-serif;
  background: #8e9eab;
  background: linear-gradient(to right, #2bb4f9, rgb(220 253 249));
  /* position: relative; */
  position: absolute;
  top: 1000px;
  display: block;
  width: 100%;
  height: auto;
  min-height: 100%;
  min-height: 100vh;
  overflow: hidden;
}
.slider {
  height: 106vh;
}
.slider-list__item {
  top: 48px;
}
.slider-list__item .main__element .sketch_tran {
  position: relative;
  display: block;
  width: 100%;
  height: auto;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  max-width: 500px;
  left: 48%;
}
</style>