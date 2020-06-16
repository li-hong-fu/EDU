<template>
  <div class="main-container">
    <div class="main-describe">基本信息</div>
    <el-form
      :label-position="labelPosition"
      :rules="rules"
      label-width="80px"
      ref="ruleForm"
      :model="ruleForm"
    >
      <el-form-item
        label="技能全称:"
        prop="name"
        style="display:inline-block;width:300px;margin-right:50px;"
      >
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item
        label="技能提示:"
        prop="slug"
        style="display:inline-block;width:300px"
      >
        <el-input v-model="ruleForm.slug"></el-input>
      </el-form-item>
      <el-form-item label="技能介绍:" prop="description">
        <el-input v-model="ruleForm.description" minlength="10"></el-input>
      </el-form-item>
      <el-form-item label="技能封面:" prop="imageUrl">
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
        <el-button type="primary" @click="handEdit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import stackModel from "../models/stack";
import qiniuModel from "../models/qiniu";
import * as qiniu from "qiniu-js";
export default {
  data() {
    return {
      labelPosition: "top",
      ruleForm: {
        name: "",
        tag_line: "",
        description: "",
        image_url: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入技能名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        slug: [
          { required: true, message: "请输入技能提示", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 10, message: "长度最少10个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    let id = this.$route.params.id;
    stackModel.getStack(id).then(res => {
      console.log(res)
      this.ruleForm = res.data.message;
    });
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
    handEdit() {
      let id = this.$route.params.id;
      let name = this.ruleForm.name;
      let tag_line = this.ruleForm.tag_line;
      let description = this.ruleForm.description;
      let image_url = this.ruleForm.image_url;

      if (!name || !tag_line || !description) {
        this.$message.success("缺少必要参数!");
        return;
      }
      let params = { name, tag_line, description, image_url };
      stackModel.editStack(id, params).then(res => {
        if (res.data.code === 200) {
          this.$message.success("修改成功!");
          this.$router.push({ path: "/sqb/stack" });
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
