<template>
  <div class="main-container">
    <div class="main-describe">基本信息</div>
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      ref="ruleForm"
      :model="Form"
    >
      <el-form-item label="名称:" prop="name">
        <el-input v-model="Form.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号码:" prop="phone">
        <el-input v-model="Form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input
          v-model="Form.password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="角色:" prop="role_id">
        <el-select v-model="Form.role_id" placeholder="请选择">
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import roleModel from "../models/roles";
import managerModel from "../models/managers";
export default {
  data() {
    return {
      labelPosition: "top",
      Form: {
        name: "",
        phone: "",
        password: "",
        role_id: ""
      },
      roles: []
    };
  },
  created() {
    roleModel.index().then(res => {
      this.roles = res.data.message;
    });
  },
  methods: {
    submitForm() {
      let name = this.Form.name;
      let phone = this.Form.phone;
      let password = this.Form.password;
      let role_id = this.Form.role_id;
      let params = { name, phone, password, role_id };
      if (!name || !phone || !password || !role_id) {
        this.$message.error("缺少必要参数!");
        return;
      }
      managerModel.created(params).then(res => {
        if (res.data.code === 200) {
          this.$message.success("创建成功!");
          this.$router.push({ path: "/setup/manager" });
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
  .el-form {
    text-align: left;
    width: 650px;
    margin: 0 auto;
  }
}
</style>
