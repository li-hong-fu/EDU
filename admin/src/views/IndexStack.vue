<template>
  <div class="main-container">
    <el-button type="primary" class="create-button" @click="handAdd"
      >创建技能</el-button
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
          <span>{{ scope.row.name }}</span>
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
import stackModel from "../models/stack";
export default {
  name: "stack",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    stackModel.showStack().then(res => {
      this.tableData = res.data.message;
    });
  },
  methods: {
    handAdd() {
      this.$router.push({ path: "/sqb/stack/create" });
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    handleEdit(index, row) {
      this.$router.push({ path: "/sqb/stack/edit/" + row.id });
    },
    handleDelete(index, row) {
      stackModel.deleteStack(row.id).then(res => {
        if (res.data.code === 200) {
          this.$message.success("删除成功!");
          this.tableData.splice(index, 1);
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
