import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import $ from 'jquery'
//自定义的element UI loading样式
import './assets/css/myCss.css'
//TranImg
import './assets/css/demo.css'
//PicTran

Vue.prototype.$ = $;
Vue.config.productionTip = false
import animated from 'animate.css' // npm install animate.css --save安装，在引入
import router from './router'
Vue.use(animated)
    //Map

import AOS from "aos";
import "./../node_modules/aos/dist/aos.css";
Vue.use(AOS)
import '../src/assets/iconfont/iconfont.js'
import SvgIcon from "../src/components/SvgIcon.vue";
Vue.component("svg-icon", SvgIcon);

import Axios from 'axios'
Vue.use(Axios)
Axios.defaults.baseURL = 'http://localhost:881/api'
    //Axios.prototype.HOST = '/api';
Axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'; //配置请求头信息。
Axios.defaults.headers.common['accessToken'] = 'FA4C308D5E8F6409E01344ADDAEB4C71';
Axios.defaults.timeout = -1;
Axios.defaults.withCredentials = true


import { WOW } from 'wowjs'
Vue.prototype.$wow = new WOW({
    boxClass: 'wow', // default
    animateClass: 'animated', // default
    offset: 150, // default
    mobile: true, // default
    live: false,

    // live为true时，控制台会提示：MutationObserver is not supported by your browser. & WOW.js cannot detect dom mutations, please call .sync() after loading new content.

    callback: function(box) {
        console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
    }
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')