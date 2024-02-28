<template>
  <div class="funLast">
    <el-dropdown>
      <span class="el-dropdown-link">
        功能<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="fun(1)">变亮</el-dropdown-item>
        <el-dropdown-item @click.native="fun(2)">加边框</el-dropdown-item>
        <el-dropdown-item @click.native="fun(3)">模糊</el-dropdown-item>
        <el-dropdown-item @click.native="fun(4)">Canny边缘</el-dropdown-item>
        <el-dropdown-item @click.native="fun(5)">灰度</el-dropdown-item>
        <el-dropdown-item @click.native="fun(6)">灰度高光</el-dropdown-item>
        <el-dropdown-item @click.native="fun(7)">灰度反差</el-dropdown-item>
        <el-dropdown-item @click.native="fun(8)">素描</el-dropdown-item>
        <el-dropdown-item @click.native="fun(9)">卡通</el-dropdown-item>
        <el-dropdown-item @click.native="fun(10)">彩色描边</el-dropdown-item>
        <el-dropdown-item @click.native="fun(11)">Scharr边缘</el-dropdown-item>
        <el-dropdown-item @click.native="fun(12)">Laplacian边缘</el-dropdown-item>
        <el-dropdown-item @click.native="fun(13)">证件照换底</el-dropdown-item>
        <el-dropdown-item @click.native="fun(14)">索贝尔</el-dropdown-item>
        <el-dropdown-item @click.native="fun(15)">浮雕</el-dropdown-item>
        <el-dropdown-item @click.native="fun(16)">轮廓内核</el-dropdown-item>
        <el-dropdown-item @click.native="fun(17)">拉普拉斯</el-dropdown-item>
        <el-dropdown-item @click.native="fun(18)">锐化</el-dropdown-item>
        <el-dropdown-item @click.native="fun(19)">恐怖</el-dropdown-item>
        <el-dropdown-item @click.native="fun(20)">一点点美颜</el-dropdown-item>

      </el-dropdown-menu>
    </el-dropdown>
    <div class="imgupdata">
      <el-upload action="123"
                 list-type="picture-card"
                 :auto-upload="false"
                 :show-file-list="true"
                 :multiple="false"
                 :disabled="myupfun"
                 :on-change="beforeAvatarUpload">
        <i slot="default"
           class="el-icon-plus"></i>
        <div slot="file"
             slot-scope="{file}">
          <img class="el-upload-list__item-thumbnail"
               :src="file.url"
               alt="">
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)">
              <i class="el-icon-zoom-in"></i>
            </span>
            <span v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)">
              <i class="el-icon-download"></i>
            </span>
            <span v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file,$event)">
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%"
             :src="dialogImageUrl"
             alt="">
      </el-dialog>
    </div>

    <img src=""
         class="funResult">
  </div>
</template>

<script>
//这里可以导入其它文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》from ‘《组件路径》';
import axios from "axios"
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data () {
    //这里存放数据
    return {
      disabled: false,
      myupfun: false,
      dialogImageUrl: '',
      dialogVisible: false,
      processImgName: "",
    }
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中数据变化
  watch: {},
  //方法集合
  methods: {
    fun (num) {
      console.log(num);
      let that = this;
      axios.post("/camera/funLast", {
        funnum: num,
        funImgName: this.processImgName,
      }).then(data => {
        console.log(data);
        $(".funResult").attr("src", "/funcre/" + that.processImgName + "?"+new Date().getTime());
      })
    }, handleRemove (file, e) {
      let now = e.currentTarget.parentNode.parentNode.parentNode;
      this.$(now).css('display', 'none');
      console.log(file, "delete", now);
      this.myupfun = false;
      this.$message({
        message: '恭喜你，删除成功',
        type: 'success'
      });
    },
    beforeAvatarUpload (file) {
      let fddd = new FormData();
      fddd.append('file', file.raw)
      console.log(file, fddd);
      this.myupfun = true;

      //console.log(fd)

      // post上传图片

      let that = this

      new Promise(function (resolve, reject) {
        axios.post('/camera/saveFunImg', fddd,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((data) => {

            that.processImgName = data.data; console.log(data.data);
            //that.show = "/funcRe/" + that.processImgName;
            //document.querySelector(".funResult").src = "/funcImg/" + that.processImgName;
            //$(".funResult").attr("src", "/funcImg/" + that.processImgName);
            //console.log(that.show);
          }).catch((error) => {
            //this.$message.error('头像上传失败，请重新上传!');
          })

        //
      })

    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload (file) {
      console.log(file);
    },
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
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.funResult {
  width: 1000px;
  height: 1000px;
}
</style>