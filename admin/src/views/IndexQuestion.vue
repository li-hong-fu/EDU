<template>
  <div class="main-container">
    <el-button type="primary" class="create-button" @click="handAdd"
      >创建题库</el-button
    >
    <el-table
      ref="singleTable"
      class="form-list"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column label="ID" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.stem }}</span>
        </template>
      </el-table-column>
      <el-table-column label="技能">
        <template slot-scope="scope">
          <span>{{ scope.row.stack_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import QuestionModel from "../models/question";
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    QuestionModel.showQuestion().then(res => {
      this.tableData = res.data.questions;
    });
  },
  methods: {
    handAdd() {
      this.$router.push({ path: "/sqb/question/create" });
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    handleEdit(index, row) {
      this.$router.push({ path: "/sqb/question/edit/" + row.id });
    },
    handleDelete(index, row) {
      console.log(index, row);
      console.log(this.tableData);
      QuestionModel.deleteQuestion(row.id).then(res => {
        if (res.data.code === 200) {
          this.$message.success("删除成功!");
          this.tableData.splice(index, 1);
          location.reload();
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.main-container {
  width: 100%;
  height: 100%;
  .create-button {
    float: left;
    margin-bottom: 10px;
  }
}
</style>
