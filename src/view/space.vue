<template>
  <div>
    <el-image :src="loginback"
              class="back"></el-image>
    <div class="ffff">

      <el-carousel :interval="4000"
                   type="card"
                   :autoplay="false">
        <el-carousel-item v-for="itemre in numfor"
                          :key="itemre.reId">
          <el-form ref="form"
                   :model="item"
                   :markpage="itemre.reId">
            <el-form-item label="">
              <img :src="itemre.rePriImg"
                   class="op">
            </el-form-item>

            <el-form-item label="">
              <el-input type="textarea"
                        class="spacetextarea"
                        :disabled="true"
                        v-model="itemre.reContent"></el-input>
            </el-form-item>
            <el-form-item>
              <el-col :span="24">
                <div class="demo-image__placeholder">
                  <div class="block">
                    <img :src="itemre.shareImg1"
                         class="sharesImg">
                  </div>
                </div>
                <div class="demo-image__placeholder">
                  <div class="block">
                    <el-image :src="itemre.shareImg2"
                              class="sharesImg1"></el-image>
                  </div>
                </div>
              </el-col>
            </el-form-item>
            <el-form-item class="markop">
              <el-col :span="11">
                <el-badge :value="itemre.reAgree"
                          class="iop"> </el-badge>
                <div class="animated rubberBand"
                     @mouseover="televeIn(this,itemre)"
                     @mouseleave="televeOut(this,itemre)"
                     @click="changCol(itemre.reId)">

                  <i class="el-icon-cold-drink clickagreet"> </i>
                </div>

              </el-col>

              <el-col :span="2">
                <el-badge :value="itemre.mark"
                          class="item">
                  <el-button size="small"
                             @click="vis(itemre.reId)">评论</el-button>
                </el-badge>
                <i class="el-icon-plus plus"
                   @mousemove="changePlus"
                   @mouseleave="changePlus1"
                   @click="goRId(itemre.reId)"></i>

              </el-col>

            </el-form-item>
            <el-form-item class="markop">
              <el-collapse v-model="activeNames"
                           @change="handleChange"
                           v-show="false"
                           :key="itemre.reId">
                <el-collapse-item title=""
                                  name="1">
                  <div v-for="itemco in itemre.commentEntities"
                       :key="itemco.comId">
                    <span>{{itemco.comName}}:</span><span>{{itemco.comContent}}
                    </span><i class="el-icon-alarm-clock
"></i><span class="time">{{itemco.comTime}}</span>
                  </div>

                </el-collapse-item>
              </el-collapse>
            </el-form-item>

          </el-form>
          <!-- <h3 class="medium">{{ item }}</h3> -->
        </el-carousel-item>
      </el-carousel>
      <!-- <img v-if="imageUrl"
           :src="imageUrl"
           class="avatar"> -->
      <el-tooltip class="item"
                  effect="dark"
                  content="我想写高兴的事"
                  placement="top">
        <i class="el-icon-edit opedit"
           @click="dialogFormVisible = true"></i>
      </el-tooltip>
      <el-dialog title="高兴的事"
                 :visible.sync="dialogFormVisible">
        <el-form :model="formadd">
          <el-form-item class="addText"
                        label=""
                        :label-width="formLabelWidth">
            <el-popover class="emojipos"
                        placement="bottom"
                        title="标题"
                        width="500"
                        height="700"
                        trigger="click"
                        v-model="formadd.emojiShow">
              <el-button slot="reference"
                         type="text">😀</el-button>
              <div class="browBox">
                <ul>
                  <li v-for="(item, index) in this.formadd.faceList"
                      :key="index"
                      @click="getBrow(index)">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </el-popover>
            <el-input :rows="5"
                      type="textarea"
                      placeholder="请输入内容"
                      @keyup.enter.native="submitMessage"
                      v-model="formadd.content"
                      class="addText">
            </el-input>
          </el-form-item>
          <el-form-item label=""
                        :label-width="formLabelWidth"
                        class="addText2">
            <!--   <el-select v-model="formadd.region"
                       placeholder="请选择活动区域">
              <el-option label="区域一"
                         value="shanghai"></el-option>
              <el-option label="区域二"
                         value="beijing"></el-option>
            </el-select> -->
            <el-col :span="24">
              <el-divider><label><i class="el-icon-ice-drink"></i>分享record</label></el-divider>
            </el-col>

            <el-col :span="24">

              <el-upload action="http://localhost:881/api/camera/space/saveFXImg"
                         list-type="picture-card"
                         :on-preview="handlePictureCardPreview"
                         :on-remove="handleRemove"
                         :on-success="onSuccess"
                         :multiple="true"
                         :limit="2"
                         :on-exceed="OverNum">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%"
                     :src="dialogImageUrl"
                     alt="">
              </el-dialog>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="deleteDate()">取 消</el-button>
          <el-button type="primary"
                     @click="submit()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-drawer title="我想说😕 !"
               :before-close="handleClose"
               :visible.sync="dialog"
               direction="ltr"
               custom-class="demo-drawer"
               ref="drawer">
      <div class="demo-drawer__content">
        <el-input class="sketchclass animated fadeInRight"
                  :duration="5000"
                  type="textarea"
                  placeholder="hhhhhh"
                  v-model="textarea"
                  maxlength="80"
                  show-word-limit>
        </el-input>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary"
                     @click="closeDrawer()">OK</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
