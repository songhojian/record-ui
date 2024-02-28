
<template>
  <div>
    <el-image :src="loginback"
              :fit="fits"
              class="back"></el-image>
    <main class="loginmain">
      <form class="form">
        <div class="form__cover"></div>
        <div class="form__loader">
          <div class="spinner active">
            <svg class="spinner__circular"
                 viewBox="25 25 50 50">
              <circle class="spinner__path"
                      cx="50"
                      cy="50"
                      r="20"
                      fill="none"
                      stroke-width="4"
                      stroke-miterlimit="10"></circle>
            </svg>
          </div>
        </div>
        <div class="form__content">
          <h1>Landing</h1>
          <div class="styled-input">
            <input type="text"
                   class="styled-input__input"
                   name="nickname"
                   @click="inputchange" />

            <div class="styled-input__circle"></div>
          </div>
          <div class="styled-input">
            <input type="password"
                   class="styled-input__input"
                   @click="inputchange"
                   name="password" />
            <div class="styled-input__placeholder"></div>
            <div class="styled-input__circle"></div>
          </div>
          <div class="styled-input yzm">
            <input type="text"
                   class="styled-input__input"
                   @click="inputchange"
                   @blur="checkCodei" />
            <img src="http://localhost:881/api/camera/getImage"
                 alt=""
                 width="100"
                 height="37"
                 class="passcode"
                 style="height:43px;cursor:pointer;"
                 @click="imgclick()">
            <div class="styled-input__placeholder"></div>
            <div class="styled-input__circle"></div>
          </div><i class="el-icon-check"></i><i class="el-icon-close"></i>
          <button type="button"
                  class="styled-button"
                  @click="submmit">
            <span class="styled-button__real-text-holder">
              <span class="styled-button__real-text">Submit</span>
              <span class="styled-button__moving-block face">
                <span class="styled-button__text-holder">
                  <span class="styled-button__text">Submit</span>
                </span> </span><span class="styled-button__moving-block back">
                <span class="styled-button__text-holder">
                  <span class="styled-button__text">Submit</span>
                </span>
              </span>
            </span>
          </button>
        </div>
        <el-link class="register"
                 type="warning"
                 @click="goRegister()">没有账号？立刻注册</el-link>

      </form>
    </main>
  </div>
</template>

