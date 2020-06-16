<template>
  <div class="main-container">
    <div class="main-describe">基本信息</div>
    <el-form :label-position="labelPosition" ref="ruleForm" :model="ruleForm">
      <el-form-item label="题目:" prop="stem">
        <el-input v-model="ruleForm.stem"></el-input>
      </el-form-item>
      <el-form-item
        label="技能:"
        prop="stack"
        style="display:inline-block;width:45%;margin-right:10%;"
      >
        <el-select
          v-model="ruleForm.stack_id"
          clearable
          placeholder="请选择"
          style="width:100%"
        >
          <el-option
            v-for="skill in stack"
            :key="skill.id"
            :label="skill.name"
            :value="skill.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="等级:"
        prop="level"
        style="display:inline-block;width:45%"
      >
        <el-select
          v-model="ruleForm.level"
          clearable
          placeholder="请选择"
          style="width:100%"
        >
          <el-option
            v-for="levels in levelList"
            :key="levels.value"
            :label="levels.label"
            :value="levels.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选项:" style="height:30px;"></el-form-item>
      <el-form-item v-for="(options, index) in ruleForm.option" :key="index">
        <el-input v-model="ruleForm.option[index]" style="width:89%"></el-input>
        <el-button @click.prevent="removeDomain(option)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="addDomain">新增选项</el-button>
      </el-form-item>
      <el-form-item>
        <el-radio
          v-for="(correct, index) in correct_length"
          :key="correct.key"
          @change="getcorrectIndex"
          v-model="ruleForm.correct"
          :label="index"
          >{{ arr[index] }}</el-radio
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import stackModel from "../models/stack";
import questionModel from "../models/question";
export default {
  data() {
    return {
      labelPosition: "top",
      levelList: [
        {
          value: 1,
          label: "入门"
        },
        {
          value: 2,
          label: "初阶"
        },
        {
          value: 3,
          label: "进阶"
        },
        {
          value: 4,
          label: "高阶"
        }
      ],
      ruleForm:{},
      stack:[],
      correct_length: "",
      arr: ["A", "B", "C", "D"]
    };
  },
  created() {
    stackModel.showStack().then(res => {
      this.stack = res.data.stack;
    });

    let id = this.$route.params.id;
    questionModel.getQuestion(id).then(res => {
      console.log(res)
      this.ruleForm = res.data.message
      this.ruleForm.option = JSON.parse(this.ruleForm.option)
      this.correct_length = this.ruleForm.option.length;
    });
  },
  methods: {
    submitForm() {
      let id = this.$route.params.id;
      let stem = this.ruleForm.stem;
      let stack_id = this.stack_id;
      let level = this.level_id;
      let optionList = this.ruleForm.option;
      let option = JSON.stringify(optionList);
      let correct = this.correct_index;

      let params = { stem, stack_id, level, option, correct };
      questionModel.editQuestion(id, params).then(res => {
        if (res.data.code === 200) {
          this.$message.success("编辑成功!");
          this.$router.push({ path: "/sqb/question" });
        }
      });
    },
    removeDomain(option) {
      var index = this.ruleForm.option.indexOf(option);
      if (index !== -1) {
        this.ruleForm.option.splice(index, 1);
        this.ruleForm.correct = this.ruleForm.option.length;
      }
    },
    addDomain() {
      let ruleForm = this.ruleForm;
      console.log(ruleForm);
      if (ruleForm.option.length >= 4) {
        return;
      }

      ruleForm.option.push('');
      this.ruleForm.correct = ruleForm.option.length;
    },
    getcorrectIndex(e) {
      this.correct_index = e;
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
