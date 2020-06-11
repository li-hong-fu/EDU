<template>
  <div class="main-container">
    <div class="main-information">
      <div class="main-describe">基本信息</div>
      <el-form
        :label-position="labelPosition"
        :rules="rules"
        label-width="80px"
        ref="ruleForm"
        :model="roleForm"
      >
        <el-form-item label="名称:" prop="name">
          <el-input v-model="roleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="描述:" prop="description">
          <el-input v-model="roleForm.description"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="main-jurisdiction">
      <div class="main-describe">权限信息</div>
      <div class="block" v-for="item in permission_groups" :key="item.id">
        <span class="title">{{ item.name }}</span>
        <el-checkbox-group v-model="permissions">
          <el-checkbox
            v-for="permission in item.permission"
            :key="permission.slug"
            :label="permission.slug"
            >{{ permission.name }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </div>
    <div class="main-button">
      <el-button type="primary" @click="submitForm">保存</el-button>
    </div>
  </div>
</template>

<script>
import rolesModel from "../models/roles";
export default {
  data() {
    return {
      labelPosition: "top",
      checked: false,
      permission_groups: [],
      permissions: [],
      roleForm: {
        name: "",
        description: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入技能名称", trigger: "blur" },
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
    rolesModel.permission().then(res => {
      let permission_groups = res.data.message.map(data => {
        data.permission.map(datas => {
          datas.checked = false;
        });
        return data;
      });
      this.permission_groups = permission_groups;
    });
    rolesModel.indexItem(id).then(res => {
      this.roleForm = res.data.roles;
      let permission_slug = res.data.permission_slug[0].permission_slug;
      this.permissions = permission_slug.split(",");
      // this.permissions = res.data.permission_slug.map(data => data.permission_slug)
    });
  },
  methods: {
    submitForm() {
      let id = this.$route.params.id;
      let name = this.roleForm.name;
      let description = this.roleForm.description;
      let permissions = this.permissions;
      let params = { name, description, permissions };
      if (!name || !description || !permissions) {
        this.$message.error("缺少参数!");
        return;
      }
      rolesModel.updated(id, params).then(res => {
        if (res.data.code === 200) {
          this.$message.success("角色编辑成功!");
          this.$router.push({ path: "/setup/role" });
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
.main-information {
  .el-form {
    text-align: left;
    width: 650px;
    margin: 0 auto;
    .el-form-item {
      text-align: left;
    }
  }
}
.main-jurisdiction {
  .block {
    display: flex;
    align-items: center;
    width: 630px;
    margin: 0px auto 30px;
    text-align: left;
    font-size: 16px;
    .title {
      margin: 20px;
    }
  }
}
.main-button {
  width: 630px;
  margin: 0 auto;
  text-align: left;
}
</style>