<script>
//这里可以导入其它文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》from ‘《组件路径》';
//import '../assets/js/login'
import axios from "axios"
import anime from "../plugins/lib/anime.es"
export default {
  //import引入的组件需要注入到对象中才能使用

  components: { axios, anime },
  props: {},
  data () {
    //这里存放数据
    return {
      loginback: require("../assets/img/loginbackg.jpg"),
      checkCode: "",
      goRegisterBo: false,
      regOrLog: "login",
    };
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中数据变化
  watch: {},
  //方法集合
  methods: {
    imgclick () {
      this.$(".passcode").attr("src", this.$(".passcode").attr("src") + "?");
      axios.get("/camera/getCheckCode").then(data => {
        this.checkCode = data.data;
        console.log(data);
      })
    },
    goRegister () {
      //this.$router.push("/register");
      this.regOrLog = "register";
      this.$(".error").css("display", "none");
      anime({
        targets: '.loginmain form',
        //translateX: 10,
        //autoplay: true,
        //loop: true,
        easing: 'easeInOutSine',
        borderRadius: ['0%', '80%'],
        direction: 'alternate',
        scale: [{ value: 1 }, { value: 1.2 }, { value: 1, delay: 250 }],
        rotateY: { value: '+=180', delay: 200 },
        opacity: 0,
      })
      setTimeout(function () {
        $(".yzm").css("display", "block");
        $(".register").css("display", "none");
        $("h1").text("Register")
      }, 1000)
      axios.get("/camera/getCheckCode").then(data => {
        this.checkCode = data.data;
        console.log(this.checkCode);
      })
    },
    inputchange () {
      $(".el-icon-check").css("display", "none");
      anime({
        targets: '.loginmain form',
        easing: 'easeInOutSine',
        borderRadius: ['0%', '50%'],
        direction: 'alternate',
      })
    },
    checkCodei () {
      if (this.checkCode == this.$(".yzm input").val()) {
        $(".el-icon-check").css("display", "block");
        $(".el-icon-close").css("display", "none");
        this.goRegisterBo = true;
      } else {
        $(".el-icon-close").css("display", "block");
        $(".el-icon-check").css("display", "none");
        this.goRegisterBo = false;
      }
    },
    addClass (kls, dom) {
      var klsReg = new RegExp(kls, 'ig');
      for (var i = 0; i < dom.length; i++) {
        var node = dom[i];
        var klses = node.className;
        if (!klsReg.test(klses)) {
          node.className = klses + ' ' + kls
        }
        console.log(klses)
      }
    },
    insertAfter (newElement, targetElement) {
      var parent = targetElement.parentNode;

      if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);

      } else {
        parent.insertBefore(newElement, targetElement.nextSibling);

      }

    },
    submmit () {
      let inputs = this.$("input");
      console.log(inputs[0].value);
      if (this.regOrLog == "login") {
        axios.post("/camera/logincheck", {
          username: inputs[0].value,
          password: inputs[1].value,
        }).then(data => {
          console.log(data);
          if (data.data.flag) {
            this.$router.push({
              //path:'/mainShowin',
              path: '/record',
              query: { umid: data.data.userEntity.umid }
            });
          }
          else {
            var error = document.createElement("div");
            this.$(error).addClass("error");
            error.innerText = "账号密码输入错误";
            error.style = "color:red;display: block;";
            console.log(document.getElementsByClassName("form__content")[0]);
            if (document.getElementsByClassName("error")[0] == null) {
              this.insertAfter(error, document.getElementsByClassName("styled-input")[1]);
            }
          }

        })
      } else {
        if (this.goRegisterBo) {
          axios.post("/camera/checkRegister", {
            username: inputs[0].value,
            password: inputs[1].value,
          }).then(data => {
            console.log(data.data);
            if (data.data) {
              axios.post("/camera/toRegister", {
                username: inputs[0].value,
                password: inputs[1].value,
              }).then(data => {
                console.log(data);
                if (data.data.Success == 200) {
                  this.$message({
                    message: '恭喜你，注册成功',
                    type: 'success'
                  });
                  this.regOrLog = "login"
                  anime({
                    targets: '.loginmain form',
                    //translateX: 10,
                    //autoplay: true,
                    //loop: true,
                    easing: 'easeInOutSine',
                    borderRadius: ['0%', '80%'],
                    direction: 'alternate',
                    scale: [{ value: 1 }, { value: 1.2 }, { value: 1, delay: 250 }],
                    rotateY: { value: '+=180', delay: 200 },
                    opacity: 0,
                  });
                  setTimeout(function () {
                    $(".yzm").css("display", "none");
                    $(".register").css("display", "block");
                    $("h1").text("Landing")
                    $(".el-icon-close").css("display", "none");
                    $(".el-icon-check").css("display", "none");
                    $("input[name=password]").val("");
                    $("input[name=nickname]").val("");
                  }, 1000)
                }
              })
            } else {
              this.$message.error('用户名已被注册了!');
            }
          })

        }
      }

    },
    start () {
      "use strict";

      var placeholders = document.getElementsByClassName(
        "styled-input__placeholder-text"
      ),
        inputs = document.querySelectorAll(".styled-input__input");
      console.log(
        document.getElementsByClassName("styled-input__placeholder-text")
      );
      for (let i = 0; i < placeholders.length; i++) {
        var value = placeholders[i].innerText,
          html = "";
        for (
          var _iterator = value,
          _isArray = Array.isArray(_iterator),
          _i = 0,
          _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
          ;

        ) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var w = _ref;

          if (!value) value = "&nbsp;";
          html += '<span class="letter">' + w + "</span>";
        }
        placeholders[i].innerHTML = html;
      }
      /* placeholders.forEach(function (el, i) {
    var value = el.innerText,
        html = '';
    for (var _iterator = value, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var w = _ref;

        if (!value) value = '&nbsp;';
        html += '<span class="letter">' + w + '</span>';
    }
    el.innerHTML = html;
}); */

      inputs.forEach(function (el) {
        var parent = el.parentNode;
        el.addEventListener(
          "focus",
          function () {
            parent.classList.add("filled");
            placeholderAnimationIn(parent, true);
          },
          false
        );
        el.addEventListener(
          "blur",
          function () {
            if (el.value.length) return;
            parent.classList.remove("filled");
            placeholderAnimationIn(parent, false);
          },
          false
        );
      });

      function placeholderAnimationIn (parent, action) {
        var act = action ? "add" : "remove";
        var letters = parent.querySelectorAll(".letter");
        letters = [].slice.call(letters, 0);
        if (!action) letters = letters.reverse();
        letters.forEach(function (el, i) {
          setTimeout(function () {
            var contains = parent.classList.contains("filled");
            if ((action && !contains) || (!action && contains)) return;
            el.classList[act]("active");
          }, 50 * i);
        });
      }

      setTimeout(function () {
        document.body.classList.add("on-start");
      }, 100);

      setTimeout(function () {
        document.body.classList.add("document-loaded");
      }, 1800);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.start();

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
  activated () { },
};
</script>
<style scoped>
/* @import url(); 引入css类 
@import url("../assets/css/style.css");*/
@import url("https://fonts.googleapis.com/css?family=Roboto");

/* body {
    all: initial;
    font-family: 'Roboto', sans-serif;
    letter-spacing: 0.02em;
} */

