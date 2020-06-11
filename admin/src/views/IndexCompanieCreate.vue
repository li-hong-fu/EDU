<template>
  <div class="main-container">
    <div class="main-describe">基本信息</div>
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      ref="ruleForm"
      :model="ruleForm"
    >
      <el-form-item
        label="企业全称:"
        prop="name"
        style="display:inline-block;width:45%;margin-right:10%;"
      >
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item
        label="企业短称:"
        prop="short_name"
        style="display:inline-block;width:45%"
      >
        <el-input v-model="ruleForm.short_name"></el-input>
      </el-form-item>
      <el-form-item
        label="企业口号:"
        prop="slogan"
        style="display:inline-block;width:45%;margin-right:10%;"
      >
        <el-input v-model="ruleForm.slogan"></el-input>
      </el-form-item>
      <el-form-item
        label="社会编号:"
        prop="code"
        style="display:inline-block;width:45%"
      >
        <el-input v-model="ruleForm.code"></el-input>
      </el-form-item>
      <el-form-item
        label="联系人名称:"
        prop="contact_name"
        style="display:inline-block;width:45%;margin-right:10%;"
      >
        <el-input v-model="ruleForm.contact_name"></el-input>
      </el-form-item>
      <el-form-item
        label="联系人电话:"
        prop="contact_phone"
        style="display:inline-block;width:45%"
      >
        <el-input v-model="ruleForm.contact_phone"></el-input>
      </el-form-item>
      <el-form-item label="企业介绍:" prop="introduction">
        <el-input v-model="ruleForm.introduction" minlength="10"></el-input>
      </el-form-item>
      <el-form-item label="企业封面:" prop="image_url">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :limit="1"
          :http-request="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="ruleForm.image_url"
            :src="ruleForm.image_url"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handAdd">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import qiniuModel from "../models/qiniu";
import * as qiniu from "qiniu-js";
import companieModel from "../models/companies";
export default {
  data() {
    return {
      labelPosition: "top",
      ruleForm: {
        name: "",
        short_name: "",
        slogan: "",
        code: "",
        contact_name: "",
        contact_phone: "",
        introduction: "",
        image_url: ""
      }
    };
  },
  methods: {
    handleAvatarSuccess(files) {
      let file = files.file;
      let name = file.name;
      let key = "test/" + Date.now() + "_" + name;
      let that = this;
      qiniuModel.qiniu().then(res => {
        let token = res.data.token;
        let domain = res.data.domain;
        let config = { useCdnDomain: true, region: null };
        let putExtra = {
          fname: "",
          params: {},
          mimeType: []
        };
        let observable = qiniu.upload(file, key, token, putExtra, config);
        observable.subscribe({
          next() {
            console.log(123123);
          },
          error(err) {
            console.log(err);
          },
          complete(data) {
            let image_url = domain + "/" + data.key;
            that.ruleForm.image_url = "http://" + image_url;
          }
        });
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG和PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handAdd() {
      let name = this.ruleForm.name;
      let short_name = this.ruleForm.short_name;
      let slogan = this.ruleForm.slogan;
      let code = this.ruleForm.code;
      let contact_name = this.ruleForm.contact_name;
      let contact_phone = this.ruleForm.contact_phone;
      let introduction = this.ruleForm.introduction;
      let image_url = this.ruleForm.image_url;
      if (
        !name ||
        !short_name ||
        !slogan ||
        !code ||
        !contact_name ||
        !contact_phone ||
        !introduction ||
        !image_url
      ) {
        this.$message.error("缺少必要参数!");
        return;
      }
      let params = {
        name,
        short_name,
        slogan,
        code,
        contact_name,
        contact_phone,
        introduction,
        image_url
      };
      companieModel.create(params).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.message);
          this.$router.push({ path: "/epp/companie" });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
  .main-describe {
    width: 630px;
    margin: 30px auto;
    text-align: left;
    padding-left: 20px;
    border-left: 2px solid #999999;
    font-size: 18px;
    font-family: monospace;
    font-weight: 600;
  }
}
.el-form {
  text-align: left;
  width: 650px;
  margin: 0 auto;
}
.el-form-item {
  text-align: left;
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
  background: #ffffff;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
