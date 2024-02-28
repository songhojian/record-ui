import Vue from 'vue'
import Router from 'vue-router'
import PhotoLoading from '../src/components/PhotoLoading.vue'
import MyDyfont from './components/MyDyfont.vue'
import pppp from './components/pppp.vue'
import login from './view/login.vue'
import MainShow from './view/MainShow.vue'
import Record from './view/Record.vue'
import FunctionPart from './components/FunctionPart.vue'
import Register from './view/Register.vue'
import Space from './view/space.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'PhotoLoading',
            component: resolve => require(['../src/components/PhotoLoading.vue'], resolve)
        },
        {
            path: '/mydyfont',
            name: 'MyDyfont',
            component: resolve => require(['./components/MyDyfont.vue'], resolve)
        },
        {
            path: '/pppp',
            name: 'pppp',
            component: resolve => require(['./components/pppp.vue'], resolve)
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['./view/login.vue'], resolve)
        },
        {
            path: '/mainShowin',
            name: 'mainShowin',
            component: resolve => require(['./view/MainShow.vue'], resolve)
        },
        {
            path: '/record',
            name: 'record',
            component: resolve => require(['./view/Record.vue'], resolve)
        },
        {
            path: '/functionpart',
            name: 'functionpart',
            component: resolve => require(['./components/FunctionPart.vue'], resolve)
        },
        {
            path: '/register',
            name: 'register',
            component: resolve => require(['./view/Register.vue'], resolve)
        },
        {
            path: '/space',
            name: 'space',
            component: resolve => require(['./view/space.vue'], resolve)
        }
    ]
})