//这里可以导入其它文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》from ‘《组件路径》';
import axios from "axios";
const appData = require("@/assets/images/emojis.json");
export default {
  //import引入的组件需要注入到对象中才能使用
  inject: ['reload'],
  components: { axios },
  props: {},
  data () {
    //这里存放数据
    return {
      nowReId: 0,
      table: false,
      dialog: false,
      loading: false,
      textarea: "",
      umName: "",
      textareaV: "false",
      item: {},
      collpaseVis: false,
      fileImg: {},
      Imgname: [],
      dialogImageUrl: '',
      dialogVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      numfor: [{
        commentEntities: [{
          comId: 0,
          comName: "",
          comContent: "",
          comTime: "",
        }],
        grAva: require('../assets/img/pexels-daniel-jurin-1835712.jpg'),
        src: require('../assets/img/pexels-daniel-jurin-1835712.jpg'),
        src1: require('../assets/img/pexels-daniel-jurin-1835712.jpg'),
        reContent: '',
        mark: 12,
        reAgree: 0,
        reId: 0,
        rePriImg: require('../assets/img/pexels-daniel-jurin-1835712.jpg'),
        shareImg1: require('../assets/img/pexels-daniel-jurin-1835712.jpg'),
        shareImg2: require('../assets/img/pexels-daniel-jurin-1835712.jpg'),
      }],
      loginback: require('../assets/img/pexels-daniel-jurin-1835712.jpg'),
      imageUrl: require('../assets/img/pexels-daniel-jurin-1835712.jpg'),
      activeNames: [],
      list: [
        { id: 1, name: '李斯', mark: "", time: "" },
        { id: 2, name: '吕不韦', mark: "", time: "" },
        { id: 3, name: '嬴政', mark: "", time: "" }
      ],
      formadd: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        //聊天输入内容
        content: "",
        //表情框是否展示
        emojiShow: false,
        //表情列表
        faceList: [],
        //表情文本
        getBrowString: "",
      },

      form: {
        name: '',
        region: '',
        grAva: require('../assets/img/pexels-daniel-jurin-1835712.jpg'),
        src: require('../assets/img/pexels-daniel-jurin-1835712.jpg'),
        src1: require('../assets/img/pexels-daniel-jurin-1835712.jpg'),
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        mark: 12,
        renum: 0,
      }

    }
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中数据变化
  watch: {},
  //方法集合
  methods: {
    closeDrawer () {
        console.log("data", this);
      if (this.textarea === '') {
        this.$message.error('😡😡空内容??');
      } else {
            
        axios.post("/camera/record/saveCom", {
          content: this.textarea,
          umName: this.umName,
          reId: this.nowReId
        })
        this.$message({
          message: '😝😝评论成功!!',
          type: 'success'
        });
        this.dialog = false;
        this.reload();
      }

    },
    handleClose (done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
        })
        .catch(_ => { });
    },
    cancelForm () {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    changePlus (e) {
      //console.log(e.target);
      this.$(e.target).css("color", "white")
    },
    changePlus1 (e) {
      //console.log(e.target);
      this.$(e.target).css("color", "black")
    },
    clickPlus () {

    },
    vis (index) {
      console.log(this.numfor.length);
      index = Number(this.numfor.length - index);
      console.log(index, this.$(this.$(".markop .el-collapse")[index]), this.$(this.$(".markop .el-collapse")));
      if (this.$(this.$(".markop .el-collapse")[index]).css('display') === 'none') this.$(this.$(".markop .el-collapse")[index]).css('display', 'block');
      else this.$(this.$(".markop .el-collapse")[index]).css('display', 'none')
      //let flag=false;

      //return flag;
    },
    OverNum () {
      this.$message.error('最多分享两张照片😡!!');
    },
    onSuccess (data) {
      this.Imgname.push(data);
      console.log("hi", data, this.Imgname);
    },
    deleteData () {
      this.dialogFormVisible = false;

    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange () {

    },
    flushMessage () {
        console.log("this.umName",this.umName);
      axios.post("/camera/userMessage", {
        umid: JSON.parse(this.$route.query.umid)
      }).then(data => {
          console.log("this.umName",this.umName);
      
        this.umName = data.data.umName;
          document.getElementsByClassName("avatar")[0].src = data.data.umHeader;
      })
    },
    goRId (item) {
      this.nowReId = item;
      this.dialog = true;
    },
    televeIn (t, item) {

      //let s = ".el-form [markPage=='" + item + "']";
      //console.log(this.$("form[markpage=1]"), this.$("form[markpage=" + item + "] "), typeof item);
      //this.$("form[markpage=" + item + "] .animated").addClass("rubberBand");

    }, televeOut (t, item) {

    },
    changCol (item) {
//       console.log("ss", item);
// console.log(this.numfor, this.numfor[item]);

      if (this.$("form[markpage='" + item + "'] .animated i").css("color") != "rgb(255, 192, 203)") {
        this.$("form[markpage='" + item + "'] .animated i").css("color", "pink");
        //console.log(this.$("form[markpage='" + item + "'] .iop sup").html());
        //this.$("form[markpage='" + item + "'] .iop").attr("value", 12)
        let ii = this.$("form[markpage='" + item + "'] .iop sup").html();
        this.$("form[markpage='" + item + "'] .iop sup").html(Number(ii) + 1);
      }
      else {
        this.$("form[markpage='" + item + "'] .animated i").css("color", "white"); 
        //console.log(this.$("form[markpage='" + item + "'] .iop sup").html());
        let ii = this.$("form[markpage='" + item + "'] .iop sup").html();
        this.$("form[markpage='" + item + "'] .iop sup").html(ii - 1);
        //this.$("form[markpage='" + item + "'] .iop").attr("value", 12)
      }
      axios.post("/camera/record/changeAgree", {
        umid: JSON.parse(this.$route.query.umid) + "",
        reid: item,
      })
    },
    loadEmojis () {
      for (let i in appData) {
        this.formadd.faceList.push(appData[i].char);
      }
    },
    // 获取用户点击之后的标签 ，存放到输入框内
    getBrow (index) {
      for (let i in this.formadd.faceList) {
        if (index == i) {
          this.getBrowString = this.formadd.faceList[index];
          this.formadd.content += this.getBrowString;
        }
      }
      this.formadd.emojiShow = false;
    },
    deleteDate () {
      this.dialogFormVisible = false

    },
    submit () {
      this.dialogFormVisible = false;
      let svaeImg = "space/" + this.Imgname[0] + ";space/" + this.Imgname[1];
      axios.post("/camera/record/save", {
        umid: JSON.parse(this.$route.query.umid),
        content: this.formadd.content,
        umImg: document.getElementsByClassName("avatar")[0].src,
        recordImg: svaeImg
      })
      this.reload();
    },
    submitMessage () {
      //提交。。。
    },
    flushAgr () {
      //console.log(this.$('.el-icon-cold-drink.clickagreet'), "??");
      //this.$(this.$('.el-icon-cold-drink .clickagreet')[0]).css("color", "red");
      axios.post("/camera/record/flushAgr", {
        umid: JSON.parse(this.$route.query.umid) + "",
      }).then(data => {
        //console.log(data);
        let agrO = data.data;
        for (let i = 0; i < agrO.length; i++) {
          if (agrO[i]) this.$(this.$('.clickagreet')[i]).css("color", "pink");
        }
      })

    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {
    /* this.$nextClick(); */
    this.loadEmojis();
    //localStorage.setItem("renum", 0);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

    this.flushMessage();
    //console.log(this.$route.query.priOrSha);
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
        this.reload();
      }, 1000);
      // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer);
      })
    }
    if (this.$route.query.priOrSha === 'sha') {
      axios.post("/camera/record/getmassageshare", {
        id: JSON.parse(this.$route.query.umid)
      }).then(data => {
        console.log("src", document.getElementsByClassName("op"));
        //console.log(data);
        this.numfor = data.data;
        console.log(this.numfor);
        //document.getElementsByClassName(".op")[0].src = data.data.rePriImg;
      })
    } else {
      axios.post("/camera/record/getmassagepri", {
        id: JSON.parse(this.$route.query.umid)
      }).then(data => {
        console.log("src", document.getElementsByClassName("op"));
        //console.log(data);
        this.numfor = data.data;
        console.log(this.numfor);
        //document.getElementsByClassName(".op")[0].src = data.data.rePriImg;
      })
    }

  }
  ,
  //生命周期-创建之前
  beforeCreated () { },
  //生命周期-挂载之前
  beforeMount () { },
  //生命周期-更新之前
  beforUpdate () { },
  //生命周期-更新之后
  updated () { this.flushAgr(); },
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
.emojipos {
  position: absolute;
  top: -73px;
  left: 230px;
}
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
.el-collapse {
  position: absolute;
  top: 295px;
  left: 89px;
  right: 73px;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
  position: absolute;
  top: 265px;
  left: 690px;
}
.clickagreet {
  font-size: 27px;
  position: absolute;
  top: 242px;
  left: 645px;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
  border-radius: 50%;
  position: absolute;
  top: 100px;
  left: 20px;
  z-index: 1;
}
.markop {
  top: 20px;
}
.op {
  width: 78px;
  height: 78px;
  top: 13px;
  display: block;
  border-radius: 50%;
  position: absolute;
  left: 20px;
  z-index: 1;
}
.el-carousel__item {
  width: 100px;
}
.el-carousel__item h3 {
  z-index: 2;
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  width: 100px;
  margin: 0;
}
.opedit {
  top: 622px;
  left: 30px;
  font-size: 42px;
  color: #beeef3;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel.el-carousel--horizontal.el-carousel--card {
  width: 1650px;
  /* height: 409px; */
}

.el-carousel__item[data-v-46bfdfb5] {
  width: 850px;
}
.sharesImg {
  width: 37%;
  position: absolute;
  top: 48px;
  left: 93px;
}
.sharesImg1 {
  width: 37%;
  position: absolute;
  top: 48px;
  left: 458px;
}
.back {
  width: 100%;
}
.el-icon-ice-drink {
  color: orange;
}
.plus {
  position: absolute;
  top: 289px;
  left: 752px;
}
</style>
<style lang="scss">
.el-carousel__container {
  position: relative;
  height: 600px;
}
.spacetextarea {
  position: relative;
  display: inline-block;
  width: 80%;
  height: 2px;
  left: 8px;
  vertical-align: bottom;
}
.addText {
  margin-left: -57px;
}
.addText2 {
  margin-left: -118px;
}
.el-badge__content {
  position: absolute;
  background-color: #f56c6c;
  border-radius: 50%;
  color: #f6f6f6;
  display: inline-block;
  font-size: 10px;
  height: 19px;
  width: 19px;
  top: 247px;
  left: 465px;
  line-height: 18px;
  padding: 0px 0px;
  text-align: center;
  white-space: nowrap;
  border: 1px solid #ffffff;
}
</style>