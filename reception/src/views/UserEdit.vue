<template>
<div class="page-container">
  <h1>个人资料</h1>
  <el-divider></el-divider>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="头像" prop="avatar_url">
      <el-avatar> 
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :limit="1"
          :http-request="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="ruleForm.avatar_url"
            :src="ruleForm.avatar_url"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-avatar>
    </el-form-item>
    <el-form-item label="昵称" prop="name">
      <el-input v-model="ruleForm.name" style="width:300px"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-select v-model="ruleForm.sex" placeholder="请选择性别">
        <el-option
          v-for="item in sexList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="生日" prop="birthday">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="你的出生日期" v-model="ruleForm.birthday"></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="个人简介" prop="introduction">
      <el-input type="textarea" v-model="ruleForm.introduction" style="width:300px;"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import qiniuModel from "../models/qiniu";
import * as qiniu from "qiniu-js";
import userModel from "../models/users"
export default {
  data() {
    return {
      ruleForm: {
        avatar_url:'',
        name: '',
        sex: '',
        birthday: '',
        introduction: ''
      },
      sexList: [
        {
          value:1,
          label:'男'
        },
        {
          value:2,
          label:'女'
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择你的性别', trigger: 'change' }
        ],
        birthday: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        introduction: [
          { required: true, message: '请填写您的个人简介', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    let id = localStorage.getItem("user_id");
    userModel.userInfo(id).then(res => {
      this.ruleForm = res.data.message[0]
      this.ruleForm.birthday = new Date(this.ruleForm.birthday)
    })
  },
  methods: {
    handleAvatarSuccess(files) {
      const file = files.file
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
            let avatar_url = domain + "/" + data.key;
            that.ruleForm.avatar_url = "http://" + avatar_url;
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
    submitForm(formName) {
      let id = localStorage.getItem("user_id");
      let avatar_url = this.ruleForm.avatar_url;
      let name = this.ruleForm.name;
      let sex = this.ruleForm.sex;
      let birthday = this.ruleForm.birthday;
      let introduction = this.ruleForm.introduction;
      let params = { avatar_url, name, sex, birthday, introduction }
      
      this.$refs[formName].validate((valid) => {
        if(valid){
          userModel.userUpdated(id,params).then(res => {
            if(res.data.code === 200){
              this.$message.success(res.data.message)
              this.$router.push({ name: "Index" });
            }
          })
        }
      });
    },
  }
}
</script>

<style lang="less" scoped>
h1{
  margin: 0;
  font-size: 24px;
}
/deep/.el-form-item__content{
  text-align: left;
  .el-upload{
    .avatar{
      width: 40px;
      height: 40px;
    }
  }
  .el-textarea__inner{
    height: 200px;
  }
}
</style>