* {
  box-sizing: border-box;
}
.el-icon-close {
  position: absolute;
  right: -48px;
  font-size: 29px;
  top: 262px;
  color: rgb(255, 0, 0);
  display: none;
}
.el-icon-check {
  position: absolute;
  right: -48px;
  font-size: 27px;
  top: 262px;
  color: chartreuse;
  display: none;
}
.yzm {
  display: none;
}
img.passcode {
  /* display: inline-block; */
  position: absolute;
  right: 10px;
  top: 5px;
}
.register {
  position: absolute;
  top: 352px;
}
.loginmain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  /* url: require('../assets/img/sketch.jpg'), 
    background:url("../assets/img/loginbackg.jpg");*/
}

.form {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  position: relative;
  width: 400px;
  height: 400px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  padding: 20px;
  border-radius: 5px;
  background-color: rgba(255, 254, 254, 0.2);
}

.form__loader {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  z-index: -4;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.form__content {
  text-align: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
  opacity: 0;
  -webkit-transform: translateY(10px);
  transform: translateY(10px);
  -webkit-transition: all 0.5s ease 0.7s;
  transition: all 0.5s ease 0.7s;
}

.form__cover {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: -4;
  border-radius: 7px;
  overflow: hidden;
  -webkit-transition: all 0.3s ease 0.8s;
  transition: all 0.3s ease 0.8s;
  box-shadow: 0 0 0 0 rgba(250, 249, 249, 0);
}

.form__cover:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: -4;
  border-radius: 50%;
  -webkit-transition: all 1.5s ease 0.3s;
  transition: all 1.5s ease 0.3s;
  -webkit-transform: scale(0);
  transform: scale(0);
}

.form__cover:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: white;
  z-index: -5;
  border-radius: 50%;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
  -webkit-transform: scale(0);
  transform: scale(0);
}

body.on-start .form__cover:before {
  -webkit-transform: scale(0.15);
  transform: scale(0.15);
}

body.document-loaded .form__loader {
  -webkit-transform: scale(0);
  transform: scale(0);
  opacity: 0;
  visibility: hidden;
}

body.document-loaded .form__content {
  opacity: 1;
  -webkit-transform: none;
  transform: none;
}

