<template>
  <div id="map"
       style="height: 810px;" />
</template>

<script>
//这里可以导入其它文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》from ‘《组件路径》';
import BMap from 'BMap'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  name: '',
  data () {
    //这里存放数据

    return {

      map: '',
      mapZoom: 14
    }
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中数据变化
  watch: {},
  //方法集合
  methods: {
    // 初始化
    initMap () {
      // 创建Map实例
      this.map = new BMap.Map('map')
      // 初始化地图,设置中心点坐标和地图级别
      this.map.centerAndZoom(new BMap.Point(104.072242, 30.663711), this.mapZoom)
      // 设置地图显示的城市 此项是必须设置的
      this.map.setCurrentCity('成都')
      // 启用滚轮放大缩小，默认禁用
      this.map.enableScrollWheelZoom(true)
      // 启用地图惯性拖拽，默认禁用
      this.map.enableContinuousZoom(true)
      this.map.addEventListener('click', (data) => {
        // point包含了经纬度
        console.log(data.point)
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

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
.anchorBL {
  display: none;
}
</style>