<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        删除相册<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :disabled="d1"
                          @click.native="open(1)">相册1</el-dropdown-item>
        <el-dropdown-item :disabled="d2"
                          @click.native="open(2)">相册2</el-dropdown-item>
        <el-dropdown-item :disabled="d3"
                          @click.native="open(3)">相册3</el-dropdown-item>
        <el-dropdown-item :disabled="d4"
                          @click.native="open(4)">相册4</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </div>
</template>

<script>
//这里可以导入其它文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》from ‘《组件路径》';
import axios from "axios";
export default {
  //import引入的组件需要注入到对象中才能使用
  inject: ['reload'],
  components: { axios },
  props: {},
  data () {
    //这里存放数据
    return {
      d1: true, d2: true, d3: true, d4: true,
    }
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中数据变化
  watch: {},
  //方法集合
  methods: {
    open (num) {
      console.log("open", num);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post("/camera/deAlbum", {
          umid: this.$route.query.umid,
          numid: num
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.be();
        this.reload();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    be () {
      axios.post("/camera/showAlbum", {
        umid: this.$route.query.umid

      }).then(data => {
        console.log(data);
        for (let i = 0; i < 4; i++) {
          if (i == 0) this.d1 = data.data[i]
          if (i == 1) this.d2 = data.data[i]
          if (i == 2) this.d3 = data.data[i]
          if (i == 3) this.d4 = data.data[i]
        }
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.be();
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
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>