body.document-loaded .form__cover {
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

body.document-loaded .form__cover:after {
  -webkit-transform: scale(2);
  transform: scale(2);
}

body.document-loaded .form__cover:before {
  -webkit-transition: opacity 0.3s ease 0.8s, -webkit-transform 2s ease;
  transition: opacity 0.3s ease 0.8s, -webkit-transform 2s ease;
  transition: transform 2s ease, opacity 0.3s ease 0.8s;
  transition: transform 2s ease, opacity 0.3s ease 0.8s,
    -webkit-transform 2s ease;
  -webkit-transform: scale(2);
  transform: scale(2);
  opacity: 0;
}

h1 {
  font-size: 40px;
  margin: 15px 0 20px 0;
  letter-spacing: 0.05em;
  color: #8bebe4;
  font-weight: 700;
}

.styled-button {
  -webkit-appearance: none;
  -webkit-user-select: none;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  padding: 20px;
  outline: none;
  background: none;
  position: relative;
  color: #8bebe4;
  border-radius: 3px;
  margin-bottom: 25px;
  border: none;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.1em;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  overflow: hidden;
}

.styled-button__real-text-holder {
  position: relative;
}

.styled-button__real-text {
  color: transparent;
  display: inline-block;
}

.styled-button__text-holder {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.styled-button__moving-block {
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.styled-button__moving-block.back {
  color: white;
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
}

.styled-button__moving-block.back .styled-button__text-holder {
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}

.styled-button:hover,
.styled-button:active {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  background: #7a51bb;
}

.styled-button:hover .face,
.styled-button:active .face {
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}

.styled-button:hover .face .styled-button__text-holder,
.styled-button:active .face .styled-button__text-holder {
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
}

.styled-button:hover .back,
.styled-button:active .back {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}

.styled-button:hover .back .styled-button__text-holder,
.styled-button:active .back .styled-button__text-holder {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}

.styled-button:active {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.styled-input {
  width: 100%;
  position: relative;
  margin-bottom: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.styled-input__circle {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  overflow: hidden;
  border-radius: 3px;
}

.styled-input__circle:after {
  content: "";
  position: absolute;
  left: 16.5px;
  top: 19px;
  height: 14px;
  width: 14px;
  z-index: -2;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0);
  -webkit-transition: opacity 1s ease, -webkit-transform 0.6s ease;
  transition: opacity 1s ease, -webkit-transform 0.6s ease;
  transition: transform 0.6s ease, opacity 1s ease;
  transition: transform 0.6s ease, opacity 1s ease, -webkit-transform 0.6s ease;
}

.styled-input__input {
  width: 100%;
  -webkit-appearance: none;
  font-size: 14px;
  outline: none;
  background: none;
  padding: 18px 15px;
  color: #8bebe4;
  border: none;
  font-weight: 600;
  letter-spacing: 0.035em;
}

.styled-input__placeholder {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  z-index: -1;
  padding-left: 45px;
  color: white;
}

/* .styled-input__placeholder-text {
    -webkit-perspective: 500px;
    perspective: 500px;
    display: inline-block;
} */

/* .styled-input__placeholder-text .letter {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    -webkit-animation: letterAnimOut 0.25s ease forwards;
    animation: letterAnimOut 0.25s ease forwards;
    text-shadow: 0 0 5px;
    .styled-input__placeholder-text .letter .active {
    -webkit-animation: letterAnimIn 0.25s ease forwards;
    animation: letterAnimIn 0.25s ease forwards;
}
} */
span .letter {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  -webkit-animation: letterAnimOut 0.25s ease forwards;
  animation: letterAnimOut 0.25s ease forwards;
  text-shadow: 0 0 5px;
}
span .letter .active {
  -webkit-animation: letterAnimIn 0.25s ease forwards;
  animation: letterAnimIn 0.25s ease forwards;
}

.styled-input:hover {
  border-color: rgba(255, 255, 255, 0.4);
}

.styled-input.filled {
  border-color: rgba(255, 255, 255, 0.2);
}

.styled-input.filled .styled-input__circle:after {
  -webkit-transform: scale(37);
  transform: scale(37);
  opacity: 0;
}

@-webkit-keyframes letterAnimIn {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    color: red;
  }
  45% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    opacity: 0;
    color: red;
  }
  55% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    opacity: 0;
  }
  56% {
    -webkit-transform: translate(-30px, -27px);
    transform: translate(-30px, -27px);
    opacity: 0;
    color: #00ff6b;
  }
  76% {
    color: #00ff6b;
    opacity: 1;
    -webkit-transform: translate(-30px, -27px);
    transform: translate(-30px, -27px);
  }
  100% {
    -webkit-transform: translate(-30px, -27px);
    transform: translate(-30px, -27px);
    opacity: 1;
  }
}

@keyframes letterAnimIn {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    color: red;
  }
  45% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    opacity: 0;
    color: red;
  }
  55% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    opacity: 0;
  }
  56% {
    -webkit-transform: translate(-30px, -27px);
    transform: translate(-30px, -27px);
    opacity: 0;
    color: #00ff6b;
  }
  76% {
    color: #00ff6b;
    opacity: 1;
    -webkit-transform: translate(-30px, -27px);
    transform: translate(-30px, -27px);
  }
  100% {
    -webkit-transform: translate(-30px, -27px);
    transform: translate(-30px, -27px);
    opacity: 1;
  }
}

@-webkit-keyframes letterAnimOut {
  0% {
    -webkit-transform: translate(-30px, -27px);
    transform: translate(-30px, -27px);
    opacity: 1;
  }
  25% {
    -webkit-transform: translate(-30px, -40px);
    transform: translate(-30px, -40px);
    opacity: 0;
  }
  45% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    opacity: 0;
  }
  55% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    opacity: 0;
    color: red;
  }
  56% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    color: red;
  }
  100% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
}

@keyframes letterAnimOut {
  0% {
    -webkit-transform: translate(-30px, -27px);
    transform: translate(-30px, -27px);
    opacity: 1;
  }
  25% {
    -webkit-transform: translate(-30px, -40px);
    transform: translate(-30px, -40px);
    opacity: 0;
  }
  45% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    opacity: 0;
  }
  55% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    opacity: 0;
    color: red;
  }
  56% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    color: red;
  }
  100% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
}

.spinner {
  position: relative;
  margin: auto;
  width: 50px;
  height: 50px;
  -webkit-transition: all 0.2s ease 0s;
  transition: all 0.2s ease 0s;
}

.spinner__circular {
  -webkit-animation: rotate 1.5s linear infinite;
  animation: rotate 1.5s linear infinite;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
  -webkit-transform-origin: center center;
  transform-origin: center center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: auto;
}

.spinner__path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  -webkit-animation: dash 1.3s ease forwards 0.5s;
  animation: dash 1.3s ease forwards 0.5s;
  opacity: 0;
  stroke-linecap: round;
  stroke: #7b23ff;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

@-webkit-keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    opacity: 0;
  }
  50% {
    stroke-dasharray: 40, 200;
    opacity: 1;
  }
  100% {
    stroke-dasharray: 125, 200;
    opacity: 1;
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    opacity: 0;
  }
  50% {
    stroke-dasharray: 40, 200;
    opacity: 1;
  }
  100% {
    stroke-dasharray: 125, 200;
    opacity: 1;
  }
}
body {
  width: 100%;
  height: 1861px;
}
</style>