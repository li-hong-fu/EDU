<template>
  <div class="main-container">
    <el-button type="primary" class="create-button" @click="handAdd"
      >新建角色</el-button
    >
    <el-table
      ref="singleTable"
      class="form-list"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column label="ID" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-more el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item icon="el-icon-view">
                <el-button type="text" @click="handleItem(scope.$index, scope.row)">内容</el-button>
              </el-dropdown-item> -->
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
import roleModel from "../models/roles";
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    roleModel.index().then(res => {
      this.tableData = res.data.message;
    });
  },
  methods: {
    handAdd() {
      this.$router.push({ path: "/setup/role/create" });
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    handleEdit(index, row) {
      this.$router.push({ path: "/setup/role/edit/" + row.id });
    },
    handleDelete(index, row) {
      roleModel.delete(row.id).then(res => {
        if (res.data.code === 200) {
          this.$message.success("角色删除成功!");
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
