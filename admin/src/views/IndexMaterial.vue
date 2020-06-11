<template>
  <div class="main-container">
    <el-button type="primary" class="create-button" @click="handAdd"
      >添加物料</el-button
    >
    <el-table
      ref="singleTable"
      class="form-list"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="内容">
        <template slot-scope="scope">
          <img :src="scope.row.image_url" class="image_url">
          <a :href="scope.row.image_url" :target=scope.row.open>{{scope.row.image_url}}</a>
        </template>
      </el-table-column>
      <el-table-column label="跳转链接">
        <template slot-scope="scope">
          <link rel="stylesheet" :href="scope.row.jump_link">
          <a :href="scope.row.jump_link" :target=scope.row.open>{{scope.row.jump_link}}</a>
        </template>
      </el-table-column>
      <el-table-column label="打开窗口" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.open == "_self" ? "原窗口":"新窗口" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-more el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-edit">
                <el-button
                  type="text"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-folder-delete">
                <el-button
                  type="text"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import materialModel from "../models/material"
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    materialModel.index().then(res => {
      this.tableData = res.data.message
    })
  },
  methods: {
    handAdd() {
      this.$router.push({ path: "/atmt/material/create" });
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    handleEdit(index, row) {
      this.$router.push({ path: "/atmt/material/edit/" + row.id });
    },
    handleDelete(index, row) {
      materialModel.delete(row.id).then(res => {
        if(res.data.code === 200){
          this.$message.success(res.data.message)
          this.tableData.splice(index, 1)
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.main-container {
  width: 100%;
  height: 100%;
  /deep/.cell{
    display: flex;
    .image_url{
      width: 80px;
      height: 50px;
      margin-right: 5px;
    }
  }
  .create-button {
    float: left;
    margin-bottom: 10px;
  }
}
</style>
