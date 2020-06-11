<template>
  <div class="main-container">
    <el-button type="primary" class="create-button" @click="handAdd"
      >添加广告</el-button
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
      <el-table-column label="slug">
        <template slot-scope="scope">
          <span>{{ scope.row.slug }}</span>
        </template>
      </el-table-column>
      <el-table-column label="尺寸:宽">
        <template slot-scope="scope">
          <span>{{ scope.row.width }}</span>
        </template>
      </el-table-column>
      <el-table-column label="尺寸:高">
        <template slot-scope="scope">
          <span>{{ scope.row.height }}</span>
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
import advertiseModel from "../models/advertise";
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    advertiseModel.index().then(res => {
      this.tableData = res.data.message;
    });
  },
  methods: {
    handAdd() {
      this.$router.push({ path: "/atmt/advertise/create" });
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    handleEdit(index, row) {
      this.$router.push({ path: "/atmt/advertise/edit/" + row.id });
    },
    handleDelete(index, row) {
      advertiseModel.delete(row.id).then(res => {
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
  .create-button {
    float: left;
    margin-bottom: 10px;
  }
}
</style>
