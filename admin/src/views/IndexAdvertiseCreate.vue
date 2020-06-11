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
      <el-form-item label="广告名称:" prop="name">
        <el-input v-model="ruleForm.name" minlength="10"></el-input>
      </el-form-item>
      <el-form-item label="slug:" prop="slug">
        <el-input v-model="ruleForm.slug" minlength="10"></el-input>
      </el-form-item>
      <el-form-item
        label="尺寸:宽"
        prop="width"
        style="display:inline-block;width:45%;margin-right:10%;"
      >
        <el-input v-model="ruleForm.width"></el-input>
      </el-form-item>
      <el-form-item
        label="尺寸:高"
        prop="height"
        style="display:inline-block;width:45%"
      >
        <el-input v-model="ruleForm.height"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handAdd">创建广告</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import advertiseModel from "../models/advertise";
export default {
  data() {
    return {
      labelPosition: "top",
      ruleForm: {
        name: "",
        slug: "",
        width: "",
        height: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        slug: [
          { required: true, message: "请输入课程提示", trigger: "blur" },
          { min: 3, message: "长度最少10个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handAdd() {
      let name = this.ruleForm.name;
      let slug = this.ruleForm.slug;
      let width = this.ruleForm.width;
      let height = this.ruleForm.height;
      let params = { name, slug, width, height };
      if (!name || !slug || !width || !height) {
        this.$message.error("请填写好广告详情");
        return;
      }
      advertiseModel.created(params).then(res => {
        if (res.data.code === 200) {
          this.$message.success("添加广告位成功!");
          this.$router.push({ name: "Advertise" });
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
</style>
