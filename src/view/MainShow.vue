<template>
  <div>
    <!-- <el-upload
   :disabled="imgupload"
  class="avatar-uploader"
  action="http://localhost:88/api/camera/imgupdate"
  :show-file-list="true"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img  src="img/sketch.jpg" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload> -->
    <el-image :src="loginback"
              class="back"></el-image>
    <div class="ffff">
      <el-upload class="avatar-uploader"
                 action=" 123"
                 :disabled="eluser"
                 :show-file-list="false"
                 :on-success="handleAvatarSuccess"
                 :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl"
             :src="imageUrl"
             class="avatar">
        <i v-else
           class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form ref="form"
               :model="form"
               label-width="80px">
        <el-form-item class="namesex">
          <el-input placeholder="请输入姓名"
                    suffix-icon="el-icon-s-custom"
                    :disabled="eluser"
                    v-model="input">
          </el-input>
          <el-tooltip class="item"
                      effect="dark"
                      :content="huiyuanmessage"
                      placement="top">
            <svg-icon :iconname="huiyuanicon"
                      class="huiyuan"></svg-icon>
          </el-tooltip>
          <div @click="sexchange()">
            <el-button icon="el-icon-male"
                       circle
                       :disabled="eluser"
                       class="myex"></el-button>
            <el-button icon="el-icon-female"
                       circle
                       :disabled="eluser"
                       class="myexfemale"></el-button>
          </div>
          <i class="el-icon-edit"
             @click="eluseredit()"
             @mouseover="editover()"
             @mouseout="editout()"></i>
          <el-tooltip class="item"
                      effect="dark"
                      content="保存"
                      placement="top">
            <i class="el-icon-check"
               @click="checkclick()"
               @mouseover="checkover()"
               @mouseout="checkout()"></i>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="生日时间"
                      class="birthday">
          <el-col :span="11">
            <el-date-picker :disabled="eluser"
                            type="date"
                            placeholder="选择日期"
                            v-model="form.date1"
                            style="width: 100%;"
                            class="birthdaytext"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            @blur="timeout()"></el-date-picker>
          </el-col>
          <el-col :span="11">
            <div class="animated wobble"
                 @mouseover="televeIn(this)"
                 @mouseleave="televeOut(this)">
              <svg-icon :iconname="icon12"></svg-icon>
            </div>
          </el-col>
        </el-form-item>

        <el-form-item label="个性标签">
          <el-tag :key="tag"
                  v-for="tag in dynamicTags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm">
          </el-input>
          <el-button :disabled="eluser"
                     v-else
                     class="button-new-tag"
                     size="small"
                     @click="showInput">+ New Tag</el-button>
        </el-form-item>
        <el-form-item label="所在地区">
          <div class="block">
            <el-cascader :disabled="eluser"
                         v-model="value"
                         :options="options"
                         :props="{ expandTrigger: 'hover' }"
                         @change="handleChange"></el-cascader>
          </div>
        </el-form-item>
        <el-form-item>

          <el-popover :disabled="eluser"
                      placement="bottom"
                      title="标题"
                      width="500"
                      height="700"
                      trigger="click"
                      v-model="emojiShow">
            <el-button slot="reference">😀</el-button>
            <div class="browBox">
              <ul>
                <li v-for="(item, index) in faceList"
                    :key="index"
                    @click="getBrow(index)">
                  {{ item }}
                </li>
              </ul>
            </div>
          </el-popover>

          <el-input class="sketchclass animated fadeInRight"
                    :duration="5000"
                    :disabled="eluser"
                    type="textarea"
                    placeholder="个性签名"
                    v-model="textarea"
                    maxlength="80"
                    show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item align="right">
          <el-link icon="el-icon-present"
                   type="danger"
                   @click="goSpace('pri')">个人空间</el-link>
          <el-link icon="el-icon-sunny"
                   type="danger"
                   @click="goSpace('sha')">record空间</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script >
