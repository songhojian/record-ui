<template>
  <div>
   <el-upload
  class="avatar-uploader"
  action=" 123"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </div>

</template>

<script>
export default {
  data () {
    return {
      hideUpload: false,
      dialogImageUrl: '',
      dialogVisible: false,//图片预览弹窗
      formLabelWidth: '80px',
      limitNum: 1,
      form: {},
      dialogVisible2: false//弹窗
    }
  },
  methods: {
    // 上传文件之前的钩子
    handleBeforeUpload (file) {
      if (!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
        this.$notify.warning({
          title: '警告',
          message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
        })
      }
      let size = file.size / 1024 / 1024 / 2
      if (size > 2) {
        this.$notify.warning({
          title: '警告',
          message: '图片大小必须小于2M'
        })
      }
      let fd = new FormData();//通过form数据格式来传
      fd.append("picFile", file); //传文件
      console.log(fd.get('picFile'));
      this.api({
        url: "/test/up",
        method: "post",
        data: fd,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((data) => {

      })
    },
    // 文件超出个数限制时的钩子
    handleExceed (files, fileList) {

    },
    // 文件列表移除文件时的钩子
    handleRemove (file, fileList) {
      this.hideUpload = fileList.length >= this.limitNum;

    },
    // 点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadFile () {
      this.$refs.upload.submit()

    },
    imgChange (files, fileList) {
      this.hideUpload = fileList.length >= this.limitNum;
      if (fileList) {
        this.$refs.uploadElement.clearValidate();
      }
    },
    tocancel () {
      this.dialogVisible2 = false



    }
  }
}
</script>

<style lang="scss" >
.hide .el-upload--picture-card {
  display: none;
}
</style>