import SvgIcon from '../components/SvgIcon.vue';
import axios from "axios";
import UpdateTX from '../components/UpdateTX.vue';
//这里可以导入其它文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》from ‘《组件路径》';
const appData = require("@/assets/images/emojis.json");
export default {
  //import引入的组件需要注入到对象中才能使用
  inject: ['reload'],
  components: {
    SvgIcon,
    axios,
    UpdateTX,
  },
  props: {},
  data () {
    //这里存放数据
    return {
      //circleUrl: require('../assets/img/sketch.jpg'),
      //userback:require('../assets/img/userback.jpg'),

      //聊天输入内容
      //textarea: "",
      //表情框是否展示
      emojiShow: false,
      //表情列表
      faceList: [],
      //表情文本
      getBrowString: "",


      huiyuanicon: '',
      textarea: '',
      huiyuanmessage: '会员到期yyyy-dd-hh',
      form: {
        name: '',
        region: '',
        date1: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      input: '宋红建',
      eluser: true,
      icon12: "icon-svgshuangzi",
      dynamicTags: ['标签一'],
      inputVisible: false,
      inputValue: '',
      imageUrl: require('../assets/img/pexels-daniel-jurin-1835712.jpg'),
      loginback: require('../assets/img/pexels-daniel-jurin-1835712.jpg'),
      imgupload: true,
      value: [],
      label: [],
      options: [],
      reCityId: [],
      umId: 1,
      umSex: 1,
      umNumberDay: "",
      umNumber: 1,
      renum: 0


    }
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中数据变化
  watch: {},
  //方法集合
  methods: {
    sexchange () {
      if (this.$(".myex").css("display") === "block") {
        this.$(".myex").css("display", "none");
        this.$(".myexfemale").css("display", "block");
        this.umSex = 0;
      } else {
        this.$(".myexfemale").css("display", "none");
        this.$(".myex").css("display", "block");
        this.umSex = 1;
      }
    },
    isChildrenNull (data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].children.length === 0) {
          data[i].children = undefined;
        } else {
          this.isChildrenNull(data[i].children);
        }
      }
      return data;
    },
    handleChange (value) {
      this.reCityId = value;
      //console.log(value);
    },
    timeout () {
      let timeStr = (this.form.date1).split('-');
      let mon = parseInt(timeStr[1]), day = parseInt(timeStr[2]);
      if (mon === 1) {
        if (day >= 20) this.icon12 = "icon-svgshuiping"
      } else if (mon === 2) {
        if (day <= 18) this.icon12 = "icon-svgshuiping"
        else this.icon12 = "icon-svgshuangyu"
      } else if (mon === 3) {
        if (day <= 20) this.icon12 = "icon-svgshuangyu"
        else this.icon12 = "icon-svgbaiyang"
      } else if (mon === 4) {
        if (day <= 19) this.icon12 = "icon-svgbaiyang"
        else this.icon12 = "icon-svgjinniu"
      } else if (mon === 5) {
        if (day <= 20) this.icon12 = "icon-svgjinniu"
        else this.icon12 = "icon-svgshuangzi"
      } else if (mon === 6) {
        if (day <= 21) this.icon12 = "icon-svgshuangzi"
        else this.icon12 = "icon-svgicon_-xingzuo-juxiezuo"
      } else if (mon === 7) {
        if (day <= 22) this.icon12 = "icon-svgicon_-xingzuo-juxiezuo"
        else this.icon12 = "icon-svgshizi"
      } else if (mon === 8) {
        if (day <= 22) this.icon12 = "icon-svgshizi"
        else this.icon12 = "icon-svgchunv"
      } else if (mon === 9) {
        if (day <= 22) this.icon12 = "icon-svgchunv"
        else this.icon12 = "icon-svgtiancheng"
      } else if (mon === 10) {
        if (day <= 23) this.icon12 = "icon-svgtiancheng"
        else this.icon12 = "icon-svgtianxie"
      } else if (mon === 11) {
        if (day <= 22) this.icon12 = "icon-svgtianxie"
        else this.icon12 = "icon-svgsheshou"
      } else if (mon === 12) {
        if (day <= 22) this.icon12 = "icon-svgsheshou"
        else this.icon12 = "icon-svgmojie"
      }


    },
    televeIn () {
      this.$('.animated').addClass("wobble");

    }, televeOut () {
      this.$('.animated').removeClass("wobble")
    },
    eluseredit () {
      if (this.eluser) {
        this.$(".el-icon-check").css('display', 'block');
        this.eluser = false;
        this.imgupload = false;
      } else {
        this.$(".el-icon-check").css('display', 'none');
        this.eluser = true;
        this.imgupload = true;
      }

    },
    editover () {

      this.$(".el-icon-edit").css({
        "color": "white",
        "font-size": "30px"
      });
    },
    editout () {
      this.$(".el-icon-edit").css({
        "color": "black",
        "font-size": "25px"
      });
    },
    checkclick () {
      let tagStr = "";
      for (let i = 0; i < this.dynamicTags.length; i++) {
        tagStr = tagStr + this.dynamicTags[i] + ";"
      }
      tagStr = tagStr.substr(0, tagStr.length - 1);
      let reCityIds = 0;
      if (this.reCityId.length === 0) {
        reCityIds = this.value[2];
      } else {
        reCityIds = this.reCityId[2];
      }

      axios.post("/camera/saveUserMessage", {
        umId: this.umId,
        umName: this.input,
        umSex: this.umSex,
        umBirthday: this.form.date1,
        umTab: tagStr,
        umArea: parseInt(reCityIds),
        umHeader: document.getElementsByClassName("avatar")[0].src,
        umTabMessage: this.textarea,
        umNumberDay: this.umNumberDay,
        umNumber: this.umNumber

      }).then(data => {
        if (data) {
          this.$message({
            message: '恭喜你，修改成功',
            type: 'success'
          });
        }


      })
      this.eluseredit();
    },
    checkover () {

      this.$(".el-icon-check").css({
        "color": "green",
      });
    },
    checkout () {
      this.$(".el-icon-check").css({
        "color": "red",
      });
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput () {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm () {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    handleAvatarSuccess (res, file) {
      /* console.log(URL.createObjectURL(file.raw));
     this.imageUrl = URL.createObjectURL(file.raw); */
      //console.log(this.$(".avatar"));
    },
    beforeAvatarUpload (file) { //上传前的函数
      //上传前对图片类型和大小进行判断
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      //校验成功上传文件
      if (isJPG && isLt2M == true) {
        //console.log(file);

        //将文件转化为formdata数据上传
        let fd = new FormData()
        fd.append('file', file)
        console.log(file)

        // post上传图片

        let that = this

        new Promise(function (resolve, reject) {
          axios.post('/camera/imgupdate', fd,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }).then(data => {
              let ss = 'img/' + file.name;
              //console.log(ss);
              document.getElementsByClassName("avatar")[0].src = ss;
              /* this.$('.avatar').attr('src',ss); */
            }).catch((error) => {
              //this.$message.error('头像上传失败，请重新上传!');
            })
        })
      }
      return isJPG && isLt2M;

    },
    flashCity () {
      axios.post("/camera/getCityMessage", {

      }).then(data => {
        let oo = this.isChildrenNull(data.data);
        this.options = data.data;


      })
    },
    flashMessage () {

      axios.post("/camera/userMessage", {
        umid: JSON.parse(this.$route.query.umid)
      }).then(data => {
        document.getElementsByClassName("avatar")[0].src = data.data.umHeader;
        console.log(document.getElementsByClassName("avatar")[0].src);
        this.input = data.data.umName;
        this.umId = data.data.umId;
        this.form.date1 = data.data.umBirthday;
        this.timeout();
        this.textarea = data.data.umTabMessage;
        this.dynamicTags = data.data.tab;
        this.value = data.data.umAreaDetails;
        this.umNumberDay = data.data.umNumberDay;
        this.umNumber = data.data.umNumber;
        if (data.data.umSex === 1) {
          this.$(".myex").css("display", "block");
          this.$(".myexfemale").css("display", "none")

        } else {
          this.$(".myex").css("display", "none");
          this.$(".myexfemale").css("display", "block")
        }
        if (data.data.umNumber === 1) {
          this.huiyuanicon = "icon-svghuiyuan";
          //this.$(".huiyuan").attr("iconname","icon-svghuiyuan");
          this.huiyuanmessage = "会员到期" + data.data.umNumberDay;
        } else {
          this.huiyuanicon = "icon-svghuiyuan1";
          //this.$(".huiyuan").attr("iconname","icon-svghuiyuan1");
          this.huiyuanmessage = "会员已到期";
        }
        console.log(data);
        this.$forceUpdate();
      })
    },
    //加载表情，存放到表情列表中
    loadEmojis () {
      for (let i in appData) {
        this.faceList.push(appData[i].char);
      }
    },
    // 获取用户点击之后的标签 ，存放到输入框内
    getBrow (index) {
      for (let i in this.faceList) {
        if (index == i) {
          this.getBrowString = this.faceList[index];
          this.textarea += this.getBrowString;
        }
      }
      this.emojiShow = false;
    },
    goSpace (priOrSha) {
      localStorage.setItem("renum", 0);
      this.$router.push({
        path: '/Space',
        query: { umid: this.$route.query.umid, priOrSha: priOrSha }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadEmojis();

    //localStorage.setItem("renum", 0);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.flashCity();
    this.flashMessage();
    console.log(localStorage.getItem("renum"));
    if (localStorage.getItem("renum") != undefined) {
      this.renum = Number(JSON.parse(localStorage.getItem("renum")));
      console.log("com", this.renum);
    }
    if (this.renum < 1) {
      const timer = setTimeout(() => {
        // 某些定时器操作 
        console.log(localStorage.getItem("renum"));
        console.log(this.renum);

        if (this.renum < 5) {
          this.renum++;

        }
        localStorage.setItem("renum", JSON.stringify(this.renum));
        console.log("renum++");
        this.reload();
      }, 1000);
      // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer);
      })
    }

  },
  //生命周期-创建之前
  beforeCreated () {
    localStorage.setItem("renum", 0)
  },
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

.browBox {
  width: 100%;
  height: 200px;
  background: #e6e6e6;
  position: absolute;
  z-index: 100;
  bottom: 0px;
  overflow: scroll;
}
.browBox ul {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}
.browBox ul li {
  cursor: pointer;
  width: 10%;
  font-size: 26px;
  list-style: none;
  text-align: center;
}
.submit-btn {
  margin: 0 15px 10px 0;
  float: right;
}

.el-icon-check {
  padding: 10px;
  top: -4px;
  position: absolute;
  left: 170px;
  font-size: 28px;
  display: none;
}
.ffff {
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
}
form.el-form {
  margin: 0 auto;
  width: 80%;
}
.el-icon-edit {
  font-size: 25px;
  color: black;
  padding: 10px;
  top: -4px;
  position: absolute;
  left: 142px;
}
.myex[data-v-0f1ebcd2] {
  background-color: rgb(179, 246, 255, 0);
  position: absolute;
  top: 1px;
  color: rgb(103 224 246);
  border: none;
  left: 98px;
  display: none;
}
.myexfemale {
  background-color: rgb(179, 246, 255, 0);
  position: absolute;
  top: 1px;
  color: pink;
  border: none;
  left: 87px;
  display: none;
}
.namesex {
  width: 15%;
  margin-left: 36%;
}
.birthday {
  width: 40%;
  margin-left: 36%;
  color: red;
}

.el-input__inner {
  text-align: center;
}
.el-avatar--large {
  width: 150px;
  height: 150px;
}
.usermessage {
  background: url("../assets/img/userback.jpg") 0 0;
  background-size: 100% 100%;
  height: 100%;
}
.birthdaytext {
  text-align: center;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.svg-icon {
  font-size: 19px;
  color: rgb(68, 68, 68);
}
</style>
<style>
.el-form-item__label {
  color: rgb(8, 8, 8);
  position: absolute;
  left: 485px;
}
.avatar {
  border-radius: 50%;
}
input.el-input__inner {
  background-color: rgb(255, 255, 255, 0);
  color: #000;
}
.el-input__prefix {
  color: black;
}
.el-input.is-disabled .el-input__inner {
  background-color: rgb(255, 255, 255, 0);
  color: #000;
  border: none;
}
.el-icon-s-custom {
  color: black;
}
.huiyuan {
  position: absolute;
  top: 10px;
  left: 129px;
}
.el-upload {
  margin: 20px;
  margin-top: 95px;
}
</style>